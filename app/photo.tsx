type PhotoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
};

export default function Photo({
  src,
  alt,
  sizes = '(max-width: 700px) calc(100vw - 40px), 60vw',
  ...props
}: PhotoProps) {
  const stem = src.replace(/\.[^.]+$/, '');
  const widths = [480, 800, 1200, 1600].filter((w) => w <= props.width);
  if (!widths.includes(props.width) && props.width < 1600)
    widths.push(props.width);
  return (
    <picture>
      {props.className === 'hero-image' && (
        <source
          media="(max-width: 700px)"
          type="image/webp"
          srcSet="/images/hero-mobile-480.webp 480w, /images/hero-mobile-800.webp 800w"
          sizes="100vw"
        />
      )}
      <source
        type="image/webp"
        srcSet={widths.map((w) => `${stem}-${w}.webp ${w}w`).join(', ')}
        sizes={sizes}
      />
      <img src={src} alt={alt} {...props} decoding="async" />
    </picture>
  );
}
