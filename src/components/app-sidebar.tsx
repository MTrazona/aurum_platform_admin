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
  AudioWaveform,
  BookOpen,
  Building,
  ChevronRight,
  Globe,
  SquareTerminal,
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
        { title: "Dashboard", url: urls.dashboard },
        { title: "Users", url: urls.users },
        { title: "Transactions", url: urls.transactions },
      ],
    },
    {
      label: "Request Management",
      icon: BookOpen,
      items: [
        { title: "Bank Request", url: urls.bankReq },
        { title: "Buy Request", url: urls.buyReq },
        { title: "GCA Request", url: urls.gcaReq },
         { title: "GAE Request", url: urls.gaeReq },
      ],
    },
    {
      label: "Rewards & Rank",
      icon: AudioWaveform,
      items: [
        { title: "QMGT +", url: "/b-request" },
        { title: "Redeem Reward Request", url: "/convert-request" },
        { title: "Rankup Request", url: "/qmgt-plus" },
        { title: "Direct Deposit Reward", url: "/redeem-reward" },
      ],
    },
    {
      label: "Other",
      icon: Building,
      items: [
        { title: "Remittance Request", url: "/rankup-request", icon: Building },
        { title: "USDAU Request", url: "/rankup-request", icon: Building },
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
        <TeamSwitcher
          teams={[
            { name: "Aurum", plan: "Platform", logo: AudioWaveform },
            { name: "Acme Corp.", plan: "Startup", logo: Globe },
          ]}
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navGroups.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Collapsible open={openGroup === item.label}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      onClick={() => handleToggleGroup(item.label)}
                    >
                      {item.icon && <item.icon />}
                      <span className="text-lg">{item.label}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={`hover:bg-gradient-to-r from-[#000000] to-[#f89004] hover: !text-white ${
                                subItem.url === pathname &&
                                "bg-gradient-to-r from-[#000000] to-[#f89004]"
                              }`}
                            >
                              <Link to={subItem.url} className="p-5">
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
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
