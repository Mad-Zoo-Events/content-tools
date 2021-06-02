import defaultMenuItems from "../common/defaultMenuItems.js";
import {numberAsc} from "../utils/sortFunctions.js";

const MENU_WIDTH = 9;
const MAX_PER_ROW = MENU_WIDTH - 2;
const BAR_SIZE = MENU_WIDTH * 4;

const makeBar = (numOfDrinks, numOfShots) => {
    if (numOfDrinks > MAX_PER_ROW || numOfShots > MAX_PER_ROW) {
        throw new Error(`Maximum number of drinks or shots exceeded. Please add at most ${MAX_PER_ROW} each`);
    }

    if (numOfDrinks % 2 === 0 || numOfShots % 2 === 0) {
        throw new Error("Even numbers of drinks or shots currently not supported. Please use an odd number of each");
    }

    const drinksRow = newRow(numOfDrinks, 1);
    const shotsRow = newRow(numOfShots, 2);

    const bar = {
        open_command: "bar",
        open_commands: [
            "[sound] ITEM_BOOK_PAGE_TURN",
            "[sound] BLOCK_NOTE_BLOCK_BELL",
            "[sound] BLOCK_NOTE_BLOCK_SNARE"
        ],
        close_commands: ["[sound] BLOCK_CHEST_CLOSE"],
        size: BAR_SIZE,
        menu_title: "         &9&lBar &0| &8Order Drinks",
        items: defaultMenuItems(BAR_SIZE)
    };

    return {bar, drinksRow, shotsRow};
};

const newRow = (numOfItems, rowNumber) => {
    const row = [];

    const startingPosition = rowNumber * MENU_WIDTH + (MENU_WIDTH - 1) / 2; // center of the 0-indexed rowNumber
    let lastPosition = startingPosition;
    let offset = 1;
    let remaining = numOfItems;

    while (remaining > 0) {
        row.push(lastPosition);

        lastPosition += offset;

        offset < 0
            ? offset--
            : offset++;

        offset *= -1;

        remaining--;
    }

    return row.sort(numberAsc);
};

const generateDrinks = (drinks, shots) => {

};

export default makeBar;
