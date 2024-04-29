import Link from "next/link"

export default function TableFooter(){
    return <footer className="text-center mt-5 border-t p-5">
        <Link href='https://xkcd.com' target="_blank" rel="noopener noreferrer">
            All comics by xkcd.com
        </Link>
    </footer>
}