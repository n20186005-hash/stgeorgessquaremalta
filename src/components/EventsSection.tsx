import { useTranslations } from 'next-intl';

export default function EventsSection() {
  const t = useTranslations('events');
  const items = t.raw('items') as { name: string; desc: string }[];

  return (
    <section
      id="events"
      className="py-16 px-4 sm:px-6"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-bold mb-3 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p
          className="text-center mb-10 max-w-2xl mx-auto"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('subtitle')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6 border"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
            >
              <h3
                className="font-display text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
