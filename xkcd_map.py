import requests
import shutil
import math

img_dir = 'pulled_images/'

# pulled from javascript source
# https://xkcd.com/1608/tigl.min.js
leftEdge = 475136
rightEdge = 567295
imageSize = 513

x_limits = {
    "least": math.floor(leftEdge / imageSize),
    "most": math.ceil(rightEdge / imageSize)
}

# y doesnt seem to have a limit
# presumably floor serves as a limit on downwards
# use y start cord initially

y_limits = {
    "most": math.ceil(549612 / imageSize),
    "least": math.floor(549612 / imageSize)
}


def get_tile(x, y):
    # save as y_x so grid view of directory matches cords
    # in os gui grid (sorted alphabetically)
    url = "http://xkcd.com/1608/" + str(x) + ":-" + str(y) + "+s.png"
    response = requests.get(url, stream=True)
    file_name = str(y) + "_" + str(x)
    print("x: " + str(x) + " y: " + str(y))
    if response.status_code == 200:
        print("got 200")
        file_path = img_dir + file_name + ".png"
        with open(file_path, 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
    else:
        # empty tiles (i.e. all white) get 404's
        file_path = img_dir + file_name + ".default"
        open(file_path, "w+").close()
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


def explore(expanding_limits, hard_limits, expanding_axis):
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


# Initial strategy was to expand along alternating axis
# Changing as each axis got only 404s for a row/column
# This is likely unnecessary, as limits for the x where pulled from the source
# sInstead, we could of just expanded along the y until all 404ss

print("y explore")
explore(y_limits, x_limits, "y")
while True:
    print("x explore")
    if not explore(x_limits, y_limits, "x"):
        break
    print("y explore")
    if not explore(y_limits, x_limits, "y"):
        break

print("explored from x: " + str(x_limits["least"]) + " y: " + str(y_limits["least"]) +
      "to x: " + str(x_limits["most"]) + " y: " + str(y_limits["least"]))
