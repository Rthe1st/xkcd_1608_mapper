from pathlib import Path

from concurrent import futures
import shutil
import requests

def get_tile(x: int, y: int, planet: str, directory: Path):
    url = f"https://xkcd.com/2712/tile/{planet}_{x}_{y}.png"
    response = requests.get(url, stream=True)
    print(url)
    print(response.status_code)
    # save as y_x so it looks right sorted alphabetically in directories
    file_path = directory / f"{y}_{x}.png"
    with open(file_path, 'wb+') as out_file:
        shutil.copyfileobj(response.raw, out_file)
    print(file_path)


def pull_all_images(planet: str, width: int):
    # this had images for cords 0,0 to 3,3
    # and each image is 1024
    # 4096/4 = 1024
    # so we can get planet cord limits from the width
    # and also fill in blanks between planets by adding empty 1024 images
    # image urls look like https://xkcd.com/2712/tile/origin_3_3.png
    for x in range(0, int(width / 1024)):
        for y in range(0, int(width / 1024)):
            planet_path = Path(f"./xkcd_2712/{planet}")
            planet_path.mkdir(parents=True, exist_ok=True)
            get_tile(x, y, planet, planet_path)
