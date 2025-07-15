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
  SidebarRail
} from "@/components/ui/sidebar";
import {
  AudioWaveform,
  BookOpen,
  Building,
  ChevronRight,
  Globe,
  SquareTerminal,
} from "lucide-react"; // Importing icons
import * as React from "react";
import { Link, useLocation } from "react-router-dom"; // Importing useLocation

const navGroups = [
  {
    label: "Core",
    icon: SquareTerminal, // Add icon for the label
    items: [
      { title: "Dashboard", url: "/dashboard" },
      { title: "Users", url: "/users" },
      { title: "Transactions", url: "/transactions" },
    ],
  },
  {
    label: "Banking Requests",
    icon: BookOpen, // Add icon for the label
    items: [
      { title: "Bank Request", url: "/bank-request" },
      { title: "Remittance Request", url: "/remittance-request" },
      { title: "Direct Deposit Reward", url: "/direct-deposit-reward" },
      { title: "USDAU Request", url: "/usda-request" },
    ],
  },
  {
    label: "Buy / Convert / Rewards",
    icon: AudioWaveform, // Add icon for the label
    items: [
      { title: "Buy Request", url: "/buy-request" },
      { title: "Convert Request", url: "/convert-request" },
      { title: "QMGT +", url: "/qmgt-plus" },
      { title: "Redeem Reward Request", url: "/redeem-reward" },
    ],
  },
  {
    label: "GAE Requests",
    icon: Globe, // Add icon for the label
    items: [
      { title: "GAE Request", url: "/gae-request" },
      { title: "GAE EXTRA Request", url: "/gae-extra-request" },
      { title: "GAE-PH Request", url: "/gae-ph-request" },
      { title: "GAE Terminate", url: "/gae-terminate" },
    ],
  },
  {
    label: "Progression",
    icon: Building, // Add icon for the label
    items: [
      { title: "Rankup Request", url: "/rankup-request", icon: Building },
    ],
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation(); // Get the current path using useLocation
  const [openGroup, setOpenGroup] = React.useState<string | null>(null); // State to track the open group

  // Check if the current pathname matches any of the item URLs to open the group by default
  React.useEffect(() => {
    const matchingGroup = navGroups.find((group) =>
      group.items.some((item) => item.url === pathname)
    );
    if (matchingGroup) {
      setOpenGroup(matchingGroup.label); // Open the group if a match is found
    }
  }, [pathname]);

  const handleToggleGroup = (label: string) => {
    setOpenGroup((prev) => (prev === label ? null : label)); // Toggle the group
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={[{ name: "Aurum", plan: "Platform", logo: AudioWaveform }, { name: "Acme Corp.", plan: "Startup", logo: Globe }]}
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navGroups.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Collapsible open={openGroup === item.label}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton onClick={() => handleToggleGroup(item.label)}>
                      {item.icon && <item.icon />}
                      <span className="text-lg">{item.label}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        return(
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className={`hover:bg-gradient-to-r from-[#000000] to-[#f89004] hover: !text-white ${subItem.url === pathname && 'bg-gradient-to-r from-[#000000] to-[#f89004]'}`}>
                            <Link to={subItem.url} className="p-5">
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )})}
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
