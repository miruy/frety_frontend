'use client'

import {createContext, ReactNode} from "react";
import {type QueryKey, type UseQueryResult} from "@tanstack/react-query";
import {
    GetTabByIdResponse,
    SearchTabsResponse,
} from "@/openapi/model";
import {ErrorType} from "@/axios/axios_instance";
import {useParams} from "next/navigation";
import {useGetTabById, useSearchTabs} from "@/openapi/api/tab/tab";

export const TabContext = createContext<{
    findAllTab: UseQueryResult<SearchTabsResponse[], ErrorType<unknown>> & { queryKey: QueryKey },
    findTab: UseQueryResult<GetTabByIdResponse, ErrorType<unknown>> & { queryKey: QueryKey },
    tabId: number | undefined,
}>(undefined!);

export const TabProvider = ({children}: { children: ReactNode }) => {

    const params = useParams();
    const tabId = params?.tabId ? parseInt(params.tabId as string, 10) : undefined;

    const findAllTab = useSearchTabs({
        query: {
            queryKey: ["Tabs"]
        }
    });

    const findTab =
        useGetTabById(
            tabId!, {
                query: {
                    queryKey: ["Tab", tabId!]
                }
            })

    const value = {
        findAllTab,
        findTab,
        tabId,
    }

    return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}