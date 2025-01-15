import type {Metadata} from "next";
import {Inter as FontSans} from 'next/font/google';
import "../css/globals.css";
import ClientProviders from "@/provider/ClientProviders";
import {cn} from "@/lib/utils";
import TopBar from "@/components/common/TopBar";
import {TabProvider} from "@/context/TabContext";

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <meta name="description" content="프렛티(Frety). 프렛 위에서 완성되는 당신의 기타 코드."/>
            {/* 구글 서치 콘솔 태그 */}
            <meta name="google-site-verification" content="M--jRwaogWtTTKyxW0yjKvV1U9fq7dbP9VHd7c3nPoc"/>
        </head>
        <body
            className={cn(
                'h-screen flex flex-col mx-auto bg-background font-sans',
                fontSans.variable
            )}
        >
        <ClientProviders>
            <TabProvider>
                <TopBar/>
                {children}
            </TabProvider>
        </ClientProviders>
        </body>
        </html>
    );
}
