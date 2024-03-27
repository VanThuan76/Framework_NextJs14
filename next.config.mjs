import million from 'million/compiler';
import nextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    mdxRs: true,
  },
};

/**
 * Create a config wrapper required to integrate a modern Nextjs MDX support.
 * @see https://nextjs.org/docs/app/building-your-application/configuring/mdx
 */
const withMDX = createMDX({ options: { remarkPlugins: [remarkGfm] } });

/**
 * Create configuration wrapper required for using next-intl with React Server Components.
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
 */
const withNextIntl = nextIntlPlugin(
  // Specify a custom next-intl path
  './src/i18n.ts',
);
export default million.next(withNextIntl(withMDX(nextConfig)), {
  auto: { rsc: true },
});
// export default withNextIntl(withMDX(nextConfig));
