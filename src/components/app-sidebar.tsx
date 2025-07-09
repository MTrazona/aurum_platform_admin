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
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Building,
  ChevronRight,
  ClipboardList,
  Command,
  Globe,
  SquareTerminal,
} from "lucide-react"; // Importing icons
import { Link, useLocation } from "react-router-dom"; // Importing useLocation
import * as React from "react";

const navGroups = [
  {
    label: "Core",
    icon: SquareTerminal, // Add icon for the label
    items: [
      { title: "Dashboard", url: "/dashboard", icon: SquareTerminal },
      { title: "Users", url: "/users", icon: Bot },
      { title: "Transactions", url: "/transactions", icon: Command },
    ],
  },
  {
    label: "Banking Requests",
    icon: BookOpen, // Add icon for the label
    items: [
      { title: "Bank Request", url: "/bank-request", icon: BookOpen },
      { title: "Remittance Request", url: "/remittance-request", icon: Building },
      { title: "Direct Deposit Reward", url: "/direct-deposit-reward", icon: Building },
      { title: "USDAU Request", url: "/usda-request", icon: Building },
    ],
  },
  {
    label: "Buy / Convert / Rewards",
    icon: AudioWaveform, // Add icon for the label
    items: [
      { title: "Buy Request", url: "/buy-request", icon: AudioWaveform },
      { title: "Convert Request", url: "/convert-request", icon: Globe },
      { title: "QMGT +", url: "/qmgt-plus", icon: Building },
      { title: "Redeem Reward Request", url: "/redeem-reward", icon: Building },
    ],
  },
  {
    label: "GAE Requests",
    icon: Globe, // Add icon for the label
    items: [
      { title: "GAE Request", url: "/gae-request", icon: Globe },
      { title: "GAE EXTRA Request", url: "/gae-extra-request", icon: Globe },
      { title: "GAE-PH Request", url: "/gae-ph-request", icon: Globe },
      { title: "GAE Terminate", url: "/gae-terminate", icon: ClipboardList },
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

  const handleToggleGroup = (label: string) => {
    setOpenGroup((prev) => (prev === label ? null : label)); // Toggle the group
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
        {navGroups.map((group) => (
          <Collapsible
            key={group.label}
            defaultOpen={openGroup === group.label}
            open={openGroup === group.label}
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-primary-foreground font-normal hover:bg-[#2F2F2F] hover:text-white text-md"
              >
                <CollapsibleTrigger
                  onClick={() => handleToggleGroup(group.label)}
                  className="flex items-center gap-3"
                >
                  {/* Add icon next to the label */}
                  {group.icon && <group.icon className="w-5 h-5" />}
                  {group.label}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-2 px-4 pt-2">
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.url}
                          className={`hover:bg-[#2F2F2F] hover:text-white ${
                            pathname === item.url
                              ? "!bg-[#2F2F2F] !text-[#dca955] p-4"
                              : ""
                          } `}
                        >
                          <Link to={item.url} className="flex items-center gap-2">
                            {item.icon && <item.icon className="w-5 h-5" />} {/* Add icon */}
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
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
