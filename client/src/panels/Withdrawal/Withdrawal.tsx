import React, {FC, useState} from 'react';
import Panel from "../../components/Panel/Panel";
import TelegramBackButton from "../../components/TelegramBackButton/TelegramBackButton";
import Placeholder from "../../components/Placeholder/Placeholder";
import {checkCryptoAddress, teamFormChange} from "../../utils/inputValidator";
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import Spacing from "../../components/Spacing/Spacing";
import Div from "../../components/Div/Div";
import BottomLayout from "../../components/BottomLayout/BottomLayout";
import {getTG} from "../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {DefaultStateType, getDispatchObject, SET_USDT} from "../../store/reducer";
import {fetchData} from "../../utils/api";

const Withdrawal: FC = () => {

    const [loading, setLoading] = useState(false);

    const [amount, setAmount] = useState("");
    const [cryptoNetwork, setCryptoNetwork] = useState<any>("");
    const [cryptoAddress, setCryptoAddress] = useState("");

    const selector = useSelector((s: DefaultStateType) => s);
    const dispatch = useDispatch();

    const formChange = (input: string, event: any, setter: React.Dispatch<any>) => {
        const value = event.target.value;

        switch (input) {
            case 'amount': {
                if (Number(value) < 1 || Number(value) > 1e6) {
                    return;
                }

                setter(value);
                break;
            }

            case 'cryptoAddress': {
                const regExp = /^[0-9a-fA-FTx]+$/;
                if (!regExp.test(value)) {
                    return;
                }

                if (value.length > 42) {
                    return;
                }

                setter(value);
                break;
            }
        }
    }

    const withdrawal = async () => {
        console.log(amount, cryptoNetwork, cryptoAddress);

        if (selector.usdt === null) {
            return;
        }

        if (amount.length < 1) {
            return getTG().showAlert("Specify the amount!");
        }

        if (cryptoNetwork.length < 1) {
            return getTG().showAlert("Specify the network!");
        }

        if (cryptoAddress.length < 1) {
            return getTG().showAlert("Specify the address!");
        }

        if (!checkCryptoAddress(cryptoAddress, cryptoNetwork)) {
            return getTG().showAlert("Enter the correct address!");
        }

        if (Number(amount) > selector.usdt) {
            return getTG().showAlert("You don't have enough USDT on your balance!");
        }

        setLoading(true);

        const response = await fetchData(
            '/user/withdrawal',
            {
                cryptoNetwork,
                cryptoAddress,
                token: 'usdt',
                amount: Number(amount),
            }
        );

        setLoading(false);

        if (response.error) {
            return;
        }

        dispatch(getDispatchObject(SET_USDT, selector.usdt - Number(amount)));

        getTG().showAlert("The withdrawal request has been created.");
    }

    return (
        <Panel>
            <TelegramBackButton />

            <Spacing size="15vh" />

            <Placeholder title="Withdrawal" />

            <Spacing size={32} />

            <>
                <Input
                    type="number"
                    size="sm"
                    label={"Amount"}
                    value={amount}
                    onChange={(event) => formChange("amount", event, setAmount)}
                />

                <Spacing size={16} />

                <Select
                    label="USDT network"
                    size="sm"
                    onChange={(event: any) => setCryptoNetwork(event.target.value)}
                    value={cryptoNetwork}
                >
                    <SelectItem key="trc20" value="trc20">
                        TRC20
                    </SelectItem>

                    <SelectItem key="bep20" value="bep20">
                        BEP20
                    </SelectItem>
                </Select>

                <Spacing size={16} />

                <Input
                    type="text"
                    size="sm"
                    label={"USDT address"}
                    value={cryptoAddress}
                    onChange={(event) => formChange("cryptoAddress", event, setCryptoAddress)}
                />
            </>

            <BottomLayout>
                <Div>
                    <Button
                        color="primary"
                        onClick={withdrawal}
                        fullWidth
                        isLoading={loading}
                    >
                        Continue
                    </Button>
                </Div>
                <Spacing />
            </BottomLayout>
        </Panel>
    );
};

export default Withdrawal;