import { AvatarType } from "../../../../components/avatar/types";
export type ChatItemType = {
    id: number;
    chatName: string;
    lastMessage: {
        id: number;
        name: string;
        text: string;
        date: Date;
    };
    unreadMessageCount: number;
    chatIcon: AvatarType;
};
