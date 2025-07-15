import { AppSidebar } from "@/components/app-sidebar"
import NavHeader from "@/components/nav-header"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function PrivateLayout() {
  return (
    <SidebarProvider className="bg-[#1E1E20]">
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        <header className="flex sticky top-0 z-10 h-16 shrink-0 bg-[#2F2F2F] text-white gap-2">
          <div className="flex items-center gap-2 pl-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="max-w-screen h-full">
              <NavHeader />
            </div>
          </div>
        </header>

        {/* Make this the scrollable area */}
        <div className="flex-1 overflow-auto bg-[#2F2F2F] p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

