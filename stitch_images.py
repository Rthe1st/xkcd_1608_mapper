import os
from PIL import Image

IMAGE_DIR = "pulled_images/"
ROW_IMAGE_DIR = "stitched_rows/"

# the stitched file (presumably due to size) struggles to be displayed in images viewers/editors
# scale each image to this size instead
reduced_size = 20


def file_name(x, y):
    successful_file_name = IMAGE_DIR + str(y) + "_" + str(x) + ".png"
    default_file_name = "default_img.jpg"
    if os.path.isfile(successful_file_name):
        return successful_file_name
    else:
        return default_file_name


def stitch_tiles_to_rows(x_min, x_max, y_min, y_max):
    print("Stitching tiles into rows")
    for y in range(y_min, y_max + 1):
        row_width = x_max - x_min
        row_image = Image.new("L", (reduced_size * row_width, reduced_size))
        for x in range(x_min, x_max):
            image_tile = Image.open(file_name(x, y))
            image_tile = image_tile.resize((reduced_size, reduced_size))
            x_position = (x - x_min)
            row_image.paste(image_tile, (x_position * reduced_size, 0))
            image_tile.close()
        row_image.save(ROW_IMAGE_DIR + str(y) + "_row.png")
        row_image.close()


def stitch_rows_to_image(x_min, x_max, y_min, y_max):
    print("Stitching rows into image")
    row_width = x_max - x_min
    column_height = y_max - y_min
    new_image = Image.new("L", (reduced_size * row_width, reduced_size * column_height))
    for y in range(y_min, y_max):
        row_image = Image.open(ROW_IMAGE_DIR + str(y) + "_row.png")
        y_position = (y_max - y)
        new_image.paste(row_image, (0, y_position * reduced_size))
        row_image.close()
    new_image.save("total_img_" + str(reduced_size) + "_pixel.png")
    new_image.close()
