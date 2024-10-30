'use client';

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const Login = () => {
    return (
        <div className="px-3 py-10 mx-auto w-full md:w-[60%] xl:w-[40%] space-y-10">
            <div className="space-y-2 border-b pb-2">
                <div className="text-4xl font-bold tracking-wide">로그인</div>
                <div className="text-lg font-semibold tracking-wide text-primary/50">로그인 후 이용해 주세요.</div>
            </div>

            <div className="flex justify-center items-center">
                <form className="w-full space-y-5">
                    <div className="space-y-5">
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="absolute top-[18px] left-3 h-4 w-4 opacity-60">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
                            </svg>
                            <Input type="text" className="h-[50px] pl-9" placeholder="아이디"/>
                        </div>

                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="absolute top-[18px] left-3 h-4 w-4 opacity-60">
                                <path
                                    fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd"/>
                            </svg>
                            <Input type="password" className="h-[50px] pl-9" placeholder="비밀번호"/>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button type="submit" className="btn btn-neutral w-full h-[50px]">로그인</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;