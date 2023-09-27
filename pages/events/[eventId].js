import { Fragment } from "react";
import { useRouter } from "next/router";
import { getEventById, getAllEvents } from "../../helpers/api-util";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";

function EventDetailPage({ selectedEvent }) {

  if (!selectedEvent) {
    return <p>No event found!</p>;
  }

  return (
    <Fragment>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId

  const event = await getEventById(eventId)

  return {
    props: {
      selectedEvent: event
    }
  }
}

export async function getStaticPaths() {
  const events = await getAllEvents()
  const paths = events.map((event) => {
    return { params: { eventId: event.id } }
  })

  return {
    paths: paths,
    fallback: false
  }
}

export default EventDetailPage;