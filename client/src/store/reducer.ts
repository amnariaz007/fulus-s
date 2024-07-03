export interface TeamUserType {
    image: string
    name: string
    gold: number
}

export interface TeamType {
    id: number
    image: string
    name: string
    gold: number
    usersCount: number
    topUsers: TeamUserType[]
    role: 'member' | 'admin' | 'guest'
    link?: string
}

export type LevelType = 'wood'|
    'bronze'|
    'silver'|
    'gold'|
    'platinum'|
    'diamond'|
    'master'|
    'grandmaster'|
    'elite'|
    'legendary'|
    'mythic'

export interface DefaultStateType {
    screenPopup: null | 'connection' | 'unSupportPlatform' | 'manyConnections'
    activeModal: null | string
    activeModalParams: null | string | number | object

    // null - не загружено, no - не состоит в команде
    team: null | 'no' | TeamType

    level: null | LevelType
    gold: null | number
    usdt: null | number
    autoclickEndTime: null | number
    rocket: null | number
    energyLeft: null | number
    dailyEnergy: null | number
    rechargingEnergyPerSecond: null | number
    goldPerClick: null | number
}

const defaultState: DefaultStateType = {
    screenPopup: 'connection',
    activeModal: null,
    activeModalParams: null,

    team: null,

    level: null,
    gold: null,
    usdt: null,
    autoclickEndTime: null,
    rocket: null,
    energyLeft: null,
    dailyEnergy: null,
    rechargingEnergyPerSecond: null,
    goldPerClick: null,
};

export type ActionType = {
    type: string
    payload: any
}

export const SET_SCREEN_POPUP = "SET_SCREEN_POPUP";
export const SET_ACTIVE_MODAL = "SET_ACTIVE_MODAL";
export const SET_ACTIVE_MODAL_PARAMS = "SET_ACTIVE_MODAL_PARAMS";

export const SET_TEAM = "SET_TEAM";

export const SET_LEVEL = "SET_LEVEL";
export const SET_GOLD = "SET_GOLD";
export const SET_USDT = "SET_USDT";
export const ADD_GOLD = "ADD_GOLD";
export const REDUCE_GOLD = "REDUCE_GOLD";
export const SET_ROCKET = "SET_ROCKET";
export const ADD_ROCKET = "ADD_ROCKET";
export const REDUCE_ROCKET = "REDUCE_ROCKET";
export const SET_ENERGY_LEFT = "SET_ENERGY_LEFT";
export const SET_DAILY_ENERGY = "SET_DAILY_ENERGY";
export const REDUCE_ENERGY_LEFT = "REDUCE_ENERGY_LEFT";
export const SET_GOLD_PER_CLICK = "SET_GOLD_PER_CLICK";
export const SET_AUTOCLICK_ENT_TIME = "SET_AUTOCLICK_ENT_TIME";
export const SET_RECHARGING_ENERGY_PER_SECOND = "SET_RECHARGING_ENERGY_PER_SECOND";

export const reducer = (state = defaultState, action: ActionType) => {
    const payload = action.payload;

    switch (action.type) {
        case SET_SCREEN_POPUP:
            return {...state, screenPopup: payload};

        case SET_ACTIVE_MODAL:
            return {...state, activeModal: payload};

        case SET_ACTIVE_MODAL_PARAMS:
            return {...state, activeModalParams: payload};

        case SET_TEAM:
            return {...state, team: payload};

        case SET_LEVEL:
            return {...state, level: payload};

        case SET_GOLD:
            return {...state, gold: payload};

        case SET_USDT:
            return {...state, usdt: payload};

        case ADD_GOLD:
            if (state.gold === null) {
                return {...state};
            }

            return {...state, gold: state.gold + Number(payload)};

        case REDUCE_GOLD:
            if (state.gold === null) {
                return {...state};
            }

            return {...state, gold: state.gold - Number(payload)};

        case SET_ROCKET:
            return {...state, rocket: payload};

        case ADD_ROCKET:
            if (state.rocket === null) {
                return {...state};
            }

            return {...state, rocket: state.rocket + Number(payload)};

        case REDUCE_ROCKET:
            if (state.rocket === null) {
                return {...state};
            }

            return {...state, rocket: state.rocket - Number(payload)};

        case SET_ENERGY_LEFT:
            return {...state, energyLeft: payload};

        case SET_DAILY_ENERGY:
            return {...state, dailyEnergy: payload};

        case SET_AUTOCLICK_ENT_TIME:
            return {...state, autoclickEndTime: payload};

        case REDUCE_ENERGY_LEFT:
            if (state.energyLeft === null) {
                return {...state};
            }

            return {...state, energyLeft: state.energyLeft - Number(payload)};

        case SET_GOLD_PER_CLICK:
            return {...state, goldPerClick: payload};

        case SET_RECHARGING_ENERGY_PER_SECOND:
            return {...state, rechargingEnergyPerSecond: payload};

        default:
            return state;
    }
}

export const getDispatchObject = (type: string, payload: any) => {
    return {type, payload};
}