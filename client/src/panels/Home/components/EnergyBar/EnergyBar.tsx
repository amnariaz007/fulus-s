import React, {FC} from 'react';
import {Button, Progress, Skeleton} from "@nextui-org/react";
import './EnergyBar.css';
import IconText from "../../../../components/IconText/IconText";
import {useSelector} from "react-redux";
import {DefaultStateType} from "../../../../store/reducer";
import {formatNumberShort, formatNumberWithSpaces} from "../../../../utils/mathUtils";

interface EnergyBarProps {

}

const EnergyBar: FC<EnergyBarProps> = ({}) => {

    const energyLeft = useSelector((selector: DefaultStateType) => selector.energyLeft);
    const dailyEnergy = useSelector((selector: DefaultStateType) => selector.dailyEnergy);

    return (
        <div className="EnergyInfo--container">
            {(energyLeft === null || dailyEnergy === null) ? (
                <Skeleton
                    style={{
                        height: 24,
                        width: 300,
                        borderRadius: 16,
                    }}
                />
            ) : (
                <div className="EnergyInfo--score">
                    <IconText
                        size="medium"
                        imgPath={require('../../../../assets/images/emoji/lightning.png')}
                        text={`${formatNumberWithSpaces(energyLeft)} / ${formatNumberWithSpaces(dailyEnergy)}`}
                    />
                </div>
            )}

            <Progress
                size="md"
                aria-label="Loading..."
                value={energyLeft !== null && dailyEnergy !== null ? ((energyLeft / dailyEnergy) * 100) : 100}
                style={{ marginTop: 10 }}
            />
        </div>
    );
};

export default EnergyBar;