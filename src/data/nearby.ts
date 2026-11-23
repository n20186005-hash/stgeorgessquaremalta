import records from './nearby-places.json';
import { routing, type Locale } from '@/i18n/routing';

export const siteUrl = 'https://stgeorgessquaremalta.com';
export const places = records;
export type Place = (typeof places)[number];

export function nearbyCopy(locale: string) {
  return copy[routing.locales.find((entry) => entry === locale) ?? routing.defaultLocale];
}

export function placeCopy(place: Place, locale: string) {
  return place.text[routing.locales.find((entry) => entry === locale) ?? routing.defaultLocale];
}

export function placeMap(place: Place, directions = false) {
  const destination = encodeURIComponent(`${place.text.en.name}, ${place.address}, Malta`);
  return directions
    ? `https://www.google.com/maps/dir/?api=1&destination=${destination}`
    : `https://www.google.com/maps/search/?api=1&query=${destination}`;
}

const copy = {
  en: {
    nearby: 'Nearby attractions', all: 'See all nearby attractions', manage: 'Management and visitor access', unknown: 'For current access arrangements, check the notices posted at the site.',
    info: 'Visitor information', address: 'Address', hours: 'Opening hours', admission: 'Admission', planned: 'Check the current schedule before setting out.', ticket: 'Check current admission and booking requirements with the venue.', public: 'Free to view from the public area.', outdoors: 'Outdoor stop. Follow any posted hours or temporary restrictions.',
    transport: 'Getting there', map: 'Open in Google Maps', directions: 'Get directions', reviews: 'Visitor reviews', reviewLink: 'Read current ratings and reviews on Google Maps', source: 'Visitor information source', photo: 'Photo and attribution',
    core: 'From the Valletta bus terminus, enter through City Gate. From St. George’s Square, use the walking directions to reach the street entrance.',
    floriana: 'Start at the Valletta bus terminus by the Triton Fountain and follow the walking route into Floriana.',
    harbour: 'From the upper city, head toward Upper Barrakka Gardens and use the lift to Lascaris Wharf. Follow the destination’s walking directions from the lower landing.',
    three: 'Take the Three Cities ferry from Lascaris Wharf to Cospicua. Continue on foot following directions to the attraction.',
  },
  zh: {
    nearby: '周边景点', all: '查看全部周边景点', manage: '管理主体与参观安排', unknown: '开放安排以景点现场公告为准。',
    info: '基础信息', address: '地址', hours: '开放时间', admission: '门票', planned: '出发前请核对当天开放时段。', ticket: '请向场馆查询最新票价与预约要求。', public: '可在公共区域免费观赏。', outdoors: '户外景点，请留意现场开放时段和临时管制。',
    transport: '交通方式', map: '在 Google 地图查看', directions: '获取路线', reviews: '游客评价', reviewLink: '查看 Google 地图上的实时评分与评价', source: '参观信息来源', photo: '照片与署名',
    core: '从瓦莱塔巴士总站经城门入城。从圣乔治广场出发时，可按步行导航前往景点临街入口。',
    floriana: '从特里同喷泉旁的瓦莱塔巴士总站出发，按步行导航前往弗洛里亚纳。',
    harbour: '从瓦莱塔上城前往上巴拉卡花园，乘升降梯下到拉斯卡里斯码头，再按景点步行导航从下层入口出发。',
    three: '从拉斯卡里斯码头乘三姐妹城渡轮到科斯皮夸，下船后按步行导航前往景点。',
  },
  mt: {
    nearby: 'Postijiet fil-qrib', all: 'Ara l-postijiet kollha fil-qrib', manage: 'Ġestjoni u aċċess', unknown: 'Għall-arranġamenti attwali, ara l-avviżi fuq il-post.',
    info: 'Informazzjoni għaż-żjara', address: 'Indirizz', hours: 'Ħinijiet tal-ftuħ', admission: 'Dħul', planned: 'Iċċekkja l-ħinijiet qabel titlaq.', ticket: 'Iċċekkja l-prezzijiet u l-ħtieġa ta’ prenotazzjoni mal-post.', public: 'Jidher bla ħlas miż-żona pubblika.', outdoors: 'Post fil-beraħ. Segwi l-ħinijiet u r-restrizzjonijiet imwaħħla.',
    transport: 'Kif tasal', map: 'Iftaħ f’Google Maps', directions: 'Ikseb id-direzzjonijiet', reviews: 'Kummenti tal-viżitaturi', reviewLink: 'Ara l-klassifikazzjoni u l-kummenti fuq Google Maps', source: 'Sors tal-informazzjoni', photo: 'Ritratt u krediti',
    core: 'Mit-terminal tal-karozzi tal-linja idħol minn Bieb il-Belt. Minn Misraħ San Ġorġ, segwi d-direzzjonijiet bil-mixi sad-daħla.',
    floriana: 'Ibda mit-terminal tal-Belt ħdejn il-Funtana tat-Tritoni u kompli bil-mixi lejn il-Furjana.',
    harbour: 'Mill-parti ta’ fuq tal-Belt mur lejn il-Barrakka ta’ Fuq u niżel bil-lift sa Xatt Lascaris. Kompli bil-mixi mill-ħruġ t’isfel.',
    three: 'Ħu l-lanċa tat-Tliet Ibliet minn Xatt Lascaris sa Bormla. Kompli bil-mixi skont id-direzzjonijiet.',
  },
  it: {
    nearby: 'Attrazioni nei dintorni', all: 'Vedi tutte le attrazioni vicine', manage: 'Gestione e accesso', unknown: 'Per le modalità di accesso attuali consulta gli avvisi sul posto.',
    info: 'Informazioni per la visita', address: 'Indirizzo', hours: 'Orari', admission: 'Ingresso', planned: 'Verifica gli orari aggiornati prima di partire.', ticket: 'Verifica tariffe e modalità di prenotazione con la struttura.', public: 'Visibile gratuitamente dall’area pubblica.', outdoors: 'Tappa all’aperto. Rispetta gli orari e le limitazioni segnalati sul posto.',
    transport: 'Come arrivare', map: 'Apri in Google Maps', directions: 'Ottieni indicazioni', reviews: 'Recensioni dei visitatori', reviewLink: 'Vedi valutazioni e recensioni aggiornate su Google Maps', source: 'Fonte delle informazioni', photo: 'Foto e crediti',
    core: 'Dal capolinea degli autobus entra attraverso la Porta della Città. Da piazza San Giorgio segui le indicazioni a piedi fino all’ingresso sulla strada.',
    floriana: 'Parti dal capolinea di Valletta vicino alla Fontana dei Tritoni e segui il percorso a piedi verso Floriana.',
    harbour: 'Dalla città alta raggiungi i giardini Upper Barrakka e scendi con l’ascensore al molo Lascaris. Prosegui a piedi dall’uscita inferiore.',
    three: 'Prendi il traghetto per le Tre Città dal molo Lascaris fino a Cospicua. Prosegui a piedi seguendo le indicazioni.',
  },
} satisfies Record<Locale, Record<string, string>>;
