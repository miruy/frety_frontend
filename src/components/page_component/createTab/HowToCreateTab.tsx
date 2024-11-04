import {Guitar} from "lucide-react";
import * as React from "react";

const HowToCreateTab = () => {
    return (
        <div className="py-10 space-y-2">
            <div className="flex space-x-2 items-center">
                <Guitar className="size-5"/>
                <div className="text-[15px] font-semibold">악보 제작 방법</div>
            </div>

            <div className="text-sm ml-1.5 space-y-1">
                <div className="ml-5">1. 입력칸에 가사를 <span className="font-bold">직접 입력</span>하거나 <span
                    className="font-bold">붙여넣기</span>하여 가사를 업로드하세요.
                </div>
                <div className="text-muted-foreground ml-8"><span
                    className="font-bold">- Shift + Enter : </span>가사 줄바꿈
                </div>
                <div className="text-muted-foreground ml-8"><span className="font-bold">- Enter : </span>가사 업로드
                </div>
                <div className="text-muted-foreground ml-8"><span className="font-bold">- ESC : </span>코드 선택기 닫기
                </div>
                <div className="ml-5">2. 가사의 각 <span className="font-bold">음절</span>을 클릭하여 <span
                    className="font-bold">기타 코드</span>를 지정할 수 있습니다. (공백에도 코드 지정 가능)
                </div>
                <div className="ml-5">3. 악보 작성을 마쳤다면, <span className="font-bold">저장 버튼</span>을 눌러 당신의
                    악보를 <span className="font-bold">Frety</span>에 공유하세요!
                </div>
            </div>
        </div>
    )
}

export default HowToCreateTab;