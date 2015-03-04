# Upgrade Seattle

A fork of a NationBuilder theme built for Upgrade Seattle.

Intellectual property for the theme on which this is based belongs to NationBuilder. Upgrade Seattle claims no intellectual property in this project.

## Building

Run `grunt` to build.

## Deploying

First, prepare to deploy:

1. Install [NationBuilder Theme Sync][theme_sync]
1. Add Upgrade Seattle
1. Download the theme to any directory
1. Run `ln -s … ./prod` in this directory, where `…` is the path to the directory of the downloaded theme

While NationBuilder Theme Sync is running and logged-in, run `grunt deploy`.

It will take a few minutes to upload everything, but it's okay to deploy multiple times because AFAIK NationBuilder Theme Sync debounces change events.

[theme_sync]: http://nationbuilder.com/theme_sync