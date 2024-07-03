import {LevelType} from "../store/reducer";

const LEVELS = {
    wood: {
        name: 'Wood',
        icon: 'wood',
        glowColor: "#573729",
        nextLevelGold: 15000,
    },
    bronze: {
        name: 'Bronze',
        icon: 'bronze',
        glowColor: "#6C3726",
        nextLevelGold: 30000,
    },
    silver: {
        name: 'Silver',
        icon: 'silver',
        glowColor: "#566A78",
        nextLevelGold: 100000,
    },
    gold: {
        name: 'Gold',
        icon: 'gold',
        glowColor: "#463716",
        nextLevelGold: 250000,
    },
    platinum: {
        name: 'Platinum',
        icon: 'platinum',
        glowColor: "#475575",
        nextLevelGold: 500000,
    },
    diamond: {
        name: 'Diamond',
        icon: 'diamond',
        glowColor: "#8875B4",
        nextLevelGold: 999999999,
    },
    master: {
        name: 'Master',
        icon: 'master',
        glowColor: "#5E342A",
        nextLevelGold: 15000,
    },
    grandmaster: {
        name: 'Grandmaster',
        icon: 'grandmaster',
        glowColor: "#374554",
        nextLevelGold: 15000,
    },
    elite: {
        name: 'Elite',
        icon: 'elite',
        glowColor: "#475580",
        nextLevelGold: 15000,
    },
    legendary: {
        name: 'Legendary',
        icon: 'legendary',
        glowColor: "#7C7FC3",
        nextLevelGold: 15000,
    },
    mythic: {
        name: 'Mythic',
        icon: 'mythic',
        glowColor: "#0297B4",
        nextLevelGold: 15000,
    },
};

export const convertLevelIdToLevel = (levelId: LevelType) => {
    return LEVELS[levelId];
}