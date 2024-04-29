import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Text } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { readdir, readFile } from 'fs/promises'

export default function Home({latestComics}) {
  return (
    <>
      <Head>
        <title>xkcd - Comic for developer</title>
        <meta name="description" content="Comics for developer"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main>
        <Text h2 className='text-3xl font-bold text-center mb-10 mt-6'>Latest Comics</Text>

        <section className='grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3'>
        {latestComics.map((comic) => {
          return (
            
              <Link key={comic.id} href={`/comic/${comic.id}`} className='mb-8'>
                <Text h3 className='text-sm font-semibold text-center'>{comic.title}</Text>
                <div key={comic.id} className="flex items-center justify-center h-full">
                  <Image 
                    width={comic.width} 
                    height={comic.height} 
                    src={comic.img} 
                    alt={comic.alt}
                  />
                </div>
              </Link>
          )
        })}
        </section>
      </main>
      <Footer/>
    </>
  )
}

export async function getStaticProps() {
  const files = await readdir('./comics');
  const latestComicsFiles = files.slice(-9);

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await readFile(`./comics/${file}`, 'utf-8')
    return JSON.parse(content);
  });  

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      latestComics
    }
  }
}
