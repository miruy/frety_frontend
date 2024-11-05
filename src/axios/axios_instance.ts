// custom-instance.ts

import Axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {importData} from "@/axios/import-data";


export const FRETY_AXIOS_INSTANCE = Axios.create({
    baseURL: importData.NEXT_PUBLIC_FRETY_SERVER_URL,
    withCredentials: true
});

export const fretyAxiosInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise = FRETY_AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({data}) => data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    promise.cancel = () => {
        source.cancel('Query was cancelled');
    };

    return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;