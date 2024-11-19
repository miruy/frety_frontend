'use client'

import {createContext, ReactNode} from "react";
import {type QueryKey, type UseQueryResult} from "@tanstack/react-query";
import {ErrorType} from "@/axios/axios_instance";
import {useParams} from "next/navigation";
import {useGetTabById, useSearchTabs} from "@/openapi/api/tab/tab";
import {GetTabByIdResponse, PageRsSearchTabsResponse} from "@/openapi/model";

export const TabContext = createContext<{
    findAllRecentTabs: UseQueryResult<PageRsSearchTabsResponse, ErrorType<unknown>> & { queryKey: QueryKey },
    findTab: UseQueryResult<GetTabByIdResponse, ErrorType<unknown>> & { queryKey: QueryKey },
    tabId: number | undefined,
}>(undefined!);

export const TabProvider = ({children}: { children: ReactNode }) => {

    const params = useParams();
    const tabId = params?.tabId ? parseInt(params.tabId as string, 10) : undefined;

    const findAllRecentTabs = useSearchTabs({sort: "RECENT"}, {
        query: {
            queryKey: ["RecentTabs"]
        },
    });

    const findTab =
        useGetTabById(
            tabId!, {
                query: {
                    queryKey: ["DetailTab", tabId!]
                }
            })

    const value = {
        findAllRecentTabs,
        findTab,
        tabId,
    }

    return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}