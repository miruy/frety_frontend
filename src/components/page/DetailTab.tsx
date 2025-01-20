'use client';

import {Switch} from "@/components/ui/switch";
import React, {useContext, useEffect, useRef, useState} from "react";
import {chordsMap} from "@/data/chordsMap";
import {commonConfigs, customConfigs} from "@/data/drawChordDiagram";
import {GetTabByIdResponse} from "@/openapi/model";
import {Content} from "@/components/model/tab";
import {SVGuitarChord} from "svguitar";
import {getTabById} from "@/openapi/api/tab/tab";
import DetailTab_TabInfo from "@/components/page_component/detailTab/DetailTab_TabInfo";
import DetailTab_TabComments from "@/components/page_component/detailTab/DetailTab_TabComments";
import UpdateCommentModal from "@/components/page_component/detailTab/comment/UpdateCommentModal";
import CreateChildCommentModal from "@/components/page_component/detailTab/comment/CreateChildCommentModal";
import {useQuery} from "@tanstack/react-query";
import {AuthContext} from "@/context/AuthContext";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import DetailTab_TabAuthorMenu from "@/components/page_component/detailTab/DetailTab_TabAuthorMenu";
import DetailTab_TabAutoScrollButton from "@/components/page_component/detailTab/DetailTab_TabAutoScrollButton";

const DetailTab = ({detailTab, tabId}: { detailTab: GetTabByIdResponse, tabId: number }) => {

    const [showDiagram, setShowDiagram] = useState<boolean>(true);
    const tabContentRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);
    const {loginId, isLoggedIn} = useContext(AuthContext);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null); // 스크롤 컨테이너 참조

    // 최근등록순 악보 전체조회 클라이언트사이드 렌더링 + 페이지네이션
    const {
        data: tab,
        isLoading: isLoading,
        isError: isError,
    } = useQuery({
        queryKey: ['DetailTab', tabId],
        queryFn: () => getTabById(tabId),
        initialData: detailTab ? detailTab : undefined,
        staleTime: 0
    });

    useEffect(() => {

        if (tabContentRef.current) {

            tabContentRef.current.innerHTML = "";

            if (tab) {
                setLoading(false);

                try {
                    // console.log("contnet", tab.content)
                    // JSON 문자열을 객체로 변환
                    const parsedTab = JSON.parse(tab.content!);

                    const tabDiv = document.createElement('div');
                    tabDiv.className = "flex flex-col py-[70px]";

                    parsedTab.forEach((item: Content) => {
                        const lineDiv = document.createElement('div');
                        lineDiv.className = `flex flex-col items-center my-1 pt-20 mx-auto`;

                        const syllableContainerDiv = document.createElement('div');
                        syllableContainerDiv.className = "flex relative p-1";

                        item.lineData.forEach((line) => {
                            const syllabelDiv = document.createElement('div');
                            syllabelDiv.className = "flex flex-col relative";

                            const diagram_chordDiv = document.createElement('div');
                            diagram_chordDiv.className = "flex flex-col items-center justify-center";

                            if (line.chord) {
                                // 코드 다이어그램 출력
                                const chordDiagramDiv = document.createElement('div');
                                const chordDiagram = new SVGuitarChord(chordDiagramDiv);
                                const chord = chordsMap[line.chord];
                                const customConfig = customConfigs[line.chord]; // 프렛 설정을 위한 커스텀 설정
                                chordDiagramDiv.className = `${showDiagram ? 'flex' : 'hidden'} ${customConfig ? 'w-[55px] h-[55px] ' : 'w-11 h-11'} items-center absolute mt-[-96px]`;

                                // chordDiagram
                                //     .configure({
                                //         ...commonConfigs,
                                //         ...customConfig,
                                //     })
                                //     .chord(chord)
                                //     .draw()

                                // 프랫 번호 위치 설정
                                const tuningText = chordDiagramDiv.querySelectorAll('text.tuning');
                                if (tuningText.length > 1) {

                                    const currentX = parseFloat(tuningText[0].getAttribute('x') || '0');
                                    const currentY = parseFloat(tuningText[0].getAttribute('y') || '0');

                                    tuningText[0].setAttribute('x', (currentX - 177).toString()); // 왼쪽으로 이동
                                    tuningText[0].setAttribute('y', (currentY + 50).toString());   // 아래로 이동
                                }
                                diagram_chordDiv.appendChild(chordDiagramDiv);


                                // 코드 출력
                                const chordWithoutParenthesis = line.chord.split('(')[0].trim();
                                const chordDiv = document.createElement('div');
                                chordDiv.className = `absolute text-[13px] tracking-tighter font-semibold text-primary/60 text-center cursor-default
                                        ${chordWithoutParenthesis?.length === 1 && `left-2.5 w-[10px]`}
                                        ${chordWithoutParenthesis?.length === 2 && `left-1.5 w-[20px]`}
                                        ${chordWithoutParenthesis?.length === 3 && `-left-[4px] w-[40px]`}
                                        ${chordWithoutParenthesis?.length === 4 && `-left-[11px] w-[50px]`}
                                        ${chordWithoutParenthesis?.length === 5 && `-left-[19px] w-[60px]`}
                                        ${chordWithoutParenthesis?.length === 6 && `-left-[16px] w-[60px]`}
                                        ${chordWithoutParenthesis.length === 7 && '-left-[18px] w-[70px]'}
                                        ${chordWithoutParenthesis.length === 8 && '-left-[20px] w-[70px]'}
                                        ${tuningText.length > 1 ? 'mt-[-15px]' : 'mt-[-35px]'}
                    `;
                                chordDiv.textContent = chordWithoutParenthesis;


                                // 코드에 마우스 호버 시 다이어그램툴팁 표시
                                if (!showDiagram) {
                                    const tooltipDiv = document.createElement('div');
                                    tooltipDiv.className = `absolute flex flex-col items-center left-3 top-full mt-1 bg-white shadow-lg z-[1000] text-white text-xs rounded p-3.5 hidden`;


                                    // 코드 이름 출력
                                    const tooltipTitleDiv = document.createElement('div');
                                    tooltipTitleDiv.className = 'flex font-semibold text-[16px] text-primary';
                                    tooltipTitleDiv.textContent = chordWithoutParenthesis;
                                    tooltipDiv.appendChild(tooltipTitleDiv);

                                    // 코드 다이어그램 출력
                                    const tooltipContentDiv = document.createElement('div');
                                    const chordDiagram = new SVGuitarChord(tooltipContentDiv);
                                    const chord = chordsMap[line.chord];
                                    const customConfig = customConfigs[line.chord]; // 프렛 설정을 위한 커스텀 설정
                                    tooltipContentDiv.className = `${customConfig ? 'w-[55px] h-[55px]' : 'w-12 h-12 mr-2.5'}`;

                                    // chordDiagram
                                    //     .configure({
                                    //         ...commonConfigs,
                                    //         ...customConfig,
                                    //     })
                                    //     .chord(chord)
                                    //     .draw()

                                    // 프랫 번호 위치 설정
                                    const tuningText = tooltipContentDiv.querySelectorAll('text.tuning');
                                    if (tuningText.length > 1) {

                                        const currentX = parseFloat(tuningText[0].getAttribute('x') || '0');
                                        const currentY = parseFloat(tuningText[0].getAttribute('y') || '0');

                                        tuningText[0].setAttribute('x', (currentX - 177).toString()); // 왼쪽으로 이동
                                        tuningText[0].setAttribute('y', (currentY + 40).toString());   // 아래로 이동
                                    }
                                    tooltipDiv.appendChild(tooltipContentDiv);


                                    chordDiv.appendChild(tooltipDiv);

                                    // 마우스 이벤트로 툴팁 표시/숨기기
                                    chordDiv.addEventListener('mouseenter', () => {
                                        tooltipDiv.classList.remove('hidden');
                                    });
                                    chordDiv.addEventListener('mouseleave', () => {
                                        tooltipDiv.classList.add('hidden');
                                    });
                                }


                                diagram_chordDiv.appendChild(chordDiv);

                            }
                            syllabelDiv.appendChild(diagram_chordDiv);


                            // 음절 출력
                            const textDiv = document.createElement('div');
                            textDiv.className = "relative inline-block min-w-[16px] mx-1 text-center";
                            textDiv.innerHTML = line.text === ' ' ? '&nbsp;&nbsp;&nbsp;' : line.text;
                            syllabelDiv.appendChild(textDiv);

                            syllableContainerDiv.appendChild(syllabelDiv);
                        });

                        lineDiv.appendChild(syllableContainerDiv);

                        // comment 출력
                        const commentDiv = document.createElement('div');
                        commentDiv.className = "font-semibold py-1";
                        commentDiv.textContent = item.comment;
                        lineDiv.appendChild(commentDiv);

                        // tabDiv에 각 항목 추가
                        tabDiv.appendChild(lineDiv);
                    });

                    tabContentRef.current.appendChild(tabDiv);

                } catch (error) {
                    console.log("코드 파싱 실패", error)
                }
            }

        }

    }, [detailTab, tab, tabId, showDiagram]);

    if (isLoading || loading) {
        return <Loading/>
    }

    if (isError) {
        return <NotFound/>
    }

    return (
        <>
            <div className="px-3 py-10 mx-auto w-full xl:w-[70%] h-screen">
                <div className="space-y-2 border-b pb-2">
                    <div className="text-2xl sm:text-4xl font-bold tracking-wide">{tab?.song}</div>
                    <div className="text-md sm:text-lg font-semibold tracking-wide text-primary/50">{tab?.artist}</div>
                </div>

                <div className="flex justify-between py-2">
                    <div>
                        <div className="flex items-center space-x-2 tracking-wide text-sm">
                            <div>Capo</div>
                            <div>:</div>
                            <div>{tab?.capo}</div>
                        </div>

                        <div className="flex items-center space-x-2 tracking-wide text-sm">
                            <div>Style</div>
                            <div>:</div>
                            <div>{tab?.style}</div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* 자동 스크롤 속도조절 버튼 */}
                        <DetailTab_TabAutoScrollButton scrollContainerRef={scrollContainerRef}/>

                        {/* 코드 다이어그램 숨기기 버튼 */}
                        <div className="hidden sm:flex items-center border h-10 rounded-md px-3">
                            <label className="label cursor-pointer">
                                <div className="flex items-center space-x-2">
                                    <img id="offChord" src="/image/offChord.png" alt="chord_off" className="w-[22px]"/>
                                    <Switch checked={showDiagram} className="h-5 w-10"
                                            onClick={() => setShowDiagram(!showDiagram)}/>
                                    <img id="onChord" src="/image/onChord.png" alt="chord_on" className="w-[20px]"/>
                                </div>
                            </label>
                        </div>

                        {isLoggedIn &&
                        loginId === tab?.authorName ?
                            <DetailTab_TabAuthorMenu tabId={tab.id!}/>
                            : <></>
                        }
                    </div>
                </div>

                <div ref={scrollContainerRef} className="h-screen overflow-x-scroll">
                    {/* 악보 내용 */}
                    <div ref={tabContentRef}/>
                </div>

                {/* 악보 정보 */}
                <DetailTab_TabInfo tab={tab!}/>

                {/* 댓글 */}
                <DetailTab_TabComments tabId={tab!.id!}/>
            </div>

            <UpdateCommentModal/>
            <CreateChildCommentModal/>
        </>
    )
}

export default DetailTab;