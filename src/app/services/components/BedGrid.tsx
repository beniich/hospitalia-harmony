import { BedDouble } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Bed {
    id: string;
    number: string;
    room: string;
    sector: string;
    status: string;
    type: string;
    patientName?: string;
}

const statusColors: Record<string, string> = {
    occupied: "bg-red-50 text-red-600 border-red-200 hover:bg-red-100",
    available: "bg-green-50 text-green-600 border-green-200 hover:bg-green-100",
    cleaning: "bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100",
    maintenance: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100",
    isolated: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100"
};

const statusLabels: Record<string, string> = {
    occupied: "Occupé",
    available: "Libre",
    cleaning: "Nettoyage",
    maintenance: "Maintenance",
    isolated: "Isolé"
};

export function BedGrid({ beds, filter = "all" }: { beds: Bed[], filter?: string }) {
    const filteredBeds = filter === "all" ? beds : beds.filter(b => b.status === filter);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filteredBeds.map((bed) => (
                <TooltipProvider key={bed.id}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${statusColors[bed.status] || "bg-gray-50 border-gray-200"}`}>
                                <div className="relative">
                                    <BedDouble className="h-6 w-6" />
                                    {bed.status === 'occupied' && (
                                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                    )}
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-sm">Lit {bed.number}</div>
                                    <div className="text-[10px] uppercase font-medium mt-0.5">{bed.room}</div>
                                </div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="text-xs space-y-1">
                                <p><span className="font-semibold">Statut:</span> {statusLabels[bed.status]}</p>
                                <p><span className="font-semibold">Secteur:</span> {bed.sector}</p>
                                <p><span className="font-semibold">Type:</span> {bed.type}</p>
                                {bed.patientName && (
                                    <div className="pt-1 border-t mt-1">
                                        <p className="font-semibold">Patient:</p>
                                        <p>{bed.patientName}</p>
                                    </div>
                                )}
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}

            {filteredBeds.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500 italic">
                    Aucun lit trouvé pour ce filtre.
                </div>
            )}
        </div>
    );
}
