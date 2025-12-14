import { Card } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="space-y-6 fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
                <p className="text-gray-500 mt-2">Configuration de l'établissement et des utilisateurs</p>
            </div>
            <Card className="p-6 text-center text-gray-500 py-12">
                <p>Panneau d'administration et configuration globale.</p>
            </Card>
        </div>
    );
}
