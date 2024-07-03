const LEVELS = {
    0: 'wood',
    1: 'bronze',
    2: 'silver',
    3: 'gold',
    4: 'platinum',
    5: 'diamond',
    6: 'master',
    7: 'grandmaster',
    8: 'elite',
    9: 'legendary',
    10: 'mythic',
};

export const getLevelById = (id) => {
    return LEVELS[id] ?? 'noLevel'
}

const GOLD_LEVELS = [
    { min: 0, max: 15000, level: 0 },
    { min: 15000, max: 30000, level: 1 },
    { min: 30000, max: 100000, level: 2 },
    { min: 100000, max: 250000, level: 3 },
    { min: 250000, max: 500000, level: 4 },
    { min: 500000, max: 9999999999999999, level: 5 },
];

export const getNewLevelByGold = (gold) => {
    const result = GOLD_LEVELS.filter((item) => gold >= item.min && gold < item.max);
    return result[0].level ?? 5;
}