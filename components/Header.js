import { Navbar, Text, Switch, useTheme, Input } from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import Link from "next/link";
import { MoonIcon, SunIcon } from "./Icon";

export default function Header() {
    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();

    return (
    <Navbar isBordered variant="static">
        <Navbar.Brand>
            <Link href="/" className="transation hover:opacity-80">
                <Text h1 className='font-bold'>Next<Text span className="font-light">xkcd</Text></Text>
            </Link>
        </Navbar.Brand>
        <Navbar.Content>
            <Navbar.Link href="/">Home</Navbar.Link>
            <Navbar.Item>
                <Input underlined placeholder="Search..."/>
            </Navbar.Item>
            <Navbar.Item>
                <Switch
                    iconOff={<SunIcon/>}
                    iconOn={<MoonIcon/>}
                    checked={isDark}
                    onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                />
            </Navbar.Item>
        </Navbar.Content>
    </Navbar>
    )
}
