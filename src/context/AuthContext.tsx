'use client';

import React, {useState, useEffect} from "react";
import {AxiosRequestConfig} from "axios";
import {isAccessTokenExpired} from "@/utils/isAeccessTokenExpired";
import {FRETY_AXIOS_INSTANCE} from "@/axios/axios_instance";

// 로그인 상태를 저장할 컨텍스트
interface AuthContextType {
    accessToken: string | null;
    isLoggedIn: boolean;
    loginId: string | null;
    authId: number | null;
    login: (loginId: string, token: string, authId: number) => void;
    logout: () => void;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loginId, setLoginId] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [authId, setAuthId] = useState<number>(0);

    // 페이지 새로 고침 시 로그인 상태 유지
    useEffect(() => {
        const savedLoginId = localStorage.getItem("loginId");
        const savedToken = localStorage.getItem("accessToken");
        const savedAuthId = parseInt(localStorage.getItem("authId") || "0", 10);

        if (savedLoginId && savedToken && savedAuthId) {
            setIsLoggedIn(true);
            setLoginId(savedLoginId);
            setAccessToken(savedToken);
            setAuthId(savedAuthId);
        }

        const interceptorFunction = async (config: AxiosRequestConfig) => {
            const getAuthorizationHeader = async () => {
                if (!savedToken) {
                    return {};
                }

                const isTokenExpired = isAccessTokenExpired(savedToken, 10);
                if (isTokenExpired) { // 엑세스 토큰이 만료됬다면
                    // 로그아웃처리
                    logout();
                }

                return {
                    Authorization: `Bearer ${savedToken}`,
                };
            };

            const authorizationHeader = await getAuthorizationHeader();

            return {
                ...config,
                headers: {
                    ...config.headers,
                    ...authorizationHeader,
                },
            };
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const frety_axios_instance_intercepter = FRETY_AXIOS_INSTANCE.interceptors.request.use(interceptorFunction);

        return () => {
            FRETY_AXIOS_INSTANCE.interceptors.request.eject(frety_axios_instance_intercepter);
        };


    }, [accessToken, isLoggedIn]);

    const login = (loginId: string, token: string, authId: number) => {
        setIsLoggedIn(true);
        setLoginId(loginId);
        setAuthId(authId);
        localStorage.setItem("loginId", loginId);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("authId", authId.toString());
    };

    const logout = () => {
        setIsLoggedIn(false);
        setLoginId(null);
        setAuthId(0);
        localStorage.removeItem("loginId");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("authId");
    };
    ;
    return (
        <AuthContext.Provider value={{accessToken, isLoggedIn, loginId, authId, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthContext = React.createContext<AuthContextType>({
    accessToken: "",
    isLoggedIn: false,
    loginId: "",
    authId: 0,
    login: () => {},
    logout: () => {},
});
