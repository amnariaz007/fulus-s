import {FC, useEffect, useState} from 'react';
import './CoinButton.css';
import {useDispatch, useSelector} from "react-redux";
import {ADD_GOLD, DefaultStateType, getDispatchObject, REDUCE_ENERGY_LEFT, SET_GOLD} from "../../../../store/reducer";
import {socket} from "../../../../utils/socket";
import {getUnixTime} from "../../../../utils/utils";

interface CoinButtonProps {

}

const CoinButton: FC<CoinButtonProps> = ({}) => {

    // animation
    const [clickDigits, setClickDigits] = useState<any>([]);

    // количество кликов. когда достигает 10 - отправляется пачкой на сервер и обнуляется
    const [clicksStack, setClicksStack] = useState(0);

    const goldPerClick = useSelector((selector: DefaultStateType) => selector.goldPerClick);
    const energyLeft = useSelector((selector: DefaultStateType) => selector.energyLeft);
    const autoclickEndTime = useSelector((selector: DefaultStateType) => selector.autoclickEndTime);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (clicksStack > 0) {
                sendToServer();
            }
        }
    }, []);

    useEffect(() => {
        if (clicksStack >= 20) {
            sendToServer();
        }
    }, [clicksStack]);

    useEffect(() => {
        const timerId = setInterval(() => {
            if (autoclickEndTime === null) {
                return;
            }

            if (autoclickEndTime <= getUnixTime()) {
                return;
            }

            click();
        }, 1000);

        return () => clearInterval(timerId);
    }, [autoclickEndTime]);

    const sendToServer = () => {
        socket.emit('CLICKS', { count: clicksStack })
        setClicksStack(0);
    }

    const click = (event?: any) => {
        if (goldPerClick === null) {
            return;
        }

        if (energyLeft !== null && energyLeft < 1) {
            // todo
            if (clicksStack > 0) {
                sendToServer();
            }
            return;
        }

        if (event) {
            clickAnimation(event);
        }

        dispatch(getDispatchObject(ADD_GOLD, goldPerClick));
        dispatch(getDispatchObject(REDUCE_ENERGY_LEFT, goldPerClick));
        setClicksStack((count) => count + 1);
    }

    const clickAnimation = (event: any) => {
        let allClickDigits = [...clickDigits];
        if (allClickDigits.length > 50) {
            allClickDigits = allClickDigits.slice(40);
        }

        const cd = {
            //x: event.clientX,
            x: event.touches[0].clientX,
            //y: event.clientY,
            y: event.touches[0].clientY,
            id: Math.random().toString(36),
        };

        allClickDigits.push(cd);

        setClickDigits(() => allClickDigits);
    }

    return (
        <div className="CoinButton--container">
            <div
                onTouchStart={click}
                className="CoinButton--content"
            />

            <div className="CoinButton--digits--container">
                {clickDigits.map((digit: any) => (
                    <p
                        key={digit.id}
                        style={{
                            top: digit.y,
                            left: digit.x,
                        }}
                    >
                        {goldPerClick}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default CoinButton;