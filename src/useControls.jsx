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

    useEffect(() => {

        if (!vehicalApi || !chassicApi) return;

        if (controls.w){
            vehicalApi.applyEngineForce(50, 0);
            vehicalApi.applyEngineForce(50, 1);
        } else if (controls.s) {
            vehicalApi.applyEngineForce(-50, 0);
            vehicalApi.applyEngineForce(-50, 1);
        } else {
            vehicalApi.applyEngineForce(0, 0);
            vehicalApi.applyEngineForce(0, 1);
        }

        if (controls.a){
            vehicalApi.setSteeringValue(0.35, 2);
            vehicalApi.setSteeringValue(0.35, 3);
        } else if (controls.d) {
            vehicalApi.setSteeringValue(-0.35, 2);
            vehicalApi.setSteeringValue(-0.35, 3);
        } else {
            for(let i = 0; i < 4; i++) {
                vehicalApi.setSteeringValue(0, i);
            }
        }

        if (controls.x) {
            vehicalApi.setBrake(80, 0);
            vehicalApi.setBrake(80, 1);
        } else {
            vehicalApi.setBrake(0, 0);
            vehicalApi.setBrake(0, 1);
        }

        if (controls.r) {
            chassicApi.position.set(-1.5, 0.5, 3);
            chassicApi.rotation.set(0, 0, 0);
            chassicApi.velocity.set(0, 0, 0);
            chassicApi.angularVelocity.set(0, 0, 0);
        }

    }, [controls]);

    return controls;

}