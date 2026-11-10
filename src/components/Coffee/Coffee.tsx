import { useReducer, useEffect } from "react";
import {
    coffeeReducer,
    initialState,
    MAX_WATER,
    MAX_BEANS,
    type CoffeeAction
} from "../../types/types";
import styles from "./Coffee.module.css"

export default function Coffee() {
    const [state, dispatch] = useReducer(coffeeReducer, initialState);
    useEffect(() => {
        if (!state.isBreawing) return;
        const timer = setTimeout(() => {
            dispatch({ type: 'FINISH_BREWING' });
            alert('Кофе готов!');
        }, 3000);
        return () => clearTimeout(timer);

    }, [state.isBreawing]);

    const waterPercentage = (state.water / MAX_WATER) * 100;
    const canBrew = state.water >= 200 && state.beans >= 20 && !state.isBreawing;
    const send = (action: CoffeeAction) => dispatch(action);
    return (
        <div className="{styles.machine}">
            <h2 className="{styles.title}">☕Кофемашина</h2>
            {/* индикатор воды*/}
            <div className="{styles.indicator}">
                <div className="{styles.waterLabel}">
                    Вода: {state.water} мл ({waterPercentage.toFixed(0)}%)
                </div>
                <div className="{styles.waterFill}" style={{ height: `${waterPercentage}` }}>

                </div>
                <div className="{styles.stats}">
                    <span>Вода: {state.water} Мл</span>
                    <span>Зёрна: {state.beans} Гр</span>
                </div>
                <div className="{styles.buttons}">
                    <button className="{styles.btn}"
                        onClick={() => send({ type: "ADD_WATER", payload: 200 })}
                        disabled={state.isBreawing || state.water >= MAX_WATER}>+200мл воды
                    </button>

                    <button className="{styles.btn}"
                        onClick={() => send({ type: "ADD_BEANS", payload: 20 })}
                        disabled={state.isBreawing || state.beans >= MAX_BEANS}>+20гр==гр зёрен
                    </button>
                    <button className={`${styles.btn} ${styles.brewBtn}`}
                        onClick={() => send({ type: 'START_BREWING' })}
                        disabled={!canBrew}
                    >
                        {state.isBreawing ? 'Готовим...' : 'Сварить кофе'}
                    </button>
                </div>
            </div>
        </div>
    );
}
