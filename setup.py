from setuptools import setup


with open('README.md') as f:
    readme = f.read()

setup(
    name='XKCD 1608 Mapper',
    description='Creates a giant PNG of the map from https://xkcd.com/1608/',
    long_description=readme,
    url='https://github.com/Rthe1st/xkcd_1608_mapper/',
)