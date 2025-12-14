import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar"; // Assuming shadcn calendar component might exist or placeholder
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AppointmentsPage() {
    return (
        <div className="space-y-6 fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
                    <p className="text-gray-500 mt-2">Agenda et planification des consultations</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Nouveau Rendez-vous
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 col-span-1">
                    {/* Placeholder for Calendar */}
                    <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded">
                        Calendrier ici
                    </div>
                </Card>
                <Card className="p-6 col-span-2">
                    <h3 className="font-semibold mb-4">Agenda du jour</h3>
                    <p className="text-gray-500">Aucun rendez-vous sélectionné.</p>
                </Card>
            </div>
        </div>
    );
}
