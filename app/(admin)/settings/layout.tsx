import Link from "next/link";
import {Package2} from "lucide-react";

const LayoutSetting = ({children}: {children: React.ReactNode}) => {

    return (
        <div className={"container mx-auto max-w-7xl"}>
            <h1 className="font-semibold text-2xl">Pengaturan</h1>
            <div className="flex lg:flex-row flex-col lg:gap-x-4 gap-x-0 mt-8">
                <div className="lg:w-[252px] w-full">
                    <div
                        className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav
                            className="grid text-sm text-muted-foreground"
                        >
                            <Link href="#" className="font-semibold text-primary hover:bg-gray-100 p-2">
                                Umum
                            </Link>
                            <Link href="#" className="hover:bg-gray-100 p-2">Akun</Link>
                            <Link href="#" className="hover:bg-gray-100 p-2">Keamanan</Link>
                        </nav>
                    </div>
                </div>
                <main className="w-full">{children}</main>
            </div>
        </div>
    )
}

export default LayoutSetting