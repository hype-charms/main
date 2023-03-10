import { useEffect, useState } from "react"
import Image from 'next/image'

export const MainMobileComponent = (): JSX.Element => {
    const [count, setCount] = useState<number>(0);
    useEffect(() => {
        const interval = window.setInterval(() => {
            if (count < 2) {
                setCount(count + 1);
            } else {
                setCount(0)
            }
        }, 8000)
        return () => window.clearInterval(interval);
    })

    return (
        <>
            <main className="m-auto w-[30rem] max-w-[90vw] flex-row h-fit-content xl:hidden lg:hidden md:hidden sm:hidden flex" >
                <div className="w-full overflow-clip h-fit-content xl:p-12 lg:p-12 md:p-12 p-2 flex flex-col justify-center">
                    <h2 className="text-4xl text-stone-900">HYPE CHARMS</h2>
                    <h3 className="text-md text-stone-500">
                        Add some interdimensional flair to your accessories with five Rick and
                        Morty-themed charms! Includes characters and symbols from the show.
                        Durable resin and silver-tone keyring. Perfect for fans of the animated series.
                    </h3>
                    <div className="w-full h-fit-content max-h-80 overflow-clip flex items-center justify-center">
                        <Image src="/assets/main-backgrounds/rick-and-morty-grad.jpg" alt="" height={600} width={900} />
                    </div>
                </div>
            </main>
        </>
    )
}
