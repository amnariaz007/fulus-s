import React, {FC} from 'react';
import Tab from "../Tab/Tab";
import Img from "../../../../components/Img/Img";
import Tabbar from "../Tabbar/Tabbar";
import {useNavigate} from "react-router-dom";
import {ROUTE_BALANCE, ROUTE_BOOSTS, ROUTE_FRIENDS, ROUTE_STATISTICS, ROUTE_TASKS} from "../../../../routes";
import {useTranslation} from "react-i18next";

interface NavigationProps {

}

const Navigation: FC<NavigationProps> = ({}) => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Tabbar>
            <Tab
                icon={<Img radius={0} src={require('../../../../assets/images/emoji/rocket.png')} />}
                name={t('navbarBoosts')}
                onClick={() => navigate(ROUTE_BOOSTS)}
            />
            <Tab
                icon={<Img radius={0} src={require('../../../../assets/images/emoji/suitcase.png')} />}
                name={t('navbarTasks')}
                onClick={() => navigate(ROUTE_TASKS)}
            />
            <Tab
                icon={<Img radius={0} src={require('../../../../assets/images/emoji/users_1.png')} />}
                name={t('navbarFriends')}
                onClick={() => navigate(ROUTE_FRIENDS)}
            />
            <Tab
                icon={<Img radius={0} src={require('../../../../assets/images/emoji/graphic.png')} />}
                name={t('navbarStatistics')}
                onClick={() => navigate(ROUTE_STATISTICS)}
            />
            <Tab
                icon={<Img radius={0} src={require('../../../../assets/images/emoji/money.png')} />}
                name={t('navbarBalance')}
                onClick={() => navigate(ROUTE_BALANCE)}
            />
        </Tabbar>
    );
};

export default Navigation;