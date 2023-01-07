import json
from pathlib import Path

import pull_images
import stitch_images

if __name__ == "__main__":
    with open('./config.json') as json_data:
        config = json.load(json_data)
    planet_path = Path(f"./xkcd_2712/planets")
    planet_path.mkdir(parents=True, exist_ok=True)
    min_x_location = 0
    min_y_location = 0
    max_x_location = 0
    max_y_location = 0
    planet_configs = config["Kl"]
    for name, planet_config in config["Kl"].items():
        planet_config["name"] = name
        print(name)
        print(planet_config)
        # pull_images.pull_all_images(name, planet_config["width"])
        width_in_images = int(planet_config["width"] / 1024)
        # stitch_images.stitch_planet(
        #     int(planet_config["width"] / 1024),
        #     Path(f"./xkcd_2712/{name}"),
        #     planet_path,
        #     name
        # )
        if name != "greatattractor":
            # print("loc in images", planet_config["loc"][0] / 1024, planet_config["loc"][1] / 1024)
            planet_min_x = planet_config["loc"][0]# - width_in_images / 2
            min_x_location = min(min_x_location, planet_min_x - planet_config["width"]/2)
            max_x_location = max(max_x_location, planet_config["loc"][0] + planet_config["width"]/2)# + width_in_images / 2)
            planet_min_y = planet_config["loc"][1] #- width_in_images / 2
            min_y_location = min(min_y_location, planet_min_y - planet_config["height"]/2)
            max_y_location = max(max_y_location, planet_config["loc"][1] + planet_config["height"]/2)# + width_in_images / 2)
    print(min_y_location)# / 1024)
    print(min_x_location)# / 1024)
    print(max_y_location)# / 1024)
    print(max_x_location)# / 1024)
    stitch_images.stitch_planet_into_space(
        planet_path,
        planet_path,
        planet_configs,
        min_x_location,
        min_y_location,
        max_x_location,
        max_y_location
    )
