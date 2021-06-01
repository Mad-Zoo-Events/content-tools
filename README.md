# Content Tools

This repository contains a set of content generation utilities for MZE Minecraft events.

- [Content Tools](#content-tools)
  - [Generate Drinks](#generate-drinks)

## Generate Drinks

Drinks are represented in two locations: as a `ItemEdit` server item and in the corresponding `DeluxeMenus` GUI menu.

**To Generate drinks**
- write them into [input/drinks.yaml](input/drinks.yaml) 
- run `yarn generate-drinks`
- find your generated files in the [out](out) directory

After that's done, merge the resulting contents of `drinks_serveritems.yaml` with `plugins/ItemEdit/database/server-database.yml` and replace `bar.yml` under `plugins/DeluxeMenus/gui_menus` on the Minecraft servers.
