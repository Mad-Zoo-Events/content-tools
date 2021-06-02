const MENU_WIDTH = 9;

const defaultMenuItems = (menuSize) => {
    const exitSlot = menuSize - 1;
    const discordSlot = menuSize - MENU_WIDTH;

    return {
        Discord: {
            material: "ROSE_BUSH",
            slot: discordSlot,
            display_name: "&fDiscord Link",
            lore: ["&7click to join the Mad Zoo Events Discord server!"],
            left_click_commands: [
                "[sound] ENTITY_CHICKEN_EGG",
                "[close]",
                "[message] &b&oJoin our Discord server on &nhttps://madzoo.events/discord",
                '[console] title %player_name% subtitle ["",{"text":"to click on clickable links","color":"dark_aqua"}]',
                '[console] title %player_name% title ["",{"text":"Open chat (\"T\")","color":"dark_aqua"}]'
            ],
        },
        Exit: {
            material: "BARRIER",
            slot: exitSlot,
            display_name: "&fExit Store",
            left_click_commands: [
                "[close]",
                "[sound] BLOCK_CHEST_CLOSE"
            ],

        }
    };
};

export default defaultMenuItems;
