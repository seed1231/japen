import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 icons: { icon: '/favicon.svg' },
 title: '關西漫旅｜2026 六天五夜・京都、滋賀、丹後與大阪',
 description: '9月11日至16日，從琵琶湖、天橋立與伊根舟屋，到嵐山、宇治、USJ與有馬溫泉。完整六日行程、分組路線、交通與行前指南。',
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
 return <html lang="zh-Hant"><body>{children}</body></html>;
}
