import records from './nearby-guides.json';
import { routing, type Locale } from '@/i18n/routing';

export function readGuide(slug: string) {
  return records[slug as keyof typeof records];
}

type Visit = 'open' | 'managed' | 'worship' | 'performance' | 'lift' | 'museumExterior';
type Role = 'visitor' | 'horticulture' | 'occupant' | 'conservation' | 'joint' | 'project' | 'maintenance' | 'unknown';

export const guideType = (kind: string) => kind as Visit;
export const guideRole = (kind: string) => kind as Role;

const ui = {
  en: {
    about: 'About', highlights: 'What to look for', plan: 'Planning your visit', walk: 'Walking itinerary', photo: 'Photo viewpoints', faq: 'Frequently asked questions', access: 'Can I go inside?', routeQuestion: 'What else can I visit on foot?', management: 'Management',
    roles: { visitor: 'Visitor access is managed by {name}.', horticulture: 'Ambjent Malta maintains the planted areas of the gardens.', occupant: '{name} occupies this building.', conservation: '{name} has carried out restoration work at this site.', joint: 'Heritage Malta leads the restoration and shares upkeep with the Archdiocese of Malta.', project: '{name} oversaw the City Gate project.', maintenance: '{name} commissions operation and maintenance of the fountain.', unknown: 'For access arrangements and maintenance enquiries, consult the notices on site.' },
    inside: { open: 'This stop is planned around public outdoor areas and exterior views.', managed: 'Interior access depends on the venue’s current admission arrangements.', worship: 'Visitor access depends on the church’s service schedule and notices.', performance: 'Look for an event or a scheduled tour for access beyond the exterior.', lift: 'Passengers can enter the lift cabin during its operating hours.', museumExterior: 'Check the museum’s current status before planning an indoor stop.' },
    visit: { open: 'Allow time for the outdoor viewpoint. Follow posted access notices and use marked paths.', managed: 'Check opening times, last admission and the areas included in your ticket with the venue before setting out.', worship: 'Plan around services and consult the church for visitor hours. Keep entrances clear during worship.', performance: 'The programme and event schedule determine access to the venue. Check the specific performance or tour before booking.', lift: 'The lift links the upper gardens and Lascaris Wharf. The operating schedule is seasonal and the published standard same-day return fare is €1.', museumExterior: 'Plan the waterfront as an exterior stop and verify museum access with Heritage Malta before relying on an indoor visit.' },
  },
  zh: {
    about: '关于', highlights: '景点特色与观察重点', plan: '游览建议', walk: '步行游览路线', photo: '拍摄机位', faq: '常见问答', access: '可以入内参观吗？', routeQuestion: '还能步行串联哪些景点？', management: '管理主体',
    roles: { visitor: '参观服务由 {name} 负责。', horticulture: '花园内的植物及绿化区域由 Ambjent Malta 维护。', occupant: '这座建筑目前由 {name} 使用。', conservation: '{name} 曾负责此处的修复工程。', joint: '马耳他遗产局负责修复，并与马耳他总教区分担日常维护。', project: '城门改造工程由 {name} 负责。', maintenance: '喷泉的运行与维护由 {name} 委托。', unknown: '参观安排和维护单位联系方式以现场公告为准。' },
    inside: { open: '此站以公共户外区域和建筑外观为主。', managed: '能否入内以场馆当天的入场安排为准。', worship: '能否入内取决于教堂当天的礼仪安排和公告。', performance: '想入内参观，可查看当前的演出或导览安排。', lift: '运营时段内可进入升降梯轿厢。', museumExterior: '安排馆内参观前，请查阅博物馆的最新公告。' },
    visit: { open: '给户外观景留出时间，按现场公告和标示步道通行。', managed: '出发前向场馆核对开放时间、最晚入场时间和门票覆盖的区域。', worship: '参观请避开宗教礼仪时段，开放时间以教堂公告为准。礼仪期间请保持入口畅通。', performance: '场馆开放随演出和活动安排变化。购票前先核对当天演出或导览时段。', lift: '升降梯连接上巴拉卡花园与拉斯卡里斯码头，营运时间因季节而异。公布的标准当日往返票价为 €1。', museumExterior: '可先安排沿码头看外观。行程若包含馆内参观，出发前请向马耳他遗产局核对开放情况。' },
  },
  mt: {
    about: 'Dwar', highlights: 'X’għandek tosserva', plan: 'Ippjana ż-żjara', walk: 'Mixja bejn il-postijiet', photo: 'Fejn tieħu r-ritratti', faq: 'Mistoqsijiet komuni', access: 'Nista’ nidħol?', routeQuestion: 'X’nista’ nżur ukoll bil-mixi?', management: 'Ġestjoni',
    roles: { visitor: 'L-aċċess għall-viżitaturi huwa mmexxi minn {name}.', horticulture: 'Ambjent Malta jieħu ħsieb iż-żoni mħawla tal-ġonna.', occupant: '{name} juża dan il-bini.', conservation: '{name} wettaq xogħlijiet ta’ restawr f’dan il-post.', joint: 'Heritage Malta jmexxi r-restawr u jaqsam il-manutenzjoni mal-Arċidjoċesi ta’ Malta.', project: '{name} mexxa l-proġett ta’ Bieb il-Belt.', maintenance: '{name} jikkummissjona t-tħaddim u l-manutenzjoni tal-funtana.', unknown: 'Għall-aċċess u l-manutenzjoni, ara l-avviżi fuq il-post.' },
    inside: { open: 'Din il-waqfa tiffoka fuq iż-żoni pubbliċi fil-beraħ.', managed: 'Id-dħul jiddependi mill-arranġamenti attwali tal-post.', worship: 'Id-dħul jiddependi mill-ħinijiet tal-funzjonijiet u mill-avviżi tal-knisja.', performance: 'Fittex avveniment jew żjara skedata biex tidħol.', lift: 'Il-kabina tilqa’ lill-passiġġieri fil-ħinijiet tat-tħaddim.', museumExterior: 'Iċċekkja l-istat attwali tal-mużew qabel tippjana li tidħol.' },
    visit: { open: 'Ħalli ħin għall-veduta fil-beraħ. Segwi l-avviżi u l-mogħdijiet immarkati.', managed: 'Qabel titlaq, iċċekkja l-ħinijiet, l-aħħar dħul u liema żoni huma inklużi fil-biljett.', worship: 'Ippjana ż-żjara skont il-funzjonijiet u ara l-ħinijiet tal-knisja. Ħalli d-daħliet liberi waqt il-qima.', performance: 'L-aċċess jiddependi mill-programm. Iċċekkja l-ħin tal-ispettaklu jew taż-żjara qabel tibbukkja.', lift: 'Il-lift jgħaqqad il-Barrakka ta’ Fuq ma’ Xatt Lascaris. Il-ħinijiet jinbidlu skont l-istaġun u n-noll ippubblikat ta’ ritorn fl-istess jum huwa €1.', museumExterior: 'Ippjana waqfa fuq ix-xatt u ċċekkja l-aċċess għall-mużew ma’ Heritage Malta qabel żjara ġewwa.' },
  },
  it: {
    about: 'Informazioni su', highlights: 'Cosa osservare', plan: 'Organizza la visita', walk: 'Itinerario a piedi', photo: 'Punti da cui fotografare', faq: 'Domande frequenti', access: 'Si può entrare?', routeQuestion: 'Quali altre tappe si raggiungono a piedi?', management: 'Gestione',
    roles: { visitor: 'L’accesso dei visitatori è gestito da {name}.', horticulture: 'Ambjent Malta cura le aree verdi dei giardini.', occupant: 'L’edificio è utilizzato da {name}.', conservation: '{name} ha eseguito interventi di restauro in questo luogo.', joint: 'Heritage Malta dirige il restauro e condivide la manutenzione con l’Arcidiocesi di Malta.', project: '{name} ha curato il progetto della porta.', maintenance: '{name} commissiona l’esercizio e la manutenzione della fontana.', unknown: 'Consulta gli avvisi sul posto per l’accesso e i contatti relativi alla manutenzione.' },
    inside: { open: 'La tappa si svolge nelle aree pubbliche all’aperto.', managed: 'L’accesso interno segue le modalità d’ingresso della struttura.', worship: 'L’accesso dipende dalle funzioni e dagli avvisi della chiesa.', performance: 'Cerca un evento o una visita in programma per entrare.', lift: 'La cabina accoglie i passeggeri durante l’orario di servizio.', museumExterior: 'Verifica lo stato del museo prima di organizzare una visita interna.' },
    visit: { open: 'Dedica tempo alla vista all’aperto. Segui gli avvisi e i percorsi segnalati.', managed: 'Prima di partire verifica orari, ultimo ingresso e aree incluse nel biglietto con il gestore.', worship: 'Organizza la visita intorno alle funzioni e consulta gli orari della chiesa. Lascia liberi gli ingressi durante le celebrazioni.', performance: 'L’accesso dipende dal programma. Verifica l’orario dello spettacolo o della visita prima di prenotare.', lift: 'L’ascensore collega i giardini al molo Lascaris. L’orario varia con la stagione e la tariffa ordinaria di andata e ritorno in giornata è di €1.', museumExterior: 'Prevedi una sosta sulla banchina e verifica con Heritage Malta l’accesso al museo prima di programmare la visita interna.' },
  },
} satisfies Record<Locale, { roles: Record<Role, string>; visit: Record<Visit, string>; [key: string]: unknown }>;

export function guideLocale(locale: string) {
  return routing.locales.find((item) => item === locale) ?? routing.defaultLocale;
}

export function guideCopy(locale: string) {
  return ui[guideLocale(locale)];
}
