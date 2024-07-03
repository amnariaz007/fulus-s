import React, {FC} from 'react';
import Panel from "../../components/Panel/Panel";
import BottomLayout from "../../components/BottomLayout/BottomLayout";
import Div from "../../components/Div/Div";
import Spacing from "../../components/Spacing/Spacing";
import EnergyBar from "./components/EnergyBar/EnergyBar";
import CoinButton from "./components/CoinButton/CoinButton";
import ScoreBar from "./components/ScoreBar/ScoreBar";
import MyTeamButton from "./components/MyTeamButton/MyTeamButton";
import Navigation from "./components/Navigation/Navigation";
import BackgroundGlow from "../../components/BackgroundGlow/BackgroundGlow";
import AutoclickButton from "./components/AutoclickButton/AutoclickButton";

const Home: FC = () => {
    return (
        <Panel>
            <BackgroundGlow
                color1="rgba(0, 111, 238, 1)"
                color2="rgba(0, 111, 238, 0)"
                vertical="bottom"
            />

            {/*<AutoclickButton />*/}
            {/*<MyTeamButton />*/}

            <Spacing size="12vh" />
            <ScoreBar />

            <BottomLayout>
                <CoinButton />

                <Div>
                    <EnergyBar />
                    <Spacing />
                    <Navigation />
                </Div>

                <Spacing />
            </BottomLayout>
        </Panel>
    );
};

export default Home;