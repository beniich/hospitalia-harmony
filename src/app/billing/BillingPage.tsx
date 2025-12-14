import { Card } from "@/components/ui/card";

export default function BillingPage() {
    return (
        <div className="space-y-6 fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Facturation</h1>
                <p className="text-gray-500 mt-2">Factures, paiements et devis</p>
            </div>
            <Card className="p-6 text-center text-gray-500 py-12">
                <p>Module financier et comptable.</p>
            </Card>
        </div>
    );
}
