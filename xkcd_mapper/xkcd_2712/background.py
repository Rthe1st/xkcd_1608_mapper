import os
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
from math import ceil, cos, sin, atan2, fabs, pi, floor,log

def get_gravity_strength(planet, x_distance: int, y_distance: int):
    [planet_x, planet_y] = planet["loc"]
    radius = planet["radius"]
    distance = (x_distance**2 + y_distance**2) ** 0.5
    if distance < radius:
        distance = radius
        strength = (planet["gravity"] * 100.0) / (radius ** 2)
        strength *= distance / radius 
    else:
        strength = (planet["gravity"] * 100.0) / (distance ** 2)
    return strength

def gravity_strength_no_direction(planet_confs, x: int, y: int):
    total_strength = 0
    
    for planet in planet_confs:
        [planet_x, planet_y] = planet["loc"]
        x_distance = x - planet_x
        y_distance = y - planet_y
        total_strength += get_gravity_strength(planet, x_distance, y_distance)
    return total_strength

def gravity_strength(planet_confs, x: int, y: int):
    strength_x = 0
    strength_y = 0

    for planet in planet_confs:
        [planet_x, planet_y] = planet["loc"]
        x_distance = planet_x - x
        y_distance = planet_y - y
        strength = get_gravity_strength(planet, x_distance, y_distance)
        angle = atan2(y_distance, x_distance)
        strength_x += cos(angle) * strength
        strength_y += sin(angle) * strength

    return fabs(strength_x) + fabs(strength_y)

def black_and_white(grav: float, global_max: float, global_min: float):

    with_in_global_bounds = max(min(grav, global_max), global_min)
    as_percent = (with_in_global_bounds - global_min) / (global_max - global_min)
    high_filtered_bound = 0.99983
    high_filtered = (min(1, as_percent+high_filtered_bound)-high_filtered_bound)/(1-high_filtered_bound)
    low_filtered_bound = 0.05
    low_filtered = max(0, high_filtered-low_filtered_bound)/(1-low_filtered_bound)
    mirrored = 1 - low_filtered if low_filtered > 0.5 else low_filtered
    in_pixel_range = int(min(255, mirrored * 255))
    return in_pixel_range

def create_gravity_background_image(
        width_in_tiles: int,
        height_in_tiles: int,
        reduced_image_size: int,
        out_directory: Path,
        planet_conf,
        min_x: int,
        min_y: int,
        use_precomputed_max_min=True,
        calculate_with_x_y_components=True
    ):
    space_image = Image.new("LA", (reduced_image_size * width_in_tiles, reduced_image_size * height_in_tiles))
    pixels = space_image.load()
    global_max = 0
    global_min = 10000
    unscale_x = 1024/reduced_image_size
    unscale_y = 1024/reduced_image_size

    if not use_precomputed_max_min:
        print("computing fresh max/min gravity bounds")
        # 4 is arbitrary, matches what was used to calculate cached values
        for x in range(space_image.size[0], 4):
            for y in range(space_image.size[1], 4):
                if calculate_with_x_y_components:
                    strength = gravity_strength(planet_conf, min_x + x * unscale_x, min_y + y * unscale_y)
                else:
                    strength = gravity_strength_no_direction(planet_conf, min_x + x * unscale_x, min_y + y * unscale_y)
                global_max = max(global_max, strength)
                global_min = min(global_min, strength)
    else:
        # these were computed for with reduced_image_size=16, and only checking everyone in 4 pixels
        # chosen because they looked nice
        print("using pre-computed max/min gravity bounds")
        global_max = 162.83561547751356
        global_min = 5.4384142659479e-05
    print("strongest gravity: ", global_max)
    print("weakest gravity: ", global_min)
    pixels_so_far = 0
    total_amount_pixels = space_image.size[0] * space_image.size[1]
    for x in range(space_image.size[0]):
        for y in range(space_image.size[1]):
            pixels_so_far += 1
            if pixels_so_far % 100000 == 0:
                percent_complete = int((pixels_so_far / total_amount_pixels) * 100)
                print(f"{pixels_so_far} out of {total_amount_pixels}, {percent_complete}% gravity pixels complete")
            strength = gravity_strength(planet_conf, min_x + x * unscale_x, min_y + y * unscale_y)
            # strength = strength_cache[(x, y)]
            g = a = black_and_white(strength, global_max, global_min)
            pixels[x,y] = (g, a)

    return space_image

def create_star_background_image(width_in_tiles: int, height_in_tiles: int, reduced_image_size: int, out_directory: Path):
    space_image = Image.new("LA", (reduced_image_size * width_in_tiles, reduced_image_size * height_in_tiles))
    file_name = Path(f"{os.path.dirname(__file__)}/gravity_2x.png")
    background_tile_size = 256
    image_tile = Image.open(file_name).convert("LA")
    image_tile = image_tile.resize((background_tile_size, background_tile_size))
    for y in range(height_in_tiles):
        for x in range(width_in_tiles):
            space_image.paste(image_tile, (x * background_tile_size, y * background_tile_size))
    image_tile.close()
    return space_image
