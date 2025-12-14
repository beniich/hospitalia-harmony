import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function StaffPage() {
    return (
        <div className="space-y-6 fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Personnel</h1>
                    <p className="text-gray-500 mt-2">Gestion des médecins, infirmiers et administratifs</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Ajouter Membre
                </Button>
            </div>

            <Card className="p-6 text-center text-gray-500 py-12">
                <p>Le module de gestion du personnel sera affiché ici.</p>
            </Card>
        </div>
    );
}
