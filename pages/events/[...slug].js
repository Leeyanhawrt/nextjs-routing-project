import { getFilteredEvents } from "../../helpers/api-util";
import { useRouter } from "next/router";
import Head from "next/head";

import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import { Fragment } from "react";

function FilteredEventsPage({ hasError, events, dateF }) {
  const router = useRouter();

  const filteredData = router.query.slug;

  if (!filteredData) {
    return (
      <p className="center">Loading...</p>
    )
  }

  const filteredEvents = events;

  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return <Fragment>
      <p>No events found for the chosen filter!</p>
      <div className='center'>
        <Button link="/events">Show All Events</Button>
      </div>
    </Fragment>
  }

  const date = new Date(date.year, date.month - 1)

  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta name="description" content={`All events for ${numMonth}/${numYear}.`} />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  const { params } = context

  const filteredData = params.slug;

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
    return {
      props: {
        hasError: true
      }
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });


  return {
    props: {
      events: filteredEvents,
      dateF: {
        year: numYear,
        month: numMonth
      }
    }
  }
}

export default FilteredEventsPage;