import os
from PIL import Image
from pull_images import PULLED_IMAGES_DIR

ROW_IMAGE_DIR = "stitched_rows"

def file_name(x, y):
    successful_file_name = "%s/%i_%i.png" % PULLED_IMAGES_DIR, y, x
    default_file_name = "default_img.jpg"
    if os.path.isfile(successful_file_name):
        return successful_file_name
    else:
        return default_file_name


def stitch_tiles_to_rows(x_min, x_max, y_min, y_max, reduced_image_size):
    print("Stitching tiles into rows")
    for y in range(y_min, y_max + 1):
        row_width = x_max - x_min
        row_image = Image.new("L", (reduced_image_size * row_width, reduced_image_size))
        for x in range(x_min, x_max):
            image_tile = Image.open(file_name(x, y))
            image_tile = image_tile.resize((reduced_image_size, reduced_image_size))
            x_position = (x - x_min)
            row_image.paste(image_tile, (x_position * reduced_image_size, 0))
            image_tile.close()
        row_image.save("%s/%i_%i_row.png" % ROW_IMAGE_DIR, y, x)
        row_image.close()


def stitch_rows_to_image(x_min, x_max, y_min, y_max, reduced_image_size):
    print("Stitching rows into image")
    row_width = x_max - x_min
    column_height = y_max - y_min
    new_image = Image.new("L", (reduced_image_size * row_width, reduced_image_size * column_height))
    for y in range(y_min, y_max):
        row_image = Image.open("%s/%i_row.png" % ROW_IMAGE_DIR, y)
        y_position = (y_max - y)
        new_image.paste(row_image, (0, y_position * reduced_image_size))
        row_image.close()
    new_image.save("total_img_%s_pixel.png" % reduced_image_size)
    new_image.close()
