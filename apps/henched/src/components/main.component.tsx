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
                        <div className="shadow-[rgba(0,0,0,0.4)] shadow-md h-full overflow-clip">
                            <Image src={backgroundImages[count][1]} alt="" height={1400} width={1000} />
                        </div>
                        <div className="shadow-[rgba(0,0,0,0.4)] shadow-md h-full overflow-clip">
                            <Image src={backgroundImages[count][0]} alt="" height={1400} width={1000} />
                        </div>
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

const backgroundImages = [
    [
        "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1564277287253-934c868e54ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    ],
    [
        "https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1999&q=80"
    ],
    [
        "https://images.unsplash.com/photo-1614236224416-9a88c2e195e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=629&q=80",
        "https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    ],
]

const MainClasses = {
    main: `  
    shadow-[rgba(0,0,0,0.5)] relative flex justify-center items-center 
    xl:w-[100%] xl:h-[80vh] xl:ml-[0%]
    lg:w-[100%] lg:h-[80vh]
    md:w-[100%] md:h-[80vh]
    sm:w-[100%] sm:h-[80vh] sm:left-0
    `,
    image: (disabled: boolean) => ` 
    ${disabled ? ' opacity-50 ' : 'hover:-translate-y-[5%] '}
    filter drop-shadow-white drop-shadow-xl duration-500`,
    controlsContainer: ` 
    absolute bottom-0 flex flex-row justify-end items-center absolute z-30 gap-5 px-12
    xl:h-12 xl:w-full
    lg:h-12 lg:w-40
    md:h-12 md:w-40
    sm:h-12 sm:w-40
     `,
    backgroundContainer: ` 
    w-full h-full z-10 absolute flex items-center justify-center gap-4
    `,
    backgroundImage: (hover: boolean) =>
        `${hover ? 'blur' : 'blur-xl'} 
          scale-[105%] filter transition duration-1000 brightness-50
          `,
}