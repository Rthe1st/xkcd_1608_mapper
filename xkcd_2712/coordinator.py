import json
from pathlib import Path

from . import pull_images, stitch_images

IMAGE_SIZE = 1024

def check_reduced_image_size(value):
    ivalue = int(value)
    if IMAGE_SIZE < ivalue < 0:
         raise argparse.ArgumentTypeError("Must be between 0 and %s" % IMAGE_SIZE)
    return ivalue

def add_arguments(parser):
    parser.add_argument('--offline', action='store_true')
    # the stitched file (presumably due to size) struggles to be displayed in images viewers/editors
    # scale each image to this size instead
    parser.add_argument('-r', '--reduced_image_size', type=check_reduced_image_size,
                        default=32, help="Default is 32, ~128 needed to read speech bubbles")

    parser.set_defaults(func=run)

def run(args):
    with open('./xkcd_2712/config.json') as json_data:
        config = json.load(json_data)
    planet_path = Path(f"./results/xkcd_2712/planets")
    planet_path.mkdir(parents=True, exist_ok=True)
    min_x_location = 0
    min_y_location = 0
    max_x_location = 0
    max_y_location = 0
    planet_configs = config["Kl"]
    for name, planet_config in planet_configs.items():
        # each image tile is 1024
        # so we can get planet tile limits from the planet width
        # all planets are square images, width and height and interchangeable
        assert(planet_config["width"] == planet_config["height"])
        width_in_images = planet_config["width"] // 1024
        planet_tile_directory = pull_images.pull_all_images(name, planet_path, width_in_images, args.offline)
        stitch_images.stitch_planet(
            width_in_images,
            planet_tile_directory,
            planet_path,
            name,
            args.reduced_image_size
        )
       # there is a function Jn in the source that scales all cords by 2, and flips the y axis
        planet_config["loc"] = [planet_config["loc"][0]*2, -planet_config["loc"][1]*2]
        planet_config["width_in_tiles"] = width_in_images
        # the greatattractor is so far away from other objects
        # we manually place it not-to-scale to avoid inflating the image size
        if name != "greatattractor":
            planet_x, planet_y = planet_config["loc"]
            planet_radius = planet_config["width"]/2
            min_x_location = min(min_x_location, planet_x - planet_radius)
            max_x_location = max(max_x_location, planet_x + planet_radius)
            min_y_location = min(min_y_location, planet_y - planet_radius)
            max_y_location = max(max_y_location, planet_y + planet_radius)
    universe_path = Path(f"./results/xkcd_2712/universes")
    universe_path.mkdir(parents=True, exist_ok=True)
    stitch_images.stitch_planet_into_space(
        planet_path,
        universe_path,
        planet_configs,
        min_x_location,
        min_y_location,
        max_x_location,
        max_y_location,
        args.reduced_image_size
    )
