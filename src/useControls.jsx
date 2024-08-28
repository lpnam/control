import { useState, useEffect } from "react"

export const useControls = (vehicalApi, chassicApi) => {
    let [controls, setControls] = useState({});

    useEffect(() => {
        const keyDownPressHandle = (e) => {
            setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
            console.log(controls);
        }
        const keyUpPressHandle = (e) => {
            setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
        }

        window.addEventListener('keydown', keyDownPressHandle);
        window.addEventListener('keyup', keyUpPressHandle);

        return () => {
            window.removeEventListener('keydown', keyDownPressHandle);
            window.removeEventListener('keyup', keyUpPressHandle);
        }
    });


}