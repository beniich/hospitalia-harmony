import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const dataRevenue = [
    { name: 'Jan', revenu: 4000 },
    { name: 'Fév', revenu: 3000 },
    { name: 'Mar', revenu: 2000 },
    { name: 'Avr', revenu: 2780 },
    { name: 'Mai', revenu: 1890 },
    { name: 'Juin', revenu: 2390 },
];

const dataPatients = [
    { name: 'Jan', patients: 140 },
    { name: 'Fév', patients: 180 },
    { name: 'Mar', patients: 220 },
    { name: 'Avr', patients: 280 },
    { name: 'Mai', patients: 350 },
    { name: 'Juin', patients: 390 },
];

const dataServices = [
    { name: 'Cardiologie', value: 400 },
    { name: 'Pédiatrie', value: 300 },
    { name: 'Urgences', value: 300 },
    { name: 'Général', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ReportsPage() {
    return (
        <div className="space-y-6 fade-in p-4 pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Rapports & Analytics</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Vue d'ensemble des performances de la clinique</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Revenus Mensuels (€)</CardTitle>
                        <CardDescription>Évolution du chiffre d'affaires sur 6 mois</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataRevenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenu" fill="#8884d8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Nouveaux Patients</CardTitle>
                        <CardDescription>Croissance de la base patient</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataPatients}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="patients" stroke="#82ca9d" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Répartition par Service</CardTitle>
                        <CardDescription>Volume d'activité par département</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={dataServices}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {dataServices.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Indicateurs Clés (KPI)</CardTitle>
                        <CardDescription>Résumé de la semaine</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="font-medium">Taux d'occupation</span>
                                <span className="font-bold text-green-600">85%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="font-medium">Temps d'attente moyen</span>
                                <span className="font-bold text-amber-600">12 min</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="font-medium">Satisfaction Patient</span>
                                <span className="font-bold text-blue-600">4.8/5</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
