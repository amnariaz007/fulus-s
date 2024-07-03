import {FC, useEffect} from 'react';
import './BackgroundGlow.css';
import {getTG} from "../../utils/utils";
import {rgba2hex} from "../../utils/mathUtils";

interface BackgroundGlowProps {
    color1: string
    color2: string
    height?: string | number
    vertical: "bottom" | "top"
}

const BackgroundGlow: FC<BackgroundGlowProps> = ({color1, color2, vertical, height = '70vh' }) => {

    useEffect(() => {
        //setTelegramColors();
    }, []);

    const setTelegramColors = () => {
        if (vertical !== 'top') {
            return;
        }

        getTG().setHeaderColor(rgba2hex(color2));
    }

    return (
        <div
            className="BackgroundGlow"
            style={{
                background: `linear-gradient(to bottom, ${color2}, ${color1})`,
                [vertical]: 0,
            }}
        />
    );
};

export default BackgroundGlow;