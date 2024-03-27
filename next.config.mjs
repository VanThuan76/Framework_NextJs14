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

/**
 * Extremely fast and lightweight optimizing compiler that make components up to 70% faster..
 * @see https://million.dev/docs/introduction
 */
const withMillion = config => {
  const millionConfig = {
    auto: true,
  };

  return million({ ...config, ...millionConfig });
};

export default withMillion(withNextIntl(withMDX(nextConfig)));
