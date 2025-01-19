import {Guitar} from "lucide-react";
import * as React from "react";

const HowToEditTab = () => {
    return (
        <div className="py-10 space-y-2">
            <div className="flex space-x-2 items-center">
                <Guitar className="size-5"/>
                <div className="text-[15px] font-semibold">악보 수정 방법</div>
            </div>

            <div className="text-sm ml-1.5 space-y-1">
                <div className="ml-5">1. 수정하고 싶은 <span className="font-bold">음절</span>을 클릭하여
                    <span className="font-bold"> 기타 코드</span>를 수정하세요.
                </div>

                <div className="ml-5">2. 가사와 코드를 새로 추가할 수 있습니다.</div>
                <>
                    <div className="text-muted-foreground ml-8"><span
                        className="font-bold">- Shift + Enter : </span>가사 줄바꿈
                    </div>
                    <div className="text-muted-foreground ml-8"><span className="font-bold">- Enter : </span>가사 업로드
                    </div>
                    <div className="text-muted-foreground ml-8"><span className="font-bold">- ESC : </span>코드 선택기 닫기
                    </div>
                </>

                <div className="ml-5">3. 위치 변경을 원하는 가사 줄을<span className="font-bold">드래그 앤 드롭</span>하여 변경할 수 있습니다.</div>

                <div className="ml-5">4. 악보 수정을 마쳤다면, <span className="font-bold">저장 버튼</span>을 눌러 수정된 악보를
                    <span className="font-bold"> Frety</span>에 공유하세요!
                </div>
            </div>
        </div>
    )
}

export default HowToEditTab;