import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CalendarDays, Home, Users, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Patients",
    icon: Users,
    path: "/patients",
  },
  {
    title: "Personnel",
    icon: UserRound,
    path: "/staff",
  },
  {
    title: "Rendez-vous",
    icon: CalendarDays,
    path: "/appointments",
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-medical-500">MediGest</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => navigate(item.path)}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}