import argparse
import math
import time
import pull_images
import stitch_images

# pulled from javascript source
# https://xkcd.com/1608/tigl.min.js
LEFT_EDGE = 475136
RIGHT_EDGE = 567295
IMAGE_SIZE = 513

X_MIN = int(math.floor(LEFT_EDGE / IMAGE_SIZE))
X_MAX = int(math.ceil(RIGHT_EDGE / IMAGE_SIZE))

# y doesnt seem to have a limit
# presumably floor serves as a limit on downwards
# use y start cord initially
Y_START = int(549612 / IMAGE_SIZE)

def check_reduced_image_size(value):
    ivalue = int(value)
    if IMAGE_SIZE < ivalue < 0:
         raise argparse.ArgumentTypeError("Must be between 0 and %s" % IMAGE_SIZE)
    return ivalue

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Grab xkcd 1608's map")
    parser.add_argument('--offline', action='store_true')
    # the stitched file (presumably due to size) struggles to be displayed in images viewers/editors
    # scale each image to this size instead
    parser.add_argument('-r', '--reduced_image_size', type=check_reduced_image_size,
                        default=20, help="Default is 20, ~200 needed to read speech bubbles")
    args = parser.parse_args()

    start = time.time()

    # use if images already pulled
    if args.offline:
        y_min, y_max = 1068, 1112
    else:
        y_min, y_max = pull_images.pull_all_images(X_MIN, X_MAX, Y_START)

    stitch_images.stitch_tiles_to_rows(X_MIN, X_MAX, y_min, y_max, args.reduced_image_size)
    stitch_images.stitch_rows_to_image(X_MIN, X_MAX, y_min, y_max, args.reduced_image_size)

    minutes_taken = (time.time() - start)/60
    print("time taken: %i" % minutes_taken)
