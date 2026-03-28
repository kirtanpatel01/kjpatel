import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kirtan Patel Portfolio',
    short_name: 'KJ_Patel',
    description: 'Personal portfolio of Kirtan Patel, a Full Stack Developer & Digital Craftsman.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
