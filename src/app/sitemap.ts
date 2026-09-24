import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://stgeorgessquaremalta.com';
const LEGAL_PAGES = ['privacy-policy', 'terms-of-service', 'cookie-settings'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const homeUrl = `${BASE_URL}/${locale}/`;
    entries.push({
      url: homeUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE_URL}/${l}/`])
        ),
      },
    });

    for (const page of LEGAL_PAGES) {
      entries.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      });
    }
  }

  return entries;
}
