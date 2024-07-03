import React, {FC, useEffect, useState} from 'react';
import Panel from "../../components/Panel/Panel";
import TelegramBackButton from "../../components/TelegramBackButton/TelegramBackButton";
import TeamHeader from "./components/TeamHeader/TeamHeader";
import TeamInfo from "./components/TeamInfo/TeamInfo";
import Spacing from "../../components/Spacing/Spacing";
import CellContainer from "../../components/CellContainer/CellContainer";
import Cell from "../../components/Cell/Cell";
import Img from "../../components/Img/Img";
import Icon16Chevron from "../../assets/icons/Icon16Chevron";
import {ROUTE_TEAM} from "../../routes";
import IconText from "../../components/IconText/IconText";
import {useDispatch, useSelector} from "react-redux";
import {DefaultStateType, getDispatchObject, SET_TEAM, TeamType} from "../../store/reducer";
import {formatNumberWithSpaces} from "../../utils/mathUtils";
import {fetchData, getImageUrl, getTelegramImageUrl} from "../../utils/api";
import {useTranslation} from "react-i18next";
import LetterAvatar from "../../components/LetterAvatar/LetterAvatar";
import {useLocation, useNavigate} from "react-router-dom";
import {getIdFromPathname} from "../../utils/locationUtils";

const Team: FC = () => {

    const [loading, setLoading] = useState(false);
    const [team, setTeam] = useState<TeamType | null>(null);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const myTeam = useSelector((selector: DefaultStateType) => selector.team);

    const location = useLocation();
    const id = getIdFromPathname(location);

    useEffect(() => {
        fetch().then();
    }, []);

    const fetch = async () => {
        if (myTeam && myTeam !== 'no') {
            setTeam(myTeam);
            return;
        }

        if (id === null) {
            return;
        }

        await fetchTeam(id);
    }

    const fetchTeam = async (teamId: number) => {

        setLoading(true);

        const response = await fetchData(
            '/team/get',
            { id: teamId }
        );

        if (response.error) {
            return;
        }

        setTeam(response.result);
        setLoading(false);

        return response.result;
    }

    const onJoin = async () => {
        if (team === null) {
            return;
        }

        const data = await fetchTeam(team.id);
        dispatch(getDispatchObject(SET_TEAM, data));
    }

    const onLeave = async () => {
        if (team === null) {
            return;
        }

        await fetchTeam(team.id);
        dispatch(getDispatchObject(SET_TEAM, 'no'));
    }

    return (
        <Panel>
            <TelegramBackButton />

            {loading && (
                'loading'
            )}

            {!loading && team && (
                <>
                    <TeamHeader
                        image={team.image ? (
                            <Img
                                src={getImageUrl(team.image)}
                                width={100}
                                height={100}
                                radius={24}
                            />
                        ) : (
                            <LetterAvatar width={100} height={100} />
                        )}
                        name={team.name}
                        link={team.link}
                    />

                    <Spacing size={32} />

                    <TeamInfo
                        id={team.id}
                        gold={team.gold}
                        players={team.usersCount}
                        role={team.role}
                        onJoin={onJoin}
                        onLeave={onLeave}
                    />

                    <Spacing size={16} />

                    <CellContainer>
                        {team.topUsers.map((user, index) => (
                            <Cell
                                key={index}
                                before={<Img src={getTelegramImageUrl(user.image)} />}
                                title={user.name}
                            >
                                <IconText
                                    size="small"
                                    imgPath={require('../../assets/images/coins/rocket_coin_back_36x36.png')}
                                    text={formatNumberWithSpaces(user.gold)}
                                    textColor="var(--gray_light_color)"
                                />
                            </Cell>
                        ))}
                    </CellContainer>
                </>
            )}
        </Panel>
    );
};

export default Team;