import convert from "color-convert";

const ACCENT_COLOR = "aqua";

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

export default toServerItem;
