import React, {FC} from 'react';
import Panel from "../../components/Panel/Panel";
import TelegramBackButton from "../../components/TelegramBackButton/TelegramBackButton";
import Placeholder from "../../components/Placeholder/Placeholder";
import BackgroundGlow from "../../components/BackgroundGlow/BackgroundGlow";
import Div from "../../components/Div/Div";
import Img from "../../components/Img/Img";
import {Progress} from "@nextui-org/react";
import IconText from "../../components/IconText/IconText";
import {formatNumberWithSpaces} from "../../utils/mathUtils";
import Spacing from "../../components/Spacing/Spacing";
import {useSelector} from "react-redux";
import {DefaultStateType} from "../../store/reducer";
import {capitalizeFirstLetter} from "../../utils/utils";
import {convertLevelIdToLevel} from "../../utils/levelsUtils";

const LEAGUES = {

};

const League: FC = ({}) => {

    const selector = useSelector((s: DefaultStateType) => s);

    return (
        <Panel>
            <TelegramBackButton />

            {selector.level !== null && selector.gold !== null && (
                <>
                    <BackgroundGlow
                        color1="rgba(8, 18, 29, 0)"
                        color2={convertLevelIdToLevel(selector.level).glowColor}
                        vertical="top"
                    />

                    <Placeholder
                        title={`${convertLevelIdToLevel(selector.level).name} League`}
                        text={"The amount of gold determines which league you will get into"}
                    />

                    <Spacing size={80} />

                    <>
                        <Img
                            radius={0}
                            src={require(`../../assets/images/levels/${selector.level}.png`)}
                            style={{
                                width: '70%',
                                maxWidth: 256,
                                margin: '0 auto'
                            }}
                        />

                        <Spacing size={48} />

                        <>
                            <div className="EnergyInfo--score">
                                <IconText
                                    size="medium"
                                    imgPath={require('../../assets/images/coins/rocket_coin_back_100x100.png')}
                                    text={`${selector.gold} / ${convertLevelIdToLevel(selector.level).nextLevelGold}`}
                                />
                            </div>

                            <>
                                <Spacing size={10} />

                                <Progress
                                    size="md"
                                    aria-label="Loading..."
                                    value={(selector.gold / convertLevelIdToLevel(selector.level).nextLevelGold) * 100}
                                />
                            </>
                        </>
                    </>
                </>
            )}
        </Panel>
    );
};

export default League;