import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

export default function AppointmentsPage() {
    const [open, setOpen] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Rendez-vous planifié !");
        setOpen(false);
    };

    return (
        <div className="space-y-6 fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Rendez-vous</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Agenda et planification des consultations</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Nouveau Rendez-vous
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Nouveau Rendez-vous</DialogTitle>
                            <DialogDescription>
                                Planifiez une nouvelle consultation.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="patient" className="text-right">
                                    Patient
                                </Label>
                                <Select required>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Sélectionner un patient" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="jean">Jean Dupont</SelectItem>
                                        <SelectItem value="marie">Marie Martin</SelectItem>
                                        <SelectItem value="pierre">Pierre Duris</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date" className="text-right">
                                    Date
                                </Label>
                                <Input id="date" type="datetime-local" className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">
                                    Type
                                </Label>
                                <Select required>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Type de consultation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="consultation">Consultation Générale</SelectItem>
                                        <SelectItem value="suivi">Suivi</SelectItem>
                                        <SelectItem value="urgence">Urgence</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="notes" className="text-right">
                                    Motif
                                </Label>
                                <Input id="notes" placeholder="Douleur, fièvre..." className="col-span-3" />
                            </div>
                            <DialogFooter>
                                <Button type="submit">Confirmer</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
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
