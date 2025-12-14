import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Lock, User, Palette, Building2 } from "lucide-react";
import { toast } from "sonner";
import { useCompanySettings } from "@/hooks/useCompanySettings";

export default function SettingsPage() {
    const { settings, updateSettings } = useCompanySettings();

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

            <Tabs defaultValue="company" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
                    <TabsTrigger value="company">Établissement</TabsTrigger>
                    <TabsTrigger value="account">Compte</TabsTrigger>
                    <TabsTrigger value="notifications">Notifs</TabsTrigger>
                    <TabsTrigger value="security">Sécurité</TabsTrigger>
                </TabsList>

                <TabsContent value="company">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations de l'Établissement</CardTitle>
                            <CardDescription>
                                Ces informations apparaîtront sur vos factures et documents officiels.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company-name">Nom de la structure</Label>
                                    <Input id="company-name" value={settings.name} onChange={(e) => updateSettings({ name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-email">Email contact</Label>
                                    <Input id="company-email" value={settings.email} onChange={(e) => updateSettings({ email: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-address">Adresse</Label>
                                <Input id="company-address" value={settings.address} onChange={(e) => updateSettings({ address: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company-city">Ville / Pays</Label>
                                    <Input id="company-city" value={settings.city} onChange={(e) => updateSettings({ city: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-phone">Téléphone</Label>
                                    <Input id="company-phone" value={settings.phone} onChange={(e) => updateSettings({ phone: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 border-t pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company-ice">ICE</Label>
                                    <Input id="company-ice" value={settings.ice} onChange={(e) => updateSettings({ ice: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-rc">RC</Label>
                                    <Input id="company-rc" value={settings.rc} onChange={(e) => updateSettings({ rc: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-if">IF</Label>
                                    <Input id="company-if" value={settings.if} onChange={(e) => updateSettings({ if: e.target.value })} />
                                </div>
                            </div>
                            <Button onClick={(e) => handleSave(e)} className="w-full mt-4">Enregistrer les modifications</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

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
