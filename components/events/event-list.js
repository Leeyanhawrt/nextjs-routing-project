import EventItem from "./event-item";

function EventList({ items }) {
  return (
    <ul>
      {items.map((event) => {
        return (
          <EventItem />
        )
      })}
    </ul>
  )
}

export default EventList;