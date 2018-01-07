import math
import time
import pull_images
import stitch_images

# pulled from javascript source
# https://xkcd.com/1608/tigl.min.js
LEFT_EDGE = 475136
RIGHT_EDGE = 567295
IMAGE_SIZE = 513

start = time.time()

X_MIN = int(math.floor(LEFT_EDGE / IMAGE_SIZE))
X_MAX = int(math.ceil(RIGHT_EDGE / IMAGE_SIZE))

# y doesnt seem to have a limit
# presumably floor serves as a limit on downwards
# use y start cord initially
y_start = int(549612 / IMAGE_SIZE)

# use if images already pulled
# y_min, y_max = 1068, 1112
y_min, y_max = pull_images.pull_all_images(X_MIN, X_MAX, y_start)

stitch_images.stitch_tiles_to_rows(X_MIN, X_MAX, y_min, y_max)
stitch_images.stitch_rows_to_image(X_MIN, X_MAX, y_min, y_max)

end = time.time()
minutes_taken = (end - start)/60
print("time taken: " + str(minutes_taken))
