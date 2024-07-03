import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/react';
import {FC, useEffect, useState} from 'react';
import {MODAL_ADMIN_TASK, MODAL_BOOST_BUY_CONFIRM, MODAL_TASK_CHANNEL} from "../routes";
import useModal from "../hooks/useModal";
import {useTranslation} from "react-i18next";
import {fetchData} from "../utils/api";
import {useDispatch} from "react-redux";
import {ADD_GOLD, getDispatchObject} from "../store/reducer";
import Spacing from '../components/Spacing/Spacing';
import Img from "../components/Img/Img";

// @ts-ignore
const tg = window['Telegram'].WebApp;

const AdminTaskModal: FC = ({}) => {

    const [awardInput, setAwardInput] = useState("");
    const [channelAddressInput, setChannelAddressInput] = useState("");

    const { t } = useTranslation();
    const {activeModal, setActiveModal, activeModalParams} = useModal();

    const deleteTask = async (onClose: () => void) => {
        if (!activeModalParams) {
            return;
        }

        const response = await fetchData(
            '/admin/deleteTask', {id: activeModalParams.id}
        );

        if (response.error) {
            return;
        }

        const event = new Event("admin_update");
        document.dispatchEvent(event);

        onClose();
    }

    const save = async (onClose: () => void) => {
        const award = Number(awardInput);
        if (!award || award < 1) {
            tg.showAlert('Укажите корректную награду');
            return;
        }

        if (channelAddressInput.length < 2 || channelAddressInput.length > 150) {
            tg.showAlert('Укажите корректный адрес канала в формате @channel');
            return;
        }

        const channelAddressRegex = /^@[A-Za-z0-9_]+$/
        if (!channelAddressRegex.test(channelAddressInput)) {
            tg.showAlert('Укажите корректный адрес канала в формате @channel');
            return;
        }

        const params: any = {
            award,
            channelAddress: channelAddressInput,
        };

        if (activeModalParams) {
            params.id = activeModalParams.id;
        }

        const response = await fetchData(
            '/admin/saveTask', params
        );

        if (response.error) {
            return;
        }

        const result = response.result;

        const event = new Event("admin_update");
        document.dispatchEvent(event);

        onClose();
    }

    useEffect(() => {
        if (activeModalParams) {
            setAwardInput(activeModalParams['award']);
            setChannelAddressInput(activeModalParams['channelAddress']);
        } else {
            setAwardInput("");
            setChannelAddressInput("");
        }
    }, [activeModalParams]);

    return (
        <Modal
            isOpen={activeModal === MODAL_ADMIN_TASK}
            placement='bottom'
            onClose={() => setActiveModal(null)}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {activeModalParams ? "Изменение задания" : "Новое задание"}
                        </ModalHeader>

                        <ModalBody>
                            <Input
                                isRequired
                                size="md"
                                value={awardInput}
                                placeholder="Награда"
                                type="number"
                                startContent={
                                    <Img
                                        src={require('../assets/images/coins/rocket_coin_back_36x36.png')}
                                        width={19} height={19}
                                    />
                                }
                                onChange={(event) => setAwardInput(event.target.value)}
                            />

                            <div>
                                <Input
                                    isRequired
                                    size="md"
                                    value={channelAddressInput}
                                    type="text"
                                    placeholder="Канал (формат @channel)"
                                    onChange={(event) => setChannelAddressInput(event.target.value)}
                                />
                                <Spacing size={8} />
                                <p className="text-14-medium text-gray">Бота нужно добавить в этот канал и назначить администратором!</p>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            {activeModalParams && (
                                <Button
                                    fullWidth
                                    color="danger"
                                    variant="light"
                                    onClick={() => deleteTask(onClose)}
                                >
                                    Удалить
                                </Button>
                            )}

                            <Button
                                fullWidth
                                color="primary"
                                onClick={() => save(onClose)}
                            >
                                Сохранить
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

//export default AdminTaskModal;