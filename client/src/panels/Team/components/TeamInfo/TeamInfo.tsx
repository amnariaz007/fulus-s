import React, {FC} from 'react';
import './TeamInfo.css';
import {formatNumberShort, formatNumberWithSpaces} from "../../../../utils/mathUtils";
import IconText from "../../../../components/IconText/IconText";
import {Button} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import {fetchData} from "../../../../utils/api";
import {getDispatchObject, SET_TEAM, TeamType} from "../../../../store/reducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ROUTE_TEAM_SETTINGS} from "../../../../routes";
import {copyText} from "../../../../utils/utils";

// @ts-ignore
const tg = window["Telegram"]['WebApp'];

interface TeamInfoProps {
    id: number
    gold: number
    players: number
    role: 'guest' | 'member' | 'admin'
    onJoin: () => void
    onLeave: () => void
}

const TeamInfo: FC<TeamInfoProps> = ({ id, gold, players, role, onJoin, onLeave }) => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const join = async () => {
        const response = await fetchData(
            '/team/join',
            { id }
        );

        if (response.error) {
            return;
        }

        onJoin();
    }

    const leave = async () => {
        const response = await fetchData(
            '/team/leave',
            { id }
        );

        if (response.error) {
            return;
        }

        onLeave();
    }

    const invite = () => {
        const link = `${process.env.REACT_APP_TELEGRAM_BOT_URL}?start=t_${tg['initDataUnsafe']['user']['id']}_${id}`
        copyText(link);
    }

    return (
        <div className="TeamInfo--container">
            <div className="TeamInfo--info">
                <div className="TeamInfo--info--left">
                    <IconText
                        size='specialTeam'
                        imgPath={require('../../../../assets/images/coins/rocket_coin_back_100x100.png')}
                        text={formatNumberShort(gold)}
                    />

                    <p className="TeamInfo--caption">{t('teamGold')}</p>
                </div>

                <div className="TeamInfo--separator"/>

                <div className="TeamInfo--info--right">
                    <p className="TeamInfo--info--right--title">
                        {formatNumberWithSpaces(players)}
                    </p>
                    <p className="TeamInfo--caption">{t('teamPlayers')}</p>
                </div>
            </div>

            <div className="TeamInfo--actions">
                {role === 'guest' && (
                    <Button
                        size="lg"
                        onClick={join}
                        color="primary"
                        fullWidth
                    >
                        {t('teamJoin')}
                    </Button>
                )}

                {role === 'member' && (
                    <Button
                        size="lg"
                        onClick={leave}
                        color="secondary"
                        fullWidth
                    >
                        {t('teamLeave')}
                    </Button>
                )}

                {role === 'admin' && (
                    <Button
                        size="lg"
                        onClick={() => navigate(ROUTE_TEAM_SETTINGS)}
                        color="secondary"
                        fullWidth
                    >
                        {t('teamSettings')}
                    </Button>
                )}

                {['member', 'admin'].includes(role) && (
                    <Button
                        size="lg"
                        onClick={invite}
                        color="primary"
                        fullWidth
                        style={{ marginTop: 16 }}
                    >
                        {t('teamInvite')}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default TeamInfo;