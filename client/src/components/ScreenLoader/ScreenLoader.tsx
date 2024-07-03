import React, {FC} from 'react';
import './ScreenLoader.css';
import { Spinner } from '@nextui-org/react';
import BottomLayout from "../BottomLayout/BottomLayout";
import Div from "../Div/Div";
import Spacing from "../Spacing/Spacing";
import {useTranslation} from "react-i18next";
import Img from "../Img/Img";

// @ts-ignore
const tg = window["Telegram"]['WebApp'];

// todo
interface ScreenLoaderProps {
    content: null | 'connection' | 'unSupportPlatform' | 'manyConnections'
}

const ScreenLoader: FC<ScreenLoaderProps> = ({ content }) => {

    const {t} = useTranslation();

    return (
        content && (
            <div className="ScreenLoader--container">
                {(content === 'connection' || content === 'manyConnections') && (
                    <>
                        <div className="ScreenLoader--content">
                            <Spinner size="lg" color="default"/>
                            <h1>{t('connectionTitle')}</h1>
                        </div>
                    </>
                )}

                {content === 'unSupportPlatform' && (
                    <>
                        <div className="ScreenLoader--content" style={{ marginTop: '5vh' }}>
                            <h1>{t('unSupportPlatform')}</h1>
                        </div>
                    </>
                )}
            </div>
        )
    );
};

export default ScreenLoader;