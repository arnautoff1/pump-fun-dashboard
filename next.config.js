/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  // Добавляем env для переменных окружения, которые будут доступны на клиенте
  publicRuntimeConfig: {
    // Добавьте переменные окружения, которые должны быть доступны на клиенте
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // Обработка CORS для API
  async headers() {
    return [
      {
        // Применяем заголовки ко всем путям
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Разрешаем обработку изображений с доверенных доменов
  images: {
    domains: ['cdn.pump.fun', 'arweave.net', 'www.arweave.net'],
  },
  // Настройка переменных окружения
  env: {
    MAX_TOKEN_LIST_SIZE: process.env.MAX_TOKEN_LIST_SIZE || '1000',
  },
};

module.exports = nextConfig; 