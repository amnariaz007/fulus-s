import React, {FC, useEffect, useState} from 'react';
import Panel from "../../components/Panel/Panel";
import TelegramBackButton from "../../components/TelegramBackButton/TelegramBackButton";
import Placeholder from "../../components/Placeholder/Placeholder";
import Spacing from "../../components/Spacing/Spacing";
import CellContainer from "../../components/CellContainer/CellContainer";
import Cell from "../../components/Cell/Cell";
import Img from "../../components/Img/Img";
import InviteFriend from "./components/InviteFriend/InviteFriend";
import InviteInfo from "./components/InviteInfo/InviteInfo";
import Container from "../../components/Container/Container";
import {useNavigate} from "react-router-dom";
import {ROUTE_FRIENDS_BONUS} from "../../routes";
import {Skeleton} from "@nextui-org/react";
import FriendsListSkeleton from "./components/FriendsListSkeleton/FriendsListSkeleton";
import {useTranslation} from "react-i18next";
import {fetchData, getTelegramImageUrl} from "../../utils/api";
import LetterAvatar from "../../components/LetterAvatar/LetterAvatar";
import EmojiRectangle from "../../components/EmojiRectangle/EmojiRectangle";
import BackgroundGlow from "../../components/BackgroundGlow/BackgroundGlow";

interface FriendInterface {
    friends: {
        name: string
        photo: string
    }[],
    count: number,
}

const Friends: FC = ({}) => {

    const [friendsList, setFriendsList] = useState<any | [] | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        fetchFriends().then()
    }, [])

    const fetchFriends = async () => {
        setLoading(true);

        const response = await fetchData('/friends/get', {isNew: true});
        if (response.error) {
            return;
        }

        setFriendsList(response.result);
        setLoading(false);
    }

    return (
        <Panel>
            <TelegramBackButton />

            <BackgroundGlow
                color1="rgba(8, 18, 29, 0)"
                color2="rgba(0, 119, 255, .5)"
                vertical="top"
            />

            <Placeholder title={t('friendsTitle')} />
            <Spacing size={32} />

            <InviteInfo onClick={() => navigate(ROUTE_FRIENDS_BONUS)} />
            <Spacing size={24} />

            <CellContainer>
                {loading && <FriendsListSkeleton />}

                {!loading && friendsList !== null && friendsList.friends.length > 0 && (
                    <>
                        {friendsList.friends.map((friend: any, index: number) => (
                            friend && <Cell
                                key={index}
                                before={<Img src={getTelegramImageUrl(friend.photo)} />}
                                title={friend.name}
                            />
                        ))}

                        {friendsList.friends.length < friendsList.count && (
                            <Cell
                                key={-1}
                                before={
                                    <EmojiRectangle>
                                        <Img src={require("../../assets/images/emoji/users.png")} />
                                    </EmojiRectangle>
                                }
                                title={t('friendsCount') + (friendsList.count - friendsList.friends.length)}
                            />
                        )}
                    </>
                )}

                {!loading && friendsList !== null && friendsList.friends.length < 1 && (
                    <div style={{ textAlign: 'center' }}>
                        <Img
                            radius={0}
                            style={{
                                width: 80,
                                height: 80,
                                margin: '0 auto',
                                marginBottom: 8
                            }}
                            src={require('../../assets/images/emoji/users_1.png')}
                        />
                        <p className="text-14-medium text-gray">{t('friendsYourFriendsListEmpty')}</p>
                    </div>
                )}
            </CellContainer>

            <Spacing size={80} />

            <InviteFriend />
        </Panel>
    );
};

export default Friends;