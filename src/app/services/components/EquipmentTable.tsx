import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wrench, CalendarClock, MapPin } from "lucide-react";

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

export function EquipmentTable({ equipments }: { equipments: Equipment[] }) {
    // Helper to check if maintenance is soon (within 30 days)
    const isMaintenanceSoon = (dateStr: string) => {
        const today = new Date();
        const maintDate = new Date(dateStr);
        const diffTime = maintDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 && diffDays <= 30;
    };

    return (
        <div className="border rounded-lg overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead>Équipement</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Série</TableHead>
                        <TableHead>Localisation</TableHead>
                        <TableHead>Maintenance</TableHead>
                        <TableHead className="text-right">Statut</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {equipments.map((eq) => (
                        <TableRow key={eq.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <Wrench className="h-4 w-4 text-gray-400" />
                                    {eq.name}
                                </div>
                            </TableCell>
                            <TableCell>{eq.type}</TableCell>
                            <TableCell className="text-xs text-gray-500 font-mono">{eq.serialNumber}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1.5 text-gray-600">
                                    <MapPin className="h-3 w-3" />
                                    {eq.location}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="text-xs space-y-0.5">
                                    <div className="text-gray-500">Dernière: {eq.lastMaintenance}</div>
                                    <div className={`flex items-center gap-1 font-medium ${isMaintenanceSoon(eq.nextMaintenance) ? "text-orange-600" : "text-gray-700"}`}>
                                        <CalendarClock className="h-3 w-3" />
                                        Next: {eq.nextMaintenance}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Badge
                                    variant={eq.status === 'operational' ? 'default' : eq.status === 'broken' ? 'destructive' : 'secondary'}
                                    className={eq.status === 'operational' ? 'bg-green-500 hover:bg-green-600' : ''}
                                >
                                    {eq.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
