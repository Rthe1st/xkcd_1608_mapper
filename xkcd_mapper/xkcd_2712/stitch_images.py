import os
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
from math import ceil
from .background import create_gravity_background_image, create_star_background_image


def stitch_planet(
    max_cord: int,
    directory: Path,
    out_directory: Path,
    planet: str,
    reduced_image_size: int,
):
    print(f"stitching together tiles for {planet}")
    planet_image = Image.new(
        "LA", (reduced_image_size * max_cord, reduced_image_size * max_cord)
    )
    for y in range(0, max_cord):
        for x in range(0, max_cord):
            file_name = directory / f"{y}_{x}.png"
            tile = Image.open(file_name).convert("LA")
            tile = tile.resize((reduced_image_size, reduced_image_size))
            planet_image.paste(tile, (x * reduced_image_size, y * reduced_image_size))
            tile.close()
    planet_image.save(out_directory / f"{planet}.png")
    planet_image.close()


def add_great_attractor_annotation(
    attractor_width, attractor_height, space_image, reduced_image_size
):
    extra_width_for_text = 3
    attractor_annotation = Image.new(
        "LA",
        ((attractor_width + extra_width_for_text) * 1024, attractor_height * 1024),
        (0, 255),
    )
    d = ImageDraw.Draw(attractor_annotation)
    d.rectangle(
        [
            (0, 0),
            ((attractor_width + extra_width_for_text) * 1024, attractor_height * 1024),
        ],
        width=int(ceil(1024 / reduced_image_size)),
        outline="#ffffff",
    )
    d.multiline_text(
        (attractor_width * 1024 + 10, 50),
        "The great attractor is actually at\n(-297000, -125000)\nWhich would be far to the bottom right",
        font=ImageFont.truetype(
            f"{os.path.dirname(__file__)}/font/gnu-free/FreeMonoBold.otf", size=100
        ),
    )
    attractor_annotation = attractor_annotation.resize(
        (
            int(ceil(reduced_image_size * attractor_annotation.width / 1024)),
            int(ceil(reduced_image_size * attractor_annotation.height / 1024)),
        )
    )
    space_image.paste(
        attractor_annotation,
        (0, space_image.height - attractor_annotation.height),
        attractor_annotation,
    )


def stitch_planet_into_space(
    directory: Path,
    out_directory: Path,
    planet_locations,
    min_x,
    min_y,
    max_x,
    max_y,
    reduced_image_size,
):
    print(f"Stitching universe")

    width_in_tiles = int(ceil((max_x - min_x) / 1024))
    height_in_tiles = int(ceil((max_y - min_y) / 1024))
    print("Creating background stars")
    space_image = create_star_background_image(
        width_in_tiles, height_in_tiles, reduced_image_size, out_directory
    )
    print("Creating gravity representation")
    space_image2 = create_gravity_background_image(
        width_in_tiles,
        height_in_tiles,
        reduced_image_size,
        out_directory,
        planet_locations.values(),
        min_x,
        min_y,
    )
    space_image.paste(space_image2, (0, 0), space_image2)
    p = space_image.load()
    for name, planet in planet_locations.items():
        print(f"Pasting {name} onto image")
        p_file = directory / f"{name}.png"
        planet_tile = Image.open(p_file)
        if name == "greatattractor":
            # special case, because this is so far away from the other planets
            # it would make the image size too big if we included it to scale
            add_great_attractor_annotation(
                planet["width_in_tiles"],
                planet["width_in_tiles"],
                space_image,
                reduced_image_size,
            )
            x = 0
            y = space_image.height - planet_tile.height
        else:
            # planet loc is the center of the planet
            # but pillow's paste using the top left corner
            x = (planet["loc"][0] - planet["width"] / 2 - min_x) * (
                reduced_image_size / 1024
            )
            y = (planet["loc"][1] - planet["height"] / 2 - min_y) * (
                reduced_image_size / 1024
            )
        space_image.paste(planet_tile, (int(x), int(y)), planet_tile)
    print("Saving")
    pixels_so_far = 0
    total_amount_pixels = space_image.size[0] * space_image.size[1]
    pixels = space_image.load()
    for x in range(space_image.size[0]):
        for y in range(space_image.size[1]):
            pixels_so_far += 1
            if pixels_so_far % 100000 == 0:
                percent_complete = int((pixels_so_far / total_amount_pixels) * 100)
                print(
                    f"{pixels_so_far} out of {total_amount_pixels}, {percent_complete}% converting to grey complete"
                )
            (g, a) = pixels[x, y]
            pixels[x, y] = (int((255 - g) * ((255 - a) / 255) + g * (a / 255)), 255)

    # converting to L drops the alpha completely and leave grey untouched
    space_image = space_image.convert("L")
    space_image.save(out_directory / f"universe_{reduced_image_size}_pixel.png")
    space_image.close()
