import React, {FC, useEffect} from 'react';
import IconText from "../../../../components/IconText/IconText";
import Spacing from "../../../../components/Spacing/Spacing";
import Icon16Chevron from "../../../../assets/icons/Icon16Chevron";
import {useNavigate} from "react-router-dom";
import {ROUTE_GOLD_SWAP, ROUTE_LEAGUE} from "../../../../routes";
import {useDispatch, useSelector} from "react-redux";
import {
    DefaultStateType
} from "../../../../store/reducer";
import {convertLevelIdToLevel} from "../../../../utils/levelsUtils";
import {Skeleton} from "@nextui-org/react";
import {formatNumberWithSpaces} from "../../../../utils/mathUtils";

interface ScoreBarProps {

}

const ScoreBar: FC<ScoreBarProps> = ({}) => {

    const navigate = useNavigate();

    const {
        level,
        gold,
        rocket
    } = useSelector((selector: DefaultStateType) => ({
        level: selector.level,
        gold: selector.gold,
        rocket: selector.rocket,
    }));

    return (
        <>
            {gold !== null ? (
                <IconText
                    size="large"
                    imgPath={require('../../../../assets/images/coins/rocket_coin_back_100x100.png')}
                    text={formatNumberWithSpaces(gold)}
                    stretched
                />
            ) : (
                <Skeleton
                    style={{
                        height: 51,
                        width: 200,
                        borderRadius: 16,
                        margin: '0 auto'
                    }}
                />
            )}

            <Spacing size={16} />

            {level !== null ? (
                <IconText
                    onClick={() => navigate(ROUTE_LEAGUE)}
                    size="mediumLevels"
                    imgPath={require(`../../../../assets/images/levels/${convertLevelIdToLevel(level).icon}.png`)}
                    text={convertLevelIdToLevel(level).name}
                    after={<Icon16Chevron />}
                    stretched
                />
            ) : (
                <Skeleton
                    style={{
                        height: 24,
                        width: 180,
                        borderRadius: 16,
                        margin: '0 auto'
                    }}
                />
            )}
        </>
    );
};

export default ScoreBar;