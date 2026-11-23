import visitors from './nearby-visitor.json';
import { guideLocale } from './nearby-guide';

type Mode = 'H' | 'C' | 'O' | 'V' | 'E' | 'W' | 'X' | 'L';
const languageIndex = { en: 0, zh: 1, mt: 2, it: 3 };
const heritageHours = 'https://heritagemalta.mt/opening-hours/';
type Times = { source: string; hours?: string[]; hoursLink?: string; euros?: number; fare?: string[]; notice?: string[] };

const weekdays = ['Monday–Saturday', '周一至周六', 'Mit-Tnejn sas-Sibt', 'Lunedì–sabato'];
const everyDay = ['Daily', '每日', 'Kuljum', 'Ogni giorno'];
const last = ['Last entry', '最后入场', 'L-aħħar dħul', 'Ultimo ingresso'];
const timed = (span: string, entry?: string) => weekdays.map((label, i) => label + ' ' + span + (entry ? ' · ' + last[i] + ' ' + entry : ''));
const closures = ['Temporarily closed', '暂时关闭', 'Magħluq temporanjament', 'Temporaneamente chiuso'];
const visits: Record<string, Times> = {
  'grandmasters-palace': { source: 'https://heritagemalta.mt/explore/grand-masters-palace/', hours: everyDay.map((day) => day + ' 09:00–17:00'), euros: 12, notice: ['State Rooms may close for official functions. Check the palace notices for the day of your visit.', '国务厅可能因官方活动关闭，请先核对宫殿公告。', 'Is-Swali tal-Istat jistgħu jagħlqu għal attivitajiet uffiċjali. Ara l-avviżi għall-jum taż-żjara.', 'Le sale di rappresentanza possono chiudere per eventi ufficiali. Consulta gli avvisi per la data della visita.'] },
  'st-johns-co-cathedral': { source: 'https://www.stjohnscocathedral.com/visit/', hours: timed('09:00–16:45', '16:00'), euros: 15, notice: ['Tourist visits close on Sundays and public holidays.', '周日及公众假期不开放旅游参观。', 'Iż-żjarat turistiċi ma jsirux il-Ħadd u fil-btajjel pubbliċi.', 'Le visite turistiche sono sospese la domenica e nei festivi.'] },
  'fort-st-elmo': { source: 'https://heritagemalta.mt/explore/fort-st-elmo-national-war-museum/', euros: 10 },
  'national-museum-of-archaeology': { source: heritageHours, hours: everyDay.map((day, i) => day + ' 09:00–17:00 · ' + last[i] + ' 16:30'), euros: 8, notice: ['This rate applies from 21 November 2026 to 16 May 2027.', '该票价适用于 2026 年 11 月 21 日至 2027 年 5 月 16 日。', 'Dan in-noll japplika mill-21 ta’ Novembru 2026 sas-16 ta’ Mejju 2027.', 'Tariffa valida dal 21 novembre 2026 al 16 maggio 2027.'] },
  'manoel-theatre': { source: 'https://booking.teatrumanoel.mt/' },
  'muza': { source: 'https://heritagemalta.mt/explore/muza/' },
  'casa-rocca-piccola': { source: 'https://casaroccapiccola.com/ticket/', hoursLink: 'https://casaroccapiccola.com/contact-us/', hours: timed('10:00–17:00'), euros: 12 },
  'fortress-builders-interpretation-centre': { source: heritageHours, hours: closures },
  'saluting-battery': { source: 'https://www.salutingbattery.com/visit', hours: timed('09:30–17:30', '17:00'), euros: 3 },
  'barrakka-lift': { source: 'https://www.transport.gov.mt/land/public-transport/other-public-transport/barrakka-lift-826', fare: ['€1 same-day return', '当日往返 €1', '€1 bir-ritorn fl-istess jum', '€1 andata e ritorno in giornata'] },
  'lascaris-war-rooms': { source: 'https://www.lascariswarrooms.com/visit', hours: timed('09:30–17:30', '17:00'), euros: 20 },
  'fort-st-angelo': { source: 'https://heritagemalta.mt/explore/fort-st-angelo/', euros: 10 },
  'inquisitors-palace': { source: 'https://heritagemalta.mt/explore/the-inquisitors-palace/', euros: 6 },
  'malta-maritime-museum': { source: 'https://heritagemalta.mt/explore/malta-maritime-museum/', hours: closures },
};

const labels = {
 en: {
  explore: 'Explore the area', type: 'Attraction type', duration: 'Suggested time', minute: 'min', adult: 'Adult admission', charm: 'History, architecture and culture', practical: 'Visitor information and FAQs', lodging: 'Where to stay', map: 'Address and directions', rates: 'Google Maps ratings', official: 'Check hours and notices', tickets: 'Admission and booking', today: 'Hours and fees can change for holidays, services or special events.',
  nearby: 'Include this stop between {start} and {end}. Allow {time} min at the attraction itself, in addition to the walk.',
  notes: { O: 'Outdoor landmark or public garden', H: 'Museum or heritage site', C: 'Co-cathedral and visitor attraction', V: 'Ticketed heritage venue', E: 'Arts and events venue', W: 'Place of worship', X: 'Heritage building · exterior visit', L: 'Public lift' },
  hours: { O: 'Outdoor access · follow posted hours', H: 'See the Heritage Malta calendar', C: 'See visitor hours', V: 'See the venue schedule', E: 'Hours depend on the programme', W: 'Access around services', X: 'Temporarily closed', L: 'Seasonal operating hours' },
  fees: { O: 'Free to view from public areas', H: 'See Heritage Malta’s current admission rates', C: 'See visitor admission rates', V: 'Check venue rates and tour fees', E: 'Prices depend on the event or exhibition', W: 'Check visitor arrangements with the church', X: 'Exterior viewing only during the closure', L: 'Check the operator’s fare' },
  lodgingByArea: ['Stay near Republic Street or City Gate to reach the old city on foot. Choose City Gate if a short connection to the bus terminus matters.', 'Stay in Floriana for the bus terminus and a short walk to City Gate. For a waterfront stay, check whether the hotel entrance is at quay or upper-city level.', 'For an early start along the quay, look around the Valletta Waterfront. For more time in the old town, stay near Castille Place and use the Barrakka lift.', 'Stay in Birgu for an early start at the fort and museums. If based in Valletta, check the last ferry back before planning an evening visit.'],
 },
 zh: {
  explore: '探索与引言', type: '景点类型', duration: '建议停留', minute: '分钟', adult: '成人票', charm: '发现魅力 · 历史、建筑与文化', practical: '游览须知与常见问题', lodging: '住宿建议', map: '交通指南与地图', rates: 'Google 地图评分', official: '查阅开放时间与公告', tickets: '票价与预约', today: '节假日、宗教礼仪或特别活动可能影响开放和票价。',
  nearby: '可将此站排在{start}和{end}之间。建议现场停留 {time} 分钟，另计步行时间。',
  notes: { O: '户外地标或公共花园', H: '博物馆或历史遗址', C: '共主教座堂与参观场馆', V: '售票历史场馆', E: '艺术与活动场馆', W: '宗教场所', X: '历史建筑 · 外观游览', L: '公共升降梯' },
  hours: { O: '户外区域按现场公示时段开放', H: '按马耳他遗产局开放日历', C: '查阅游客参观时段', V: '以场馆时段为准', E: '按活动日程开放', W: '参观须配合宗教礼仪时间', X: '暂时关闭', L: '按季节公布运营时段' },
  fees: { O: '公共区域可免费观赏', H: '查阅马耳他遗产局当期票价', C: '查询参观门票', V: '查询门票和导览费用', E: '票价按演出或展览而定', W: '向教堂了解参观安排', X: '闭馆期间以外观游览为主', L: '查询运营方票价' },
  lodgingByArea: ['想以步行为主，可住共和街沿线或城门附近。需频繁搭乘巴士，可选靠近瓦莱塔巴士总站的城门一侧。', '住在弗洛里亚纳方便搭乘巴士，也能步行至瓦莱塔城门。若住滨水一带，可先确认酒店入口在码头还是上城。', '想早晨沿码头出发，可住瓦莱塔滨水区附近。若行程以上城为主，可住卡斯蒂利亚广场附近，经巴拉卡升降梯往返港边。', '住比尔古可较早抵达要塞和博物馆。若住瓦莱塔并计划傍晚过港，先核对末班渡轮。'],
 },
 mt: {
  explore: 'Esplora ż-żona', type: 'Tip ta’ attrazzjoni', duration: 'Ħin rakkomandat', minute: 'min', adult: 'Dħul għall-adulti', charm: 'Storja, arkitettura u kultura', practical: 'Pariri u mistoqsijiet komuni', lodging: 'Fejn toqgħod', map: 'Indirizz u direzzjonijiet', rates: 'Klassifikazzjonijiet fuq Google Maps', official: 'Ara l-ħinijiet u l-avviżi', tickets: 'Dħul u prenotazzjoni', today: 'Il-ħinijiet u l-prezzijiet jistgħu jinbidlu fil-festi, waqt funzjonijiet jew avvenimenti.',
  nearby: 'Żur dan il-post bejn {start} u {end}. Ħalli {time} min għall-waqfa, barra l-ħin tal-mixi.',
  notes: { O: 'Monument fil-beraħ jew ġnien pubbliku', H: 'Mużew jew sit storiku', C: 'Konkatidral u post ta’ żjara', V: 'Post storiku bil-biljett', E: 'Spazju għall-arti u l-avvenimenti', W: 'Post ta’ qima', X: 'Binja storika · żjara minn barra', L: 'Lift pubbliku' },
  hours: { O: 'Aċċess fil-beraħ skont l-avviżi', H: 'Ara l-kalendarju ta’ Heritage Malta', C: 'Ara l-ħinijiet għaż-żjarat', V: 'Ara l-iskeda tal-post', E: 'Skont il-programm', W: 'Skont il-ħin tal-funzjonijiet', X: 'Magħluq temporanjament', L: 'Ħinijiet skont l-istaġun' },
  fees: { O: 'Veduta b’xejn miż-żoni pubbliċi', H: 'Ara l-prezzijiet ta’ Heritage Malta', C: 'Ara l-prezzijiet għaż-żjarat', V: 'Ara l-prezzijiet tad-dħul u tal-ġiti', E: 'Skont l-avveniment jew il-wirja', W: 'Iċċekkja l-arranġamenti mal-knisja', X: 'Waqfa barra waqt l-għeluq', L: 'Ara n-noll tal-operatur' },
  lodgingByArea: ['Agħżel akkomodazzjoni qrib Triq ir-Repubblika jew Bieb il-Belt biex iddur bil-mixi. Bieb il-Belt jinsab qrib it-terminal tal-karozzi tal-linja.', 'Il-Furjana hi qrib it-terminal u Bieb il-Belt. Jekk toqgħod max-xatt, iċċekkja fuq liema livell tinsab id-daħla tal-lukanda.', 'Qrib il-Valletta Waterfront tista’ tibda l-ġurnata max-xatt. Għall-parti ta’ fuq tal-Belt, fittex qrib Kastilja u uża l-lift tal-Barrakka.', 'Oqgħod il-Birgu biex tasal kmieni fil-forti u l-mużewijiet. Jekk toqgħod il-Belt, iċċekkja l-aħħar lanċa lura qabel żjara filgħaxija.'],
 },
 it: {
  explore: 'Esplora la zona', type: 'Tipo di attrazione', duration: 'Tempo consigliato', minute: 'min', adult: 'Ingresso adulti', charm: 'Storia, architettura e cultura', practical: 'Informazioni e domande frequenti', lodging: 'Dove alloggiare', map: 'Indirizzo e indicazioni', rates: 'Valutazioni su Google Maps', official: 'Consulta orari e avvisi', tickets: 'Ingresso e prenotazioni', today: 'Orari e prezzi possono variare nei festivi, durante le funzioni o in occasione di eventi.',
  nearby: 'Inserisci questa tappa tra {start} e {end}. Dedica {time} min al luogo, oltre al tragitto a piedi.',
  notes: { O: 'Monumento all’aperto o giardino pubblico', H: 'Museo o sito storico', C: 'Concattedrale e luogo di visita', V: 'Sito storico a pagamento', E: 'Spazio per arte ed eventi', W: 'Luogo di culto', X: 'Edificio storico · visita esterna', L: 'Ascensore pubblico' },
  hours: { O: 'Accesso all’aperto secondo gli avvisi', H: 'Consulta il calendario di Heritage Malta', C: 'Consulta gli orari di visita', V: 'Consulta gli orari della struttura', E: 'Orari secondo il programma', W: 'Accesso secondo le funzioni religiose', X: 'Temporaneamente chiuso', L: 'Orario di servizio stagionale' },
  fees: { O: 'Visibile gratuitamente dalle aree pubbliche', H: 'Consulta le tariffe attuali di Heritage Malta', C: 'Consulta i prezzi di visita', V: 'Verifica ingresso e costo delle visite guidate', E: 'Prezzi secondo l’evento o l’esposizione', W: 'Verifica le modalità di visita con la chiesa', X: 'Durante la chiusura, visita esterna', L: 'Consulta la tariffa del gestore' },
  lodgingByArea: ['Soggiorna vicino a Republic Street o alla Porta della Città per muoverti a piedi. La porta è la scelta più comoda per il capolinea degli autobus.', 'Floriana è comoda per il capolinea e la Porta della Città. Se alloggi sul lungomare, verifica a che livello si trova l’ingresso della struttura.', 'Vicino al Valletta Waterfront puoi partire dalla banchina al mattino. Per visitare soprattutto la città alta, alloggia presso piazza Castiglia e usa l’ascensore Barrakka.', 'Alloggia a Birgu per raggiungere presto il forte e i musei. Se soggiorni a Valletta controlla l’ultimo traghetto prima di una visita serale.'],
 },
};

export function visitorInfo(slug: string, locale: string, route: string, source: string) {
 const language = guideLocale(locale);
 const index = languageIndex[language];
 const ui = labels[language];
 const [mode, minutes, taglines] = visitors[slug as keyof typeof visitors] as [Mode, string, string[]];
 const details = visits[slug];
 const type = ui.notes[mode];
 return {
  ui, type, minutes, tagline: taglines[index],
  hours: details?.hours?.[index] ?? ui.hours[mode],
  hoursUrl: mode === 'H' ? heritageHours : details?.hoursLink ?? details?.source ?? source,
  fare: details?.fare?.[index] ?? (details?.euros ? ui.adult + ' €' + details.euros : ui.fees[mode]),
  ticketUrl: details?.source ?? source,
  notice: details?.notice?.[index],
  lodging: ui.lodgingByArea[route === 'three' ? 3 : route === 'harbour' ? 2 : route === 'floriana' ? 1 : 0],
 };
}
