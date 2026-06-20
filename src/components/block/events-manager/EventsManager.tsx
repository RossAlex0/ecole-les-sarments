"use client";

import ResourceManager from "@/components/block/resource-manager/ResourceManager";
import { EVENT_FIELDS } from "@/utils/form/resourceConfigs";
import { useCreateEvent } from "@/utils/hooks/events/useCreateEvent";
import { useUpdateEvent } from "@/utils/hooks/events/useUpdateEvent";
import { useDeleteEvent } from "@/utils/hooks/events/useDeleteEvent";

export default function EventsManager() {
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  return (
    <ResourceManager
      apiUrl="/api/event/admin"
      fields={EVENT_FIELDS}
      labelFields={["title"]}
      addLabel="Ajouter un événement"
      onCreate={createEvent}
      onUpdate={updateEvent}
      onDelete={deleteEvent}
      getBadge={(row) =>
        row.is_event ? { label: "Event", tone: "event" } : { label: "Actualité", tone: "news" }
      }
    />
  );
}
