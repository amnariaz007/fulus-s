import React, {FC, useEffect, useState} from 'react';
import Panel from "../../components/Panel/Panel";
import TelegramBackButton from "../../components/TelegramBackButton/TelegramBackButton";
import IconText from "../../components/IconText/IconText";
import Spacing from "../../components/Spacing/Spacing";
import GoldRocketSwap from "./components/GoldRocketSwap/GoldRocketSwap";
import Div from "../../components/Div/Div";
import {Button} from "@nextui-org/react";
import {ROUTE_CREATE_TEAM} from "../../routes";
import BottomLayout from "../../components/BottomLayout/BottomLayout";
import {useDispatch, useSelector} from "react-redux";
import {ADD_ROCKET, DefaultStateType, getDispatchObject, REDUCE_GOLD, SET_USDT} from "../../store/reducer";
import {useTranslation} from "react-i18next";
import {fetchData} from "../../utils/api";

const GoldSwap: FC = () => {

    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [exchangeRateLoading, setExchangeRateLoading] = useState(false);

    const [rocketInput, setRocketInput] = useState("");

    const { t } = useTranslation();

    const rocket = useSelector((selector: DefaultStateType) => selector.rocket);
    const usdt = useSelector((selector: DefaultStateType) => selector.usdt);
    const gold = useSelector((selector: DefaultStateType) => selector.gold);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchExchangeRate().then();
    }, []);

    const changeRocketInput = (event: any) => {
        const value = event.target.value;
        if (String(value).includes('.') || String(value).includes(',')) {
            return;
        }

        if (value.length > 5) {
            return;
        }

        if (Number(value) < 0) {
            return;
        }

        setRocketInput(value !== '' ? String(Math.floor(Number(value))) : value);
    }

    const fetchExchangeRate = async () => {
        /*setExchangeRateLoading(true);
        setExchangeRate(500000);
        setExchangeRateLoading(false);*/

        const response = await fetchData('/exchange/getRate');
        if (response.error) {
            return;
        }

        setExchangeRate(response.result['goldPerUSDT']);
    }

    const swap = async () => {
        // @ts-ignore
        const tg = window['Telegram'].WebApp;

        if (gold === null || exchangeRate === null || usdt === null) {
            return;
        }

        const rocketCount = Number(rocketInput)

        if (rocketCount < 1) {
            tg.showAlert(t('swapMinimum1ROCKETError'));
            return;
        }

        if (rocketCount > 99999) {
            return;
        }

        const needGold = Number(rocketCount * exchangeRate);
        if (needGold > gold) {
            tg.showAlert(t('swapNotEnoughGoldError'));
            return;
        }

        const response = await fetchData(
            '/exchange/swap',
            { usdtCount: rocketCount }
        );

        if (response.error) {
            tg.showAlert('[Swap] Server return error');
            return;
        }

        dispatch(getDispatchObject(SET_USDT, usdt + rocketCount));
        dispatch(getDispatchObject(REDUCE_GOLD, needGold));
        setRocketInput("");

        // tg.showPopup({ message: t('swapSuccessAlert') })
        tg.showAlert(t('swapSuccessAlert'));
    }

    return (
        <Panel>
            <TelegramBackButton />

            <Spacing size="15vh" />

            <IconText
                size="large"
                imgPath={require('../../assets/images/coins/rocket_coin_back_100x100.png')}
                text={`${gold}`}
                stretched
            />

            <Spacing size={16} />

            <IconText
                size="medium"
                imgPath={require('../../assets/images/coins/usdt.png')}
                text={`${usdt} USDT`}
                stretched
            />

            <Spacing size={50} />
            <GoldRocketSwap
                exchangeRate={exchangeRate}
                changeRocketInputValue={(value) => changeRocketInput(value)}
                rocketInputValue={rocketInput}
            />

            <BottomLayout>
                <Div>
                    <Button
                        size="lg"
                        disabled={exchangeRate === null}
                        color="primary"
                        onClick={swap}
                        fullWidth
                    >
                        {t('swapButton')}
                    </Button>
                </Div>
                <Spacing />
            </BottomLayout>
        </Panel>
    );
};

export default GoldSwap;