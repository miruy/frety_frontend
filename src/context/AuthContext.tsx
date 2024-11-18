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
    login: (loginId: string, token: string) => void;
    logout: () => void;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loginId, setLoginId] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // 페이지 새로 고침 시 로그인 상태 유지
    useEffect(() => {
        const savedLoginId = localStorage.getItem("loginId");
        const savedToken = localStorage.getItem("accessToken");

        if (savedLoginId && savedToken) {
            setIsLoggedIn(true);
            setLoginId(savedLoginId);
            setAccessToken(savedToken);
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

    const login = (loginId: string, token: string) => {
        setIsLoggedIn(true);
        setLoginId(loginId);
        localStorage.setItem("loginId", loginId);
        localStorage.setItem("accessToken", token);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setLoginId(null);
        localStorage.removeItem("loginId");
        localStorage.removeItem("accessToken");
    };
    ;
    return (
        <AuthContext.Provider value={{accessToken, isLoggedIn, loginId, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthContext = React.createContext<AuthContextType>({
    accessToken: "",
    isLoggedIn: false,
    loginId: "",
    login: (loginId: string, token: string) => {
        console.log("login");
    },
    logout: () => {
        console.log("logout");
    },
});
