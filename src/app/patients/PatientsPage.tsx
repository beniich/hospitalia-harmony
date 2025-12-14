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
import { useState } from "react";
import { toast } from "sonner";

export default function PatientsPage() {
    const [open, setOpen] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Ici, on ajouterait la logique de sauvegarde (API call, etc.)
        toast.success("Patient ajouté avec succès !");
        setOpen(false);
    };

    return (
        <div className="space-y-6 fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Patients</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Gestion des dossiers patients et admissions</p>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Nouveau Patient
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Ajouter un patient</DialogTitle>
                            <DialogDescription>
                                Créez un nouveau dossier patient. Cliquez sur sauvegarder une fois terminé.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nom
                                </Label>
                                <Input id="name" placeholder="Dupont" className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="firstname" className="text-right">
                                    Prénom
                                </Label>
                                <Input id="firstname" placeholder="Jean" className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dob" className="text-right">
                                    Date de naissance
                                </Label>
                                <Input id="dob" type="date" className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    Téléphone
                                </Label>
                                <Input id="phone" type="tel" placeholder="06 12 34 56 78" className="col-span-3" />
                            </div>
                            <DialogFooter>
                                <Button type="submit">Sauvegarder</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="p-6 text-center text-gray-500 dark:text-gray-400 py-12">
                <p>Le module de liste des patients sera affiché ici.</p>
            </Card>
        </div>
    );
}
