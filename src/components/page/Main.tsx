'use client';

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button"

const Main = () => {

    const router = useRouter();

    const startFrety = () => {
        router.push("/tabs")
    }

    return (
        <div className="flex-1 flex justify-center items-center relative">
            <div className="absolute top-0 bottom-0 left-0 p-20 flex flex-col justify-center space-y-5 items-center">
                <div
                    className="text-foreground/50 text-xl font-semibold tracking-wide animate-fade-up animate-delay-[500ms] animate-duration-[1700ms]">
                    연주하고 싶은 곡의 기타악보를 찾지 못하셨나요?
                </div>
                <div
                    className="text-foreground/80 text-xl font-semibold tracking-wide animate-fade-up animate-delay-[1500ms] animate-duration-[1700ms]">
                    Frety에서 쉽고 간편하게 나만의 기타악보를 제작해보세요!
                </div>
            </div>

            <img src="/image/guitar.png" className="w-[25%] h-fit animate-jump" alt="fretyImage"/>

            <div
                className="absolute top-0 bottom-0 right-0 p-20 flex flex-col items-center justify-center w-fit space-y-[50px] animate-fade animate-delay-[2500ms] animate-duration-[1700ms]">
                <div className="font-bold tracking-wide text-center space-y-5">
                    <div className="text-4xl">프렛위에서 완성되는 당신의 기타 코드</div>
                    <div className="text-7xl">Frety</div>
                </div>

                <Button variant="outline"
                        className="w-[50%] p-8 hover:bg-primary hover:text-primary-foreground"
                        onClick={startFrety}>
                    <span className="text-2xl font-bold tracking-wide">Frety 시작하기</span>
                </Button>
            </div>
        </div>
    );
}

export default Main;