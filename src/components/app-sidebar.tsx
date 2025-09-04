/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAuth } from "@/context/auth-context";
import { getRoleFromUser, Roles } from "@/lib/rbac";
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
  User,
} from "lucide-react";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const role = getRoleFromUser(user);
  const { pathname } = useLocation();
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);
  
  const navGroups = [
    {
      label: "Core",
      icon: SquareTerminal,
      items: [
        { title: "Dashboard", url: urls.dashboard, icon: SquareTerminal, roles: [Roles.Admin, Roles.Support] },
        { title: "Users", url: urls.users, icon: User, roles: [Roles.Admin, Roles.Support] },
        { title: "Transactions", url: urls.transactions, icon: Activity, roles: [Roles.Admin] },
      ],
    },
    {
      label: "Request Management",
      icon: BookOpen,
      items: [
        { title: "Bank Request", url: urls.bankReq, icon: CreditCard, roles: [Roles.Admin, Roles.Support] },
        { title: "Buy Request", url: urls.buyReq, icon: ShoppingCart, roles: [Roles.Admin] },
        { title: "GCA Request", url: urls.gcaReq, icon: FileSearch, roles: [Roles.Admin] },
        { title: "GAE Request", url: urls.gaeReq, icon: FileSignature, roles: [Roles.Admin] },
      ],
    },
    {
      label: "Other",
      icon: Building,
      items: [
        { title: "USDAU Request", url: urls.usdauReq, icon: Building2, roles: [Roles.Admin] },
        { title: "Rankup Request", url: urls.rankReq, icon: ArrowUpCircle, roles: [Roles.Admin] },
        { title: "Donate To Save", url: urls.donatetoSave, icon: ArrowUpCircle, roles: [Roles.Admin] },
      ],
    },
  ];

  // Function to check if a group should be open based on current URL
  const isGroupActive = (group: typeof navGroups[0]) => {
    return group.items.some((item) => {
      // Check exact match
      if (item.url === pathname) return true;
      // Check if current path starts with the item URL (for nested routes)
      if (pathname.startsWith(item.url)) return true;
      return false;
    });
  };

  // Function to check if a specific item is active
  const isItemActive = (itemUrl: string) => {
    if (itemUrl === pathname) return true;
    if (pathname.startsWith(itemUrl)) return true;
    return false;
  };

  React.useEffect(() => {
    const matchingGroup = navGroups.find((group) => isGroupActive(group));
    if (matchingGroup) {
      setOpenGroup(matchingGroup.label);
    }
  }, [pathname]);

  const handleToggleGroup = (label: string) => {
    setOpenGroup((prev) => (prev === label ? null : label));
  };

  // For support role, flatten all accessible items into main menu
  const getSupportMenuItems = () => {
    const supportItems: any[] = [];
    navGroups.forEach(group => {
      group.items.forEach(item => {
        const allowed = (item.roles ?? [Roles.Admin]) as any[];
        if (allowed.includes(role)) {
          supportItems.push(item);
        }
      });
    });
    return supportItems;
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {role === Roles.Support ? (
              // For support role, show all accessible items as main menu items
              getSupportMenuItems().map((item, index) => {
                const isActive = isItemActive(item.url);
                
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-[#f89004] hover:!text-white transition-colors ${
                        isActive ? "bg-[#f89004] text-white" : ""
                      }`}
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-2 text-inherit"
                      >
                        {item.icon && (
                          <item.icon className={`w-4 h-4 ${
                            isActive ? "!text-white" : "!text-white"
                          }`} />
                        )}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })
            ) : (
              // For admin role, show collapsible groups with submenus
              navGroups.map((item, index) => {
                const isActive = isGroupActive(item);
                const shouldBeOpen = openGroup === item.label || isActive;
                
                return (
                  <Collapsible
                    key={index}
                    asChild
                    open={shouldBeOpen}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem key={item.label}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          onClick={() => handleToggleGroup(item.label)}
                          className={`hover:bg-[#f89004] transition-colors ${
                            isActive ? "bg-[#f89004]/20 text-[#f89004]" : ""
                          }`}
                        >
                          {item.icon && <item.icon />}
                          <span className="text-lg">{item.label}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3">
                        <SidebarMenuSub className="border-0">
                          {item.items
                            ?.filter((subItem: any) => {
                              const allowed = (subItem.roles ?? [Roles.Admin]) as any[];
                              if (role === Roles.Admin) return true;
                              return allowed.includes(role);
                            })
                            .map((subItem) => {
                              const isSubItemActive = isItemActive(subItem.url);
                              
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    className={`hover:bg-[#f89004] hover:!text-white transition-colors ${
                                      isSubItemActive ? "bg-[#f89004] text-white" : ""
                                    }`}
                                  >
                                    <Link
                                      to={subItem.url}
                                      className="p-5 flex items-center gap-2 text-inherit"
                                    >
                                      {subItem.icon && (
                                        <subItem.icon className={`w-4 h-4 ${
                                          isSubItemActive ? "!text-white" : "!text-white"
                                        }`} />
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
                );
              })
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name ?? "",
            email: user?.email ?? "",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
