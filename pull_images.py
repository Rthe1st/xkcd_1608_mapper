import requests
import shutil

img_dir = 'pulled_images/'


def get_tile(x, y):
    # save as y_x so grid view of directory matches cords
    # in os gui grid (sorted alphabetically)
    url = "http://xkcd.com/1608/" + str(x) + ":-" + str(y) + "+s.png"
    response = requests.get(url, stream=True)
    file_name = str(y) + "_" + str(x)
    print("x: " + str(x) + " y: " + str(y))
    # empty tiles (i.e. all white) get 404's
    if response.status_code == 200:
        print("got 200")
        file_path = img_dir + file_name + ".png"
        with open(file_path, 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
    return response.status_code


def expand_limit(position, change, perpendicular_limits, explore_axis):
    while True:
        all404 = True
        for limit_axis in range(perpendicular_limits["least"], perpendicular_limits["most"]):
            if explore_axis == "x":
                status_code = get_tile(position, limit_axis)
            else:
                status_code = get_tile(limit_axis, position)
            if status_code != 404:
                all404 = False
        if all404:
            return position
        else:
            position += change


def explore_axis(expanding_limits, hard_limits, expanding_axis):
    print("exploring most")
    new_most = expand_limit(expanding_limits["most"], 1, hard_limits, expanding_axis)
    print("exploring least")
    new_least = expand_limit(expanding_limits["least"], -1, hard_limits, expanding_axis)
    if new_most == expanding_limits["most"] and new_least == expanding_limits["least"]:
        return False
    else:
        expanding_limits["most"] = new_most
        expanding_limits["least"] = new_least
        return True


def pull_all_images(x_limits, y_limits):
    """Initial strategy was to expand along alternating axis
    Changing as each axis got only 404s for a row/column
    This is likely unnecessary, as limits for the x where pulled from the source
    Instead, we could of just expanded along the y until all 404s"""
    print("y explore")
    explore_axis(y_limits, x_limits, "y")
    while True:
        print("x explore")
        if not explore_axis(x_limits, y_limits, "x"):
            break
        print("y explore")
        if not explore_axis(y_limits, x_limits, "y"):
            break
    print("explored from x: " + str(x_limits["least"]) + " y: " + str(y_limits["least"]) +
          "to x: " + str(x_limits["most"]) + " y: " + str(y_limits["least"]))
    return x_limits, y_limits
