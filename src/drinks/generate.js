import convert from "color-convert";
import fs from "fs";
import yaml from "js-yaml";

const ACCENT_COLOR = "aqua";

const run = () => {
    const {drinks, shots} = load();

    const serverItems = {};

    drinks.forEach(drink => {
        const id = "DRINK_" + drink.name.replace(/\s/g, "");
        serverItems[id] = toServerItem(drink, false);
    });

    shots.forEach(shot => {
        const id = "SHOT_" + shot.name.replace(/\s/g, "");
        serverItems[id] = toServerItem(shot, true);
    });

    save(serverItems);

    console.log(`Generated ${drinks.length} drinks and ${shots.length} shots`);
};

const toServerItem = (item, isShot) => {
    const displayName = isShot
        ? `{"extra":[{"color":"white","text":"${item.name}"},{"italic":false,"color":"gray","text":" (shot)"}],"text":""}`
        : `{"extra":[{"color":"white","text":"${item.name}"}],"text":""}`;

    const lore = item.lore.map((line, index) => {
        const textColor = index === 0
            ? ACCENT_COLOR
            : "dark_gray";

        return `{"extra":[{"color":"${textColor}","text":"${line}"}],"text":""}`;
    });

    const potionColor = convert.hex.rgb(item.color);

    return {
        item: {
            "==": "org.bukkit.inventory.ItemStack",
            v: 2586,
            type: isShot
                ? "LINGERING_POTION"
                : "POTION",
            meta: {
                "==": "ItemMeta",
                "meta-type": "POTION",
                "display-name": displayName,
                lore,
                ItemFlags: ["HIDE_ENCHANTS", "HIDE_ATTRIBUTES", "HIDE_UNBREAKABLE", "HIDE_DESTROYS", "HIDE_PLACED_ON", "HIDE_POTION_EFFECTS"],
                "potion-type": "minecraft:water",
                "custom-color": {
                    "==": "Color",
                    RED: potionColor[0],
                    GREEN: potionColor[1],
                    BLUE: potionColor[2]
                }
            }
        }
    };
};

const load = () => {
    try {
        const fileContents = fs.readFileSync("./input/drinks.yaml", "utf8");
        const data = yaml.load(fileContents);

        if (!data.drinks) {
            data.drinks = [];
        }

        if (!data.shots) {
            data.shots = [];
        }

        return data;
    } catch (e) {
        console.error(e);
    }
};

const save = (serverItems, deluxeMenu) => {
    try {
        const fileContents = yaml.dump(serverItems);
        fs.writeFileSync("./out/drinks_serveritems.yaml", fileContents, "utf8");
    } catch (e) {
        console.error(e);
    }
};

run();
