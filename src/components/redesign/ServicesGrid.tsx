import i18n from '@/i18n'

type LangKey = 'ru' | 'kz' | 'en'

const SERVICES_BASE: [string, Record<LangKey, string>, Record<LangKey, string>][] = [
  ['FTL',
    { ru: 'Полная фура',     kz: 'Толық фура',         en: 'Full truckload' },
    { ru: 'Одна машина — один заказчик. Срочные поставки крупных партий.', kz: 'Бір машина — бір тапсырыс беруші. Жедел ірі тасымал.', en: 'One truck, one shipper. Fast moves of large lots.' },
  ],
  ['LTL',
    { ru: 'Сборный груз',    kz: 'Жинақы жүк',         en: 'Less-than-truckload' },
    { ru: 'Платите только за занятое место. Экономично для небольших партий.', kz: 'Тек алған орын үшін төлейсіз. Шағын партиялар үшін ұтымды.', en: 'Pay only for the space you fill. Best for small lots.' },
  ],
  ['EXP',
    { ru: 'Экспресс',        kz: 'Экспресс',           en: 'Express' },
    { ru: 'Доставка в 24–48 часов. Газели и малотоннажные грузовики.', kz: '24–48 сағатта жеткізу. Газельдер мен шағын жүк көліктері.', en: 'Delivery in 24–48 hours. Vans and light trucks.' },
  ],
  ['CN→',
    { ru: 'Карго из Китая',  kz: 'Қытайдан карго',     en: 'China cargo' },
    { ru: 'Консолидация, таможня, доставка до склада в Казахстане.', kz: 'Консолидация, кеден, Қазақстандағы қоймаға дейін.', en: 'Consolidation, customs, last-mile to your KZ warehouse.' },
  ],
  ['DOC',
    { ru: 'Документооборот', kz: 'Құжат айналымы',     en: 'Paperwork' },
    { ru: 'Договоры, ТТН, CMR, акты. Электронная подпись через NCALayer.', kz: 'Келісімдер, ТЖН, CMR, акт. NCALayer арқылы ЭЦҚ.', en: 'Contracts, BOL, CMR, acts. E-signature via NCALayer.' },
  ],
  ['GPS',
    { ru: 'Отслеживание',    kz: 'Бақылау',            en: 'Tracking' },
    { ru: 'Мониторинг в реальном времени. Telegram, Email, WhatsApp.', kz: 'Нақты уақыттағы мониторинг. Telegram, Email, WhatsApp.', en: 'Real-time monitoring. Telegram, Email, WhatsApp.' },
  ],
]

interface ServicesGridProps {
  count?: number
  eyebrow: string
  title: string
}

export default function ServicesGrid({ count = 6, eyebrow, title }: ServicesGridProps) {
  const lang = (i18n.language as LangKey) in { ru: 1, kz: 1, en: 1 } ? (i18n.language as LangKey) : 'ru'
  const items = SERVICES_BASE.slice(0, count)

  return (
    <section className="services-section-pad" style={{ padding: '48px 40px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 24,
      }}>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--pop)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
          }}>{eyebrow}</div>
          <h2 style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 36,
            letterSpacing: '-0.025em',
            color: 'var(--text-bright)',
            margin: '8px 0 0',
            lineHeight: 1.05,
          }}>{title}</h2>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase' as const,
          color: 'var(--muted-deep)',
        }}>{items.length} →</span>
      </div>

      <div className="services-grid" style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(count, 3)}, 1fr)`,
        gap: 14,
      }}>
        {items.map(([code, name, desc], i) => {
          const hi = i === 0
          return (
            <div key={i} style={{
              padding: 22,
              borderRadius: 'var(--radius-lg)',
              background: hi ? 'var(--accent-soft)' : 'var(--surface)',
              border: hi
                ? '1px solid color-mix(in srgb, var(--accent) 20%, transparent)'
                : '1px solid var(--border)',
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.16em',
                marginBottom: 28,
                color: hi ? 'var(--accent)' : 'var(--muted-deep)',
              }}>{code}</div>
              <div style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                color: 'var(--text-bright)',
              }}>{name[lang]}</div>
              <div style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 13,
                color: 'var(--muted)',
                marginTop: 6,
                lineHeight: 1.5,
              }}>{desc[lang]}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
