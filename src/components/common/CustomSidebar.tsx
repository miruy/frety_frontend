'use client';

import * as React from "react"
import {SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/common/AppSidebar";

const CustomSidebar = ({children}: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main>
                <SidebarTrigger className="m-2"/>
                {children}
            </main>
        </SidebarProvider>
    );
}

export default CustomSidebar;