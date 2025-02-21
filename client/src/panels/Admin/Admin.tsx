import React, {FC, useEffect, useState} from 'react';
import Panel from "../../components/Panel/Panel";
import Placeholder from "../../components/Placeholder/Placeholder";
import Container from "../../components/Container/Container";
import {teamFormChange} from "../../utils/inputValidator";
import {Button, Input, Skeleton} from "@nextui-org/react";
import Spacing from "../../components/Spacing/Spacing";
import CellContainer from "../../components/CellContainer/CellContainer";
import Cell from "../../components/Cell/Cell";
import Icon16Chevron from "../../assets/icons/Icon16Chevron";
import EmojiRectangle from "../../components/EmojiRectangle/EmojiRectangle";
import Img from "../../components/Img/Img";
import IconText from "../../components/IconText/IconText";
import {formatNumberWithSpaces} from "../../utils/mathUtils";
import {fetchData} from "../../utils/api";
import useModal from "../../hooks/useModal";
import {MODAL_ADMIN_TASK} from "../../routes";

const Admin: FC = () => {

    const [data, setData] = useState<any>(null);
    const [dataLoading, setDataLoading] = useState(false);

    const [rocketCostInput, setRocketCostInput] = useState("");
    const [teamLinkMonthCostInput, setTeamLinkMonthCostInput] = useState("");

    const {activeModal, setActiveModal, activeModalParams} = useModal();

    useEffect(() => {
        fetch().then();

        createEventListeners();
        return removeEventListeners;
    }, []);

    useEffect(() => {
        if (data) {
            setRocketCostInput(data['rocketCost']);
            setTeamLinkMonthCostInput(data['teamLinkMonthCost']);
        }
    }, [data]);

    const fetch = async () => {
        setDataLoading(true);

        const response = await fetchData('/admin/get');
        console.log(response);

        if (response.error) {
            return;
        }

        setData(response.result);
        setDataLoading(false);
    }

    const createEventListeners = () => {
        document.addEventListener("admin_update", fetch);
    }

    const removeEventListeners = () => {
        document.removeEventListener("admin_update", fetch);
    }

    const save = async (field: 'rocketCost' | 'teamLinkMonthCost', value: any) => {
        await fetchData('/admin/update', {
            field,
            value,
        });
    }

    return (
        <Panel>
            <Placeholder title="Admin panel" />
            <Spacing size={32} />

            {/*<Container title="Стоимость 1 ROCKET">
                <Input
                    isRequired
                    size="lg"
                    startContent={<p className="text-gray">$</p>}
                    value={rocketCostInput}
                    type="number"
                    onChange={(event) => setRocketCostInput(event.target.value)}
                    endContent={
                        <Button
                            size="sm"
                            color="primary"
                            onClick={() => save('rocketCost', Number(rocketCostInput))}
                        >
                            Сохранить
                        </Button>
                    }
                />
            </Container>*/}

            {/*<Spacing size={24} />

            <Container title="Стоимость ссылки в команде (в месяц)">
                <Input
                    isRequired
                    size="lg"
                    startContent={<p className="text-gray">ROCKET</p>}
                    value={teamLinkMonthCostInput}
                    type="number"
                    onChange={(event) => setTeamLinkMonthCostInput(event.target.value)}
                    endContent={
                        <Button
                            size="sm"
                            color="primary"
                            onClick={() => save('teamLinkMonthCost', Number(teamLinkMonthCostInput))}
                        >
                            Сохранить
                        </Button>
                    }
                />
            </Container>*/}

            <Spacing size={24} />

            <Container title="Channels (for earning)">
                <CellContainer>
                    {dataLoading && (
                        <Skeleton
                            style={{
                                width: '100%',
                                height: 48,
                                borderRadius: 16
                            }}
                        />
                    )}

                    {!dataLoading && data !== null && (
                        <>
                            <Button
                                fullWidth
                                color="primary"
                                onClick={() => setActiveModal(MODAL_ADMIN_TASK)}
                            >
                                Add
                            </Button>

                            <Spacing />

                            {data['tasks']['channels'].map((channel: any, index: number) => (
                                <Cell
                                    key={index}
                                    title={channel['channelAddress'] ?? channel['link']}
                                    after={<Icon16Chevron />}
                                    onClick={() => setActiveModal(MODAL_ADMIN_TASK, channel)}
                                    before={
                                        <EmojiRectangle>
                                            <Img src={require('../../assets/images/emoji/loudspeaker.png')} />
                                        </EmojiRectangle>
                                    }
                                >
                                    <IconText
                                        size="small"
                                        imgPath={require('../../assets/images/coins/rocket_coin_back_36x36.png')}
                                        text={`+ ${formatNumberWithSpaces(channel['award'])}`}
                                        textColor="var(--yellow_color)"
                                    />
                                </Cell>
                            ))}
                        </>
                    )}
                </CellContainer>
            </Container>
        </Panel>
    );
};

export default Admin;