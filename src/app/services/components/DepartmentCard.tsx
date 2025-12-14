import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Bed, Activity, Siren, HeartPulse, Bone, Baby } from "lucide-react";

// Map department icon strings to Lucide components
import { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    Siren,
    HeartPulse,
    Bone,
    Baby,
    Activity // fallback
};

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

export function DepartmentCard({ department }: { department: Department }) {
    const Icon = iconMap[department.icon] || Activity;
    // Calculate occupancy percentage
    const occupiedBeds = department.bedCapacity - department.availableBeds;
    const occupancyRate = (occupiedBeds / department.bedCapacity) * 100;

    // Determine status color
    const statusColor = department.status === 'critical' ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100';
    const iconBg = department.status === 'critical' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600';
    const progressIndicatorColor = occupancyRate > 90 ? "bg-red-500" : "bg-blue-500";
    const progressBg = occupancyRate > 90 ? "bg-red-100" : "bg-gray-100";

    return (
        <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${iconBg}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{department.name}</CardTitle>
                            <CardDescription className="text-xs">Resp: {department.head}</CardDescription>
                        </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide ${statusColor}`}>
                        {department.status}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{department.patientsCount} Patients</span>
                        </div>
                        <span>Cap: {department.bedCapacity}</span>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                            <span className="font-medium text-gray-600">Taux d'occupation</span>
                            <span className={occupancyRate > 90 ? "text-red-500 font-bold" : "text-gray-600"}>
                                {occupancyRate.toFixed(0)}%
                            </span>
                        </div>
                        <Progress
                            value={occupancyRate}
                            className={`h-2 ${progressBg}`}
                            // @ts-expect-error - custom prop supported by our implementation
                            indicatorClassName={progressIndicatorColor}
                        />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 pt-3 border-t mt-2">
                        <Bed className="h-4 w-4 text-gray-400" />
                        <span className={department.availableBeds === 0 ? "text-red-500 font-medium" : ""}>
                            {department.availableBeds} lits disponibles
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
