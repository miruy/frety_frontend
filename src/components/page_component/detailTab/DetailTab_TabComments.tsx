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
import {Ellipsis, Eraser, Trash2} from "lucide-react";
import {ModalContext, ModalTypes} from "@/context/ModalContext";

const DetailTab_TabComments = ({tabId}: { tabId: number }) => {

    const [commentValue, setCommentValue] = useState<string>("");
    const {openModal} = useContext(ModalContext);

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
                toast.success("성공적으로 댓글이 등록되었습니다.", {
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

                toast.success("성공적으로 댓글이 삭제되었습니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
                await commentIdsRefetch;

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
            type: "TAB"
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
            <div className="flex flex-col space-y-0.5 px-3">
                <div>정말 댓글을 삭제하시겠습니까?</div>
                <div className="flex justify-end items-center">
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
                    <div className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                        {comments.length}
                        개의 댓글
                    </div>
                )}

                <div className="flex flex-1 space-x-2">
                <textarea
                    value={commentValue}
                    onChange={(event) => setCommentValue(event.target.value)}
                    placeholder="댓글을 작성해보세요!"
                    className="flex-1 resize-none border bg-background outline-none rounded h-40 p-2">
                </textarea>

                    <Button
                        onClick={() => {
                            if (!commentValue) {
                                toast.error("내용을 입력하세요.", {
                                    position: "top-center",
                                    autoClose: 2500,
                                    transition: Slide,
                                    className: "text-sm",
                                    theme: "colored",
                                });
                                return
                            }

                            // if (!isLogined) {
                            //     toast.warning("로그인 후 이용가능합니다.", {
                            //         position: "top-center",
                            //         autoClose: 2500,
                            //         transition: Slide,
                            //         className: "text-sm",
                            //         theme: "colored",
                            //     });
                            //     return
                            // }

                            if (commentValue) {
                                onCreateCommentSubmit()
                            }
                        }}
                        className="flex w-24 h-40 rounded p-2 justify-center items-center">
                        <div>등록</div>
                    </Button>
                </div>
            </div>

            {/* 댓글 등록 */}
            <div className="py-10">
                {comments?.map((comment, index) => {
                    return (
                        <div key={index}>
                            <div className="p-3 border rounded-lg my-5">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm">댓글 작성자 미구현</div>

                                    <div className="flex items-center space-x-2">
                                        <div className="text-[14px]">답글 달기</div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon"
                                                        className="h-7"><Ellipsis/></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side="bottom" align="end" className="w-fit h-fit p-2">
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
                                                        <span className="text-[14px]">댓글 수정</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onClick={() => onDeleteSubmit(comment!.data!.id!)}
                                                    >
                                                        <Trash2/>
                                                        <span className="text-[14px]">댓글 삭제</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div>{comment.data?.content}</div>
                                <div
                                    className="text-xs text-primary/50">{comment.data?.updatedAt ? comment.data?.updatedAt : comment.data?.createdAt} 등록일
                                    또는 수정일 미구현
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DetailTab_TabComments;