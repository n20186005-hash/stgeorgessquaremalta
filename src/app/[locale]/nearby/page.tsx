import { setRequestLocale } from 'next-intl/server';
import { nearbyCopy, siteUrl } from '@/data/nearby';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NearbyPlaces from '@/components/NearbyPlaces';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const title = nearbyCopy(locale).nearby;
  return {
    title,
    alternates: {
      canonical: `${siteUrl}/${locale}/nearby`,
      languages: Object.fromEntries(routing.locales.map((item) => [item, `${siteUrl}/${item}/nearby`])),
    },
    openGraph: { title, url: `${siteUrl}/${locale}/nearby` },
  };
}

export default async function NearbyIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Header />
      <main>
        <section className="relative isolate min-h-[62svh] flex items-end overflow-hidden">
          <img src="/gallery/st-georges-square (1).jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10" style={{ background: 'var(--hero-overlay)' }} />
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-28 pb-14 text-white">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">{nearbyCopy(locale).nearby}</h1>
          </div>
        </section>
        <NearbyPlaces locale={locale} full />
      </main>
      <Footer />
    </>
  );
}
