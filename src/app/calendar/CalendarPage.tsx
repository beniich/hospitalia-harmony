
import { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Setup the localizer for French
const locales = {
    "fr": fr,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const DnDCalendar = withDragAndDrop(Calendar);

// Mock data
const initialEvents = [
    {
        id: 1,
        title: "Consultation - M. Dupont",
        start: new Date(2025, 11, 15, 10, 0), // Note: Month is 0-indexed (11 = Dec)
        end: new Date(2025, 11, 15, 11, 0),
        resourceId: 1,
        type: "consultation"
    },
    {
        id: 2,
        title: "Chirurgie - Mme Martin",
        start: new Date(2025, 11, 16, 14, 0),
        end: new Date(2025, 11, 16, 16, 0),
        resourceId: 2,
        type: "surgery"
    }
];

export default function CalendarPage() {
    const [events, setEvents] = useState(initialEvents);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: "", start: new Date(), end: new Date(), type: "consultation" });

    const handleSelectSlot = ({ start, end }: any) => {
        setNewEvent({ ...newEvent, start, end });
        setIsDialogOpen(true);
    };

    const handleSelectEvent = (event: any) => {
        alert(`Rendez-vous: ${event.title}`);
    };

    const handleEventDrop = ({ event, start, end }: any) => {
        const updatedEvents = events.map((existingEvent) => {
            if (existingEvent.id === event.id) {
                return { ...existingEvent, start, end };
            }
            return existingEvent;
        });
        setEvents(updatedEvents);
    };

    const handleSaveEvent = () => {
        setEvents([...events, { ...newEvent, id: events.length + 1 } as any]);
        setIsDialogOpen(false);
    };

    const eventStyleGetter = (event: any) => {
        let backgroundColor = "#3174ad";
        if (event.type === "surgery") backgroundColor = "#e74c3c";
        if (event.type === "consultation") backgroundColor = "#2ecc71";

        return {
            style: {
                backgroundColor,
                borderRadius: "5px",
                opacity: 0.8,
                color: "white",
                border: "0px",
                display: "block"
            }
        };
    };

    return (
        <div className="h-full flex flex-col space-y-4 animate-fade-in p-2">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight text-[#1A1F2C] dark:text-white">Planning Interactif</h2>
                <Button onClick={() => setIsDialogOpen(true)} className="bg-medical-500 hover:bg-medical-600 text-white">
                    Nouveau Rendez-vous
                </Button>
            </div>

            <Card className="p-4 flex-1 shadow-md border-gray-100 bg-white/50 backdrop-blur-sm">
                <div style={{ height: "calc(100vh - 200px)" }}>
                    <DnDCalendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: "100%" }}
                        views={[Views.MONTH, Views.WEEK, Views.DAY]}
                        defaultView={Views.WEEK}
                        step={30}
                        timeslots={2}
                        culture="fr"
                        selectable
                        resizable
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={handleSelectEvent}
                        onEventDrop={handleEventDrop}
                        onEventResize={handleEventDrop}
                        eventPropGetter={eventStyleGetter}
                        messages={{
                            next: "Suivant",
                            previous: "Précédent",
                            today: "Aujourd'hui",
                            month: "Mois",
                            week: "Semaine",
                            day: "Jour",
                            agenda: "Agenda",
                            date: "Date",
                            time: "Heure",
                            event: "Événement",
                            noEventsInRange: "Aucun événement dans cette plage",
                        }}
                    />
                </div>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nouveau Rendez-vous</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <Label>Titre</Label>
                            <Input
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                placeholder="Ex: Consultation Mme..."
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Type</Label>
                            <Select
                                value={newEvent.type}
                                onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Type de RDV" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="consultation">Consultation</SelectItem>
                                    <SelectItem value="surgery">Chirurgie</SelectItem>
                                    <SelectItem value="urgent">Urgence</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Simple date inputs for now, could be improved with DatePicker */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label>Début</Label>
                                <Input type="datetime-local"
                                    value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
                                    onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                                />
                            </div>
                            <div>
                                <Label>Fin</Label>
                                <Input type="datetime-local"
                                    value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
                                    onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
                        <Button onClick={handleSaveEvent} className="bg-medical-500 text-white">Enregistrer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
