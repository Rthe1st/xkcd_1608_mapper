import os
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
from math import ceil

def stitch_planet(max_cord: int, directory: Path, out_directory: Path, planet: str):
    reduced_image_size = 512
    print(f"Stitching {directory}")
    planet_image = Image.new("RGBA", (reduced_image_size * max_cord, reduced_image_size * max_cord))
    for y in range(0, max_cord):
        for x in range(0, max_cord):
            file_name = directory / f"{y}_{x}.png"
            image_tile = Image.open(file_name).convert("RGBA")
            image_tile = image_tile.resize((reduced_image_size, reduced_image_size))
            planet_image.paste(image_tile, (x * reduced_image_size, y * reduced_image_size))
            image_tile.close()
    planet_image.save(out_directory / f"{planet}.png")
    planet_image.close()

def stitch_planet_into_space(directory: Path, out_directory: Path, planet_locations, min_x, min_y, max_x, max_y):
    # todo: preserve transpancy - see PIL warning
    # + 4 is a hack in case we go voer the edige = fix proper
    width_in_tiles = int(ceil((max_x - min_x) / 1024))
    height_in_tiles = int(ceil((max_y - min_y) / 1024))
    reduced_image_size = 64
    print(f"Stitching full image")
    space_image = Image.new("RGBA", (reduced_image_size * width_in_tiles, reduced_image_size * height_in_tiles))
    file_name = Path(f"gravity_2x.png")
    image_tile = Image.open(file_name).convert("RGBA")
    # I think this reducing might hide the stars
    # can we fix that by not scaling this image?
    image_tile = image_tile.resize((reduced_image_size, reduced_image_size))
    for y in range(0, height_in_tiles):
        for x in range(0, width_in_tiles):
            space_image.paste(image_tile, (x * reduced_image_size, y * reduced_image_size))
    image_tile.close()
    space_image.save(out_directory / f"empty_universe.png")

    for name, planet in planet_locations.items():
        p_file = directory / f"{name}.png"
        planet_tile = Image.open(p_file).convert("RGBA")
        planet_tile = planet_tile.resize((
            reduced_image_size* int(planet["width"]/1024),
            reduced_image_size * int(planet["width"]/1024))
        )
        if name == "greatattractor":
            # todo: move to bottom left
            # special case, because this is so far away from the other planets
            x = +min_x# + planet["width"]/2
            y = +min_y# + planet["height"]/2
            attractor_annotation = Image.new("RGBA", (reduced_image_size* int(planet["width"]/1024) + 3000, reduced_image_size* int(planet["width"]/1024)), (0, 0, 0, 0))
            d = ImageDraw.Draw(attractor_annotation)
            font = ImageFont.truetype("./gnu-free/FreeMonoBold.otf", size=100)
            d.rectangle([(0,0), (reduced_image_size* int(planet["width"]/1024), reduced_image_size* int(planet["width"]/1024))], width=10, outline="#ffffff")
            d.multiline_text((reduced_image_size* int(planet["width"]/1024) + 10, 10), "The great attractor is actually at\n(-297000, -125000)\nWhich would be far to the top left", font=font)
            space_image.paste(attractor_annotation, (0, 0), attractor_annotation)
        else:
            x = planet["loc"][0] - planet["width"]/2
            y = planet["loc"][1] - planet["height"]/2
        print("x", x, "x offset", (x + -min_x), "scaled", int((x + -min_x) * (reduced_image_size/1024)))
        # need to offset of center of planet is at x,y
        # planet cords are twice as bias in config for some reason
        # and y axis inverted
        space_image.paste(planet_tile, (int((x + -min_x) * (reduced_image_size/1024)), int((y + -min_y)* (reduced_image_size/1024))), planet_tile)

    space_image.save(out_directory / f"universe.png")
    space_image.close()
