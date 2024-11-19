'use client';

import {useContext, useState} from "react";
import {Button} from "@/components/ui/button";
import {Slide, toast} from "react-toastify";
import {getCommentById, useCreateComment, useDeleteComment, useSearchComments} from "@/openapi/api/comment/comment";
import {useQueries} from '@tanstack/react-query';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    CornerDownRight,
    Ellipsis,
    Eraser, Guitar,
    Trash2
} from "lucide-react";
import {ModalContext, ModalTypes} from "@/context/ModalContext";
import formatTimeSince from "@/utils/formatTimeSince";
import {AuthContext} from "@/context/AuthContext";

const DetailTab_TabComments = ({tabId}: { tabId: number }) => {

    const [commentValue, setCommentValue] = useState<string>("");
    const {openModal} = useContext(ModalContext);
    const {loginId, isLoggedIn} = useContext(AuthContext);

    // 댓글 아이디 전체 조회
    const {
        data: commentIds,
        refetch: commentIdsRefetch,
    } = useSearchComments({
            targetId: tabId,
            type: "TAB"
        },
        {
            query: {
                queryKey: ['TabComments', tabId],
            }
        });


    // 전체 조회된 댓글 아이디로 댓글 내용 조회(= 댓글 단건 조회)
    const commentIdArray = commentIds?.map(commentId => commentId.id);
    // useQueries를 사용하여 배열 형태의 데이터를 하나씩 여러 쿼리 요청
    const comments = useQueries({
        queries: commentIdArray?.map(commentId => ({
            queryKey: ["TabComment", commentId],
            queryFn: () => getCommentById(commentId!),  // 실제 API 호출 함수
            enabled: !!commentId  // commentId가 있을 때만 요청
        })) || []
    });

    const {mutate: createComment} = useCreateComment({
        mutation: {
            onSuccess: async () => {
                setCommentValue("");
                toast.success("성공적으로 등록되었습니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
                await commentIdsRefetch();
            },
            onError: (error) => {
                console.log(error)
                toast.error("관리자에게 문의하세요", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
            }
        }
    })

    // 댓글 삭제
    const {mutate: deleteComment} = useDeleteComment({
        mutation: {
            onSuccess: async () => {
                toast.dismiss();

                toast.success("성공적으로 삭제되었습니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
                commentIdsRefetch();

            },
            onError: (error) => {
                console.log(error)
                toast.error("관리자에게 문의하세요", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
            }
        }
    })

    const onCreateCommentSubmit = () => createComment({
        data: {
            content: commentValue,
            targetId: tabId,
            type: "TAB",
            userName: loginId!
        }
    })

    const DeleteAlert = ({commentId}: { commentId: number }) => {

        const handleCancel = () => {
            toast.dismiss();
        }

        const handleDelete = () => {
            deleteComment({commentId: commentId});
        };

        return (
            <div className="flex items-center justify-between space-x-2">
                <div>정말 삭제하시겠습니까?</div>
                <div className="flex items-center">
                    <Button type="button" variant="ghost" size="sm" className="text-xs w-fit h-fit px-2 py-1.5"
                            onClick={handleCancel}>취소</Button>
                    <Button type="button" variant="ghost" size="sm" className="text-xs w-fit h-fit px-2 py-1.5"
                            onClick={handleDelete}>삭제</Button>
                </div>
            </div>
        );
    };

    const onDeleteSubmit = (commentId: number) => {
        toast.info(<DeleteAlert commentId={commentId}/>, {
            position: "top-center",
            transition: Slide,
            className: "text-sm",
            theme: "colored",
            autoClose: false,
            closeButton: false
        },);
    }

    return (
        <div className="py-10">

            {/* 댓글 등록 */}
            <div className="flex flex-col">
                {comments && (
                    <div className="mb-1 font-semibold text-gray-700 dark:text-gray-300 select-none">
                        {comments.length}
                        개의 댓글
                    </div>
                )}

                <div className="flex flex-1 space-x-2">
                    <textarea
                        value={commentValue}
                        disabled={!isLoggedIn}
                        onChange={(event) => setCommentValue(event.target.value)}
                        placeholder={isLoggedIn ? "댓글을 남겨보세요." : "로그인 후 이용해주세요."}
                        className="flex-1 resize-none border bg-background outline-none rounded h-40 p-2">
                    </textarea>

                    <Button
                        onClick={() => {

                            if (!isLoggedIn) {
                                toast.warn("로그인 후 이용가능합니다.", {
                                    position: "top-center",
                                    autoClose: 2500,
                                    transition: Slide,
                                    className: "text-sm",
                                    theme: "colored",
                                });

                                return;
                            }

                            if (!commentValue) {
                                toast.error("내용을 입력하세요.", {
                                    position: "top-center",
                                    autoClose: 2500,
                                    transition: Slide,
                                    className: "text-sm",
                                    theme: "colored",
                                });
                                return;
                            }

                            if (commentValue) {
                                onCreateCommentSubmit();
                            }
                        }}
                        className="flex w-24 h-40 rounded p-2 justify-center items-center">
                        <div>등록</div>
                    </Button>
                </div>
            </div>

            {/* 댓글 리스트 */}
            <div className="py-10">
                {comments?.map((comment, index) => {
                    return (
                        comment.data?.parentCommentId === null && (
                            <div key={index} className="p-3 border rounded-lg my-5">

                                {/* 댓글 표시 */}
                                <div className="pb-5">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-1.5">
                                            <Guitar className="w-5 h-5"/>
                                            <div className="font-semibold">{comment.data.userName}</div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                className="text-[13px] w-fit h-7 px-2.5"
                                                onClick={() => {
                                                    if (!isLoggedIn) {
                                                        toast.warn("로그인 후 이용가능합니다.", {
                                                            position: "top-center",
                                                            autoClose: 2500,
                                                            transition: Slide,
                                                            className: "text-sm",
                                                            theme: "colored",
                                                        });

                                                        return;
                                                    }

                                                    openModal({
                                                        name: ModalTypes.TAB_CHILD_COMMENT_CREATE,
                                                        data: {
                                                            tabId: tabId,
                                                            parentCommentId: comment!.data!.id!,
                                                        }
                                                    });
                                                }}
                                            >
                                                답글 달기
                                            </Button>

                                            {isLoggedIn && comment.data.userName === loginId &&
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline" size="icon"
                                                                className="h-7"><Ellipsis/></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent side="bottom" align="end"
                                                                         className="w-fit h-fit p-2">
                                                        <DropdownMenuGroup>
                                                            <DropdownMenuItem
                                                                className="cursor-pointer"
                                                                onClick={() => {
                                                                    openModal({
                                                                        name: ModalTypes.TAB_COMMENT_UPDATE,
                                                                        data: {
                                                                            tabId: tabId,
                                                                            commentId: comment!.data!.id!,
                                                                            comment: comment.data!
                                                                        }
                                                                    });
                                                                }}
                                                            >
                                                                <Eraser/>
                                                                <span className="text-[13px]">댓글 수정</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="cursor-pointer"
                                                                onClick={() => onDeleteSubmit(comment!.data!.id!)}
                                                            >
                                                                <Trash2/>
                                                                <span className="text-[13px]">댓글 삭제</span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuGroup>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            }
                                        </div>
                                    </div>

                                    <div>{comment.data?.content}</div>
                                    <div
                                        className="text-xs text-primary/50">
                                        {comment.data?.updatedAt !== comment.data?.createdAt ?
                                            <>{comment.data?.updatedAt && formatTimeSince(new Date(comment.data.updatedAt))} 수정됨</>
                                            :
                                            <>{comment.data?.createdAt && formatTimeSince(new Date(comment.data.createdAt))}</>
                                        }
                                    </div>
                                </div>

                                {/* 답글 표시 */}
                                {comments
                                    .filter((childComment) => childComment.data?.parentCommentId === comment.data?.id) // 자식 댓글 필터링
                                    .map((childComment, childIndex) => (
                                        <div key={childIndex} className="flex items-center">
                                            <CornerDownRight className="w-5 ml-2 mr-5 text-primary/50"/>

                                            <div className="flex flex-1 border-t">
                                                <div className="flex flex-1 flex-col py-3">
                                                    <div className="flex justify-between items-center">
                                                        <div
                                                            className="text-sm font-semibold">{childComment.data?.userName}</div>

                                                        {isLoggedIn && childComment.data?.userName === loginId &&
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="outline" size="icon"
                                                                            className="h-7"><Ellipsis/></Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent side="bottom" align="end"
                                                                                     className="w-fit h-fit p-2">
                                                                    <DropdownMenuGroup>
                                                                        <DropdownMenuItem
                                                                            className="cursor-pointer"
                                                                            onClick={() => {
                                                                                openModal({
                                                                                    name: ModalTypes.TAB_COMMENT_UPDATE,
                                                                                    data: {
                                                                                        tabId: tabId,
                                                                                        commentId: childComment!.data!.id!,
                                                                                        comment: childComment.data!
                                                                                    }
                                                                                });
                                                                            }}
                                                                        >
                                                                            <Eraser/>
                                                                            <span className="text-[13px]">답글 수정</span>
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            className="cursor-pointer"
                                                                            onClick={() => onDeleteSubmit(childComment!.data!.id!)}
                                                                        >
                                                                            <Trash2/>
                                                                            <span className="text-[13px]">답글 삭제</span>
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuGroup>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        }
                                                    </div>

                                                    <div>{childComment.data?.content}</div>
                                                    <div
                                                        className="text-xs text-primary/50">
                                                        {childComment.data?.updatedAt !== childComment.data?.createdAt ?
                                                            <>{childComment.data?.updatedAt && formatTimeSince(new Date(childComment.data.updatedAt))} 수정됨</>
                                                            :
                                                            <>{childComment.data?.createdAt && formatTimeSince(new Date(childComment.data.createdAt))}</>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )
                    )
                })}
            </div>
        </div>
    )
}

export default DetailTab_TabComments;