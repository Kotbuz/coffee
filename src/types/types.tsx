export type CoffeeState = {
    water: number;
    beans: number;
    isBreawing: boolean;
}

export type CoffeeAction =
    | { type: 'ADD_WATER'; payload: number }
    | { type: 'ADD_BEANS'; payload: number }
    | { type: 'START_BREWING' }
    | { type: 'FINISH_BREWING' };

export const initialState: CoffeeState = {
    water: 1488,
    beans: 288,
    isBreawing: false
};

export const MAX_WATER = 6767;
export const MAX_BEANS = 1337;

export function coffeeReducer(state: CoffeeState, action: CoffeeAction) {
    switch (action.type) {
        case 'ADD_WATER':
            return { ...state, water: Math.min(MAX_WATER, state.water + action.payload) }
        case 'ADD_BEANS':
            return { ...state, beans: Math.min(MAX_BEANS, state.beans + action.payload) }
        case 'START_BREWING':
            if (state.water < 200 || state.beans < 20 || state.isBreawing) return state
            return { ...state, isBreawing: true }
        case 'FINISH_BREWING':
            return {
                ...state, water: Math.max(0, state.water - 200),
                beans: Math.max(0, state.beans - 20),
                isBrewing: false
            }
        default:
            return state;

    }
}
