import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, TrendingUp, DollarSign, CreditCard, Plus, Printer, Pencil, Trash2 } from "lucide-react";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCompanySettings } from "@/hooks/useCompanySettings";

type InvoiceItem = {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
};

type Invoice = {
    id: number;
    patient: string;
    items: InvoiceItem[];
    status: "Payé" | "En attente" | "Impayé";
    date: string;
};

const initialInvoices: Invoice[] = [
    {
        id: 1001,
        patient: "Jean Dupont",
        items: [{ id: '1', description: 'Consultation standard', quantity: 1, unitPrice: 60 }],
        status: "Payé",
        date: "2024-03-10"
    },
    {
        id: 1002,
        patient: "Marie Martin",
        items: [{ id: '1', description: 'Soins infirmiers', quantity: 1, unitPrice: 45 }],
        status: "En attente",
        date: "2024-03-11"
    },
    { id: 1003, patient: "Pierre Duris", items: [{ id: '1', description: 'Consultation spécialisée', quantity: 1, unitPrice: 120 }], status: "Impayé", date: "2024-03-12" },
    { id: 1004, patient: "Sophie Lemoine", items: [{ id: '1', description: 'Bilan sanguin', quantity: 1, unitPrice: 80 }], status: "Payé", date: "2024-03-13" },
    { id: 1005, patient: "Luc Bernard", items: [{ id: '1', description: 'Vaccination', quantity: 1, unitPrice: 55 }], status: "Payé", date: "2024-03-14" },
];

export default function BillingPage() {
    const [isSimpleMode, setIsSimpleMode] = useState(false);
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

    // Form states
    const [patientName, setPatientName] = useState("");
    const [currentItems, setCurrentItems] = useState<InvoiceItem[]>([]);

    const calculateTotal = (items: InvoiceItem[]) => {
        return items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    };

    const handleOpenCreate = () => {
        setEditingInvoice(null);
        setPatientName("");
        setCurrentItems([{ id: crypto.randomUUID(), description: "Nouvelle prestation", quantity: 1, unitPrice: 0 }]); // Ligne par défaut
        setOpenDialog(true);
    };

    const handleOpenEdit = (invoice: Invoice) => {
        setEditingInvoice(invoice);
        setPatientName(invoice.patient);
        setCurrentItems([...invoice.items]); // Copy items
        setOpenDialog(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        const newInvoiceData = {
            patient: patientName,
            items: currentItems,
        };

        if (editingInvoice) {
            setInvoices(invoices.map(inv =>
                inv.id === editingInvoice.id
                    ? { ...inv, ...newInvoiceData }
                    : inv
            ));
            toast.success("Facture modifiée avec succès.");
        } else {
            const newInvoice: Invoice = {
                id: 1000 + invoices.length + 1,
                ...newInvoiceData,
                status: "En attente",
                date: new Date().toISOString().split('T')[0]
            };
            setInvoices([newInvoice, ...invoices]);
            toast.success("Nouvelle facture créée.");
        }
        setOpenDialog(false);
    };

    const handleAddItem = () => {
        setCurrentItems([...currentItems, { id: crypto.randomUUID(), description: "", quantity: 1, unitPrice: 0 }]);
    };

    const handleRemoveItem = (id: string) => {
        if (currentItems.length > 1) {
            setCurrentItems(currentItems.filter(item => item.id !== id));
        } else {
            toast.warning("Une facture doit avoir au moins une ligne.");
        }
    };

    const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
        setCurrentItems(currentItems.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        }));
    };

    const { settings } = useCompanySettings();

    const handlePrint = (invoice: Invoice) => {
        const totalAmount = calculateTotal(invoice.items);
        const printWindow = window.open('', '', 'height=800,width=1000');

        const itemsRows = invoice.items.map(item => `
            <tr>
                <td>${item.description}</td>
                <td style="text-align: right">${item.quantity}</td>
                <td style="text-align: right">${Number(item.unitPrice).toFixed(2)} €</td>
                <td style="text-align: right">${(item.quantity * item.unitPrice).toFixed(2)} €</td>
            </tr>
        `).join('');

        if (printWindow) {
            printWindow.document.write(`
                <html>
                <head>
                    <title>Facture #${invoice.id}</title>
                    <style>
                        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
                        .header { display: flex; justify-content: space-between; margin-bottom: 50px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
                        .company-details h1 { color: #2563eb; margin: 0; font-size: 24px; }
                        .company-details p { margin: 5px 0; font-size: 14px; color: #666; }
                        .invoice-meta { text-align: right; }
                        .invoice-meta h2 { margin: 0; color: #333; }
                        .invoice-meta p { margin: 5px 0; font-size: 14px; }
                        .client-section { margin-bottom: 40px; background: #f9fafb; padding: 20px; border-radius: 8px; }
                        .client-section h3 { margin-top: 0; font-size: 16px; color: #111; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 15px;}
                        .table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
                        .table th { background: #f3f4f6; padding: 12px; text-align: left; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e5e7eb; }
                        .table td { padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
                        .totals { display: flex; justify-content: flex-end; }
                        .totals-box { width: 300px; }
                        .totals-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                        .totals-row.final { font-weight: bold; font-size: 18px; border-top: 2px solid #333; border-bottom: none; margin-top: 10px; padding-top: 20px; }
                        .footer { margin-top: 80px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #eee; padding-top: 20px; }
                        .status-badge { display: inline-block; padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; background: #eee; }
                        .status-badge.Payé { background: #dcfce7; color: #166534; }
                        .status-badge.En_attente { background: #fef9c3; color: #854d0e; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="company-details">
                            <h1>${settings.name}</h1>
                            <p>${settings.address}</p>
                            <p>${settings.city}</p>
                            <p>Tél: ${settings.phone}</p>
                            <p>Email: ${settings.email}</p>
                            <p><strong>ICE: ${settings.ice}</strong></p>
                        </div>
                        <div class="invoice-meta">
                            <h2>FACTURE</h2>
                            <p>N° #${invoice.id}</p>
                            <p>Date: ${invoice.date}</p>
                            <div class="status-badge ${invoice.status.replace(' ', '_')}">${invoice.status}</div>
                        </div>
                    </div>

                    <div class="client-section">
                        <h3>FACTURÉ À</h3>
                        <p><strong>Patient:</strong> ${invoice.patient}</p>
                        <p><strong>Adresse:</strong> 12 Rue des Patients, Casablanca</p>
                    </div>

                    <table class="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th style="text-align: right">Quantité</th>
                                <th style="text-align: right">Prix Unit.</th>
                                <th style="text-align: right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsRows}
                        </tbody>
                    </table>

                    <div class="totals">
                        <div class="totals-box">
                            <div class="totals-row">
                                <span>Sous-total:</span>
                                <span>${totalAmount.toFixed(2)} €</span>
                            </div>
                            <div class="totals-row">
                                <span>TVA (0%):</span>
                                <span>0.00 €</span>
                            </div>
                            <div class="totals-row final">
                                <span>TOTAL À PAYER:</span>
                                <span>${totalAmount.toFixed(2)} €</span>
                            </div>
                        </div>
                    </div>

                    <div class="footer">
                        <p>${settings.name} - ${settings.city} - ICE ${settings.ice} - RC ${settings.rc} - IF ${settings.if}</p>
                        <p>Merci de votre confiance.</p>
                    </div>

                    <script>
                        window.print();
                    </script>
                </body>
                </html>
            `);
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

            {/* Dialog Create/Edit - Wide size for table */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>{editingInvoice ? "Modifier la facture" : "Nouvelle Facture"}</DialogTitle>
                        <DialogDescription>
                            Éditez les lignes de la facture ci-dessous.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="grid gap-6 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="patient" className="text-right font-bold">Patient</Label>
                            <Input id="patient" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="col-span-3" required placeholder="Nom du patient" />
                        </div>

                        <div className="border rounded-md p-4 bg-muted/20">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-sm">Prestations / Articles</h3>
                                <Button type="button" size="sm" variant="outline" onClick={handleAddItem}>
                                    <Plus className="h-3 w-3 mr-1" /> Ajouter Ligne
                                </Button>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[40%]">Description</TableHead>
                                        <TableHead className="w-[15%]">Qté</TableHead>
                                        <TableHead className="w-[20%]">Prix Unit (€)</TableHead>
                                        <TableHead className="w-[15%] text-right">Total</TableHead>
                                        <TableHead className="w-[10%]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Input
                                                    value={item.description}
                                                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                                    placeholder="Description"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    value={item.unitPrice}
                                                    onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {(item.quantity * item.unitPrice).toFixed(2)} €
                                            </TableCell>
                                            <TableCell>
                                                <Button type="button" variant="ghost" size="sm" className="text-destructive" onClick={() => handleRemoveItem(item.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="flex justify-end mt-4 text-lg font-bold">
                                Total: {calculateTotal(currentItems).toFixed(2)} €
                            </div>
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
                                {invoices.reduce((acc, curr) => acc + calculateTotal(curr.items), 0).toFixed(2)} €
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
                                Liste détaillée des factures avec détails.
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
                                            <div className="mr-4">
                                                <p className="font-bold">{calculateTotal(invoice.items).toFixed(2)} €</p>
                                                <p className="text-xs text-muted-foreground">{invoice.items.length} articles</p>
                                            </div>
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
