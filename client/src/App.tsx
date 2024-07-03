import React, {FC, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./panels/Home/Home";
import Teams from "./panels/Teams/Teams";
import {ROUTE_ADMIN, ROUTE_BALANCE, ROUTE_BOOSTS, ROUTE_CREATE_TEAM, ROUTE_FRIENDS, ROUTE_FRIENDS_BONUS, ROUTE_GOLD_SWAP, ROUTE_HOME, ROUTE_LEAGUE, ROUTE_STATISTICS, ROUTE_TASKS, ROUTE_TEAM, ROUTE_TEAM_SETTINGS, ROUTE_TEAMS, ROUTE_WITHDRAWAL} from "./routes";
import CreateTeam from "./panels/CreateTeam/CreateTeam";
import GoldSwap from "./panels/GoldSwap/GoldSwap";
import Friends from "./panels/Friends/Friends";
import Team from "./panels/Team/Team";
import Tasks from "./panels/Tasks/Tasks";
import Boosts from "./panels/Boosts/Boosts";
import Statistics from "./panels/Statistics/Statistics";
import FriendsBonus from "./panels/Friends/FriendsBonus";
import {socket} from "./utils/socket";
import {fetchData} from "./utils/api";
import {DefaultStateType, getDispatchObject, SET_AUTOCLICK_ENT_TIME, SET_DAILY_ENERGY, SET_ENERGY_LEFT, SET_GOLD, SET_GOLD_PER_CLICK, SET_LEVEL, SET_RECHARGING_ENERGY_PER_SECOND, SET_ROCKET, SET_SCREEN_POPUP, SET_TEAM, SET_USDT} from "./store/reducer";
import {useDispatch, useSelector} from "react-redux";
import BoostBuyConfirmModal from "./modals/BoostBuyConfirmModal";
import TeamSettings from "./panels/TeamSettings/TeamSettings";
import ScreenLoader from "./components/ScreenLoader/ScreenLoader";
import AdminTaskModal from './modals/AdminTaskModal';
import BoostEnergyModal from "./modals/BoostEnergyModal";
import Balance from "./panels/Balance/Balance";
import League from "./panels/League/League";
import Withdrawal from "./panels/Withdrawal/Withdrawal";
import Admin from "./panels/Admin/Admin";
import TaskChannelModal from "./modals/TaskChannelModal";
import BoostTapBotModal from "./modals/BoostTapBotModal";

// @ts-ignore
const tg = window["Telegram"]['WebApp'];

let timerId: any = null;

const App: FC = () => {

    const dispatch = useDispatch();
    const selector = useSelector((s: DefaultStateType) => s);

    useEffect(() => {
        init().then();
        addEventListener();

        return removeTimer;
    }, []);

    useEffect(() => {
        if (timerId !== null) {
            removeTimer();
        }

        addTimers();
    }, [selector.energyLeft]);

    const removeTimer = () => {
        clearInterval(timerId);
        timerId = null;
    }

    const addTimers = () => {
        timerId = setInterval(() => {
            if (
                selector.energyLeft === null ||
                selector.rechargingEnergyPerSecond === null ||
                selector.dailyEnergy === null
            ) {
                return;
            }

            if (selector.energyLeft >= selector.dailyEnergy) {
                return;
            }

            let newValue = selector.energyLeft + selector.rechargingEnergyPerSecond;
            if (newValue > selector.dailyEnergy) {
                newValue = selector.dailyEnergy;
            }

            dispatch(getDispatchObject(SET_ENERGY_LEFT, newValue));
        }, 1000);
    }

    const init = async () => {
        if (!['ios', 'android'].includes(tg['platform']) && process.env.NODE_ENV !== 'development') {
            dispatch(getDispatchObject(SET_SCREEN_POPUP, "unSupportPlatform"));
            return;
        }

        await fetchUserTeam();
        socket.connect();
    }

    const fetchUserTeam = async () => {
        const response = await fetchData('/user/getTeam');
        dispatch(getDispatchObject(SET_TEAM, response.result));
    }

    const addEventListener = () => {
        socket.on('disconnect', (reason: string) => {
            console.log('disconnect', reason);
            dispatch(getDispatchObject(SET_SCREEN_POPUP, 'connection'));
        });

        socket.on('disconnect-many-connections', () => {
            console.log('disconnect-many-connections')
            //router.replacePage(PAGE_ERROR, { type: 'manyConnectionsError' });
            dispatch(getDispatchObject(SET_SCREEN_POPUP, 'manyConnections'))
        });

        socket.on('connect', () => {
            console.log('connect');
            dispatch(getDispatchObject(SET_SCREEN_POPUP, null));
        });

        socket.on("connect_error", () => {
            console.log('connect error');
            dispatch(getDispatchObject(SET_SCREEN_POPUP, 'connection'));
        });

        socket.on("UPDATE_SCORE", (data) => {
            console.log("UPDATE_SCORE", data)

            dispatch(getDispatchObject(SET_LEVEL, data.level));
            dispatch(getDispatchObject(SET_GOLD, data.gold));
            dispatch(getDispatchObject(SET_USDT, data.usdt));
            dispatch(getDispatchObject(SET_ROCKET, data.rocket));
            dispatch(getDispatchObject(SET_ENERGY_LEFT, data.energyLeft));
            dispatch(getDispatchObject(SET_DAILY_ENERGY, data.dailyEnergy));
            dispatch(getDispatchObject(SET_GOLD_PER_CLICK, data.goldPerClick));
            dispatch(getDispatchObject(SET_AUTOCLICK_ENT_TIME, data.autoclickEndTime));
            dispatch(getDispatchObject(SET_RECHARGING_ENERGY_PER_SECOND, data['rechargingEnergyPerSecond']));
        });

        socket.on("UPDATE_LEVEL", (level) => {
            dispatch(getDispatchObject(SET_LEVEL, level));
        })
    }

    return (
        <>
            <ScreenLoader
                content={selector.screenPopup}
            />

            <BrowserRouter>
                <Routes>
                    <Route path={ROUTE_HOME} element={<Home />} />
                    <Route path={ROUTE_ADMIN} element={<Admin />} />
                    <Route path={ROUTE_TEAMS} element={<Teams />} />
                    <Route path={`${ROUTE_TEAM}/:id?`} element={<Team />} />
                    <Route path={ROUTE_CREATE_TEAM} element={<CreateTeam />} />
                    <Route path={ROUTE_TEAM_SETTINGS} element={<TeamSettings />} />
                    <Route path={ROUTE_GOLD_SWAP} element={<GoldSwap />} />
                    <Route path={ROUTE_FRIENDS} element={<Friends />} />
                    <Route path={ROUTE_FRIENDS_BONUS} element={<FriendsBonus />} />
                    <Route path={ROUTE_TASKS} element={<Tasks />} />
                    <Route path={ROUTE_BOOSTS} element={<Boosts />} />
                    <Route path={ROUTE_STATISTICS} element={<Statistics />} />
                    <Route path={ROUTE_BALANCE} element={<Balance />} />
                    <Route path={ROUTE_LEAGUE} element={<League />} />
                    <Route path={ROUTE_WITHDRAWAL} element={<Withdrawal />} />
                    <Route path="*">panel not found</Route>
                </Routes>
            </BrowserRouter>

            <>
                <BoostEnergyModal />
                <BoostBuyConfirmModal />
                <TaskChannelModal />
                <AdminTaskModal />
                <BoostTapBotModal />
            </>
        </>
    );
};

export default App;