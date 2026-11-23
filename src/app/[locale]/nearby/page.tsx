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
      <Header solid />
      <main className="pt-16"><NearbyPlaces locale={locale} full /></main>
      <Footer />
    </>
  );
}
