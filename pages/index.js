import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "@/components/events/event-list";

function HomePage({ featuredEvents }) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents
    },
    revalidate: 1800
  }
}


export default HomePage;