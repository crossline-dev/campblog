import { ImageResponse } from 'next/server'
import { getArticleBySlug } from '@/lib/newt'

export const runtime = 'edge'
export const revalidate = 10
export const alt = 'OGP画像'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

type Params = {
  params: { slug: string }
}

export default async function Image({ params: { slug } }: Params) {
  const article = await getArticleBySlug(slug)
  if (article) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundImage:
              'linear-gradient(135deg, #7dc7f8 10%, #027cd9 100%)',
            color: '#f3f3f3',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '3rem 4rem 2.5rem',
              backgroundColor: '#181b29',
              justifyContent: 'space-between',
              borderRadius: '10px',
              width: '100%',
              height: '90%',
            }}
          >
            <p style={{ fontSize: 60, fontWeight: 700 }}>{article.title}</p>
            <p style={{ fontSize: 40, fontWeight: 500 }}>CROSSLINE</p>
          </div>
        </div>
      ),
      { ...size }
    )
  } else {
    return new Response('Not Found', { status: 404 })
  }
}
