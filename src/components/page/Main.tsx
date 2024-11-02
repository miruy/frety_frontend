'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import LatestTabs from "@/components/page_component/main/LatestTabs";
import PopularTabs from "@/components/page_component/main/PopularTabs";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const Main = () => {

    const router = useRouter();

    const handleCreateTab = () => {
        router.push("/create");
    }

    return (
        <div className="px-3 py-10 mx-auto w-full lg:w-[70%] space-y-14">
            <div className="space-y-2 border-b pb-2">
                <div className="text-4xl font-bold tracking-wide">Frety</div>
                <div className="text-lg font-semibold tracking-wide text-primary/50">프렛위에서 완성되는 당신의 기타 코드</div>
            </div>

            <Tabs defaultValue="latest" className="flex-1">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="latest">최근 등록된 악보</TabsTrigger>
                        <TabsTrigger value="popular">인기 악보</TabsTrigger>
                    </TabsList>

                    <Button onClick={handleCreateTab}>악보 제작</Button>
                </div>

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