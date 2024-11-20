'use client';

import {Separator} from "@/components/ui/separator";
import MyCreatedTabs from "@/components/page_component/myTab/MyCreatedTabs";
import MyVotedTabs from "@/components/page_component/myTab/MyVotedTabs";
import MyFavoriteTabs from "@/components/page_component/myTab/MyFavoriteTabs";

const MyTabs = ({userName}: { userName: string }) => {
    return (
        <div className="px-3 py-10 mx-auto w-full lg:w-[70%] space-y-10">

            {/* 제작한 악보 */}
            <MyCreatedTabs userName={userName}/>

            <Separator className="w-full"/>

            {/* 즐겨찾는 악보 */}
            <MyFavoriteTabs userName={userName}/>

            <Separator className="w-full"/>

            {/* 투표한 악보 */}
            <MyVotedTabs userName={userName}/>

        </div>
    )
}

export default MyTabs;