import math
import pull_images, stitch_images
import time

# pulled from javascript source
# https://xkcd.com/1608/tigl.min.js
leftEdge = 475136
rightEdge = 567295
imageSize = 513

start = time.time()

x_min = int(math.floor(leftEdge / imageSize))
x_max = int(math.ceil(rightEdge / imageSize))

# y doesnt seem to have a limit
# presumably floor serves as a limit on downwards
# use y start cord initially
y_start = int(549612 / imageSize)

# use if images already pulled
# y_min, y_max = 1068, 1112
y_min, y_max = pull_images.pull_all_images(x_min, x_max, y_start)

stitch_images.stitch_tiles_to_rows(x_min, x_max, y_min, y_max)
stitch_images.stitch_rows_to_image(x_min, x_max, y_min, y_max)

end = time.time()
print("time taken: " + str((end - start)/60))