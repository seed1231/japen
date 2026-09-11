'use client';

/* oxlint-disable next/no-html-link-for-pages -- Native navigation also supports the static GitHub Pages export. */

export default function WeatherTabs({ rain }: { rain: boolean }) {
  return (
    <nav className="weather-tabs" aria-label="行程版本切換">
      <a
        href="/"
        aria-current={!rain ? 'page' : undefined}
        onClick={(event) => {
          event.preventDefault();
          window.location.assign(
            (window.location.pathname.startsWith('/japen/')
              ? '/japen/index.html'
              : '/') + window.location.hash,
          );
        }}
      >
        ☀ 原行程
      </a>
      <a
        href="/rain/"
        aria-current={rain ? 'page' : undefined}
        onClick={(event) => {
          event.preventDefault();
          window.location.assign(event.currentTarget.href + window.location.hash);
        }}
      >
        ☂ 雨天備案
      </a>
    </nav>
  );
}
