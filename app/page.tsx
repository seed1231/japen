import Photo from './photo';
import DayNav from './day-nav';
import Hotels from './hotels';
import hotels from './hotels.json';
import data from './itinerary.json';
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
    title: '嵐山・宇治',
    route: '竹林・平等院・大阪',
    mood: '竹葉與抹茶香',
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
    route: '溫泉・山景・回程',
    mood: '把山上的風帶回家',
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
    8: '宇治抹茶採買',
    10: '平等院',
    11: '宇治川畔',
    12: '宇治老街',
    21: '大阪・入住',
  },
  '5a': {
    5: '超級任天堂世界',
    6: '哈利波特魔法世界',
    7: '好萊塢美夢',
    8: '舞台 18',
    11: 'NO LIMIT! 遊行',
    12: '鏈鋸人 4-D',
    14: '水世界',
    18: '航海王 Premier Show',
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
    22: '回程出發',
    25: 'HARUKA 前往機場',
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
  '取回 JR 周遊券及印出的指定席券；確認日期、車次、區間、車廂、座位後，再插入周遊券辦下一段。共重複 4 次。',
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
function Day({ day }: { day: (typeof data.days)[number] }) {
  const dayNo = day.id[0].padStart(2, '0');
  const photos = galleries[day.id as keyof typeof galleries] || [];
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
                查看領券與 4 段劃位指南 <ArrowUpRight size={17} />
              </a>
            )}
            {day.id === '5a' && (
              <a className="text-link" href="#usj-maps">
                查看 USJ 路線與分區圖 <ArrowDown size={17} />
              </a>
            )}
            {day.id === '5b' && (
              <p className="small-note">
                下車後由大阪近鐵日本橋，依地圖步行返回 KOKO HOTEL Osaka Namba
                Sennichimae。
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
                  ? '場次狀態・依 PDF，仍待確認'
                  : day.id === '5b'
                    ? '集合提醒'
                    : '今日重點與必守時間'}
              </strong>
              <p>{day.important}</p>
            </div>
          </div>
          {day.id === '4' && (
            <div className="source-conflict">
              <strong>交通文字待確認</strong>
              <p>
                原 PDF
                時刻表寫「環狀線內環」，下方「移動大阪」寫「外環往西九條／天王寺」，兩者不一致。以下保留原文；請以車站往西九條／天王寺方向指標及
                JR 官方資訊確認。
              </p>
            </div>
          )}
          {day.id === '5a' && (
            <p className="source-note">
              遊行 13:00、水世界 15:45 暫依 9/11 場次；9/14 晚間再查 9/15 官方
              App。標記「目標」的時段須配合號碼券調整。
            </p>
          )}
          <ol className="timeline">
            {day.rows.map(([time, text], i) => (
              <li
                key={i}
                className={
                  stops[day.id]?.[i]
                    ? 'landmark-stop'
                    : /轉乘|候車/.test(time)
                      ? 'transfer'
                      : 'travel-step'
                }
              >
                <div className="time">{time}</div>
                <div className="event">
                  <span className="timeline-dot" />
                  {stops[day.id]?.[i] && (
                    <h3 className="stop-title">{stops[day.id][i]}</h3>
                  )}
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Notes notes={day.notes} />
          {day.id === '3' && (
            <p className="source-note">
              劃位時點：PDF 第 2 頁安排 9/11 領券後立即劃位，第 4
              頁另提醒前一晚劃位；若已在 9/11 完成，出發前確認並保管指定席券。
            </p>
          )}
          {day.id === '5a' && (
            <section id="usj-maps" className="usj-maps">
              <p className="eyebrow">PARK ROUTE · 原 PDF 圖像</p>
              <h3>把冒險，串成一條路線。</h3>
              <p>
                編號代表建議遊玩順序；實際封路、整理券與入場方向以官方 App
                為準。珊瑚紅虛線只表示步行方向，不是精密導航。點選圖片可查看原尺寸。
              </p>
              <figure>
                <a
                  href="/images/usj-0.png"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="開啟 USJ 完整遊玩路線原圖"
                >
                  <Photo
                    src="/images/usj-0.png"
                    alt="USJ 建議順序：入口、咚奇剛、瑪利歐賽車、哈利波特、好萊塢美夢、舞台18、鏈鋸人4-D、水世界與航海王"
                    width={1600}
                    height={1120}
                    loading="lazy"
                  />
                </a>
                <figcaption>
                  1 入口 → 2 咚奇剛 → 3 瑪利歐賽車 → 4 哈利波特 → 5 好萊塢美夢 →
                  6 舞台18 → 7 鏈鋸人4-D → 8 水世界／航海王
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
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
export default function Home() {
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
        <a className="edition" href="/kansai-itinerary-2026.pdf" download>
          <Download size={15} /> 原始行程 PDF
        </a>
      </header>
      <main id="top">
        <section className="hero">
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
            <p>京都・滋賀・丹後・大阪・有馬・六甲山</p>
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
          {sections.map((s, i) => (
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
        <DayNav sections={sections} />
        <div className="source-banner content-width">
          行程與費用依提供的完整 PDF
          整理。時刻、營業與票價可能調整；尚未公告或有衝突的資訊已於對應段落標示，請於出發前及當日查看官方資訊。
        </div>
        <div className="days content-width">
          {data.days.map((day) => (
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
              <Day day={day} />
            </div>
          ))}
        </div>
        <Hotels hotels={hotels} />
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
              <a
                href="/kansai-itinerary-2026.pdf"
                download
                className="download-link"
              >
                <Download size={18} /> 下載完整原始行程
              </a>
            </div>
            <div className="deadlines">
              <div>
                <span>9/12 · 湖畔日</span>
                <strong>10:26 / 15:10</strong>
                <p>近江高島 JR／大津 JR，掌握湖畔行程銜接。</p>
              </div>
              <div>
                <span>9/13 · 丹後日</span>
                <strong>07:32 → 20:15</strong>
                <p>
                  城崎1號 07:32、纜車下巴士 11:23、伊根巴士 14:42、青松號
                  18:00、綾部橋立10號 20:15。
                </p>
              </div>
              <div>
                <span>9/16 · 回程日</span>
                <strong>15:47 HARUKA</strong>
                <p>
                  11:20 離開六甲枝垂、11:33 山上巴士、15:15
                  帶行李離開飯店、15:47 天王寺出發。
                </p>
              </div>
            </div>
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
              <h4>這趟請先劃好 4 段指定席</h4>
              <DataTable
                headers={['順序／乘車日', '售票機搜尋內容']}
                rows={data.reservations}
                caption="四段免費指定席劃位資訊"
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
                  関西ワイドエリアパスで、こちらの4列車の普通車指定席を予約したいです。追加料金なしの指定席券をお願いします。
                </p>
                <small lang="ja">
                  きのさき1号 ／ たんごリレー1号 ／ はしだて10号 ／ はるか37号
                </small>
              </div>
              <h4>沒有中文時｜日文畫面對照</h4>
              <DataTable
                headers={['日文畫面／按鍵', '你要做的事']}
                rows={data.japanese}
                caption="指定席售票機日文對照"
              />
              <div className="ticket-use">
                <h4>票怎麼用</h4>
                <p>
                  普通、快速、新快速：只用周遊券進出閘門。指定席：攜帶周遊券及指定席券，依車廂座位入座，查票時出示兩張。9/11
                  當晚 HARUKA 不在有效日內，須另外購票。
                </p>
                <p className="source-note">
                  原 PDF 第 1 頁寫進站將兩張票一起插入，第 2
                  頁寫進站只用周遊券；兩處說法不同。兩張票均須保管，閘門使用方式請依票面與
                  JR 站務員指示確認。
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
                rows={data.costs}
                caption="行程票券與成人費用"
              />
              <p className="source-note">
                「已購」沿用原 PDF 標記。此為 PDF
                所列票券與交通費，非全程總預算；機票、住宿、餐飲、USJ
                與一日團等未列費用不另估算。
              </p>
              <div className="no-purchase">
                <Check size={20} />
                <p>
                  <strong>不需購買</strong>近江鐵道滿喫一日券、大阪 Metro
                  一日券、阪神一日券及其他關西私鐵周遊券。
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
              <Notes notes={data.checklists} />
              <h4 className="official-heading">
                官方資訊｜出發前一週與當日早上再確認
              </h4>
              <div className="official-links">
                {data.official.map((l) => (
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
          <a href="/kansai-itinerary-2026.pdf" download>
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
