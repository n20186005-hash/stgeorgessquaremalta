import { useTranslations } from 'next-intl';
import { visitorInfo } from '@/data/nearby-visitor';
import { nearbyCopy, placeCopy, places } from '@/data/nearby';

export default function NearbyPlaces({ locale, full = false }: { locale: string; full?: boolean }) {
  const t = useTranslations('interface');
  const copy = nearbyCopy(locale);
  const cards = full ? places : places.slice(0, 6);

  return (
    <section id="nearby" className="py-14 sm:py-20" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {!full && <h2 className="font-display text-3xl font-bold mb-8">{copy.nearby}</h2>}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((place) => {
            const content = placeCopy(place, locale);
            const visitor = full ? visitorInfo(place.slug, locale, place.route, place.source) : null;
            return (
              <li key={place.slug}>
                <a href={`/${locale}/nearby/${place.slug}`}
                  className="block h-full overflow-hidden rounded-2xl border hover:shadow-lg transition-shadow"
                  style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                  <img src={place.photo} alt={content.name} loading="lazy" className="w-full aspect-[16/10] object-cover" />
                  <div className="p-5">
                    <h2 className="font-display text-xl font-bold">{content.name}</h2>
                    {visitor && <p className="mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{visitor.tagline}</p>}
                    <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>{place.address}</p>
                    {visitor && <span className="mt-4 inline-block text-sm font-semibold" style={{ color: 'var(--accent)' }}>{t('explore')} →</span>}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
        {!full && <a href={`/${locale}/nearby`} className="inline-block mt-8 font-semibold underline" style={{ color: 'var(--accent)' }}>{copy.all}</a>}
      </div>
    </section>
  );
}
