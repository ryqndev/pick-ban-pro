const BLUE_SIDE_PICKS = new Set([0, 2, 4, 6, 9, 10, 13, 15, 17, 18]);
const RED_SIDE_PICKS = new Set([1, 3, 5, 7, 8, 11, 12, 14, 16, 19]);
const PICKS = new Set([6, 7, 8, 9, 10, 11, 16, 17, 18, 19]);

const LPL_SPRING_2021_FINALS_GAME_1 = ["Alistar", "Thresh", "Lucian", "TahmKench", "Kaisa", "Rell", "Hecarim", "Jayce", "Tristana", "Xayah", "Irelia", "Udyr", "Rakan", "TwistedFate", "Leona", "Azir", "Nautilus", "Galio", "Orianna", "Viktor"	];
const LPL_SPRING_2021_FINALS_GAME_1_STRING = '9ks-529r34ae2koue9u-u5h-anho1wvo2dnf1b5k';

const editArrayAtIndex = (array, index, item) => {
    let newArray = [...array];
    newArray[index] = item;
    return newArray;
}
/**
 * Draft data string
 * Format:
 * [picks and bans in order]=[current pick # (optional)]
 * Example:
 * 9ks-529r34ae2koue9u-u5h-anho1wvo2dnf1b5k=20
 * 
 * Current pick # can be omitted if draft string is a complete draft
 * which will result in currentpick being max
 * 
 * If draft string is incomplete, the currentpick will be appended to
 * the end like so
 * "=16"
 * 
 * The way picks and bans are denoted in the data string is simply
 * the champion keys given by the riot api which are currently
 * somewhere between 1-900 concatenated by groups of two converted 
 * to base36. groups with less than 4 characters appended by hypens ('-')
 * to keep groups in chunks of 4 characters.
 * 
 * Converting to base36 saves 1 character per champ, reducing the string
 * length from 60 -> 40
*/


/**
 * @function draftStringParser
 * 1. Splits string by sections of 4
 * 2. Filters empty strings out from the split function
 * 3. Decodes every section of 4 by converting to base 10 from base36
 * 4. Flattens the array because every chunk represents 2 picks
 * 5. Map ID's to champs
 * 
 * Algorithm is inefficient by design and values readability over 
 * loop efficiency - which there barely is any since there are a maximum 
 * of 20 items in the array
 */
const parseDraftString = (draftString, championsList) => {
    if(!draftString || draftString.length === 0) return new Array(20).fill(null);

    const championKeyMap = {}
    for(let name in championsList) championKeyMap[championsList[name].key] = name;

    const getChampNameFromKey = key => championKeyMap[key];
    return draftString.toLowerCase().split('=')[0].split(/(.{4})/)
        .filter(e => e.length !== 0)
        .map(decode)
        .flat()
        .map(getChampNameFromKey);
}

const parseCurrentPick = (draftString) => {
    const [draft, pick] = draftString.split('=');
    return !pick ? draft.length / 2 : pick;
}

const encode = (num) => {
    let encoded = num.toString(36);
    return encoded + '-'.repeat(4 - encoded.length)
}
const decode = (chunk) => {
    let pickChunk = parseInt(stripEnd(chunk), 36)
    return [parseInt(pickChunk / 1000), parseInt(pickChunk % 1000)];
}
const stripEnd = (str, delimiter='') => {
    let end = str.length - 1;
    while(str.charAt(end) === delimiter) end--;
    return str.substring(0, end + 1);
}

export {
    PICKS,
    BLUE_SIDE_PICKS,
    RED_SIDE_PICKS,
    parseDraftString,
    parseCurrentPick,
    editArrayAtIndex,
    LPL_SPRING_2021_FINALS_GAME_1
}