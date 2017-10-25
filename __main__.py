import pull_images, stitch_images
import math

# pulled from javascript source
# https://xkcd.com/1608/tigl.min.js
leftEdge = 475136
rightEdge = 567295
imageSize = 513

x_limits = {
    "left": math.floor(leftEdge / imageSize),
    "right": math.ceil(rightEdge / imageSize)
}

# y doesnt seem to have a limit
# presumably floor serves as a limit on downwards
# use y start cord initially

y_limits = {
    "top": math.ceil(549612 / imageSize),
    "bottom": math.floor(549612 / imageSize)
}

#x_limits, y_limits = pull_images.pull_all_images(x_limits, y_limits)

# these were taken from xkcd_map's output
x_limits = {
    "left": 928,
    "right": 1074
}

y_limits = {
    "top": 1112,
    "bottom": 1068
}

stitch_images.stitch_tiles_to_rows(y_limits, x_limits)
stitch_images.stitch_rows_to_image(x_limits, y_limits)