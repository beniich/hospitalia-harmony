import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PatientsPage() {
    return (
        <div className="space-y-6 fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
                    <p className="text-gray-500 mt-2">Gestion des dossiers patients et admissions</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Nouveau Patient
                </Button>
            </div>

            <Card className="p-6 text-center text-gray-500 py-12">
                <p>Le module de liste des patients sera affiché ici.</p>
            </Card>
        </div>
    );
}
