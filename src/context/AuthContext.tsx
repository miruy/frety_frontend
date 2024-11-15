// context/AuthContext.tsx
import React, {useState, useEffect} from "react";

// 로그인 상태를 저장할 컨텍스트
interface AuthContextType {
    isLoggedIn: boolean;
    loginId: string | null;
    login: (loginId: string, token: string) => void;
    logout: () => void;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loginId, setLoginId] = useState<string | null>(null);

    // 페이지 새로 고침 시 로그인 상태 유지
    useEffect(() => {
        const savedLoginId = localStorage.getItem("loginId");
        const savedToken = localStorage.getItem("accessToken");
        if (savedLoginId && savedToken) {
            setIsLoggedIn(true);
            setLoginId(savedLoginId);
        }
    }, []);

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

    return (
        <AuthContext.Provider value={{isLoggedIn, loginId, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthContext = React.createContext<AuthContextType>({
    isLoggedIn: false,
    loginId: "",
    login: (loginId: string, token: string) => {
        console.log("login");
    },
    logout: () => {
        console.log("logout");
    },
});
