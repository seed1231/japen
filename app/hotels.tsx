import Photo from './photo';
import { ArrowUpRight, BedDouble } from 'lucide-react';
export type Hotel = {
  id: string;
  name: string;
  english: string;
  dates: string;
  nights: string;
  description: string;
  official: string;
  images: { src: string; alt: string; width: number; height: number }[];
};
export default function Hotels({ hotels }: { hotels: Hotel[] }) {
  return (
    <section id="hotels" className="hotel-section content-width">
      <div className="section-intro">
        <div>
          <p className="eyebrow">A PLACE TO COME HOME TO</p>
          <h2>
            旅行的夜晚，
            <br />
            也值得好好安放。
          </h2>
        </div>
        <p>
          前三晚住京都，後兩晚住大阪。
          <br />
          每天出發、歸來，都有熟悉的落腳處。
        </p>
      </div>
      <div className="hotel-grid">
        {hotels.map((hotel) => (
          <article id={hotel.id} className="hotel-card" key={hotel.id}>
            <div className="hotel-photos">
              {hotel.images.map((im, i) => (
                <figure
                  key={im.src}
                  className={i === 0 ? 'hotel-exterior' : 'hotel-room'}
                >
                  <Photo
                    sizes="(max-width: 700px) calc(100vw - 40px), 25vw"
                    src={im.src}
                    alt={im.alt}
                    width={im.width}
                    height={im.height}
                    loading="lazy"
                  />
                  <figcaption>{i === 0 ? '飯店環境' : '客房示意'}</figcaption>
                </figure>
              ))}
              <span className="night-count">{hotel.nights}</span>
            </div>
            <div className="hotel-copy">
              <p className="eyebrow">{hotel.dates}</p>
              <h3>{hotel.name}</h3>
              <p className="hotel-english">{hotel.english}</p>
              <p className="hotel-description">{hotel.description}</p>
              <a
                href={hotel.official}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                <BedDouble size={17} /> 查看飯店官方資訊{' '}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="source-note">
        飯店照片來自各飯店官方網站，圖像權利歸原飯店所有。客房為房型示意，實際入住房型與設備以訂房內容為準。
      </p>
    </section>
  );
}
