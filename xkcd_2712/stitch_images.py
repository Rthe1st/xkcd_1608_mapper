import os
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
from math import ceil

def stitch_planet(max_cord: int, directory: Path, out_directory: Path, planet: str, reduced_image_size: int):
    print(f"stitching together tiles for {planet}")
    planet_image = Image.new("RGBA", (reduced_image_size * max_cord, reduced_image_size * max_cord))
    for y in range(0, max_cord):
        for x in range(0, max_cord):
            file_name = directory / f"{y}_{x}.png"
            tile = Image.open(file_name).convert("RGBA")
            tile = tile.resize((reduced_image_size, reduced_image_size))
            planet_image.paste(tile, (x * reduced_image_size, y * reduced_image_size))
            tile.close()
    planet_image.save(out_directory / f"{planet}.png")
    planet_image.close()

def create_background_image(width_in_tiles: int, height_in_tiles: int, reduced_image_size: int, out_directory: Path):
    space_image = Image.new("RGBA", (reduced_image_size * width_in_tiles, reduced_image_size * height_in_tiles))
    # if you replace this with a black square it reduces the file size a lot
    # but I like the stars :'(
    # exporting a JPEG result, the stars might compress better
    file_name = Path(f"./xkcd_2712/gravity_2x.png")
    image_tile = Image.open(file_name).convert("RGBA")
    image_tile = image_tile.resize((reduced_image_size, reduced_image_size))
    for y in range(0, height_in_tiles):
        for x in range(0, width_in_tiles):
            space_image.paste(image_tile, (x * reduced_image_size, y * reduced_image_size))
    image_tile.close()
    return space_image

def add_great_attractor_annotation(attractor_width, attractor_height, space_image, reduced_image_size):
    extra_width_for_text = 3
    attractor_annotation = Image.new("RGBA", ((attractor_width + extra_width_for_text)*1024, attractor_height * 1024), (0, 0, 0, 0))
    d = ImageDraw.Draw(attractor_annotation)
    d.rectangle([(0,0), (attractor_width, attractor_height)], width=10, outline="#ffffff")
    d.multiline_text(
        (attractor_width * 1024 + 10, 10),
        "The great attractor is actually at\n(-297000, -125000)\nWhich would be far to the bottom right",
        font=ImageFont.truetype("./gnu-free/FreeMonoBold.otf", size=100))
    attractor_annotation = attractor_annotation.resize(
            (
                int(ceil(reduced_image_size * attractor_annotation.width/1024)),
                int(ceil(reduced_image_size * attractor_annotation.height/1024))
            )
        )
    space_image.paste(attractor_annotation, (0, space_image.height - attractor_annotation.height), attractor_annotation)


def stitch_planet_into_space(directory: Path, out_directory: Path, planet_locations, min_x, min_y, max_x, max_y, reduced_image_size):
    print(f"Stitching universe")

    width_in_tiles = int(ceil((max_x - min_x) / 1024))
    height_in_tiles = int(ceil((max_y - min_y) / 1024))

    space_image = create_background_image(width_in_tiles, height_in_tiles, reduced_image_size, out_directory)

    for name, planet in planet_locations.items():
        p_file = directory / f"{name}.png"
        planet_tile = Image.open(p_file).convert("RGBA")
        if name == "greatattractor":
            # special case, because this is so far away from the other planets
            # it would make the image size too big if we included it to scale
            add_great_attractor_annotation(planet["width_in_tiles"], planet["width_in_tiles"], space_image, reduced_image_size)
            x = 0
            y = space_image.height - planet_tile.height
        else:
            # planet loc is the center of the planet
            # but pillow's paste using the top left corner
            x = (planet["loc"][0] - planet["width"]/2 - min_x) * (reduced_image_size/1024)
            y = (planet["loc"][1] - planet["height"]/2 - min_y) * (reduced_image_size/1024)
        space_image.paste(planet_tile, (int(x), int(y)), planet_tile)

    space_image.save(out_directory / f"universe_{reduced_image_size}_pixel.png")
    space_image.close()
