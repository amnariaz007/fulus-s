import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/react';
import React, {FC} from 'react';
import {MODAL_BOOST_BUY_CONFIRM, MODAL_BOOST_ENERGY} from "../routes";
import useModal from "../hooks/useModal";
import {useTranslation} from "react-i18next";
import {fetchData} from "../utils/api";
import Img from '../components/Img/Img';
import {useDispatch, useSelector} from "react-redux";
import {DefaultStateType, getDispatchObject, REDUCE_ROCKET, SET_DAILY_ENERGY} from "../store/reducer";
import {getTG} from "../utils/utils";

const ITEMS = [
    { id: 1, energy: 1000, cost: 1 },
    { id: 2, energy: 5000, cost: 4 },
    { id: 3, energy: 15000, cost: 10 },
];

const BoostEnergyModal: FC = ({}) => {

    const { t } = useTranslation();

    const {activeModal, setActiveModal} = useModal();

    const selector = useSelector((s: DefaultStateType) => s);
    const dispatch = useDispatch()

    const availableEnergy = 15000 - ((selector.dailyEnergy ?? 15000) - 15000);

    const buy = async (item: any, onClose: () => void) => {
        if (item.energy > availableEnergy || selector.rocket === null) {
            //getTG().showAlert('Вам')
            return;
        }

        if (item.cost > selector.rocket) {
            getTG().showAlert(t("boostsNotEnoughROCKETError"));
            return;
        }

        const response = await fetchData('/boosts/upgrade', {
            boost: 'energy',
            id: item.id,
        });

        if (response.error) {
            return;
        }

        dispatch(getDispatchObject(SET_DAILY_ENERGY, selector.dailyEnergy + item.energy))
        dispatch(getDispatchObject(REDUCE_ROCKET, item.cost));

        onClose();
    }

    return (
        <Modal
            isOpen={activeModal === MODAL_BOOST_ENERGY}
            placement='bottom'
            onClose={() => setActiveModal(null)}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">ENERGY+</ModalHeader>
                        <ModalBody>
                            <p className="text-16-medium">Выберите желаемое количество дополнительной энергии.<br/><br/>Доступно: {availableEnergy} / 15 000</p>

                            <div>
                                {ITEMS.filter((item) => item.energy <= availableEnergy).map((item, index) => (
                                    <Button
                                        key={index}
                                        fullWidth
                                        color="secondary"
                                        style={{ marginTop: 8 }}
                                        //onPress={onClose}
                                        //onClick={() => confirm(onClose)}
                                        onClick={() => buy(item, onClose)}
                                    >
                                        <Img
                                            src={require("../assets/images/emoji/lightning.png")}
                                            style={{ height: 24 }}
                                        />
                                        {item.energy} — {item.cost} ROCKET
                                    </Button>
                                ))}
                            </div>
                        </ModalBody>
                        <ModalFooter>

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default BoostEnergyModal;