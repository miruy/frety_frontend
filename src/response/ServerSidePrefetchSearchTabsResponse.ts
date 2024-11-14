import {SearchTabsResponse} from "@/openapi/model/searchTabsResponse";

export interface ServerSidePrefetchSearchTabsResponse {
    data: SearchTabsResponse[];
    meta: {
        page: number;
        pageSize: number;
        totalCount: number;
        totalPage: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    };
}