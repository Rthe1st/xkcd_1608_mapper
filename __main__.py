import argparse
from xkcd_1608 import coordinator as xkcd_1608_coordinator
from xkcd_2712 import coordinator as xkcd_2712_coordinator


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Build maps of XKCD comics")
    parser.add_argument('--offline', action='store_true')
    subparsers = parser.add_subparsers()
    xkcd_1608_coordinator.add_arguments(subparsers.add_parser("xkcd_1608"))
    xkcd_2712_coordinator.add_arguments(subparsers.add_parser("xkcd_2712"))

    args = parser.parse_args()

    args.func(args)
