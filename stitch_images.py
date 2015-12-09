from PIL import Image
import os

image_dir = "pulled_images/"
image_row_dir = "stitched_rows/"

# the stitched file (presumably due to size) struggles to be displayed in images viewers/editors
# scale each image to this size instead
reduced_size = 400


def file_name(x, y):
    successful_file_name = image_dir + str(y) + "_" + str(x) + ".png"
    default_file_name = "default_img.jpg"
    if os.path.isfile(successful_file_name):
        return successful_file_name
    else:
        return default_file_name


def stitch_tiles_to_rows(y_limits, x_limits):
    for y in range(y_limits["bottom"], y_limits["top"] + 1):
        row_width = x_limits["right"] - x_limits["left"]
        image_row = Image.new("L", (reduced_size * row_width, reduced_size))
        for x in range(x_limits["left"], x_limits["right"]):
            image_tile = Image.open(file_name(x, y))
            image_tile = image_tile.resize((reduced_size, reduced_size))
            x_position = (x - x_limits["left"])
            image_row.paste(image_tile, (x_position * reduced_size, 0))
            image_tile.close()
        image_row.save(image_row_dir + str(y) + "_row.png")
        image_row.close()
        print("row " + str(y) + " done")


def stitch_rows_to_image(x_limits, y_limits):
    row_width = x_limits["right"] - x_limits["left"]
    column_height = y_limits["top"] - y_limits["bottom"]
    new_image = Image.new("L", (reduced_size * row_width, reduced_size * column_height))
    for y in range(y_limits["bottom"], y_limits["top"]):
        print("row " + str(y))
        im = Image.open(image_row_dir + str(y) + "_row.png")
        y_position = (y_limits["top"] - y)
        new_image.paste(im, (0, y_position * reduced_size))
        im.close()
    new_image.save("total_img_" + str(reduced_size) + "_pixel.png")
    new_image.close()
