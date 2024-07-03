import React, {FC, useState} from 'react';
import Div from "../../../../components/Div/Div";
import {Button} from "@nextui-org/react";
import Spacing from "../../../../components/Spacing/Spacing";
import BottomLayout from "../../../../components/BottomLayout/BottomLayout";
import {useTranslation} from "react-i18next";
import {copyText} from "../../../../utils/utils";

// @ts-ignore
const tg = window["Telegram"]['WebApp'];
const link = `${process.env.REACT_APP_TELEGRAM_BOT_URL}?start=r_${tg['initDataUnsafe']['user']['id']}`

interface InviteFriendProps {

}

const InviteFriend: FC<InviteFriendProps> = ({}) => {

    const { t } = useTranslation();

    const [buttonText, setButtonText] = useState(t('friendsInviteButton'));
    const [buttonColor, setButtonColor] = useState<"success" | "primary">('primary');

    const copyLink = async () => {
        copyText(link);

        //await navigator.clipboard.writeText(link);

        setButtonText(t('friendsInviteButton1'));
        setButtonColor('success');

        setTimeout(() => {
            setButtonText(t('friendsInviteButton'));
            setButtonColor('primary')
        }, 5000);
    }

    // получить ссылку

    return (
        <BottomLayout>
            <Div>
                <Button
                    size="lg"
                    color={buttonColor}
                    onClick={copyLink}
                    fullWidth
                >
                    {buttonText}
                </Button>
            </Div>
            <Spacing />
        </BottomLayout>
    );
};

export default InviteFriend;