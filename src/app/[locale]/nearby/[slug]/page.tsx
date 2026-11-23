import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { guideCopy, guideLocale, guideRole, guideType, readGuide } from '@/data/nearby-guide';
import JsonLd from '@/components/JsonLd';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { nearbyCopy, placeCopy, placeMap, places, siteUrl } from '@/data/nearby';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return places.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const place = places.find((item) => item.slug === slug);
  if (!place) notFound();
  const content = placeCopy(place, locale);
  const guide = readGuide(slug);
  const url = `${siteUrl}/${locale}/nearby/${slug}`;
  return {
    title: content.name,
    description: guide.text[guideLocale(locale)].history,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((item) => [item, `${siteUrl}/${item}/nearby/${slug}`])),
    },
    openGraph: { title: content.name, description: content.note, url, images: [{ url: place.photo, alt: content.name }] },
    twitter: { card: 'summary_large_image', title: content.name, description: content.note, images: [place.photo] },
  };
}

function GuideSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border p-5 sm:p-8" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
      <h2 className="font-display text-2xl font-bold mb-4">{title}</h2>
      {children}
    </section>
  );
}

function PhotoCredit({ label, credit, author, license, licenseUrl }: {
  label: string; credit: string; author: string; license: string; licenseUrl: string;
}) {
  return (
    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
      <a className="underline" href={credit}>{label}</a>
      {author && <> · {author}</>}
      {license && <> · {licenseUrl ? <a className="underline" href={licenseUrl}>{license}</a> : license}</>}
    </p>
  );
}

export default async function NearbyPlace({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const place = places.find((item) => item.slug === slug);
  if (!place) notFound();

  const guide = readGuide(slug);
  const content = placeCopy(place, locale);
  const story = guide.text[guideLocale(locale)];
  const copy = nearbyCopy(locale);
  const ui = guideCopy(locale);
  const map = placeMap(place);
  const role = ui.roles[guideRole(guide.role)].replace('{name}', place.manager);
  const transport = copy[place.route as 'core' | 'floriana' | 'harbour' | 'three'];
  const visit = ui.visit[guideType(guide.visit)];
  const steps = guide.walk.map((stop) => places.find((item) => item.slug === stop)!);
  const stops = steps.map((stop) => [stop.text.en.name, stop.address, 'Malta'].join(', '));
  const walkingParams = new URLSearchParams({
    api: '1', origin: stops[0], destination: stops[2], waypoints: stops[1], travelmode: 'walking',
  });
  const walkingLink = 'https://www.google.com/maps/dir/?' + walkingParams;
  const admission = guide.visit === 'lift' ? '€1' : place.public ? copy.public : copy.ticket;
  const info = [[copy.address, place.address], [ui.management, role], [copy.hours, place.public ? copy.outdoors : copy.planned], [copy.admission, admission]];
  const photos = [{ ...place, src: place.photo }, ...guide.gallery];
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: content.name,
    description: story.history,
    url: siteUrl + '/' + locale + '/nearby/' + slug,
    address: { '@type': 'PostalAddress', streetAddress: place.address, addressCountry: 'MT' },
    image: photos.map(({ src }) => siteUrl + src),
    hasMap: map,
    ...(guide.coordinates && { geo: { '@type': 'GeoCoordinates', latitude: guide.coordinates[0], longitude: guide.coordinates[1] } }),
  };

  return (
    <>
      <JsonLd data={structured} />
      <Header />
      <main>
        <section className="relative min-h-[65svh] flex items-end isolate">
          <img src={place.photo} alt={content.name} fetchPriority="high" className="absolute inset-0 -z-20 w-full h-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/40 to-black/50" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-12 w-full text-white">
            <a href={'/' + locale + '/nearby'} className="text-white underline underline-offset-4">{copy.nearby}</a>
            <h1 className="font-display text-4xl sm:text-6xl font-bold mt-4">{content.name}</h1>
            <p className="mt-3 text-sm text-white/90">{place.address}</p>
            <a href={map} className="inline-block mt-5 rounded-full bg-white/20 px-4 py-2">{copy.map}</a>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
          <GuideSection title={ui.about + (locale === 'zh' ? '' : ' ') + content.name}>
            <p className="font-semibold">{role}</p>
            <p className="mt-3 leading-relaxed max-w-3xl">{story.history}</p>
            <a className="inline-block mt-3 underline" href={guide.source}>{copy.source}</a>
            {guide.source !== place.source && <a className="inline-block mt-3 ms-4 underline" href={place.source}>{copy.info}</a>}
          </GuideSection>

          <div className="grid gap-6 md:grid-cols-2">
            <GuideSection title={ui.highlights}><p>{content.note}</p></GuideSection>
            <GuideSection title={ui.plan}><p>{visit}</p></GuideSection>
          </div>

          <GuideSection title={copy.info}>
            <dl className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {info.map(([label, value]) => (
                <div key={label} className="grid gap-1 py-3 sm:grid-cols-[1fr_2fr]">
                  <dt className="font-semibold">{label}</dt><dd>{value}</dd>
                </div>
              ))}
            </dl>
          </GuideSection>

          <div className="grid gap-6 md:grid-cols-2">
            <GuideSection title={copy.transport}>
              <p>{transport}</p>
              {place.route === 'three' && <a className="mt-3 block underline" href="https://www.publictransport.com.mt/other-services/valletta-ferry/">Malta Public Transport</a>}
              <a className="mt-3 block underline" href={placeMap(place, true)}>{copy.directions}</a>
            </GuideSection>
            <GuideSection title={ui.walk}>
              <ol className="list-decimal ps-6 space-y-2">
                {steps.map((stop) => (
                  <li key={stop.slug}>{stop.slug === slug ? content.name : (
                    <a className="underline" href={'/' + locale + '/nearby/' + stop.slug}>{placeCopy(stop, locale).name}</a>
                  )}</li>
                ))}
              </ol>
              <a className="mt-4 inline-block underline" href={walkingLink}>{copy.directions}</a>
            </GuideSection>
          </div>

          <GuideSection title={ui.photo}>
            <p className="mb-5">{story.photoTip}</p>
            <div className={photos.length > 1 ? 'grid gap-5 sm:grid-cols-2' : 'max-w-2xl'}>
              {photos.map((photo) => (
                <figure key={photo.src}>
                  <img src={photo.src} alt={content.name} className="w-full aspect-3/2 rounded-xl object-cover" loading="lazy" />
                  <figcaption className="mt-2"><PhotoCredit label={copy.photo} {...photo} /></figcaption>
                </figure>
              ))}
            </div>
          </GuideSection>

          <div className="grid gap-6 md:grid-cols-2">
            <GuideSection title={ui.faq}>
              <details className="py-2">
                <summary className="cursor-pointer font-semibold">{ui.access}</summary>
                <p className="pt-2">{ui.inside[guideType(guide.visit)]} <a className="underline" href={guide.source}>{copy.source}</a></p>
              </details>
              <details className="py-2">
                <summary className="cursor-pointer font-semibold">{ui.routeQuestion}</summary>
                <ul className="pt-2 list-disc ps-6">
                  {[steps[0], steps[2]].map((stop) => (
                    <li key={stop.slug}><a className="underline" href={'/' + locale + '/nearby/' + stop.slug}>{placeCopy(stop, locale).name}</a></li>
                  ))}
                </ul>
              </details>
            </GuideSection>
            <GuideSection title={copy.reviews}>
              <a href={map} className="underline">{copy.reviewLink}</a>
            </GuideSection>
          </div>

          <a href={'/' + locale + '/nearby'} className="inline-block font-semibold underline" style={{ color: 'var(--accent)' }}>{copy.all}</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
