import React, {FC} from 'react';
import Cell from "../../../../components/Cell/Cell";
import Img from "../../../../components/Img/Img";
import Icon16Chevron from "../../../../assets/icons/Icon16Chevron";
import IconText from "../../../../components/IconText/IconText";
import CellContainer from "../../../../components/CellContainer/CellContainer";
import {useTranslation} from "react-i18next";

interface InviteInfoProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const InviteInfo: FC<InviteInfoProps> = ({ onClick }) => {

    const { t } = useTranslation();

    return (
        <CellContainer>
            <Cell
                before={<Img src={require('../../../../assets/images/coins/rocket_coin_back_100x100.png')} />}
                title={t('friendsInviteTitle')}
            >
                {t('friendsInviteBenefit')}

                <IconText
                    size="small"
                    imgPath={require('../../../../assets/images/coins/rocket_coin_back_100x100.png')}
                    text="2000"
                />
            </Cell>
        </CellContainer>
    );
};

export default InviteInfo;