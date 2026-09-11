import Photo from './photo';
import DayNav from './day-nav';
import Hotels from './hotels';
import hotels from './hotels.json';
import data from './itinerary.json';
import rainData from './rain-itinerary.json';
import WeatherTabs from './weather-tabs';
import galleries from './galleries.json';
import credits from './photo-credits.json';
import {
  ArrowUpRight,
  ArrowDown,
  MapPin,
  TrainFront,
  Clock3,
  Ticket,
  BedDouble,
  Download,
  Check,
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';

const sections = [
  {
    id: '1',
    title: '抵達京都',
    route: '關西機場 → 京都',
    mood: '古都的第一晚',
  },
  {
    id: '2',
    title: '琵琶湖畔',
    route: '白鬚神社・近江八幡',
    mood: '湖光與水岸老街',
  },
  {
    id: '3',
    title: '海之京都',
    route: '天橋立・伊根舟屋',
    mood: '海灣與舟屋風景',
  },
  {
    id: '4',
    title: '嵐山・宇治・四條',
    route: '竹林・平等院・寶可夢中心',
    mood: '竹葉、抹茶與限定採買',
  },
  {
    id: '5',
    title: '雙線漫遊',
    route: 'A 組 USJ ／ B 組京都奈良',
    mood: '各自喜歡的風景',
  },
  {
    id: '6',
    title: '有馬・六甲',
    route: '溫泉・山景・難波採買・回程',
    mood: '山景與回程前採買',
  },
];
const stops: Record<string, Record<number, string>> = {
  '1': { 3: '領券與指定席', 6: '京都・入住' },
  '2': {
    4: '白鬚神社',
    11: '琵琶湖遊船',
    15: '八幡山展望',
    16: '近江八幡老街',
  },
  '3': {
    5: '天橋立觀光船',
    6: '籠神社與海灣展望',
    8: '伊根灣遊覽船',
    9: '伊根舟屋',
    11: '智恩寺與回旋橋',
    13: '丹後青松號',
  },
  '4': {
    2: '嵐山竹林',
    3: '天龍寺庭園',
    4: '渡月橋',
    9: '宇治抹茶採買',
    11: '平等院',
    12: '宇治川畔',
    13: '宇治老街',
    16: '京都寶可夢中心',
    23: '大阪・入住',
  },
  '5a': {
    5: '先換航海王票券',
    6: '超級任天堂世界',
    7: '哈利波特魔法世界',
    9: '芙莉蓮・舞台 18',
    13: 'NO LIMIT! 遊行',
    16: '水世界',
    17: '鏈鋸人 4-D',
    21: '航海王 Premier Show',
    25: '萬聖驚魂夜學院',
    26: '重現殭屍群舞',
  },
  '5b': {
    2: '日本橋集合',
    4: '清水寺與古都街道',
    5: '伏見稻荷大社',
    6: '奈良公園',
  },
  '6': {
    8: '金之湯晨湯',
    11: '六甲有馬纜車',
    12: '六甲花園露台',
    23: 'Bic Camera 難波店',
    25: '回程出發',
    28: 'HARUKA 前往機場',
  },
};
function EditorialTitle({ text }: { text: string }) {
  return (
    <>
      {text.split('，').map((part, i) => (
        <span className="title-phrase" key={part}>
          {i === 0 && text.includes('，') ? part + '，' : part}
        </span>
      ))}
    </>
  );
}

const redeem = [
  '入境、領行李後上 2 樓，跟著「JR／鉄道」指標走空橋到關西機場站。',
  '準備電子兌換券 QR Code 及每位旅客的護照正本。',
  '找有護照圖示的綠色售票機：選繁中 → 兌換 E-TICKET → 掃 QR 及護照 → 開始日選 9/12。',
  '掃描失敗就到旁邊 JR 綠色人工窗口（PDF 記載 05:30～23:00）；不要去南海電鐵窗口。',
  '領到實體周遊券後，另外購買 9/11 當晚前往京都的 HARUKA 車票。',
];
const reservationSteps = [
  '選「繁體中文」→ 將實體 JR 周遊券插入標示 Ticket・Commuter Pass 的票券入口。多人同行可逐張插入，最多 4 人一起選座，再按「插入完畢」。',
  '按畫面左上「指定座席」→「使用回數票預訂指定座席」。',
  '依序輸入乘車日、出發站、抵達站及出發時間 → 搜尋 → 選指定車次 → 普通車指定席 → 從座位表選位 → 確認。',
  '取回 JR 周遊券及印出的指定席券；確認日期、車次、區間、車廂、座位後，再插入周遊券辦下一段。共重複 3 次。',
];
function Notes({ notes }: { notes: { title: string; items: string[] }[] }) {
  return (
    <div className="notes-grid">
      {notes.map((n) => (
        <section key={n.title} className="note">
          <h4>{n.title}</h4>
          <ul>
            {n.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
function DataTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: string[][];
  caption: string;
}) {
  return (
    <Table className="info-table">
      <TableCaption className="sr-only">{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((h) => (
            <TableHead scope="col" key={h}>
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={i}>
            {r.map((c, j) => (
              <TableCell key={j}>{c}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
function Day({
  day,
  rain = false,
}: {
  day: (typeof data.days)[number];
  rain?: boolean;
}) {
  const dayNo = day.id[0].padStart(2, '0');
  const photos =
    rain && day.id === '6'
      ? []
      : galleries[day.id as keyof typeof galleries] || [];
  const dayStops = rain ? {} : stops[day.id];
  return (
    <article id={`day-${day.id}`} className={`day day-${day.id}`}>
      <div className="day-heading">
        <div className="day-index">
          <span>DAY</span>
          <strong>{dayNo}</strong>
          {day.id === '5a' || day.id === '5b' ? (
            <em>{day.id.slice(1).toUpperCase()} 組</em>
          ) : null}
        </div>
        <div>
          <p className="eyebrow">
            {day.date} {day.week} <span className="heading-rule" /> {day.area}
          </p>
          <h2>
            <EditorialTitle text={day.title} />
          </h2>
        </div>
      </div>
      <div className={`destination-gallery gallery-${photos.length}`}>
        {photos.map((photo) => (
          <figure key={photo.name}>
            <div className="destination-photo">
              <Photo
                src={`/images/${photo.name}.jpg`}
                alt={photo.title + '實景照片'}
                width={photo.width}
                height={photo.height}
                sizes={
                  photos.length === 1
                    ? '(max-width: 700px) calc(100vw - 40px), 55vw'
                    : '(max-width: 700px) calc(100vw - 40px), 42vw'
                }
                loading="lazy"
              />
            </div>
            <figcaption>
              <h3>{photo.title}</h3>
              <p>{photo.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="day-layout">
        <aside className="day-story">
          <div className="story-sticky">
            <p className="story-text">{day.story}</p>
            <div className="route-line">
              <MapPin size={17} />
              <p>{day.route}</p>
            </div>
            <div className="stay">
              <BedDouble size={18} />
              <div>
                <span>{day.id === '6' ? '回程航班' : '今晚住宿'}</span>
                <p>{day.hotel}</p>
              </div>
            </div>
            {day.id === '1' && (
              <a className="text-link" href="#tickets">
                查看領券與 3 段劃位指南 <ArrowUpRight size={17} />
              </a>
            )}
            {day.id === '5a' && (
              <a className="text-link" href="#usj-maps">
                查看 USJ 路線與分區圖 <ArrowDown size={17} />
              </a>
            )}
            {day.id === '5b' && !rain && (
              <p className="small-note">
                大阪近鐵日本橋下車後，以手機地圖搜尋 KOKO HOTEL Osaka Namba
                Sennichimae，步行返回；核對千日前店名，避免走錯分店。
              </p>
            )}
          </div>
        </aside>
        <div className="day-detail">
          <div className="timing-note">
            <Clock3 size={20} />
            <div>
              <strong>
                {day.id === '5a'
                  ? '場次與換票'
                  : day.id === '5b'
                    ? '集合提醒'
                    : '今日重點與必守時間'}
              </strong>
              <p>{day.important}</p>
            </div>
          </div>
          {day.id === '5a' && !rain && (
            <p className="source-note">
              場次依新版 PDF 的 9/15 官方查核；當日仍需開啟官方 App
              確認停演、天候及人流管制。
            </p>
          )}
          <ol className="timeline">
            {day.rows.map(([time, text], i) => (
              <li
                key={i}
                className={
                  dayStops?.[i]
                    ? 'landmark-stop'
                    : /轉乘|候車/.test(time)
                      ? 'transfer'
                      : 'travel-step'
                }
              >
                <div className="time">{time}</div>
                <div className="event">
                  <span className="timeline-dot" />
                  {dayStops?.[i] && (
                    <h3 className="stop-title">{dayStops[i]}</h3>
                  )}
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Notes notes={day.notes} />
          {rain && day.id === '5a' && (
            <section id="usj-maps" className="usj-maps">
              <h3>雨天動線與分區圖</h3>
              <p>
                開園取券後前往任天堂，11:40 往入口票務中心，12:10～12:40
                換票；17:30 往水世界劇場看航海王。
              </p>
              {[0, 1, 2].map((i) => (
                <figure key={i}>
                  <a
                    href={`/images/rain-usj-${i}.png`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Photo
                      src={`/images/rain-usj-${i}.png`}
                      alt={
                        [
                          'USJ 雨天位置與動線圖',
                          '任天堂分區圖',
                          '哈利波特分區圖',
                        ][i]
                      }
                      width={i === 0 ? 1600 : 800}
                      height={[1120, 744, 470][i]}
                      loading="lazy"
                    />
                  </a>
                </figure>
              ))}
              {rainData.mapNotes.map((note, i) => (
                <p className="source-note" key={i}>
                  {note}
                </p>
              ))}
            </section>
          )}
          {rain && day.id === '5b' && (
            <p className="source-note">
              大阪近鐵日本橋下車後先去3COINSなんばWalk店，店舖21:00關門；若巴士延誤至20:15後就直接回KOKO
              HOTEL，不為購物壓縮休息。地下街遇雨也較好走。
            </p>
          )}

          {day.id === '5a' && !rain && (
            <section id="usj-maps" className="usj-maps">
              <p className="eyebrow">PARK MAP · 新版 PDF 圖像</p>
              <h3>先看位置，再依票券安排。</h3>
              <p>
                編號只標示位置，不是固定遊玩順序；不畫路線連線。優先 2 → 3 → 4，
                再依券安排 6／7；8 於 15:00 水世界及 18:15 航海王入場，須重訪。
                點選圖片可查看原尺寸。
              </p>
              <figure>
                <a
                  href="/images/usj-0.png"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="開啟 USJ 園區位置原圖"
                >
                  <Photo
                    src="/images/usj-0.png"
                    alt="USJ 園區位置圖，標示入口與本日八個主要設施位置"
                    width={1600}
                    height={1120}
                    loading="lazy"
                  />
                </a>
                <figcaption>
                  分區圖為位置參考，圖中商店及其他設施不代表本日安排。表演管制、實際入口與臨時封路以官方
                  App 及現場為準。
                </figcaption>
              </figure>
              <div className="zone-maps">
                <figure>
                  <h4>超級任天堂世界</h4>
                  <a
                    href="/images/usj-1.png"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="開啟超級任天堂世界分區原圖"
                  >
                    <Photo
                      src="/images/usj-1.png"
                      alt="超級任天堂世界分區攻略"
                      width={800}
                      height={744}
                      loading="lazy"
                    />
                  </a>
                  <figcaption>咚奇剛的瘋狂礦車 → 瑪利歐賽車</figcaption>
                </figure>
                <figure>
                  <h4>哈利波特魔法世界</h4>
                  <a
                    href="/images/usj-2.png"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="開啟哈利波特分區原圖"
                  >
                    <Photo
                      src="/images/usj-2.png"
                      alt="哈利波特魔法世界分區攻略"
                      width={800}
                      height={470}
                      loading="lazy"
                    />
                  </a>
                  <figcaption>本日主項目：哈利波特禁忌之旅</figcaption>
                </figure>
              </div>
              <div className="notes-grid usj-rules">
                <section className="note">
                  <h4>單人通道</h4>
                  <p>
                    咚奇剛、瑪利歐賽車、禁忌之旅、好萊塢美夢正向。同行者分開坐；可能暫停、未必較快，不能取代任天堂區域入場券。
                  </p>
                </section>
                <section className="note">
                  <h4>App 取券</h4>
                  <p>
                    芙莉蓮原則使用設施號碼券，當日可能開放免券。前一張設施券的到場時段結束後，才可領下一張；不是固定等
                    120 分鐘。任天堂區域券另依 App 辦理。
                  </p>
                </section>
                <section className="note">
                  <h4>22:00 後返飯店</h4>
                  <p>
                    Universal City → 西九條 →
                    環狀線內回り（弁天町、天王寺方向）→ 今宮 → JR 難波 →
                    步行飯店。離園前查末班接續，勿把 22:00 視為回到飯店時間。
                  </p>
                </section>
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
export default function ItineraryView({ rain = false }: { rain?: boolean }) {
  const selected = rain ? rainData : data;
  const selectedSections = sections.map((s) =>
    rain && s.id === '6'
      ? {
          ...s,
          title: '箕面・勝尾寺',
          route: '瀑布・達摩寺・回程',
          mood: '依雨勢與步道狀況調整',
        }
      : s,
  );
  const pdf = rain ? '/kansai-rain-2026.pdf' : '/kansai-itinerary-2026.pdf';
  return (
    <>
      <a href="#journey" className="skip-link">
        跳到完整行程
      </a>
      <header className="masthead">
        <a className="brand" href="#top" aria-label="關西漫旅首頁">
          関西<span>關西漫旅</span>
        </a>
        <nav aria-label="主要導覽">
          <a href="#highlights">旅程總覽</a>
          <a href="#journey">六日旅程</a>
          <a href="#hotels">住宿</a>
          <a href="#practical">行前指南</a>
        </nav>
        <a className="edition" href={pdf} download>
          <Download size={15} /> {rain ? '雨天行程 PDF' : '原始行程 PDF'}
        </a>
      </header>
      <main id="top">
        <WeatherTabs rain={rain} />
        {rain && (
          <aside className="rain-summary content-width">
            <h1>完整雨天行程</h1>
            <p>
              依 PDF 的 2026/9/11
              日本氣象廳預報整理，非即時天氣。出發前請查看最新預報及營運公告。
            </p>
            <p>
              小雨＜1mm／小時可縮短戶外；中雨1～4mm／小時取消自行車與長距離散步；強雨＞4mm／小時或雷雨時停止纜車、遊船及山區步道。
            </p>
            <a href="#journey">直接查看每日雨天行程 ↓</a>
          </aside>
        )}

        <section className={`hero ${rain ? 'rain-hero' : ''}`}>
          <Photo
            className="hero-image"
            sizes="100vw"
            src="/images/amanohashidate.jpg"
            alt="天橋立松林沙洲橫跨海灣的全景"
            width={2200}
            height={1650}
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-type">
            <p className="eyebrow">A JOURNEY THROUGH KANSAI</p>
            <h1>
              把日子，
              <br />
              <span className="hero-line">
                留在<em>關西。</em>
              </span>
            </h1>
            <p className="hero-description">
              從琵琶湖的水上鳥居，到伊根舟屋的海風。
              <br className="desktop-br" />
              六天五夜，走進古都、湖畔與山海之間。
            </p>
            <a className="primary-link" href="#journey">
              查看六日行程 <ArrowUpRight size={23} />
            </a>
          </div>
          <div className="hero-side">
            <span>2026</span>
            <strong>09.11 — 09.16</strong>
            <p>
              {rain
                ? '京都・滋賀・丹後・大阪・箕面・勝尾寺'
                : '京都・滋賀・丹後・大阪・有馬・六甲山'}
            </p>
          </div>
          <div className="hero-location">
            <MapPin size={13} /> 京都・天橋立 <span>AMANOHASHIDATE</span>
          </div>
        </section>
        <div className="journey-strip">
          <span>
            <strong>6</strong> 天的風景
          </span>
          <span>
            <strong>5</strong> 夜的停留
          </span>
          <span>
            <TrainFront size={20} /> JR 周遊券 9/12–9/16
          </span>
          <span>
            <a href="#hotels" className="stay-shortcut">
              京都住 3 晚 <span className="strip-arrow">→</span> 大阪住 2 晚{' '}
              <ArrowUpRight size={16} />
            </a>
          </span>
        </div>
        <section id="journey" className="journey-intro content-width">
          <div>
            <p className="eyebrow">YOUR SIX-DAY JOURNEY</p>
            <h2>
              <EditorialTitle text="六天，剛剛好的出走。" />
            </h2>
          </div>
          <p>
            2026 年 9 月 11 日（五）— 9 月 16 日（三）
            <br />
            每日交通、停留與備案，沿著時間往下看。
          </p>
        </section>
        <section
          id="highlights"
          className="route-overview content-width"
          aria-label="六日旅程總覽"
        >
          {selectedSections.map((s, i) => (
            <a href={`#day-${s.id}`} key={s.id}>
              <span className="overview-date">
                09.{11 + i} <ArrowUpRight size={16} />
              </span>
              <h3>{s.title}</h3>
              <p>
                {s.route.split(' ／ ').map((part) => (
                  <span className="overview-route-part" key={part}>
                    {part}
                  </span>
                ))}
              </p>
              <span className="overview-mood">{s.mood}</span>
            </a>
          ))}
        </section>
        <DayNav sections={selectedSections} />
        <div className="source-banner content-width">
          行程與費用依提供的完整 PDF
          整理。時刻、營業與票價可能調整；尚未公告或有衝突的資訊已於對應段落標示，請於出發前及當日查看官方資訊。
        </div>
        <div className="days content-width">
          {selected.days.map((day) => (
            <div key={day.id}>
              {day.id === '5a' && (
                <section id="day-5" className="split-day">
                  <div>
                    <p className="eyebrow">ONE DAY, TWO WAYS</p>
                    <h2>同一天，各自喜歡的風景。</h2>
                  </div>
                  <div className="group-links">
                    <a href="#day-5a">
                      A 組・USJ <ArrowDown size={17} />
                    </a>
                    <a href="#day-5b">
                      B 組・京都奈良 <ArrowDown size={17} />
                    </a>
                  </div>
                </section>
              )}
              <Day day={day} rain={rain} />
            </div>
          ))}
        </div>
        <Hotels
          hotels={
            rain
              ? hotels.map((h) => ({
                  ...h,
                  description:
                    h.id === 'hotel-osaka'
                      ? '後兩晚住在難波千日前。9/16退房寄行李，箕面與勝尾寺行程後回飯店整理，15:10帶行李前往JR難波。'
                      : h.description,
                }))
              : hotels
          }
        />
        <section id="practical" className="practical">
          <div className="content-width">
            <div className="section-intro">
              <div>
                <p className="eyebrow">BEFORE YOU GO</p>
                <h2>
                  準備妥當，
                  <br />
                  就能安心享受沿途。
                </h2>
              </div>
              <a href={pdf} download className="download-link">
                <Download size={18} /> 下載完整原始行程
              </a>
            </div>
            {!rain && (
              <div className="deadlines">
                <div>
                  <span>9/12 · 湖畔日</span>
                  <strong>10:26 / 15:10</strong>
                  <p>近江高島 JR／大津 JR，掌握湖畔行程銜接。</p>
                </div>
                <div>
                  <span>9/13 · 丹後日</span>
                  <strong>07:32 → 19:28</strong>
                  <p>
                    城崎1號 07:32、纜車下巴士 11:23、伊根巴士 14:42、青松號
                    18:00、綾部普通列車 19:28。
                  </p>
                </div>
                <div>
                  <span>9/16 · 回程日</span>
                  <strong>15:47 HARUKA</strong>
                  <p>
                    11:20 離開六甲枝垂、11:33 山上巴士、14:50 離開 Bic Camera、
                    15:10 目標離開飯店、15:47 天王寺出發。
                  </p>
                </div>
              </div>
            )}
            <section id="tickets" className="guide-section">
              <div className="guide-title">
                <Ticket size={24} />
                <div>
                  <p className="eyebrow">01 / RAIL PASS</p>
                  <h3>領券、啟用與指定席</h3>
                </div>
              </div>
              <div className="pass-banner">
                <strong>JR 關西廣域券 · 連續 5 日</strong>
                <span>9/12 啟用 → 9/16 最後使用日</span>
                <p>
                  9/11 抵達機場後領取實體券，開始日一定選 9/12；9/11 關西機場 →
                  京都的 HARUKA
                  另買。啟用後不用每天重新換票；普通、快速、新快速直接使用周遊券，特急指定席先辦理免費劃位。
                </p>
              </div>
              <div className="guide-columns">
                <section>
                  <h4>關西機場領券｜照著做</h4>
                  <ol className="steps">
                    {redeem.map((t, i) => (
                      <li key={t}>
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        <p>{t}</p>
                      </li>
                    ))}
                  </ol>
                </section>
                <section>
                  <h4>領券後立即免費劃位｜綠色售票機</h4>
                  <ol className="steps">
                    {reservationSteps.map((t, i) => (
                      <li key={t}>
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        <p>{t}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
              <h4>這趟請先劃好 3 段指定席</h4>
              <DataTable
                headers={['順序／乘車日', '售票機搜尋內容']}
                rows={selected.reservations}
                caption="三段免費指定席劃位資訊"
              />
              <div className="source-conflict">
                <strong>找不到車次時</strong>
                <p>
                  不要付費購買。按取消、取回周遊券，直接到旁邊 JR 綠色窗口出示原
                  PDF 第 2
                  頁，請站務員免費劃位；丹後接力1號若機器未顯示也照此辦理。
                </p>
              </div>
              <div className="staff-phrase">
                <span>給站務員看</span>
                <p lang="ja">
                  関西ワイドエリアパスで、こちらの3列車の普通車指定席を予約したいです。追加料金なしの指定席券をお願いします。
                </p>
                <small lang="ja">
                  きのさき1号 ／ たんごリレー1号 ／ はるか37号
                </small>
              </div>
              <h4>沒有中文時｜日文畫面對照</h4>
              <DataTable
                headers={['日文畫面／按鍵', '你要做的事']}
                rows={selected.japanese}
                caption="指定席售票機日文對照"
              />
              <div className="ticket-use">
                <h4>票怎麼用</h4>
                <p>
                  普通、快速、新快速：用周遊券進出閘門。指定席券另外保管，上車依指定座位入座，查票時出示。9/11
                  當晚 HARUKA 不在有效日內，須另外購票。
                </p>
              </div>
            </section>
            <section className="guide-section">
              <div className="guide-title">
                <TrainFront size={24} />
                <div>
                  <p className="eyebrow">02 / COSTS & TICKETS</p>
                  <h3>費用與票券</h3>
                </div>
              </div>
              <DataTable
                headers={['項目', '成人費用（原 PDF 記載）']}
                rows={selected.costs}
                caption="行程票券與成人費用"
              />
              <p className="source-note">
                以上為成人預算參考，非本次訂單實付金額或總旅費；未含餐飲、住宿、USJ／一日團及其他未列門票。已購項目以訂單為準，未購票價於購買時確認。
              </p>
              <div className="no-purchase">
                <Check size={20} />
                <p>
                  <strong>不需購買</strong>
                  依目前動線，不必另買近江鐵道滿喫一日券、大阪 Metro
                  一日券或阪神一日券。
                </p>
              </div>
            </section>
            <section className="guide-section">
              <div className="guide-title">
                <Check size={24} />
                <div>
                  <p className="eyebrow">03 / FINAL CHECK</p>
                  <h3>出發前的最後檢查</h3>
                </div>
              </div>
              <Notes notes={selected.checklists} />
              <h4 className="official-heading">
                官方資訊｜出發前一週與當日早上再確認
              </h4>
              <div className="official-links">
                {selected.official.map((l) => (
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    key={l.title}
                  >
                    {l.title}
                    <ArrowUpRight size={17} />
                  </a>
                ))}
              </div>
              <p className="source-note">
                {rain
                  ? '雨天行程依2026/9/11版PDF。交通班次、營業時間與票價仍須於劃位／購票及出發前確認；月台以現場電子看板為準，表演與設施開放情況依官方App及現場公告。'
                  : '原行程依2026/9/8版PDF。交通班次、票價與營運狀況請於出發前確認。'}
              </p>
            </section>
          </div>
        </section>
        <section className="closing">
          <p className="eyebrow">SEE YOU IN KANSAI</p>
          <h2>
            旅程會結束，
            <br />
            風景會留下。
          </h2>
          <p>2026.09.11 — 09.16</p>
          <a href="#top" className="text-link">
            回到旅程起點 <ArrowUpRight size={17} />
          </a>
        </section>
      </main>
      <footer className="footer content-width">
        <div className="footer-top">
          <a href="#top" className="brand">
            関西<span>關西漫旅</span>
          </a>
          <a href={pdf} download>
            原始 PDF <Download size={14} />
          </a>
        </div>
        <p>
          內容來源：《2026關西六天五夜_完整行程》PDF，共 10
          頁。旅程依原文整理，景點照片為示意，非旅遊當日實景。
        </p>
        <div className="photo-credits" aria-label="照片來源與授權">
          {credits.map((c) => (
            <p key={c.title}>
              <a href={c.source} target="_blank" rel="noreferrer">
                {c.title} · {c.author}
              </a>
              <span> ／ </span>
              <a href={c.licenseUrl} target="_blank" rel="noreferrer">
                {c.license}
              </a>
            </p>
          ))}
        </div>
        <p>
          照片已縮放並依版面裁切，BY-SA 照片之改作仍依各自相同授權提供。USJ
          三張地圖沿用使用者提供的 PDF。
        </p>
      </footer>
    </>
  );
}
