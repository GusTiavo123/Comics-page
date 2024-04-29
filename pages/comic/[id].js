import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Head from "next/head"
import Image from "next/image"
import { Text } from '@nextui-org/react'
import Link from "next/link"

import { readFile, readdir, stat } from 'fs/promises'
import { basename } from "path"

export default function Comic({ img, alt, title, width, height, prevId, nextId, hasPrev, hasNext }){
    

    return <>
        <Head>
            <title>xkcd - Comic for developer</title>
            <meta name="description" content="Comics for developer"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header/>

        <main>
            <section className="max-w-lg mx-auto">
                <Text h1 className="text-3xl font-bold text-center mb-4 mt-6">{title}</Text>

                <div className="flex justify-center max-w-sm mx-auto">
                    <Image src={img} alt={alt} width={width} height={height} />
                </div>

                <Text h3 className="text-center mt-2">{alt}</Text>
                
                <div className="flex justify-between m-2 font-bold">
                    {hasPrev && (
                        <Link href={`/comic/${prevId}`}>⇦ Previous</Link>
                    )}
                    {hasNext && (
                        <Link href={`/comic/${nextId}`}>Next ⇨</Link>
                    )}
                </div>
            </section>
        </main>

    </>
}

export async function getStaticPaths(){
    const files = await readdir('./comics');

    const paths = files.map(file => {
        const id = basename(file, '.json');
        return {
            params: {
                id
            }
        }
    });

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }){
    const { id } = params;

    const comic = await readFile(`./comics/${id}.json`, 'utf-8');

    const idNumber = +id;
    const prevId = idNumber - 1;
    const nextId = idNumber + 1;

    const [prevResult, nextResult] = await Promise.allSettled([
        stat(`./comics/${prevId}.json`),
        stat(`./comics/${nextId}.json`)
    ]);

    const hasPrev = prevResult.status === 'fulfilled';
    const hasNext = nextResult.status === 'fulfilled';

    return{
        props: {
            ...JSON.parse(comic),
            prevId: hasPrev ? prevId : null,
            nextId: hasNext ? nextId : null,
            hasPrev,
            hasNext
        }
    }
}
