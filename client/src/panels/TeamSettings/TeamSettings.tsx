import React, {FC, useEffect, useState} from 'react';
import Panel from "../../components/Panel/Panel";
import TelegramBackButton from "../../components/TelegramBackButton/TelegramBackButton";
import Placeholder from "../../components/Placeholder/Placeholder";
import UploadPhoto from "../../components/UploadPhoto/UploadPhoto";
import Spacing from "../../components/Spacing/Spacing";
import {Button, Input} from "@nextui-org/react";
import Div from "../../components/Div/Div";
import {ROUTE_CREATE_TEAM, ROUTE_TEAM} from "../../routes";
import BottomLayout from "../../components/BottomLayout/BottomLayout";
import {useDispatch, useSelector} from "react-redux";
import {DefaultStateType, getDispatchObject, SET_TEAM} from "../../store/reducer";
import {fetchDataAxios} from "../../utils/api";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {teamFormChange} from "../../utils/inputValidator";

const TeamSettings: FC = ({}) => {

    const [file, setFile] = useState<any>(null);
    const [nameInput, setNameInput] = useState("");
    const [linkInput, setLinkInput] = useState("");

    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const rocket = useSelector((selector: DefaultStateType) => selector.rocket);
    const team = useSelector((selector: DefaultStateType) => selector.team);

    useEffect(() => {
        initTeamSettings();
    }, []);

    const initTeamSettings = () => {
        if (team === 'no' || !team) {
            return;
        }

        setNameInput(team.name);
        setLinkInput(team.link ?? "");
    }

    const update = async () => {
        // @ts-ignore
        const tg = window['Telegram'].WebApp;

        //tg.showPopup({ message: '111' });
        //tg.showAlert('hello');

        if (nameInput.length < 2) {
            tg.showAlert(t('teamCreateMinimumLengthError'));
            return;
        }

        const linkRegex = /^(?:https?:\/\/)?(?:\w+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/;
        if (!linkRegex.test(linkInput) && linkInput.length > 0) {
            tg.showAlert(t('teamCreateInvalidLinkError'));
            return;
        }

        if (rocket === null) {
            return;
        }

        if (linkInput.length > 0 && rocket < 1) {
            tg.showAlert(t('teamCreateNotEnoughROCKETError'));
            return;
        }

        const result = await fetchDataAxios('/team/update', {
            file,
            teamName: nameInput,
            link: linkInput || null,
        });

        if (result.error) {
            console.error(result.error);
            tg.showAlert('Server error, try again');
            return;
        }

        dispatch(getDispatchObject(SET_TEAM, result.result));
        navigate(ROUTE_TEAM);

        console.log(result)
    }

    return (
        <Panel>
            <TelegramBackButton />

            <Placeholder
                title={t('teamSettingsTitle')}
            />

            <Spacing size={50} />
            <UploadPhoto onUpload={(file) => setFile(file)} />
            <Spacing size={24} />

            <>
                <Input
                    isRequired
                    size="sm"
                    label={t('teamCreateNameInput')}
                    value={nameInput}
                    onChange={(event) => teamFormChange("name", event, setNameInput)}
                />

                <Spacing />

                <Input
                    size="sm"
                    label={t('teamCreateLinkInput')}
                    value={linkInput}
                    onChange={(event) => teamFormChange("link", event, setLinkInput)}
                />
                <Spacing size={8} />
                <p className="text-14-medium text-gray">{t('teamCreateLinkInputDescription')}</p>
            </>

            <BottomLayout>
                <Div>
                    <Button
                        color="primary"
                        onClick={update}
                        fullWidth
                    >
                        {t('teamSettingsSaveButton')}
                    </Button>
                </Div>
                <Spacing />
            </BottomLayout>
        </Panel>
    );
};

export default TeamSettings;