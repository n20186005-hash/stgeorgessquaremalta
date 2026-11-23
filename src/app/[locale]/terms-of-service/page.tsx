import LanguageToggle from '@/components/LanguageToggle';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations, useLocale, useMessages } from 'next-intl';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://stgeorgessquaremalta.com';
  
  const urls = {
    en: `${baseUrl}/en/terms-of-service`,
    zh: `${baseUrl}/zh/terms-of-service`,
    es: `${baseUrl}/es/terms-of-service`,
    it: `${baseUrl}/it/terms-of-service`,
    mt: `${baseUrl}/mt/terms-of-service`
  };
  
  const selfUrl = urls[locale as keyof typeof urls] || urls.en;

  return {
    alternates: {
      canonical: selfUrl,
      languages: {
        'en': urls.en,
        'zh': urls.zh,
        'es': urls.es,
        'it': urls.it,
        'mt': urls.mt,
        'x-default': urls.en,
      },
    },
  };
}

function TermsContent() {
  const t = useTranslations('terms');
  const ht = useTranslations('header');
  const locale = useLocale();
  const messages = useMessages() as any;
  const homeHref = `/${locale}`;
  const sections = (messages?.terms?.sections || []) as Array<{ heading: string; content: string }>;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-10 flex items-center justify-between gap-4">
        <a
          href={homeHref}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {ht('backToHome')}
        </a>
        <LanguageToggle />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h1>
        <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>{t('lastUpdated')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {section.heading}
              </h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsContent />;
}
