import fs from "fs";
import yaml from "js-yaml";
import toServerItem from "./toServerItem.js";

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
