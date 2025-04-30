// next.config.js

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'npgwuhpfhhgitqrtgeca.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
