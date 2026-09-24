import { setRequestLocale, getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TransportSection from '@/components/TransportSection';
import InfoSection from '@/components/InfoSection';
import RouteSection from '@/components/RouteSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';
import EventsSection from '@/components/EventsSection';
import JsonLd from '@/components/JsonLd';

const BASE_URL = 'https://stgeorgessquaremalta.com';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await getMessages()) as { meta?: { description?: string } };
  const selfUrl = `${BASE_URL}/${locale}/`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TouristAttraction', 'LandmarksOrHistoricalBuildings', 'Place'],
        '@id': `${BASE_URL}/#attraction`,
        name: "St. George's Square (Misraħ San Ġorġ)",
        alternateName: ['Pjazza San Ġorġ', 'St. George’s Square'],
        description: messages.meta?.description ?? '',
        url: selfUrl,
        image: [
          `${BASE_URL}/gallery/st-georges-square%20(1).jpg`,
          `${BASE_URL}/gallery/st-georges-square%20(2).jpg`,
          `${BASE_URL}/gallery/st-georges-square%20(4).jpg`,
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Republic Street',
          addressLocality: 'Valletta',
          postalCode: 'VLT 1110',
          addressCountry: 'MT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 35.8987,
          longitude: 14.5146,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: 4.6,
          reviewCount: 5327,
        },
        isAccessibleForFree: true,
        publicAccess: true,
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
          },
        ],
        sameAs: ['https://maps.app.goo.gl/MWYBp4WMmkk3NWgR7'],
        isPartOf: {
          '@type': 'City',
          name: 'Valletta',
          '@id': `${BASE_URL}/#city`,
        },
        containedInPlace: {
          '@type': 'Country',
          name: 'Malta',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        name: "St. George's Square",
        url: `${BASE_URL}/`,
        inLanguage: locale,
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TransportSection />
        <InfoSection />
        <RouteSection />
        <PhotoSpotsSection />
        <Gallery />
        <EventsSection />
        <Reviews />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
