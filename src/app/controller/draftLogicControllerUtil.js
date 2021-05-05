const BLUE_SIDE_PICKS = new Set([0, 2, 4, 6, 9, 10, 13, 15, 17, 18]);
const RED_SIDE_PICKS = new Set([1, 3, 5, 7, 8, 11, 12, 14, 16, 19]);

const editArrayAtIndex = (array, index, item) => {
    let newArray = [...array];
    newArray[index] = item;
    return newArray;
}

const LPL_SPRING_2021_FINALS_GAME_1 = ["Alistar", "Thresh", "Lucian", "TahmKench", "Kaisa", "Rell", "Hecarim", "Jayce", "Tristana", "Xayah", "Irelia", "Udyr", "Rakan", "TwistedFate", "Leona", "Azir", "Nautilus", "Galio", "Orianna", "Viktor"	];

export {
    BLUE_SIDE_PICKS,
    RED_SIDE_PICKS,
    editArrayAtIndex,
    LPL_SPRING_2021_FINALS_GAME_1
}