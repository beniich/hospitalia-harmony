import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BedDouble, Stethoscope, Pill, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DepartmentCard } from "./components/DepartmentCard";
import { BedGrid } from "./components/BedGrid";
import { EquipmentTable } from "./components/EquipmentTable";

interface Department {
  id: string;
  name: string;
  head: string;
  patientsCount: number;
  bedCapacity: number;
  availableBeds: number;
  status: string;
  icon: string;
}

interface Bed {
  id: string;
  number: string;
  room: string;
  sector: string;
  status: string;
  type: string;
  patientName?: string;
}

interface Equipment {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  status: string;
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
}

export default function ServicesPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [beds, setBeds] = useState<Bed[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);

  useEffect(() => {
    fetch("/api/departments")
      .then((res) => res.json())
      .then(setDepartments);
    fetch("/api/beds")
      .then((res) => res.json())
      .then(setBeds);
    fetch("/api/equipments")
      .then((res) => res.json())
      .then(setEquipments);
  }, []);

  const handleAddDepartment = () => {
    const newDept: Department = {
      id: `dept-${Date.now()}`,
      name: "Nouveau Service",
      head: "À définir",
      patientsCount: 0,
      bedCapacity: 20,
      availableBeds: 20,
      status: "normal",
      icon: "Activity"
    };

    fetch("/api/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDept)
    })
      .then(res => res.json())
      .then(dept => {
        setDepartments([...departments, dept]);
        toast.success("Service ajouté !");
      });
  };

  const handleDeleteDepartment = (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce service ?")) return;
    fetch(`/api/departments/${id}`, { method: "DELETE" })
      .then(() => {
        setDepartments(departments.filter(d => d.id !== id));
        toast.success("Service supprimé");
      });
  };

  const handleAddBed = () => {
    const newBed: Bed = {
      id: `bed-${Date.now()}`,
      number: `${beds.length + 1}`,
      room: "100",
      sector: "Nouveau",
      status: "available",
      type: "standard"
    };

    fetch("/api/beds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBed)
    })
      .then(res => res.json())
      .then(bed => {
        setBeds([...beds, bed]);
        toast.success("Lit ajouté !");
      });
  };

  const handleDeleteBed = (id: string) => {
    if (!confirm("Supprimer ce lit ?")) return;
    fetch(`/api/beds/${id}`, { method: "DELETE" })
      .then(() => {
        setBeds(beds.filter(b => b.id !== id));
        toast.success("Lit supprimé");
      });
  };

  return (
    <div className="space-y-6 fade-in p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Services & Ressources
          </h1>
          <p className="text-gray-500 mt-2">
            Vue d'overview de l'activité hospitalière et des ressources critiques.
          </p>
        </div>
      </div>

      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mb-6">
          <TabsTrigger value="departments" className="flex gap-2">
            <Stethoscope className="h-4 w-4" /> Services
          </TabsTrigger>
          <TabsTrigger value="beds" className="flex gap-2">
            <BedDouble className="h-4 w-4" /> Hébergement
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex gap-2">
            <Activity className="h-4 w-4" /> Équipements
          </TabsTrigger>
          <TabsTrigger value="pharmacy" className="flex gap-2">
            <Pill className="h-4 w-4" /> Stocks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={handleAddDepartment}>
              <Plus className="mr-2 h-4 w-4" /> Ajouter Service
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} onDelete={handleDeleteDepartment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="beds">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">État des Lits en Temps Réel</h2>
              <div className="flex items-center gap-4">
                <div className="flex gap-2 text-sm">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-green-500" /> Libre
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500" /> Occupé
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-yellow-500" /> Nettoyage
                  </span>
                </div>
                <Button size="sm" onClick={handleAddBed}>
                  <Plus className="mr-2 h-4 w-4" /> Ajouter Lit
                </Button>
              </div>
            </div>
            <BedGrid beds={beds} filter="all" onDelete={handleDeleteBed} />
          </div>
        </TabsContent>

        <TabsContent value="equipment">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Inventaire Biomédical</h2>
            <EquipmentTable equipments={equipments} />
          </div>
        </TabsContent>

        <TabsContent value="pharmacy">
          <div className="grid place-items-center h-64 bg-gray-50 border border-dashed rounded-lg">
            <div className="text-center text-gray-500">
              <Pill className="h-12 w-12 mx-auto mb-2 opacity-50" />
              Module Gestion des Stocks en cours de développement...
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
