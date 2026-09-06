'use client';

import { useEffect, useRef, useState } from 'react';

export default function DayNav({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  const [active, setActive] = useState('');
  const [progress, setProgress] = useState(0);
  const [group, setGroup] = useState('');
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const chapters = [
      ...document.querySelectorAll<HTMLElement>('article.day, .split-day'),
    ];
    const update = () => {
      frame = 0;
      const offset = 150;
      const current = chapters
        .filter((el) => el.getBoundingClientRect().top <= offset)
        .at(-1);
      const end =
        document.getElementById('hotels')?.getBoundingClientRect().top ??
        Infinity;
      setActive(current && end > offset ? current.id.slice(4, 5) : '');
      setGroup(
        current?.id === 'day-5a'
          ? 'A 組'
          : current?.id === 'day-5b'
            ? 'B 組'
            : '',
      );
      const start = chapters[0]?.getBoundingClientRect().top ?? 0;
      const length = end - start;
      setProgress(
        length > 0
          ? Math.max(0, Math.min(100, ((offset - start) / length) * 100))
          : 0,
      );
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    const observer = new ResizeObserver(queue);
    observer.observe(document.body);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const container = rail.current;
    const link = container?.querySelector<HTMLElement>(
      '[aria-current="location"]',
    );
    if (!container || !link) return;
    const box = link.getBoundingClientRect();
    const parent = container.getBoundingClientRect();
    if (box.left < parent.left || box.right > parent.right) {
      container.scrollTo({
        left:
          container.scrollLeft +
          box.left -
          parent.left -
          (parent.width - box.width) / 2,
        behavior: 'instant',
      });
    }
  }, [active]);
  return (
    <nav className="day-nav" aria-label="每日行程快速導覽">
      <div className="day-nav-rail" ref={rail}>
        {sections.map((s, i) => (
          <a
            href={`#day-${s.id}`}
            key={s.id}
            aria-current={active === s.id ? 'location' : undefined}
          >
            <span>
              09.{11 + i}
              {active === s.id && s.id === '5' && group
                ? ` · ${group}`
                : ` / ${String(i + 1).padStart(2, '0')}`}
            </span>
            <strong>{s.title}</strong>
          </a>
        ))}
      </div>
      <div className="reading-track" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </nav>
  );
}
