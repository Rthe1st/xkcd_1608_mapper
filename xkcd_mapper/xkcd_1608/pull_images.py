from concurrent import futures
import shutil
import requests

PULLED_IMAGES_DIR = "./results/xkcd_1608/pulled_images"


def get_tile(x, y):
    # save as y_x so it looks right sorted alphabetically in directories
    url = "http://xkcd.com/1608/%i:-%i+s.png" % (x, y)
    response = requests.get(url, stream=True)
    file_name = "%i_%i" % (y, x)
    # empty tiles (i.e. all white) get 404's
    if response.status_code == 200:
        file_path = "%s/%s.png" % (PULLED_IMAGES_DIR, file_name)
        with open(file_path, "wb+") as out_file:
            shutil.copyfileobj(response.raw, out_file)
    return response.status_code


def row_is_all_404(x_min, x_max, y):
    all_404 = True
    request_results = []
    with futures.ThreadPoolExecutor(max_workers=10) as executor:
        for x in range(x_min, x_max + 1):
            request_results.append(executor.submit(get_tile, x, y))
    for future in futures.as_completed(request_results):
        if future.result() != 404:
            all_404 = False
    return all_404


def pull_all_images(x_min, x_max, y_start):
    """Initial strategy was to expand along alternating axis
    Changing as each axis got only 404s for a row/column
    This is likely unnecessary, as limits for the x where pulled from the source
    Instead, we could of just expanded along the y until all 404s"""
    y = y_start
    print("Exploring up")
    while not row_is_all_404(x_min, x_max, y):
        y += 1
        if y % 10 == 0:
            print("Row %i done" % y)
    y_max = y
    print("Exploring down")
    y = y_start
    while not row_is_all_404(x_min, x_max, y):
        y -= 1
        if y % 10 == 0:
            print("Row %i done" % y)
    y_min = y

    return y_min, y_max
