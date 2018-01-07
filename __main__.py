import pull_images, stitch_images
import math

# pulled from javascript source
# https://xkcd.com/1608/tigl.min.js
leftEdge = 475136
rightEdge = 567295
imageSize = 513

x_min = int(math.floor(leftEdge / imageSize))
x_max = int(math.ceil(rightEdge / imageSize))

# y doesnt seem to have a limit
# presumably floor serves as a limit on downwards
# use y start cord initially

y_start = int(549612 / imageSize)

x_limits, y_limits = pull_images.pull_all_images(x_min, x_max, y_start)

# these were taken from pull_all_images output
# uncomment if the tiles have been downloaded in a previous run
"""x_limits = {
    "left": 928,
    "right": 1074
}

y_limits = {
    "top": 1112,
    "bottom": 1068
}"""

stitch_images.stitch_tiles_to_rows(y_limits, x_limits)
stitch_images.stitch_rows_to_image(x_limits, y_limits)