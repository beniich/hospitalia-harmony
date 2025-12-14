import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Mail, Phone, Stethoscope } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type StaffMember = {
    id: number;
    name: string;
    role: "Médecin" | "Infirmier" | "Admin" | "Autre";
    specialty?: string;
    email: string;
    phone: string;
    avatar?: string;
};

const initialStaff: StaffMember[] = [
    { id: 1, name: "Dr. Martin Martin", role: "Médecin", specialty: "Cardiologie", email: "martin.m@hospitalia.com", phone: "06 00 00 00 01" },
    { id: 2, name: "Sarah Connor", role: "Infirmier", specialty: "Urgences", email: "sarah.c@hospitalia.com", phone: "06 00 00 00 02" },
    { id: 3, name: "John Doe", role: "Admin", email: "john.d@hospitalia.com", phone: "06 00 00 00 03" },
];

export default function StaffPage() {
    const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
    const [open, setOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<StaffMember | null>(null);

    // Form
    const [name, setName] = useState("");
    const [role, setRole] = useState<string>("");
    const [specialty, setSpecialty] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleOpenCreate = () => {
        setEditingMember(null);
        setName("");
        setRole("");
        setSpecialty("");
        setEmail("");
        setPhone("");
        setOpen(true);
    };

    const handleOpenEdit = (member: StaffMember) => {
        setEditingMember(member);
        setName(member.name);
        setRole(member.role);
        setSpecialty(member.specialty || "");
        setEmail(member.email);
        setPhone(member.phone);
        setOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        const memberData: StaffMember = {
            id: editingMember ? editingMember.id : staff.length + 1,
            name,
            role: role as StaffMember["role"],
            specialty: specialty || undefined,
            email,
            phone
        };

        if (editingMember) {
            setStaff(staff.map(m => m.id === editingMember.id ? memberData : m));
            toast.success("Membre modifié");
        } else {
            setStaff([...staff, memberData]);
            toast.success("Nouveau membre ajouté");
        }
        setOpen(false);
    };

    const handleDelete = (id: number) => {
        setStaff(staff.filter(m => m.id !== id));
        toast.success("Membre supprimé");
    };

    return (
        <div className="space-y-6 fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Personnel</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Gestion des médecins, infirmiers et administratifs</p>
                </div>
                <Button onClick={handleOpenCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Ajouter Membre
                </Button>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingMember ? "Modifier membre" : "Ajouter un membre"}</DialogTitle>
                        <DialogDescription>Information de l'employé.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Nom Complet</Label>
                            <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">Rôle</Label>
                            <Select onValueChange={setRole} value={role} required>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Sélectionner un rôle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Médecin">Médecin</SelectItem>
                                    <SelectItem value="Infirmier">Infirmier</SelectItem>
                                    <SelectItem value="Admin">Administratif</SelectItem>
                                    <SelectItem value="Autre">Autre</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {role === "Médecin" && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="specialty" className="text-right">Spécialité</Label>
                                <Input id="specialty" value={specialty} onChange={e => setSpecialty(e.target.value)} className="col-span-3" placeholder="Ex: Cardiologie" />
                            </div>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">Téléphone</Label>
                            <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="col-span-3" />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Sauvegarder</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {staff.map((member) => (
                    <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-all duration-200">
                        <div className="h-2 bg-gradient-to-r from-medical-500 to-blue-400" />
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <Avatar className="h-20 w-20 mb-4 border-2 border-border">
                                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className="font-bold text-lg">{member.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 mb-4">
                                    <Stethoscope className="h-4 w-4" />
                                    <span>{member.role} {member.specialty ? `• ${member.specialty}` : ''}</span>
                                </div>

                                <div className="w-full space-y-2 mt-2">
                                    <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-2 text-sm p-2 rounded-md hover:bg-accent transition-colors">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        {member.email}
                                    </a>
                                    <a href={`tel:${member.phone}`} className="flex items-center justify-center gap-2 text-sm p-2 rounded-md hover:bg-accent transition-colors">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        {member.phone}
                                    </a>
                                </div>

                                <div className="flex gap-2 mt-6 w-full">
                                    <Button variant="outline" className="flex-1" onClick={() => handleOpenEdit(member)}>
                                        <Pencil className="h-4 w-4 mr-2" /> Modifier
                                    </Button>
                                    <Button variant="ghost" className="text-destructive hover:bg-destructive/10" size="icon" onClick={() => handleDelete(member.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
