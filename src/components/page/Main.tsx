'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import LatestTabs from "@/components/page_component/LatestTabs";
import PopularTabs from "@/components/page_component/PopularTabs";
import {useRouter} from "next/navigation";

const Main = () => {

    const router = useRouter();

    return (
        <div className="px-3 py-20 mx-auto lg:w-[70%] space-y-10">
            <div className="space-y-2 border-b pb-2">
                <div className="text-4xl font-bold tracking-wide">Frety</div>
                <div className="text-lg font-semibold tracking-wide text-primary/50">프렛위에서 완성되는 당신의 기타 코드</div>
            </div>

            <Tabs defaultValue="latest" className="flex-1">
                <TabsList>
                    <TabsTrigger value="latest">최근 등록된 악보</TabsTrigger>
                    <TabsTrigger value="popular">인기 악보</TabsTrigger>
                </TabsList>

                <TabsContent value="latest" className="py-5">
                    <LatestTabs/>
                </TabsContent>
                <TabsContent value="popular" className="py-5">
                    <PopularTabs/>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Main;