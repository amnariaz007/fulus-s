import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/react';
import React, {FC} from 'react';
import {MODAL_BOOST_BUY_CONFIRM, MODAL_TASK_CHANNEL} from "../routes";
import useModal from "../hooks/useModal";
import {useTranslation} from "react-i18next";
import {fetchData} from "../utils/api";
import {useDispatch} from "react-redux";
import {ADD_GOLD, getDispatchObject} from "../store/reducer";

// @ts-ignore
const tg = window['Telegram'].WebApp;

const TaskChannelModal: FC = ({}) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {activeModal, setActiveModal, activeModalParams} = useModal();

    const goToChannel = () => {
        if (activeModalParams['channelAddress']) {
            tg.openTelegramLink(`https://t.me/${activeModalParams['channelAddress'].replace('@', '')}`);
            return;
        }

        tg.openLink(activeModalParams['link']);
    }

    const check = async (onClose: () => void) => {
        const response = await fetchData(
            '/tasks/check',
            { id: activeModalParams['id'] }
        );

        if (response.error) {
            return;
        }

        const result = response.result;
        if (result === 'not subscribed') {
            tg.showAlert(t('taskNotSubscribedError'));
            return;
        }

        dispatch(getDispatchObject(ADD_GOLD, activeModalParams['award']));

        const event = new Event("TASKS_UPDATE");
        document.dispatchEvent(event);

        onClose();
    }

    return (
        <Modal
            isOpen={activeModal === MODAL_TASK_CHANNEL}
            placement='center'
            onClose={() => setActiveModal(null)}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{t('taskModalTitle')}</ModalHeader>
                        <ModalBody>
                            <p className="text-16-medium">{t('taskModalText')}</p>
                        </ModalBody>
                        <ModalFooter>
                            <div style={{ display: 'block', width: '100%' }}>
                                <Button
                                    size="lg"
                                    fullWidth
                                    color="primary"
                                    onClick={goToChannel}
                                >
                                    {activeModalParams['channelAddress'] ? "Open channel" : "Open link"}
                                </Button>
                                <Button
                                    style={{ marginTop: 8 }}
                                    fullWidth
                                    color="primary"
                                    variant="light"
                                    onClick={() => check(onClose)}
                                >
                                    {activeModalParams['channelAddress'] ? "Check subscribe" : "Check task"}
                                </Button>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default TaskChannelModal;