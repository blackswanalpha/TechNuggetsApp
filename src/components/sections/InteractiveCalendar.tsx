import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: "workshop" | "meetup" | "conference" | "other";
  description: string;
}

const eventColors = {
  workshop: "bg-blue-500",
  meetup: "bg-green-500",
  conference: "bg-purple-500",
  other: "bg-gray-500",
};

const defaultEvents: Event[] = [
  {
    id: "1",
    title: "React Workshop",
    date: new Date(2024, 3, 15),
    type: "workshop",
    description: "Hands-on React workshop for beginners",
  },
  {
    id: "2",
    title: "Tech Meetup",
    date: new Date(2024, 3, 20),
    type: "meetup",
    description: "Monthly tech community meetup",
  },
  {
    id: "3",
    title: "DevCon 2024",
    date: new Date(2024, 3, 25),
    type: "conference",
    description: "Annual developer conference",
  },
];

const EventPreview = ({ event }: { event: Event }) => (
  <div className="p-4 bg-[#1A1F2E] rounded-lg border border-gray-800">
    <div className="flex items-center justify-between mb-2">
      <h4 className="font-space-grotesk font-medium text-white">
        {event.title}
      </h4>
      <Badge
        variant="secondary"
        className={`${eventColors[event.type]} bg-opacity-20 text-white`}
      >
        {event.type}
      </Badge>
    </div>
    <p className="text-sm text-gray-400">{event.description}</p>
    <p className="text-sm text-gray-400 mt-2">
      {event.date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>
  </div>
);

const AddEventDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        size="icon"
        className="bg-[#64FFDA] text-[#0A0F1C] hover:bg-[#64FFDA]/90 rounded-full h-12 w-12 shadow-lg fixed bottom-8 right-8"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </DialogTrigger>
    <DialogContent className="bg-[#1A1F2E] text-white border-gray-800">
      <DialogHeader>
        <DialogTitle>Add New Event</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 mt-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Event Title</label>
          <Input
            placeholder="Enter event title"
            className="bg-[#0A0F1C] border-gray-800"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Event Type</label>
          <Select>
            <SelectTrigger className="bg-[#0A0F1C] border-gray-800">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="meetup">Meetup</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Description</label>
          <Input
            placeholder="Enter event description"
            className="bg-[#0A0F1C] border-gray-800"
          />
        </div>
        <div className="flex justify-end gap-3">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button className="bg-[#64FFDA] text-[#0A0F1C] hover:bg-[#64FFDA]/90">
            Add Event
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

interface InteractiveCalendarProps {
  events?: Event[];
}

const InteractiveCalendar = ({
  events = defaultEvents,
}: InteractiveCalendarProps) => {
  const [view, setView] = useState<"month" | "week">("month");
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const selectedDateEvents = events.filter(
    (event) =>
      selectedDate && event.date.toDateString() === selectedDate.toDateString(),
  );

  return (
    <div className="w-full bg-[#0A0F1C] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-space-grotesk text-3xl font-bold text-white">
            Event Calendar
          </h2>
          <Select
            value={view}
            onValueChange={(v) => setView(v as "month" | "week")}
          >
            <SelectTrigger className="w-[180px] border-[#64FFDA] text-[#64FFDA]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#1A1F2E] rounded-lg p-6 border border-gray-800">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="text-white"
              modifiers={{
                event: (date) =>
                  events.some(
                    (event) =>
                      event.date.toDateString() === date.toDateString(),
                  ),
              }}
              modifiersStyles={{
                event: {
                  fontWeight: "bold",
                  color: "#64FFDA",
                },
              }}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-space-grotesk text-xl font-medium text-white mb-4">
              {selectedDate?.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event) => (
                <EventPreview key={event.id} event={event} />
              ))
            ) : (
              <p className="text-gray-400">No events scheduled for this day</p>
            )}
          </div>
        </div>

        <AddEventDialog />
      </div>
    </div>
  );
};

export default InteractiveCalendar;
