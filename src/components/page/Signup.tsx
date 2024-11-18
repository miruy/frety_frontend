'use client';

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {CreateUserRequest} from "@/openapi/model";
import {Slide, toast} from "react-toastify";
import {useCreateUser} from "@/openapi/api/user/user";
import {useRouter} from "next/navigation";

const Signup = () => {

    const router = useRouter();

    const createUserRequest = useForm<CreateUserRequest>({
        defaultValues: {},
    });

    const {mutate: createUser} = useCreateUser({
        mutation: {
            onSuccess: async () => {
                toast.success("성공적으로 회원가입이 완료되었습니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
                router.push(`/login`);
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
            },
        }
    })

    const onCreateUserSubmit = () => {

        createUserRequest.setValue("method", "ID_PASSWORD");

        if (!createUserRequest.getValues().name) {
            toast.error("활동명을 입력하세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        if (!createUserRequest.getValues().loginId) {
            toast.error("아이디를 입력하세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        if (createUserRequest.getValues().loginId.length < 3) {
            toast.error("아이디는 3글자 이상이어야 합니다.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        if (!createUserRequest.getValues().password) {
            toast.error("비밀번호를 입력하세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        const isValidPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{5,}$/.test(createUserRequest.getValues().password);
        if (!isValidPassword) {
            toast.error("비밀번호는 문자, 숫자, 특수문자를 포함한 5글자 이상이어야 합니다.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        if (createUserRequest.getValues().name &&
            createUserRequest.getValues().loginId &&
            createUserRequest.getValues().password &&
            isValidPassword
        ) {

            createUser({
                data: createUserRequest.getValues()
            });

        }
    }

    return (
        <div className="px-3 py-10 mx-auto w-full md:w-[60%] xl:w-[40%] space-y-10">
            <div className="space-y-2 border-b pb-2">
                <div className="text-2xl sm:text-4xl font-bold tracking-wide">회원가입</div>
                <div className="text-md sm:text-lg font-semibold tracking-wide text-primary/50">간단한 회원가입으로 Frety를 자유롭게
                    이용해 보세요.
                </div>
            </div>

            <div className="flex justify-center items-center">
                <form className="w-full space-y-5">
                    <div className="space-y-5">
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-person-badge absolute top-[18px] left-[11px] h-[18px] w-[18px] opacity-60"
                                 viewBox="0 0 16 16">
                                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                <path
                                    d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z"/>
                            </svg>
                            <Input type="text"
                                   {...createUserRequest.register("name")}
                                   className="h-[50px] pl-9" placeholder="이름"/>
                        </div>

                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="absolute top-[18px] left-3 h-4 w-4 opacity-60">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
                            </svg>
                            <Input type="text"
                                   {...createUserRequest.register("loginId")}
                                   className="h-[50px] pl-9" placeholder="아이디"/>
                        </div>

                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="absolute top-[18px] left-3 h-4 w-4 opacity-60">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd"/>
                            </svg>
                            <Input type="password"
                                   {...createUserRequest.register("password")}
                                   className="h-[50px] pl-9" placeholder="비밀번호"/>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button type="button" onClick={onCreateUserSubmit}
                                className="btn btn-neutral w-full h-[50px]">로그인</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;