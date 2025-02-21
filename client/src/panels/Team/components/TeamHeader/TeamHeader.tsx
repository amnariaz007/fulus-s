import React, {FC, ReactNode} from 'react';
import Img from "../../../../components/Img/Img";
import './TeamHeader.css';
import {getImageUrl} from "../../../../utils/api";
import LetterAvatar from "../../../../components/LetterAvatar/LetterAvatar";
import Icon24ExternalLink from "../../../../assets/icons/Icon24ExternalLink";

// @ts-ignore
const tg = window['Telegram'].WebApp;

interface TeamHeaderProps {
    image: ReactNode
    name: string
    link?: string
}

// todo: link
const TeamHeader: FC<TeamHeaderProps> = ({image, name, link }) => {

    const openLink = () => {
        if (!link) {
            return;
        }

        tg.openLink(link);
    }

    return (
        <div className="TeamHeader--container">
            <div className="TeamHeader--avatar">
                {image}
            </div>

            <div
                className="TeamHeader--title"
                onClick={openLink}
                style={{
                    cursor: link ? 'pointer' : 'default'
                }}
            >
                <h1>{name}</h1>

                {link && (
                    <Icon24ExternalLink />
                )}
            </div>
        </div>
    );
};

export default TeamHeader;