/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/vult': { page: '/vult' },
      '/bolt': { page: '/bolt' },
      '/walletDetails': { page: '/walletDetails' },
      '/allocationDetails': { page: '/allocationDetails' },
    }
  },

  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/wordlists\/(?!english)/,
        contextRegExp: /bip39\/src$/,
      })
    )

    return config
  },
}

module.exports = nextConfig
