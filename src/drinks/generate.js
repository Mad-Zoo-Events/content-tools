import fs from "fs";
import yaml from "js-yaml";
import makeBar from "./makeBar.js";
import toBarItem from "./toBarItem.js";
import toServerItem from "./toServerItem.js";

const run = () => {
    const {drinks, shots} = load();

    const {bar, drinksRow, shotsRow} = makeBar(drinks.length, shots.length);

    const serverItems = {};

    drinks.forEach((drink, index) => {
        const id = "DRINK_" + drink.name.replace(/\s/g, "");
        serverItems[id] = toServerItem(drink, false);
        bar.items[id] = toBarItem(drink, false, id, index, drinksRow.shift());
    });

    shots.forEach((shot, index) => {
        const id = "SHOT_" + shot.name.replace(/\s/g, "");
        serverItems[id] = toServerItem(shot, true);
        bar.items[id] = toBarItem(shot, true, id, index, shotsRow.shift());
    });

    save(serverItems, bar);

    console.log(`Generated ${drinks.length} drinks and ${shots.length} shots`);
};

const load = () => {
    try {
        const fileContents = fs.readFileSync("./input/drinks.yml", "utf8");
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
        fs.writeFileSync("./out/drinks_serveritems.yml", fileContents, "utf8");
    } catch (e) {
        console.error(e);
    }

    try {
        const fileContents = yaml.dump(deluxeMenu);
        fs.writeFileSync("./out/bar.yml", fileContents, "utf8");
    } catch (e) {
        console.error(e);
    }
};

run();
