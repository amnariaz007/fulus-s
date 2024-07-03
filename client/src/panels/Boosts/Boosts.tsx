import React, {FC, useEffect, useState} from 'react';
import Panel from "../../components/Panel/Panel";
import TelegramBackButton from "../../components/TelegramBackButton/TelegramBackButton";
import Spacing from "../../components/Spacing/Spacing";
import IconText from "../../components/IconText/IconText";
import Container from "../../components/Container/Container";
import CellContainer from "../../components/CellContainer/CellContainer";
import Cell from "../../components/Cell/Cell";
import Img from "../../components/Img/Img";
import Icon16Chevron from "../../assets/icons/Icon16Chevron";
import EmojiRectangle from "../../components/EmojiRectangle/EmojiRectangle";
import {useTranslation} from "react-i18next";
import {fetchData} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {
    DefaultStateType,
    getDispatchObject, REDUCE_GOLD,
    REDUCE_ROCKET, SET_AUTOCLICK_ENT_TIME,
    SET_DAILY_ENERGY,
    SET_GOLD_PER_CLICK, SET_RECHARGING_ENERGY_PER_SECOND, SET_USDT
} from "../../store/reducer";
import {Skeleton} from "@nextui-org/react";
import useModal from "../../hooks/useModal";
import {MODAL_BOOST_BUY_CONFIRM, MODAL_BOOST_ENERGY, MODAL_BOOST_TAP_BOT} from "../../routes";
import {getTG, getUnixTime} from "../../utils/utils";
import BackgroundGlow from "../../components/BackgroundGlow/BackgroundGlow";
import Placeholder from "../../components/Placeholder/Placeholder";
import {formatNumberWithSpaces} from "../../utils/mathUtils";

// @ts-ignore
const tg = window['Telegram'].WebApp;

const Boosts: FC = () => {

    const [loadingBoosts, setLoadingBoosts] = useState(false);
    const [boosts, setBoosts] = useState<any>(null);

    const { t } = useTranslation();
    const {activeModal, setActiveModal} = useModal();

    const gold = useSelector((selector: DefaultStateType) => selector.gold);
    const autoclickEndTime = useSelector((selector: DefaultStateType) => selector.autoclickEndTime);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchBoosts().then();
    }, []);

    const fetchBoosts = async () => {
        setLoadingBoosts(true);

        const response = await fetchData('/boosts/get');
        console.log(response)

        if (response.error) {
            return;
        }

        setBoosts(response.result)
        setLoadingBoosts(false);
    }

    const buy = async (boost: any) => {
        const response = await fetchData('/boosts/buy', {
            boost: boost.id,
        });

        if (response.error) {
            return;
        }

        const result = response.result

        if (result['newGoldPerClick']) {
            dispatch(getDispatchObject(SET_GOLD_PER_CLICK, result['newGoldPerClick']));
        }

        if (result['dailyEnergy']) {
            dispatch(getDispatchObject(SET_DAILY_ENERGY, result['dailyEnergy']));
        }

        if (result['rechargingEnergy']) {
            dispatch(getDispatchObject(SET_RECHARGING_ENERGY_PER_SECOND, result['rechargingEnergy']));
        }

        dispatch(getDispatchObject(REDUCE_GOLD, boost['updateCost']));
        fetchBoosts().then();

        console.log(response)
    }

    const confirm = async (boost: any) => {
        if (boost.id === 'tapbot') {
            //await buyAutoclick(boost);
            setActiveModal(MODAL_BOOST_TAP_BOT);
            return;
        }

        if (boost['updateCost'] === -1 || gold === null) {
            return;
        }

        if (boost['updateCost'] > gold) {
            tg.showAlert(t('boostsNotEnoughROCKETError'), () => {})
            return;
        }

        tg.showPopup({
            title: t('boostsConfirmTitle'),
            message: t('boostsConfirmText'),
            buttons: [
                {
                    id: 'confirm',
                    type: 'default',
                    text: t('boostsConfirmButton')
                },
                {
                    id: 'cancel',
                    type: 'cancel',
                    text: t('boostsConfirmCancelButton')
                },
            ],
        }, (id: string) => {
            if (id === 'confirm') {
                buy(boost);
            }
        });
    }

    return (
        <Panel>
            <TelegramBackButton />

            <BackgroundGlow
                color1="rgba(8, 18, 29, 0)"
                color2="rgba(97, 2, 253, .5)"
                vertical="top"
            />

            <Placeholder title={t("boostsSubtitle")} />

            <Spacing size={32} />

            <CellContainer>
                {loadingBoosts && (
                    <Skeleton
                        style={{
                            width: '100%',
                            height: 48,
                            borderRadius: 16
                        }}
                    />
                )}

                {!loadingBoosts && boosts !== null && boosts.map((boost: any, index: number) => (
                    <Cell
                        key={index}
                        title={boost.name}
                        after={<Icon16Chevron />}
                        onClick={() => confirm(boost)}
                        before={
                            <EmojiRectangle>
                                <Img src={require(`../../assets/images/emoji/${boost.emoji}.png`)} />
                            </EmojiRectangle>
                        }
                    >
                        {boost['id'] !== 'tapbot' && (
                            <>
                                {boost['updateCost'] !== -1 && (
                                    <>
                                        <IconText
                                            size="small"
                                            imgPath={require('../../assets/images/coins/rocket_coin_back_36x36.png')}
                                            text={`${formatNumberWithSpaces(boost['updateCost'])}`}
                                            textColor="#CFCFCF"
                                        />
                                        {/*<div>·</div>*/}
                                    </>
                                )}

                                <div>{boost['level']} lvl</div>
                            </>
                        )}
                    </Cell>
                ))}
            </CellContainer>
        </Panel>
    );
};

export default Boosts;