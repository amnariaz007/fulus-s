import React, {FC, useEffect, useState} from 'react';
import Panel from "../../components/Panel/Panel";
import TelegramBackButton from "../../components/TelegramBackButton/TelegramBackButton";
import Placeholder from "../../components/Placeholder/Placeholder";
import Img from "../../components/Img/Img";
import Spacing from "../../components/Spacing/Spacing";
import Cell from "../../components/Cell/Cell";
import IconText from "../../components/IconText/IconText";
import CellContainer from "../../components/CellContainer/CellContainer";
import Icon16Chevron from "../../assets/icons/Icon16Chevron";
import Container from "../../components/Container/Container";
import {useTranslation} from "react-i18next";
import EmojiRectangle from "../../components/EmojiRectangle/EmojiRectangle";
import {fetchData} from "../../utils/api";
import {Skeleton} from "@nextui-org/react";
import {formatNumberWithSpaces} from "../../utils/mathUtils";
import {MODAL_TASK_CHANNEL} from "../../routes";
import useModal from "../../hooks/useModal";
import BackgroundGlow from "../../components/BackgroundGlow/BackgroundGlow";
import {getSocialIconByUrl} from "../../utils/utils";

const Tasks: FC = () => {

    const [tasks, setTasks] = useState<any>(null);
    const [tasksLoading, setTasksLoading] = useState(false);

    const { t } = useTranslation();

    const {setActiveModal} = useModal();

    useEffect(() => {
        fetch().then();
        createEventListeners();

        return () => {
            removeEventListeners();
        }
    }, []);

    const createEventListeners = () => {
        document.addEventListener("TASKS_UPDATE", fetch);
    }

    const removeEventListeners = () => {
        document.removeEventListener("TASKS_UPDATE", fetch);
    }

    const fetch = async () => {
        setTasksLoading(true);

        const response = await fetchData('/tasks/get');
        console.log(response)

        if (response.error) {
            return;
        }

        setTasks(response.result);
        setTasksLoading(false);
    }

    const goToModal = (channel: any) => {
        if (channel['award'] === -1) {
            return;
        }

        setActiveModal(MODAL_TASK_CHANNEL, channel);
    }

    return (
        <Panel>
            <TelegramBackButton />

            <BackgroundGlow
                color1="rgba(8, 18, 29, 0)"
                color2="rgba(210, 210, 210, .5)"
                vertical="top"
            />

            <Placeholder title={t('navbarTasks')} />

            <Spacing size={32} />

            <CellContainer>
                {tasksLoading && (
                    <Skeleton
                        style={{
                            width: '100%',
                            height: 48,
                            borderRadius: 16
                        }}
                    />
                )}

                {!tasksLoading && tasks !== null && tasks.channels.map((channel: any, index: number) => (
                    <Cell
                        key={index}
                        title={channel['title']}
                        after={channel['award'] !== -1 && <Icon16Chevron />}
                        onClick={() => goToModal(channel)}
                        before={
                            <EmojiRectangle>
                                <Img src={require(`../../assets/images/${getSocialIconByUrl(channel['link'] ?? channel['channelAddress'])}`)} />
                            </EmojiRectangle>
                        }
                    >
                        {channel['award'] === -1 ? (
                            "completed"
                        ) : (
                            <IconText
                                size="small"
                                imgPath={require('../../assets/images/coins/rocket_coin_back_36x36.png')}
                                text={`+ ${formatNumberWithSpaces(channel['award'])}`}
                            />
                        )}
                    </Cell>
                ))}
            </CellContainer>
        </Panel>
    );
};

export default Tasks;