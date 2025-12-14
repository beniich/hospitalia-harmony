import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Lock, User, Palette } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Paramètres enregistrés");
    };

    return (
        <div className="space-y-6 fade-in max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Paramètres</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Gérez vos préférences et la configuration du compte</p>
            </div>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                    <TabsTrigger value="account">Compte</TabsTrigger>
                    <TabsTrigger value="notifications">Notifs</TabsTrigger>
                    <TabsTrigger value="security">Sécurité</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profil Utilisateur</CardTitle>
                            <CardDescription>
                                Modifiez vos informations personnelles.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nom complet</Label>
                                <Input id="name" defaultValue="Dr. Martin Martin" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" defaultValue="martin.martin@hospitalia.com" />
                            </div>
                            <Button onClick={(e) => handleSave(e)}>Sauvegarder</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>
                                Choisissez comment vous souhaitez être contacté.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="email-notif" className="flex flex-col space-y-1">
                                    <span>Notifications Email</span>
                                    <span className="font-normal text-xs text-muted-foreground">Recevoir un résumé quotidien.</span>
                                </Label>
                                <Switch id="email-notif" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="sms-notif" className="flex flex-col space-y-1">
                                    <span>Notifications SMS</span>
                                    <span className="font-normal text-xs text-muted-foreground">Pour les urgences uniquement.</span>
                                </Label>
                                <Switch id="sms-notif" />
                            </div>
                            <Button onClick={(e) => handleSave(e)}>Sauvegarder</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sécurité</CardTitle>
                            <CardDescription>
                                Mettez à jour votre mot de passe.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Mot de passe actuel</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <Button onClick={(e) => handleSave(e)}>Mettre à jour mot de passe</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
