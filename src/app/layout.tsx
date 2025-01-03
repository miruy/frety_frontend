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

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
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
