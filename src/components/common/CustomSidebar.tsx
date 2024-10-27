'use client';

import * as React from "react"
import {SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/common/AppSidebar";
import {ChevronUp, Command} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const CustomSidebar = ({children}: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main>
                <TooltipProvider>
                    <Tooltip delayDuration={10}>
                        <TooltipTrigger>
                            <SidebarTrigger className="m-2"/>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={-5}>
                            <div className="flex items-center space-x-0.5">
                                <ChevronUp className="size-3"/>
                                <span>B</span>
                            </div>
                            <div className="flex items-center space-x-0.5">
                                <Command className="size-3"/>
                                <span>B</span>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {children}
            </main>
        </SidebarProvider>
    );
}

export default CustomSidebar;