import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { guideCopy, guideLocale, guideRole, guideType, readGuide } from '@/data/nearby-guide';
import { visitorInfo } from '@/data/nearby-visitor';
import JsonLd from '@/components/JsonLd';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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

function GuideSection({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-xl border p-6 sm:p-8" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4">{title}</h2>
      <div className="mb-5 h-0.5 w-12" style={{ background: 'var(--accent)' }} />
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
  const controls = await getTranslations('interface');
  const visitor = visitorInfo(slug, locale, place.route, guide.source);
  const v = visitor.ui;
  const stopNames = steps.map((stop) => placeCopy(stop, locale).name);
  const intro = v.nearby.replace('{start}', stopNames[0]).replace('{end}', stopNames[2]).replace('{time}', visitor.minutes);
  const info = [
    [v.type, visitor.type], [copy.address, place.address], [ui.management, role],
    [v.duration, visitor.minutes + ' ' + v.minute], [copy.hours, visitor.hours], [copy.admission, visitor.fare],
  ];
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
        <section className="relative min-h-[78svh] flex items-end isolate">
          <img src={place.photo} alt={content.name} fetchPriority="high" className="absolute inset-0 -z-20 w-full h-full object-cover" />
          <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.68), transparent 75%), var(--hero-overlay)' }} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-12 w-full text-white">
            <a href={'/' + locale + '/nearby'} className="text-white underline underline-offset-4">{copy.nearby}</a>
            <h1 className="font-display max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-bold mt-4 leading-tight">{content.name}</h1>
            <p className="mt-3 text-xl text-white/95">{visitor.tagline}</p>
            <p className="mt-3 text-sm text-white/90">{place.address}</p>
            <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
              <a href="#opening-hours" className="rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 hover:bg-white/25">{visitor.hours}</a>
              <a href={map} className="rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 hover:bg-white/25">{copy.map}</a>
              <a href="#visitor-reviews" className="rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 hover:bg-white/25">{v.rates}</a>
            </div>
          </div>
        </section>

        <div style={{ background: 'var(--bg-secondary)' }}>
          <nav aria-label={controls('onPage')} className="max-w-6xl mx-auto flex flex-wrap gap-x-5 gap-y-2 px-4 py-4 sm:px-6">
            {[
              ['visitor-info', copy.info], ['opening-hours', copy.hours],
              ['walking-route', ui.walk], ['photo-spots', ui.photo], ['directions', v.map],
            ].map(([id, label]) => (
              <a key={id} href={'#' + id} className="text-sm font-medium underline underline-offset-4" style={{ color: 'var(--accent)' }}>{label}</a>
            ))}
          </nav>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
          <GuideSection title={v.explore}><p className="max-w-3xl leading-relaxed">{intro}</p></GuideSection>
          <GuideSection title={ui.plan}><p>{visit}</p></GuideSection>
          <GuideSection title={ui.highlights}><p>{content.note}</p></GuideSection>

          <GuideSection title={ui.about + (locale === 'zh' ? '' : ' ') + content.name}>
            <p className="font-semibold">{role}</p>

            <a className="inline-block mt-3 underline" href={guide.source}>{copy.source}</a>
            {guide.source !== place.source && <a className="inline-block mt-3 ms-4 underline" href={place.source}>{copy.info}</a>}
          </GuideSection>

          <GuideSection title={copy.info} id="visitor-info">
            <dl className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {info.map(([label, value]) => (
                <div key={label} className="grid gap-1 py-3 sm:grid-cols-[1fr_2fr]">
                  <dt className="font-semibold">{label}</dt><dd>{value}</dd>
                </div>
              ))}
            </dl>
          </GuideSection>

          <div className="grid gap-6 md:grid-cols-2">
            <GuideSection title={copy.hours} id="opening-hours">
              <p className="font-semibold">{visitor.hours}</p>
              {visitor.notice && <p className="mt-3">{visitor.notice}</p>}
              <a className="mt-3 inline-block underline" href={visitor.hoursUrl}>{v.official}</a>
            </GuideSection>
            <GuideSection title={copy.admission}>
              <p className="font-semibold">{visitor.fare}</p>
              <a className="mt-3 inline-block underline" href={visitor.ticketUrl}>{v.tickets}</a>
            </GuideSection>
          </div>

          <GuideSection title={copy.transport}>
            <p>{transport}</p>
            {place.route === 'three' && <a className="mt-3 block underline" href="https://www.publictransport.com.mt/other-services/valletta-ferry/">Malta Public Transport</a>}
            <a className="mt-3 block underline" href={placeMap(place, true)}>{copy.directions}</a>
          </GuideSection>

          <GuideSection title={v.charm}>
            <p className="max-w-3xl leading-relaxed">{story.history}</p>
          </GuideSection>

          <GuideSection title={ui.walk} id="walking-route">
            <ol className="list-decimal ps-6 space-y-2">
              {steps.map((stop) => (
                <li key={stop.slug}>{stop.slug === slug ? content.name : (
                  <a className="underline" href={'/' + locale + '/nearby/' + stop.slug}>{placeCopy(stop, locale).name}</a>
                )}</li>
              ))}
            </ol>
            <a className="mt-4 inline-block underline" href={walkingLink}>{copy.directions}</a>
          </GuideSection>

          <GuideSection title={v.practical}>
            <p>{v.today}</p>
            <details className="mt-3 py-2">
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

          <GuideSection title={ui.photo} id="photo-spots">
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

          <GuideSection title={v.lodging}><p>{visitor.lodging}</p></GuideSection>

          <GuideSection title={copy.reviews} id="visitor-reviews">
            <a href={map} className="underline">{copy.reviewLink}</a>
          </GuideSection>

          <GuideSection title={v.map} id="directions">
            <p>{place.address}, Malta</p>
            <div className="mt-3 flex flex-wrap gap-4">
              <a className="underline" href={map}>{copy.map}</a>
              <a className="underline" href={placeMap(place, true)}>{copy.directions}</a>
            </div>
          </GuideSection>

          <a href={'/' + locale + '/nearby'} className="inline-block font-semibold underline" style={{ color: 'var(--accent)' }}>{copy.all}</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
