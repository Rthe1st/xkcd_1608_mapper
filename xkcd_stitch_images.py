from PIL import Image
import os

image_dir = "pulled_images/"

# these were taken from xkcd_map's output

x_limits = {
    "left": 928,
    "right": 1074
}

y_limits = {
    "top": 1112,
    "bottom": 1068
}

image_size = 513

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

for y in range(y_limits["bottom"], y_limits["top"] + 1):
    row_width = x_limits["right"] - x_limits["left"]
    new_image = Image.new("L", (reduced_size * row_width, reduced_size))
    for x in range(x_limits["left"], x_limits["right"]):
        im = Image.open(file_name(x, y))
        im = im.resize((reduced_size, reduced_size))
        x_position = (x - x_limits["left"])
        new_image.paste(im, (x_position * reduced_size, 0))
        im.close()
    new_image.save("stitched_rows/" + str(y) + "_row.png")
    new_image.close()
    print("row " + str(y) + " done")

row_width = x_limits["right"] - x_limits["left"]
column_height = y_limits["top"] - y_limits["bottom"]
new_image = Image.new("L", (reduced_size * row_width, reduced_size * column_height))
for y in range(y_limits["bottom"], y_limits["top"]):
    print("row " + str(y))
    im = Image.open("stitched_rows/" + str(y) + "_row.png")
    y_position = (y_limits["top"] - y)
    new_image.paste(im, (0, y_position * reduced_size))
    im.close()
new_image.save("total_img_" + str(reduced_size) + "_pixel.png")
new_image.close()
