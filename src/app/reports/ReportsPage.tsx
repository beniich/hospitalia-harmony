import { Card } from "@/components/ui/card";

export default function ReportsPage() {
    return (
        <div className="space-y-6 fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Rapports & Analytics</h1>
                <p className="text-gray-500 mt-2">Statistiques et indicateurs de performance</p>
            </div>
            <Card className="p-6 text-center text-gray-500 py-12">
                <p>Graphiques et exports de données.</p>
            </Card>
        </div>
    );
}
