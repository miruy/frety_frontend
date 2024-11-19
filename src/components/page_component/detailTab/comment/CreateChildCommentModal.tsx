import {useContext, useState} from "react";
import {ModalContext, ModalTypes} from "@/context/ModalContext";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Slide, toast} from "react-toastify";
import {useCreateComment, useSearchComments} from "@/openapi/api/comment/comment";
import {AuthContext} from "@/context/AuthContext";

const CreateChildCommentModal = () => {

    const {modalState, closeModal} = useContext(ModalContext);
    const [commentValue, setCommentValue] = useState<string>("");
    const {tabId, parentCommentId} = modalState[ModalTypes.TAB_CHILD_COMMENT_CREATE].data;
    const {loginId} = useContext(AuthContext);

    // 댓글 아이디 전체 조회
    const {
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

    const {mutate: createComment} = useCreateComment({
        mutation: {
            onSuccess: async () => {
                setCommentValue("");
                toast.success("성공적으로 답글이 등록되었습니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
                closeModal({
                    name: ModalTypes.TAB_CHILD_COMMENT_CREATE,
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

    const onCreateCommentSubmit = () => createComment({
        data: {
            content: commentValue,
            targetId: tabId,
            parentCommentId: parentCommentId,
            type: "TAB",
            userName: loginId!,
        }
    })

    return (
        <Dialog open={modalState[ModalTypes.TAB_CHILD_COMMENT_CREATE].isVisible}>
            <DialogContent
                className="flex flex-col min-w-[80%] lg:min-w-[60%] h-auto rounded-lg z-50 outline-0 px-3 py-5 sm:p-6">

                <div>
                    <DialogHeader className="flex justify-center items-center">
                        <DialogTitle>답글</DialogTitle>
                    </DialogHeader>

                    <div
                        className="flex bg-transparent py-6">
                        <textarea
                            value={commentValue}
                            onChange={(event) => setCommentValue(event.target.value)}
                            placeholder="답글을 남겨보세요!"
                            className="flex-1 resize-none border bg-background outline-none rounded h-40 p-2">
                         </textarea>
                    </div>

                    <DialogFooter className="flex-row flex justify-center sm:justify-end space-x-3 sm:space-x-3">
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
                            className="w-auto"
                        >
                            등록
                        </Button>
                        <DialogClose asChild>
                            <Button
                                className="hover:bg-secondary-hover"
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setCommentValue("");
                                    closeModal({
                                        name: ModalTypes.TAB_CHILD_COMMENT_CREATE
                                    });
                                }}
                            >
                                닫기
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default CreateChildCommentModal;