"use client"

import {type LucideIcon} from "lucide-react"

import {
    SidebarGroup, SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useRouter} from "next/navigation";
import * as React from "react";

export function NavSecondary({
                                 items,
                             }: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
    }[]
}) {

    const router = useRouter();

    const handleHref = (url: string) => {
        router.push(url);
    }

    return (
        <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild size="sm"
                                tooltip={item.title}
                                onClick={() => handleHref(item.url)}>
                                <a href={item.url}>
                                    {item.icon && <item.icon/>}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
