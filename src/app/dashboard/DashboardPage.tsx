import { Card } from "@/components/ui/card";
import { Users, UserRound, CalendarDays, Activity } from "lucide-react";

const stats = [
  {
    title: "Patients",
    value: "1,234",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Personnel",
    value: "56",
    icon: UserRound,
    color: "bg-green-500",
  },
  {
    title: "Rendez-vous",
    value: "89",
    icon: CalendarDays,
    color: "bg-purple-500",
  },
  {
    title: "Consultations",
    value: "45",
    icon: Activity,
    color: "bg-orange-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 mt-2">
          Bienvenue sur votre portail de gestion hospitalière
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${stat.color} text-white shadow-md`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Rendez-vous du jour</h2>
          <div className="text-gray-500 flex items-center justify-center h-32 border-2 border-dashed rounded-lg">
            Aucun rendez-vous programmé pour aujourd'hui
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
          <div className="text-gray-500 flex items-center justify-center h-32 border-2 border-dashed rounded-lg">
            Aucune activité récente
          </div>
        </Card>
      </div>
    </div>
  );
}
