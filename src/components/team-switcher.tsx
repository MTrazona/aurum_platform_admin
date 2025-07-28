import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2 h-14">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 group-data-[state=open]:size-12 items-center justify-center rounded-lg">
          <img
            src="/aurum-platform.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div className="grid flex-1 text-left text-sm leading-tight ">
          <span className="truncate text-xl font-medium tracking-widest">
            Aurum Platform
          </span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
