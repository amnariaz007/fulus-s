import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Slider} from '@nextui-org/react';
import React, {FC, useState} from 'react';
import {MODAL_BOOST_BUY_CONFIRM, MODAL_BOOST_ENERGY, MODAL_BOOST_TAP_BOT} from "../routes";
import useModal from "../hooks/useModal";
import {useTranslation} from "react-i18next";
import {fetchData} from "../utils/api";
import Img from '../components/Img/Img';
import {useDispatch, useSelector} from "react-redux";
import {
    DefaultStateType,
    getDispatchObject, REDUCE_GOLD,
    REDUCE_ROCKET,
    SET_AUTOCLICK_ENT_TIME,
    SET_DAILY_ENERGY
} from "../store/reducer";
import {getTG} from "../utils/utils";
import {formatNumberWithSpaces} from "../utils/mathUtils";

const COST_PER_HOUR = 25e3;

const BoostTapBotModal: FC = ({}) => {

    const [duration, setDuration] = useState(1);

    const { t } = useTranslation();

    const {activeModal, setActiveModal} = useModal();

    const selector = useSelector((s: DefaultStateType) => s);
    const dispatch = useDispatch()

    const availableEnergy = 15000 - ((selector.dailyEnergy ?? 15000) - 15000);

    const buy = async (onClose: () => void) => {
        if (selector.gold === null) {
            return;
        }

        const cost = COST_PER_HOUR * duration;

        if (cost > selector.gold) {
            getTG().showAlert(t("boostsNotEnoughROCKETError"));
            return;
        }

        const response = await fetchData(
            '/boosts/autoclick',
            { duration }
        );

        if (response.error) {
            return;
        }

        dispatch(getDispatchObject(SET_AUTOCLICK_ENT_TIME, response.result['autoclickEndTime']))
        dispatch(getDispatchObject(REDUCE_GOLD, cost));

        onClose();
    }

    return (
        <Modal
            isOpen={activeModal === MODAL_BOOST_TAP_BOT}
            placement='center'
            onClose={() => setActiveModal(null)}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Tap Bot</ModalHeader>
                        <ModalBody>

                            <Slider
                                label="Duration"
                                step={1}
                                maxValue={48}
                                minValue={1}
                                defaultValue={1}
                                className="max-w-md"
                                value={duration}
                                onChange={(value: any) => setDuration(value)}
                                getValue={(duration) => `${duration} h`}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                fullWidth
                                color="primary"
                                onClick={() => buy(onClose)}
                            >
                                Buy for {formatNumberWithSpaces(COST_PER_HOUR * duration)}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default BoostTapBotModal;