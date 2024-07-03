export const BOOSTS = {
    multiclick: {
        id: 'multiclick',
        name: 'Multitap',
        emoji: 'finger_1',
        currency: 'gold',
        effect: {
            field: 'goldPerClick',
            addCount: 1,
        },
        levels: {
            1: { cost: 250 },
            2: { cost: 500 },
            3: { cost: 1000 },
            4: { cost: 2000 },
            5: { cost: 4000 },
            6: { cost: 8000 },
            7: { cost: 16000 },
            8: { cost: 32000 },
            9: { cost: 64000 },
            10: { cost: 128000 },
        },
    },

    energy: {
        id: 'energy',
        name: 'Energy limit',
        emoji: 'lightning',
        currency: 'gold',
        effect: {
            field: 'dailyEnergy',
            addCount: 500,
        },
        levels: {
            1: { cost: 250 },
            2: { cost: 500 },
            3: { cost: 1000 },
            4: { cost: 2000 },
            5: { cost: 4000 },
            6: { cost: 8000 },
            7: { cost: 16000 },
            8: { cost: 32000 },
            9: { cost: 64000 },
            10: { cost: 128000 },
        },
    },

    recharging: {
        id: 'recharging',
        name: 'Recharging speed',
        emoji: 'watch',
        currency: 'gold',
        effect: {
            field: 'rechargingEnergyPerSecond',
            addCount: 1,
        },
        levels: {
            1: { cost: 2000 },
            2: { cost: 10000 },
            3: { cost: 100000 },
            4: { cost: 300000 },
            5: { cost: 500000 },
            6: { cost: 1e6 },
            7: { cost: 2e6 },
        },
    },

    tapbot: {
        id: 'tapbot',
        name: 'Tap Bot',
        emoji: 'robot',
        currency: 'gold',
    },
};