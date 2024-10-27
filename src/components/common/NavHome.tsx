"use client"

import * as React from "react"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";

export function NavHome() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="홈으로 이동" asChild>
                    <Link href="/">
                        <div
                            className="flex aspect-square size-10 items-center justify-center rounded-lg bg-background">
                            <img className="size-9 rounded-lg" src="/image/guitar.png" alt="FretyHome"/>
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">Frety</span>
                            <span className="truncate text-xs">홈으로 이동</span>
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
