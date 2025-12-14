import { Card } from "@/components/ui/card";

export default function ServicesPage() {
    return (
        <div className="space-y-6 fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Services & Ressources</h1>
                <p className="text-gray-500 mt-2">Gestion des chambres, lits et équipements</p>
            </div>
            <Card className="p-6 text-center text-gray-500 py-12">
                <p>Vue des services hospitaliers et états des lits.</p>
            </Card>
        </div>
    );
}
