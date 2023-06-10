import { PackMetadata, ProductMetadata, StripeItemReference } from "@hype-charms/types";
import Image from "next/image"
import { FC, useEffect, useState } from "react"

export interface MainComponentProps {
    packs: StripeItemReference<PackMetadata>[]
    products: StripeItemReference<ProductMetadata>[]
}
export const MainComponent: FC<MainComponentProps> = (): JSX.Element => {

    const [count, setCount] = useState<number>(0);
    const [hover, setHover] = useState<boolean>(false);

    useEffect(() => {
        const interval = window.setInterval(() => {
            if (!hover) {
                if (count < 2) {
                    setCount(count + 1);
                } else {
                    setCount(0)
                }
            }
        }, 8000)
        return () => window.clearInterval(interval);
    })

    return (
        <>
            <main className="xl:w-[100%] lg:w-[100%] xl:flex lg:flex md:flex sm:flex hidden m-auto flex-row" >
                <section id="main" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={MainClasses.main} >
                    <div id="background-container" className={MainClasses.backgroundContainer}>
                        <div className={`shadow-[rgba(0,0,0,0.4)] shadow-md h-full overflow-clip flex-1 ${backgroundImageIndexes[count]} bg-no-repeat bg-cover opacity-20`} />
                    </div>
                    <div className={MainClasses.controlsContainer}>
                        {[0, 1, 2].map(x => <button
                            className={`${count === x ? "opacity-100" : "opacity-30"} bg-primary flex justify-center items-center rounded-3xl w-5 h-5 p-1 shadow-[rgba(0,0,0,0.5)] shadow-inner`}
                            type="button"
                            name={`go to slide ${x}`}
                            aria-label={`go to slide ${x}`}
                            key={x}
                            onClick={() => setCount(x)} />)}
                    </div>
                </section>
            </main>
        </>
    )
}

const backgroundImageIndexes = [
    'bg-[url(https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)]',
    'bg-[url(/assets/main-backgrounds/rick-and-morty.jpg)]',
    'bg-[url(https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)]'
]

const MainClasses = {
    main: `  
    shadow-[rgba(0,0,0,0.5)] relative flex justify-center items-center bg-[rgba(30,30,30)]
    xl:w-[100%] xl:h-[80vh] xl:ml-[0%]
    lg:w-[100%] lg:h-[80vh]
    md:w-[100%] md:h-[80vh]
    sm:w-[100%] sm:h-[80vh] sm:left-0
    `,
    image: (disabled: boolean) => ` 
    ${disabled ? ' opacity-50 ' : 'hover:-translate-y-[5%] '}
    filter drop-shadow-white drop-shadow-xl duration-500 h-fit`,
    controlsContainer: ` 
    absolute bottom-0 flex flex-row justify-center items-center bg-secondary bg-opacity-40 absolute left-0 right-0 z-30 gap-5 py-2
     `,
    backgroundContainer: ` 
    w-full h-full z-10 absolute flex items-center justify-center gap-4 h-fit
    `,
    backgroundImage: (hover: boolean) =>
        `${hover ? 'blur' : 'blur-xl'} 
          scale-[105%] filter transition duration-1000 brightness-50
          `,
}