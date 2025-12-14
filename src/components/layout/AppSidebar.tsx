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
import { CalendarDays, Home, Users, UserRound, Building2, CreditCard, BarChart3, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/theme/ModeToggle";

import { Package } from "lucide-react";

const menuItems = [
  {
    title: "Tableau de bord",
    icon: Home,
    path: "/",
  },
  {
    title: "Gestion de Stock",
    icon: Package,
    path: "/inventory",
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
  {
    title: "Planning",
    icon: CalendarDays,
    path: "/calendar",
  },
  {
    title: "Services & Lits",
    icon: Building2,
    path: "/services",
  },
  {
    title: "Facturation",
    icon: CreditCard,
    path: "/billing",
  },
  {
    title: "Rapports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    title: "Paramètres",
    icon: Settings,
    path: "/settings",
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-medical-500">MediGest</h1>
          <ModeToggle />
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