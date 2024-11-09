import {useContext, useEffect} from "react";
import {ModalContext, ModalTypes} from "@/context/ModalContext";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Controller, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {UpdateCommentRequest} from "@/openapi/model";
import {Slide, toast} from "react-toastify";
import {getCommentById, useSearchComments, useUpdateComment} from "@/openapi/api/comment/comment";
import {useQueries} from "@tanstack/react-query";

const UpdateCommentModal = () => {

    const {modalState, closeModal} = useContext(ModalContext);
    const {tabId, commentId, comment} = modalState[ModalTypes.TAB_COMMENT_UPDATE].data;

    /* 댓글 수정 후 다시 조회 */
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

    const commentIdArray = commentIds?.map(commentId => commentId.id);
    const comments = useQueries({
        queries: commentIdArray?.map(commentId => ({
            queryKey: ["TabComment", commentId],
            queryFn: () => getCommentById(commentId!),  // 실제 API 호출 함수
            enabled: !!commentId  // commentId가 있을 때만 요청
        })) || []
    });

    const refetchAllComments = () => {
        comments.forEach(query => {
            query.refetch?.();  // optional chaining을 사용해서 refetch가 있을 때만 실행
        });
    };
    /* 댓글 수정 후 다시 조회 */

    // 댓글 수정
    const {mutate: updateMemoComment} = useUpdateComment({
        mutation: {
            onSuccess: async () => {
                toast.success("성공적으로 수정되었습니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
                await commentsRefetch();
                await refetchAllComments();
                closeModal({
                    name: ModalTypes.TAB_COMMENT_UPDATE
                });
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

    const updateTabCommentForm = useForm<UpdateCommentRequest>({
        defaultValues: {
            content: ""
        }
    });

    // 댓글 수정
    const onUpdateCommentSubmit = (data: UpdateCommentRequest) => updateMemoComment({
        commentId: commentId,
        data: data,
    });

    const handleUpdateTabCommentSubmit = (data: UpdateCommentRequest) => {
        if (!data.content) {
            toast.error("내용을 입력하세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        if (data.content) {
            onUpdateCommentSubmit(data)
        }
    }

    useEffect(() => {
        if (comment) {
            updateTabCommentForm.reset(
                {
                    content: comment.content
                }
            )
        }
    }, [comment]);

    return (
        <Dialog open={modalState[ModalTypes.TAB_COMMENT_UPDATE].isVisible}>
            <DialogContent
                className="flex flex-col min-w-[80%] lg:min-w-[60%] h-auto rounded-lg z-50 outline-0 px-3 py-5 sm:p-6">

                <form onSubmit={updateTabCommentForm.handleSubmit(handleUpdateTabCommentSubmit)}>
                    <DialogHeader className="flex justify-center items-center">
                        <DialogTitle>수정</DialogTitle>
                    </DialogHeader>

                    <div
                        className="flex bg-transparent py-6">
                        <Controller
                            control={updateTabCommentForm.control}
                            name="content"
                            render={({field: {onChange, value}}) => (
                                <textarea
                                    value={value}
                                    onChange={onChange}
                                    placeholder="댓글을 남겨보세요!"
                                    className="flex-1 resize-none border bg-background outline-none rounded h-40 p-2">

                                 </textarea>
                            )}
                        />
                    </div>

                    <DialogFooter className="flex-row flex justify-center sm:justify-end space-x-3 sm:space-x-3">
                        <Button
                            type="submit"
                            className="w-auto"
                        >
                            저장
                        </Button>
                        <DialogClose asChild>
                            <Button
                                className="hover:bg-secondary-hover"
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    closeModal({
                                        name: ModalTypes.TAB_COMMENT_UPDATE
                                    });
                                }}
                            >
                                닫기
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default UpdateCommentModal;