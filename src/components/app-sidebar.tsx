/* eslint-disable react-hooks/exhaustive-deps */
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { urls } from "@/routes";
import {
  Activity,
  ArrowUpCircle,
  BookOpen,
  Building,
  Building2,
  ChevronRight,
  CreditCard,
  FileSearch,
  FileSignature,
  ShoppingCart,
  SquareTerminal,
  User
} from "lucide-react";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);
  const navGroups = [
    {
      label: "Core",
      icon: SquareTerminal,
      items: [
        { title: "Dashboard", url: urls.dashboard, icon: SquareTerminal },
        { title: "Users", url: urls.users, icon: User },
        { title: "Transactions", url: urls.transactions, icon: Activity },
      ],
    },
    {
      label: "Request Management",
      icon: BookOpen,
      items: [
        { title: "Bank Request", url: urls.bankReq, icon: CreditCard },
        { title: "Buy Request", url: urls.buyReq, icon: ShoppingCart },
        { title: "GCA Request", url: urls.gcaReq, icon: FileSearch },
        { title: "GAE Request", url: urls.gaeReq, icon: FileSignature },
      ],
    },
    {
      label: "Other",
      icon: Building,
      items: [
        { title: "USDAU Request", url: urls.usdauReq, icon: Building2 },
        { title: "Rankup Request", url: urls.rankReq, icon: ArrowUpCircle },
      ],
    },
  ];

  React.useEffect(() => {
    const matchingGroup = navGroups.find((group) =>
      group.items.some((item) => item.url === pathname)
    );
    if (matchingGroup) {
      setOpenGroup(matchingGroup.label);
    }
  }, [pathname]);

  const handleToggleGroup = (label: string) => {
    setOpenGroup((prev) => (prev === label ? null : label));
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navGroups.map((item) => (
              <Collapsible asChild open={openGroup === item.label} className="group/collapsible">
                <SidebarMenuItem key={item.label}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      onClick={() => handleToggleGroup(item.label)}
                      className="hover:bg-[#f89004]"
                    >
                      {item.icon && <item.icon />}
                      <span className="text-lg">{item.label}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <SidebarMenuSub className="border-0">
                      {item.items?.map((subItem) => {
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={`hover:bg-[#f89004] hover:!text-white ${
                                subItem.url === pathname && "bg-[#f89004]"
                              }`}
                            >
                              <Link
                                to={subItem.url}
                                className="p-5 flex items-center gap-2 text-inherit"
                              >
                                {subItem.icon && (
                                  <subItem.icon className="w-4 h-4 !text-white" />
                                )}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
