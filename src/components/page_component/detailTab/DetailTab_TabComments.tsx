'use client';

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Slide, toast} from "react-toastify";
import {getCommentById, useCreateComment, useSearchComments} from "@/openapi/api/comment/comment";
import {useQueries} from '@tanstack/react-query';

const DetailTab_TabComments = ({tabId}: { tabId: number }) => {

    const [commentValue, setCommentValue] = useState<string>("");

    // 댓글 아이디 전체 조회
    const {
        data: commentIds,
        refetch: commentsRefetch,
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
                await commentsRefetch();
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

    return (
        <div className="py-10">

            {/* 댓글 등록 */}
            <div className="flex flex-col">
                {commentIds && (
                    <div className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                        {commentIds.length}
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
            <div className="py-10 bg-blue-100">
                {comments?.map((comment, index) => {
                    return (
                        <div key={index}>
                            <div>{comment.data?.content}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DetailTab_TabComments;