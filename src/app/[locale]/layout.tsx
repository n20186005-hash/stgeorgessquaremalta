import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = 'https://stgeorgessquaremalta.com';

  const urls = {
    en: `${baseUrl}/en`,
    zh: `${baseUrl}/zh`,
    it: `${baseUrl}/it`,
    mt: `${baseUrl}/mt`,
  } as const;

  const selfUrl = urls[locale as keyof typeof urls] || urls.en;
  const ogImage = `${baseUrl}/gallery/st-georges-square%20(1).jpg`;

  let ogLocale = 'en_US';
  if (locale === 'zh') ogLocale = 'zh_CN';
  else if (locale === 'it') ogLocale = 'it_IT';
  else if (locale === 'mt') ogLocale = 'mt_MT';

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        en: urls.en,
        zh: urls.zh,
        it: urls.it,
        mt: urls.mt,
        'x-default': urls.en,
      },
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: "St. George's Square",
      locale: ogLocale,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 800, alt: "St. George's Square, Valletta" }],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : locale === 'mt' ? 'mt-MT' : locale === 'it' ? 'it-IT' : locale === 'es' ? 'es-ES' : 'en-US'} suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
