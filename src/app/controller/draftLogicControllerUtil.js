const BLUE_SIDE_PICKS = new Set([0, 2, 4, 6, 9, 10, 13, 15, 17, 18]);
const RED_SIDE_PICKS = new Set([1, 3, 5, 7, 8, 11, 12, 14, 16, 19]);
const PICKS = new Set([6, 7, 8, 9, 10, 11, 16, 17, 18, 19]);

const editArrayAtIndex = (array, index, item) => {
    let newArray = [...array];
    newArray[index] = item;
    return newArray;
}



const LPL_SPRING_2021_FINALS_GAME_1 = ["Alistar", "Thresh", "Lucian", "TahmKench", "Kaisa", "Rell", "Hecarim", "Jayce", "Tristana", "Xayah", "Irelia", "Udyr", "Rakan", "TwistedFate", "Leona", "Azir", "Nautilus", "Galio", "Orianna", "Viktor"	];

const draftStringParser = (draftString, championsList) => {

    const exampleDraftString = '9ks-529r34ae2koue9u-u5h-anho1wvo2dnf1b5k';
    // const exampleDraftString = [12412, 236223, 145526, 120126, 18498, 39077, 497004, 89268, 111003, 61112];
    // console.log(exampleDraftString.map(e => convertBase10ToBase36(e)).join('-'));
    // let newarr = exampleDraftString.map(e => {
    //     let champ2 = e % 1000;
    //     let champ1 = parseInt(e / 1000);
    //     return [champ1, champ2];
    // })
    console.log(exampleDraftString.split(/(.{4})/).filter(e => e.length !== 0));
    // console.log(exampleDraftString.map(e => encode(e)).join(''));
    // console.log(newarr.flat());
    // const splitByPicks = exampleDraftString.split('-').map(encodedPicks => convertBase36ToBase10(encodedPicks));

    return new Array(20).fill(null);
    // return LPL_SPRING_2021_FINALS_GAME_1;
}
// 9ks-529r-34ae-2kou-e9u-u5h-anho-1wvo-2dnf-1b5k
// 9ks-529r34ae2kou-e9u-u5hanho1wvo2dnf1b5k
// 5p9xarj-1uuqhsxq-8hx96at-6cbjehmc-1ezscu48
// 7e1cc-3ous6u-1ziptu-88ipet-87wit5-4fmjrv-1b5k

const convertBase10ToBase36 = (base10) => {
    return base10.toString(36);
}
const convertBase36ToBase10 = (base36) => {
    return parseInt(base36, 36);
}
const encode = (num) => {
    let encoded = convertBase10ToBase36(num);
    return encoded + '-'.repeat(4 - encoded.length)
}

export {
    PICKS,
    BLUE_SIDE_PICKS,
    RED_SIDE_PICKS,
    draftStringParser,
    editArrayAtIndex,
    LPL_SPRING_2021_FINALS_GAME_1
}