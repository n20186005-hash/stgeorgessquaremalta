import type { Metadata } from 'next';
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
  const url = `${siteUrl}/${locale}/nearby/${slug}`;
  return {
    title: content.name,
    description: content.note,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((item) => [item, `${siteUrl}/${item}/nearby/${slug}`])),
    },
    openGraph: { title: content.name, description: content.note, url, images: [{ url: place.photo, alt: content.name }] },
    twitter: { card: 'summary_large_image', title: content.name, description: content.note, images: [place.photo] },
  };
}

export default async function NearbyPlace({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const place = places.find((item) => item.slug === slug);
  if (!place) notFound();
  const content = placeCopy(place, locale);
  const copy = nearbyCopy(locale);
  const map = placeMap(place);
  const transport = copy[place.route as 'core' | 'floriana' | 'harbour' | 'three'];
  const access = place.public ? copy.outdoors : copy.planned;
  const info = [[copy.address, place.address], [copy.hours, access], [copy.admission, place.public ? copy.public : copy.ticket]];
  const sections = [
    { title: copy.manage, description: place.manager || copy.unknown, href: place.source, label: copy.source },
    { title: copy.transport, description: transport, href: placeMap(place, true), label: copy.directions },
    { title: copy.reviews, href: map, label: copy.reviewLink },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-[65svh] flex items-end isolate">
          <img src={place.photo} alt={content.name} fetchPriority="high" className="absolute inset-0 -z-20 w-full h-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/40 to-black/50" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-12 w-full text-white">
            <a href={`/${locale}/nearby`} className="text-white underline underline-offset-4">{copy.nearby}</a>
            <h1 className="font-display text-4xl sm:text-6xl font-bold mt-4">{content.name}</h1>
            <p className="mt-4 text-white/90 max-w-2xl">{content.note}</p>
            <a href={map} className="inline-block mt-5 rounded-full bg-white/20 px-4 py-2">{copy.map}</a>
          </div>
        </section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            <a className="underline" href={place.credit}>{copy.photo}</a>
            {place.author && <> · {place.author}</>}
            {place.license && <> · {place.licenseUrl ? <a className="underline" href={place.licenseUrl}>{place.license}</a> : place.license}</>}
          </p>
          <section className="rounded-2xl border p-5 sm:p-8 my-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <h2 className="font-display text-2xl font-bold mb-4">{sections[0].title}</h2>
            <p>{sections[0].description}</p>
            <a href={sections[0].href} className="inline-block mt-3 underline">{sections[0].label}</a>
          </section>
          <section className="rounded-2xl border p-5 sm:p-8 mb-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <h2 className="font-display text-2xl font-bold mb-4">{copy.info}</h2>
            <dl className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {info.map(([label, value]) => (
                <div key={label} className="grid gap-1 py-3 sm:grid-cols-[1fr_2fr]">
                  <dt className="font-semibold">{label}</dt><dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
          <div className="grid gap-5 sm:grid-cols-2">
            {sections.slice(1).map(({ title, description, href, label }) => (
              <section key={title} className="rounded-2xl border p-5 sm:p-8" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                <h2 className="font-display text-2xl font-bold mb-3">{title}</h2>
                {description && <p className="mb-3">{description}</p>}
                <a href={href} className="underline">{label}</a>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
