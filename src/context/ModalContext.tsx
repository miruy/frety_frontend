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

    // 악보 답글 달기 모달
    TAB_CHILD_COMMENT_CREATE = "TAB_CHILD_COMMENT_CREATE",
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

    // 악보 답글 달기 모달
    [ModalTypes.TAB_CHILD_COMMENT_CREATE]: {
        isVisible: boolean,
        data: {
            tabId: number, // targetId
            parentCommentId: number, // commentId
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

    // 악보 답글 달기 모달
    [ModalTypes.TAB_CHILD_COMMENT_CREATE]: {
        isVisible: false,
        data: {
            tabId: 0, // targetId
            parentCommentId: 0, // commentId
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
                isVisible: true, data: data ?? {}
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