import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Patient = {
    id: number;
    firstname: string;
    lastname: string;
    dob: string;
    phone: string;
    status: "Actif" | "Sorti";
    lastVisit: string;
};

const initialPatients: Patient[] = [
    { id: 1, firstname: "Jean", lastname: "Dupont", dob: "1985-05-12", phone: "06 12 34 56 78", status: "Actif", lastVisit: "2024-03-10" },
    { id: 2, firstname: "Marie", lastname: "Martin", dob: "1992-09-23", phone: "06 98 76 54 32", status: "Actif", lastVisit: "2024-03-08" },
    { id: 3, firstname: "Pierre", lastname: "Duris", dob: "1978-01-30", phone: "07 11 22 33 44", status: "Sorti", lastVisit: "2024-02-25" },
];

export default function PatientsPage() {
    const [patients, setPatients] = useState<Patient[]>(initialPatients);
    const [open, setOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Form states
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");

    const handleOpenCreate = () => {
        setEditingPatient(null);
        setFirstname("");
        setLastname("");
        setDob("");
        setPhone("");
        setOpen(true);
    };

    const handleOpenEdit = (patient: Patient) => {
        setEditingPatient(patient);
        setFirstname(patient.firstname);
        setLastname(patient.lastname);
        setDob(patient.dob);
        setPhone(patient.phone);
        setOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPatient) {
            setPatients(patients.map(p =>
                p.id === editingPatient.id
                    ? { ...p, firstname, lastname, dob, phone }
                    : p
            ));
            toast.success("Patient modifié avec succès");
        } else {
            const newPatient: Patient = {
                id: patients.length + 1,
                firstname,
                lastname,
                dob,
                phone,
                status: "Actif",
                lastVisit: new Date().toISOString().split('T')[0]
            };
            setPatients([...patients, newPatient]);
            toast.success("Nouveau patient créé");
        }
        setOpen(false);
    };

    const handleDelete = (id: number) => {
        setPatients(patients.filter(p => p.id !== id));
        toast.success("Patient supprimé");
    };

    const filteredPatients = patients.filter(p =>
        p.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.firstname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Patients</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Gestion des dossiers patients ({patients.length})</p>
                </div>
                <Button onClick={handleOpenCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Nouveau Patient
                </Button>
            </div>

            <div className="flex items-center space-x-2 bg-card p-2 rounded-lg border shadow-sm max-w-sm w-full">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Rechercher un patient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-none shadow-none focus-visible:ring-0"
                />
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editingPatient ? "Modifier patient" : "Ajouter un patient"}</DialogTitle>
                        <DialogDescription>
                            Dossier médical numérique.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lastname" className="text-right">Nom</Label>
                            <Input id="lastname" value={lastname} onChange={e => setLastname(e.target.value)} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="firstname" className="text-right">Prénom</Label>
                            <Input id="firstname" value={firstname} onChange={e => setFirstname(e.target.value)} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dob" className="text-right">Naissance</Label>
                            <Input id="dob" type="date" value={dob} onChange={e => setDob(e.target.value)} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">Tél</Label>
                            <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="col-span-3" />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Sauvegarder</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPatients.map((patient) => (
                    <Card key={patient.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarFallback>{patient.firstname[0]}{patient.lastname[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <CardTitle className="text-lg">{patient.firstname} {patient.lastname}</CardTitle>
                                <CardDescription className="text-xs">
                                    Né(e) le {patient.dob}
                                </CardDescription>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${patient.status === 'Actif' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
                                {patient.status}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Téléphone:</span>
                                    <span>{patient.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Dernière visite:</span>
                                    <span>{patient.lastVisit}</span>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                                <Button variant="outline" size="sm" onClick={() => handleOpenEdit(patient)}>
                                    <Pencil className="h-4 w-4 mr-1" /> Éditer
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(patient.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
