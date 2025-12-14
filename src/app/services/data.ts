
export type DepartmentStatus = 'normal' | 'tension' | 'critical';

export interface Department {
    id: string;
    name: string;
    head: string;
    patientsCount: number;
    bedCapacity: number;
    availableBeds: number;
    status: DepartmentStatus;
    icon: string;
}

export const departments: Department[] = [
    {
        id: 'urg',
        name: 'Urgences',
        head: 'Dr. Martin',
        patientsCount: 45,
        bedCapacity: 50,
        availableBeds: 5,
        status: 'critical',
        icon: 'Siren'
    },
    {
        id: 'cardio',
        name: 'Cardiologie',
        head: 'Pr. Dubois',
        patientsCount: 28,
        bedCapacity: 40,
        availableBeds: 12,
        status: 'normal',
        icon: 'HeartPulse'
    },
    {
        id: 'ortho',
        name: 'Orthopédie',
        head: 'Dr. Lefebvre',
        patientsCount: 30,
        bedCapacity: 35,
        availableBeds: 5,
        status: 'tension',
        icon: 'Bone'
    },
    {
        id: 'pedia',
        name: 'Pédiatrie',
        head: 'Dr. Petit',
        patientsCount: 15,
        bedCapacity: 30,
        availableBeds: 15,
        status: 'normal',
        icon: 'Baby'
    }
];

export type BedStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance' | 'isolated';

export interface Bed {
    id: string;
    number: string;
    room: string;
    sector: string;
    status: BedStatus;
    type: 'standard' | 'medicalise' | 'rea';
    patientName?: string; // Masked in real app usually
}

export const beds: Bed[] = [
    { id: '101-1', number: '1', room: '101', sector: 'Aile A', status: 'occupied', type: 'standard', patientName: 'J. Dupont' },
    { id: '101-2', number: '2', room: '101', sector: 'Aile A', status: 'available', type: 'standard' },
    { id: '102-1', number: '1', room: '102', sector: 'Aile A', status: 'cleaning', type: 'medicalise' },
    { id: '102-2', number: '2', room: '102', sector: 'Aile A', status: 'occupied', type: 'medicalise', patientName: 'M. Martin' },
    { id: '103-1', number: '1', room: '103', sector: 'Aile A', status: 'maintenance', type: 'standard' },
    { id: '201-1', number: '1', room: '201', sector: 'Aile B (Réa)', status: 'occupied', type: 'rea', patientName: 'K. Alaoui' },
    { id: '201-2', number: '2', room: '201', sector: 'Aile B (Réa)', status: 'isolated', type: 'rea', patientName: 'L. Bernard' },
    { id: '202-1', number: '1', room: '202', sector: 'Aile B (Réa)', status: 'available', type: 'rea' },
];

export interface Equipment {
    id: string;
    name: string;
    type: string;
    serialNumber: string;
    status: 'operational' | 'maintenance' | 'broken';
    lastMaintenance: string;
    nextMaintenance: string;
    location: string;
}

export const equipments: Equipment[] = [
    { id: 'agm-01', name: 'IRM 3T Siemens', type: 'Imagerie', serialNumber: 'SN-48293', status: 'operational', lastMaintenance: '2024-11-15', nextMaintenance: '2025-05-15', location: 'Radiologie' },
    { id: 'scan-02', name: 'Scanner CT 64', type: 'Imagerie', serialNumber: 'SN-99882', status: 'maintenance', lastMaintenance: '2024-10-01', nextMaintenance: '2024-12-20', location: 'Urgences' },
    { id: 'resp-05', name: 'Respirateur Hamilton', type: 'Réanimation', serialNumber: 'RE-33221', status: 'operational', lastMaintenance: '2024-12-01', nextMaintenance: '2025-01-01', location: 'Réa B' },
    { id: 'mon-12', name: 'Moniteur Multi-params', type: 'Monitoring', serialNumber: 'MN-11002', status: 'broken', lastMaintenance: '2024-06-15', nextMaintenance: '2024-12-15', location: 'Chambre 103' },
];
