import CustomSidebar from "@/components/common/CustomSidebar";

export default function TabLayout({
                                      children,
                                  }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CustomSidebar>
            {children}
        </CustomSidebar>
    )
}