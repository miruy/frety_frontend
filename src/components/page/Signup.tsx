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
                            <svg
                                className="bi bi-incognito absolute top-[18px] left-3 h-4 w-4 opacity-60"
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5"/>
                            </svg>
                            <Input type="text"
                                   {...createUserRequest.register("name")}
                                   className="h-[50px] pl-9" placeholder="활동명"/>
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