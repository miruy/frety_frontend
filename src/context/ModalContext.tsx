'use client'

import React, {ReactNode, useState} from "react";
import {GetCommentByIdResponse} from "@/openapi/model";

interface IModalContext {
    modalState: IModal;
    openModal: (modalOptions: IOpenModal<ModalTypes>) => void;
    closeModal: (closeOptions: ICloseModal) => void;
}

export enum ModalTypes {

    // 악보 댓글/답글 수정
    TAB_COMMENT_UPDATE = "TAB_COMMENT_UPDATE",
}

type IModal = {
    // 악보 댓글/답글 수정
    [ModalTypes.TAB_COMMENT_UPDATE]: {
        isVisible: boolean,
        data: {
            tabId: number,
            commentId: number,
            comment: GetCommentByIdResponse,
        },
    },
}

const initialModalState: IModal = {
    // 악보 댓글/답글 수정
    [ModalTypes.TAB_COMMENT_UPDATE]: {
        isVisible: false,
        data: {
            tabId: 0,
            commentId: 0,
            comment: {}
        },
    },
};

export const ModalContext = React.createContext<IModalContext>({
    modalState: initialModalState,
    openModal: ({name, data}) => {
        console.log("Opening modal:", name, "with data:", data);
    },
    closeModal: ({name}) => {
        console.log("Closing modal:", name);
    },
});

export type IOpenModal<T extends ModalTypes> = {
    name: T;
    data?: IModal[T]['data'];
}

export type ICloseModal = {
    name: ModalTypes;
}

export function ModalProvider({children}: { children: ReactNode }) {
    const [modalState, setModalState] = useState<IModal>(initialModalState);

    const openModal: IModalContext["openModal"] = ({name, data}) => {
        setModalState((prev) => ({
            ...prev,
            [name]: {
                isVisible: true, data: data ?? {
                    tabId: 0,
                    commentId: 0,
                    comment: {}
                }
            },
        }));
    };

    const closeModal: IModalContext["closeModal"] = ({name}) => {
        setModalState((prev) => ({
            ...prev,
            [name]: {isVisible: false, data: initialModalState[name].data}, // 기본 상태로 복원합니다.
        }));
    };

    const contextValue = {
        modalState,
        openModal,
        closeModal,
    }

    return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
}