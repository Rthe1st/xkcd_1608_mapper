from pathlib import Path

from concurrent import futures
import shutil
import requests

def get_tile(x: int, y: int, planet: str, directory: Path) -> None:
    url = f"https://xkcd.com/2712/tile/{planet}_{x}_{y}.png"
    response = requests.get(url, stream=True)
    # save as y_x so it looks right sorted alphabetically in directories
    file_path = directory / f"{y}_{x}.png"
    with open(file_path, 'wb+') as out_file:
        shutil.copyfileobj(response.raw, out_file)


def pull_all_images(planet: str, planet_path: Path, width: int, offline = False) -> Path:
    planet_tile_path = planet_path / planet
    planet_tile_path.mkdir(exist_ok=True)
    if not offline:
        print(f"downloading {width * width} images for {planet}")
        for x in range(0, width):
            for y in range(0, width):
                get_tile(x, y, planet, planet_tile_path)
    return planet_tile_path
