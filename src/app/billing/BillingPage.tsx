import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, TrendingUp, DollarSign, CreditCard, Plus, Printer, Pencil } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Invoice = {
    id: number;
    patient: string;
    amount: number;
    status: "Payé" | "En attente" | "Impayé";
    date: string;
};

const initialInvoices: Invoice[] = [
    { id: 1001, patient: "Jean Dupont", amount: 60.00, status: "Payé", date: "2024-03-10" },
    { id: 1002, patient: "Marie Martin", amount: 45.00, status: "En attente", date: "2024-03-11" },
    { id: 1003, patient: "Pierre Duris", amount: 120.00, status: "Impayé", date: "2024-03-12" },
    { id: 1004, patient: "Sophie Lemoine", amount: 80.00, status: "Payé", date: "2024-03-13" },
    { id: 1005, patient: "Luc Bernard", amount: 55.00, status: "Payé", date: "2024-03-14" },
];

export default function BillingPage() {
    const [isSimpleMode, setIsSimpleMode] = useState(false);
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

    // Form states
    const [patientName, setPatientName] = useState("");
    const [amount, setAmount] = useState("");

    const handleOpenCreate = () => {
        setEditingInvoice(null);
        setPatientName("");
        setAmount("");
        setOpenDialog(true);
    };

    const handleOpenEdit = (invoice: Invoice) => {
        setEditingInvoice(invoice);
        setPatientName(invoice.patient);
        setAmount(invoice.amount.toString());
        setOpenDialog(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingInvoice) {
            // Edit existing
            setInvoices(invoices.map(inv =>
                inv.id === editingInvoice.id
                    ? { ...inv, patient: patientName, amount: parseFloat(amount) }
                    : inv
            ));
            toast.success("Facture modifiée avec succès.");
        } else {
            // Create new
            const newInvoice: Invoice = {
                id: 1000 + invoices.length + 1,
                patient: patientName,
                amount: parseFloat(amount),
                status: "En attente",
                date: new Date().toISOString().split('T')[0]
            };
            setInvoices([newInvoice, ...invoices]);
            toast.success("Nouvelle facture créée.");
        }
        setOpenDialog(false);
    };

    const handlePrint = (invoice: Invoice) => {
        // Basic print simulation
        const printWindow = window.open('', '', 'height=600,width=800');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Facture #' + invoice.id + '</title>');
            printWindow.document.write('</head><body >');
            printWindow.document.write('<h1>Facture #' + invoice.id + '</h1>');
            printWindow.document.write('<p>Patient: ' + invoice.patient + '</p>');
            printWindow.document.write('<p>Montant: ' + invoice.amount + ' €</p>');
            printWindow.document.write('<p>Date: ' + invoice.date + '</p>');
            printWindow.document.write('<p>Status: ' + invoice.status + '</p>');
            printWindow.document.write('<script>window.print();</script>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
        } else {
            toast.error("Impossible d'ouvrir la fenêtre d'impression.");
        }
    };

    return (
        <div className="space-y-6 fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-medical-600 to-blue-600 bg-clip-text text-transparent">
                        Facturation
                    </h1>
                    <p className="text-muted-foreground mt-1">Gestion des paiements et devis</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button onClick={handleOpenCreate}>
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Facture
                    </Button>
                    <div className="flex items-center space-x-2 bg-card p-2 rounded-lg border shadow-sm">
                        <Switch
                            id="billing-mode"
                            checked={isSimpleMode}
                            onCheckedChange={setIsSimpleMode}
                        />
                        <Label htmlFor="billing-mode" className="cursor-pointer">
                            Mode simplifié
                        </Label>
                    </div>
                </div>
            </div>

            {/* Dialog Create/Edit */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingInvoice ? "Modifier la facture" : "Nouvelle Facture"}</DialogTitle>
                        <DialogDescription>
                            Entrez les détails de la facture ci-dessous.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="patient" className="text-right">Patient</Label>
                            <Input id="patient" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">Montant (€)</Label>
                            <Input id="amount" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="col-span-3" required />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Sauvegarder</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {isSimpleMode ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/10 border-emerald-200 dark:border-emerald-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                Revenu Total (Ce mois)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                                {invoices.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)} €
                            </div>
                            <p className="text-xs text-emerald-600/80 mt-1">Metriques en temps réel</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-900/10 border-blue-200 dark:border-blue-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                Factures en attente
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                                {invoices.filter(i => i.status === "En attente").length}
                            </div>
                            <p className="text-xs text-blue-600/80 mt-1">Factures non payées</p>
                        </CardContent>
                    </Card>
                    <Card onClick={handleOpenCreate} className="flex flex-col justify-center items-center p-6 border-dashed border-2 cursor-pointer hover:bg-accent/50 transition-colors">
                        <Button variant="ghost" className="h-full w-full flex flex-col gap-2 pointer-events-none">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                            <span className="font-semibold">Créer une facture rapide</span>
                        </Button>
                    </Card>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {/* Stats Metrics (Simulated based on static + dynamic data) */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">45,231.89 €</div>
                                <p className="text-xs text-muted-foreground">+20.1% depuis le mois dernier</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Factures</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{invoices.length}</div>
                                <p className="text-xs text-muted-foreground">Total factures</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Impayés</CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{invoices.filter(i => i.status === "Impayé").length}</div>
                                <p className="text-xs text-muted-foreground text-red-500">Action requise</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Croissance</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+12.5%</div>
                                <p className="text-xs text-muted-foreground">Annuel</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Dernières Transactions</CardTitle>
                            <CardDescription>
                                Liste détaillée des factures.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {invoices.map((invoice) => (
                                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg bg-card/50 hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                #{invoice.id}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">{invoice.patient}</p>
                                                <p className="text-sm text-muted-foreground">{invoice.date} • <span className={invoice.status === 'Payé' ? 'text-green-600' : 'text-amber-600'}>{invoice.status}</span></p>
                                            </div>
                                        </div>
                                        <div className="text-right flex items-center gap-2">
                                            <p className="font-bold mr-2">{invoice.amount.toFixed(2)} €</p>
                                            <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(invoice)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handlePrint(invoice)}>
                                                <Printer className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
