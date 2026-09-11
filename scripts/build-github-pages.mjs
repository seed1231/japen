import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceUrl = process.env.PAGES_SOURCE_URL ?? 'http://localhost:8787/';
const outputDir = path.resolve(process.env.PAGES_OUTPUT_DIR ?? '_site');
const repository = process.env.GITHUB_REPOSITORY?.split('/').at(-1) ?? 'japen';
const basePath = process.env.PAGES_BASE_PATH ?? `/${repository}`;

if (outputDir === path.parse(outputDir).root) {
  throw new Error('Refusing to use the filesystem root as the Pages output directory.');
}

const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Unable to render ${sourceUrl}: ${response.status}`);

const prefixPublicPaths = (value) => {
  let result = value;
  for (const publicPath of ['/_next/', '/images/', '/kansai-itinerary-2026.pdf', '/kansai-rain-2026.pdf', '/rain/', '/favicon.svg']) {
    result = result.replaceAll(publicPath, `${basePath}${publicPath}`);
  }
  return result;
};

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(path.resolve('dist/client'), outputDir, { recursive: true });
await writeFile(path.join(outputDir, 'index.html'), prefixPublicPaths(await response.text()));
const rainResponse = await fetch(new URL('/rain/', sourceUrl));
if (!rainResponse.ok) throw new Error(`Rain page failed: ${rainResponse.status}`);
await mkdir(path.join(outputDir, 'rain'), { recursive: true });
await writeFile(path.join(outputDir, 'rain/index.html'), prefixPublicPaths(await rainResponse.text()).replaceAll('href="/"', `href="${basePath}/index.html"`));

for (const relativePath of ['_next/static']) {
  const directory = path.join(outputDir, relativePath);
  const files = [];
  const collect = async (current) => {
    const entries = await import('node:fs/promises').then(({ readdir }) =>
      readdir(current, { withFileTypes: true }),
    );
    for (const entry of entries) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) await collect(target);
      else if (/\.(?:js|css)$/.test(entry.name)) files.push(target);
    }
  };
  await collect(directory);
  for (const file of files) {
    const content = await readFile(file, 'utf8');
    const rewritten = prefixPublicPaths(content);
    if (rewritten !== content) await writeFile(file, rewritten);
  }
}

await writeFile(path.join(outputDir, '.nojekyll'), '');
console.log(`GitHub Pages bundle created at ${outputDir} with base path ${basePath}`);
