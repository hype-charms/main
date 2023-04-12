import { StripeItemReference } from "@hype-charms/types";
import { useRouter } from "next/dist/client/router";
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import { useNavigateToProduct } from "../../+state/hooks";
import { PackMetadata, ProductMetadata } from "../../models";

export interface MainComponentProps {
    packs: StripeItemReference<PackMetadata>[]
    products: StripeItemReference<ProductMetadata>[]
}
export const MainComponent: FC<MainComponentProps> = ({ products, packs }): JSX.Element => {

    const router = useRouter();
    const [count, setCount] = useState<number>(0);
    const [hover, setHover] = useState<boolean>(false);
    const navigateToProduct = useNavigateToProduct();

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

    const validateInventory = () => {
        if (products.length > 0) {
            return products
                .filter(x => x.metadata?.pack === packs[count]?.metadata?.packName)
                .some(product => !product.inventory || product.inventory === 0);
        }
    }

    return (
        <>
            <div className="xl:w-[100%] lg:w-[100%] xl:flex lg:flex md:flex sm:flex hidden m-auto flex-row h-4/6 " >
                <main id="main" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={MainClasses.main} >
                    <div id="background-container" className={MainClasses.backgroundContainer}>
                        <div id="text-container" className={MainClasses.textContainer}>
                            <h2 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-3xl text-primary">{packs[count]?.name?.toUpperCase()}</h2>
                            <p className="sm:text-xl md:text-xl lg:text-xl xl:text-xl h-fit text-primary">{packs[count]?.description}</p>
                            <button
                                type="button"
                                aria-label={`opens the product page ${packs[count]?.name}`}
                                disabled={validateInventory()}
                                onClick={() => navigateToProduct(packs[count]?.id)}
                                className={` bg-secondary-dark shadow
                                    ${validateInventory() ? '' : ''}
                                     text-2xl text-primary py-4 w-full rounded duration-500 filter transition-all sm:hidden md:hidden lg:block xl:block`}>
                                <h3 className={`${validateInventory() ? '' : 'hover:scale-[110%] '} duration-500 transition-all`}>{validateInventory() ? "SOLD OUT" : "VIEW PACK"}</h3>
                            </button>
                        </div>
                        <div id="text-small" className={MainClasses.textContainerSmall}>
                            <h2 className="text-6xl text-primary">{packs[count]?.name?.toUpperCase()}</h2>
                            <p className="text-xl h-26 text-primary">{packs[count]?.description}</p>
                        </div>
                    </div>
                    <div id="accessory-pack" className={MainClasses.accessoryPack}>
                        <div id="accessory-pack-container" className={MainClasses.accessoryPackContainer}>
                            {products.length > 0 && products.filter(x => x.metadata?.pack === packs[count]?.metadata?.packName).slice(0, 4).map((item) => {
                                return <button
                                    id={item.name}
                                    type="button"
                                    key={item.id}
                                    disabled={!item.inventory || item.inventory === 0}
                                    aria-label={`opens the product page for ${item.name}`}
                                    className={`
                                    ${MainClasses.singleItemContainer}
                                     ${item?.name?.split('').join(' ')}
                                     `}
                                    onClick={() => navigateToProduct(item.id)}>
                                    <div className="w-full flex items-center justify-center">
                                        <Image
                                            className={MainClasses.image(!item.inventory || item.inventory === 0)}
                                            src={item?.images ? item?.images[0] ?? '/' : '/'}
                                            alt=""
                                            height={130}
                                            width={130} />
                                    </div>
                                    <h2 className={`${MainClasses.singleItemTitle} text-primary`}>{item.name}</h2>
                                </button>
                            })}
                        </div>
                    </div>
                    {packs[count]?.metadata?.packName && <><div className="xl:block lg:block md:hidden sm:hidden -z-10 absolute ">
                        <Image
                            priority
                            className={`${MainClasses.backgroundImage(hover)} `}
                            src={backgroundImages[packs[count]?.metadata?.packName]?.src ?? ''}
                            alt=""
                            width={2000}
                            height={1900}
                            objectFit="cover"
                        />
                    </div>
                        <div className="xl:hidden lg:hidden md:block sm:block block -z-10 absolute ">
                            <Image
                                priority
                                className={`${MainClasses.backgroundImage(hover)} `}
                                src={backgroundImages[packs[count]?.metadata?.packName]?.src ?? ''}
                                alt=""
                                width={1000}
                                height={1600}
                                objectFit="cover"
                            />
                        </div></>}
                    <div className={MainClasses.controlsContainer}>
                        {[0, 1, 2].map(x => <button
                            type="button"
                            name={`go to slide ${x}`}
                            aria-label={`go to slide ${x}`}
                            key={x}
                            onClick={() => setCount(x)}>
                            <Image className={`${x === count ? "" : "opacity-50"} `} alt={x.toString()} src="/white-eye.svg" height={20} width={20} /></button>)}
                    </div>
                    <button
                        type="button"
                        aria-label={`opens the product page ${packs[count]?.name}`}
                        onClick={() => navigateToProduct(packs[count]?.id)}
                        className={`text-2xl py-4 absolute bg-secondary-dark sm:bottom-28 md:bottom-16 w-[80%] rounded duration-500 filter transition-all sm:block md:block lg:hidden xl:hidden`}
                    >
                        <h3 className="hover:scale-[110%] text-secondary-light duration-500 transition-all">VIEW PACK</h3>
                    </button>
                </main>
                <section className={MainClasses.section}>
                    <div className={`${MainClasses.sectionContainer} pb-1`}>
                        <button
                            type="button"
                            aria-label="opens the page for all products"
                            onClick={() => router.push('/products')}
                            className={`bg-secondary-dark ${MainClasses.rightHandButtons}`}
                        >
                            <h3 className="text-2xl text-primary">ALL ITEMS</h3>
                        </button>
                    </div>
                    <div className={`${MainClasses.sectionContainer} pt-1`}>
                        <button className={`bg-secondary ${MainClasses.rightHandButtons}`}>
                            <h3 className="text-2xl text-primary">SALE</h3>
                        </button>
                    </div>
                </section>
            </div>
        </>
    )
}

const backgroundImages: { [k in string]: { src: string } } = {
    'naruto-pack': { src: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
    'rick-and-morty': { src: "/assets/main-backgrounds/rick-and-morty.jpg" },
    'kaws-pack': { src: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" }
}

const MainClasses = {
    main: `  
    shadow-[rgba(0,0,0,0.5)] shadow-lg relative overflow-clip flex justify-center items-center shadow bg-[rgba(0,0,0,0.6)] 
    xl:w-[80%] xl:h-[60vh] xl:ml-[0%]
    lg:w-[100%] lg:h-[60vh]
    md:w-[100%] md:h-[60vh]
    sm:w-[100%] sm:h-[60vh] sm:left-0
    `,
    section: `  
    flex flex-col justify-evenly items-center transition-color duration-500 
    xl:w-[20%] xl:h-[60vh] xl:block
    lg:w-[25%] lg:h-[60vh] lg:block
    md:hidden md:h-[70vh]
    sm:hidden sm:h-[70vh]
    `,
    rightHandButtons: `
     text-white opacity-80 hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center cursor-pointer
     shadow-lg shadow-[rgba(0,0,0,0.5)]
     xl:h-full xl:w-full 
     lg:h-full lg:w-full 
     `,
    textContainer: ` 
    relative text-white font-semibold flex flex-col justify-between
    xl:left-[35%] xl:-top-[25%] xl:w-[30rem] xl:flex xl:h-[60%]
    lg:-left-[25%] lg:-top-[9%] lg:w-[40%] lg:flex lg:h-fit
    md:hidden
    sm:flex sm:-top-20 sm:p-0 sm:h-[40%] sm:w-[80%]
    `,
    textContainerSmall: `  
    relative text-white font-semibold flex flex-col items-start justify-evenly w-full h-full
    xl:hidden
    lg:hidden 
    md:block md:relative md:px-20 md:py-6
    sm:hidden 
    `,
    accessoryPackContainer: `
     flex flex-row justify-center items-center max-w-[100vw]
    xl:flex-wrap xl:flex
    lg:flex-wrap lg:flex
    md:flex-nowrap md:flex
    sm:hidden
    `,
    accessoryPack: `
     z-10 absolute flex flex-col justify-center items-center
    xl:translate-x-[70%] xl:right-[40%] xl:top-[0%] xl:translate-y-[4%] 
    lg:translate-x-[70%] lg:right-[40%] lg:top-[0%] lg:translate-y-[10%] 
    md:translate-y-[20%]
    `,
    singleItemContainer: ` 
    cursor-pointer 
    xl:mx-20 xl:my-6 xl:w-40
    lg:mx-8 lg:my-3 lg:w-40
    md:mx-12 md:my-8 md:w-20
    sm:mx-20 sm:w-5/6 sm:my-0
    `,
    singleItemTitle: ` text-white text-2xl font-semibold text-center w-full lg:text-xl md:text-xl`,
    image: (disabled: boolean) => ` 
    ${disabled ? ' opacity-50 ' : 'hover:-translate-y-[5%] '}
    filter drop-shadow-white drop-shadow-xl duration-500`,
    controlsContainer: ` 
    absolute bottom-0 flex flex-row justify-evenly items-center absolute z-30
    xl:h-12 xl:w-40
    lg:h-12 lg:w-40
    md:h-12 md:w-40
    sm:h-12 sm:w-40
     `,
    backgroundContainer: ` 
    w-full h-full z-10 absolute flex items-center justify-center 
    xl:translate-x-[0%] xl:right-[60%] xl:-top-[10%] xl:translate-y-[35%]
    `,
    backgroundImageWrapper: `
     z-0 absolute w-full h-full bg-stone-900 opacity-50 
     `,
    sectionContainer: `
    w-full h-1/2 pl-2
    `,
    backgroundImage: (hover: boolean) =>
        `${hover ? 'blur' : 'blur-xl'} 
          scale-[105%] filter transition duration-1000 brightness-50
          `,
    controlButton: (active: boolean) =>
        `${active ? 'bg-opacity-50' : ' '}
         bg-white  border-solid border-white border-2 rounded-[50%]
          xl:w-4 xl:h-4
          lg:w-4 lg:h-4
          md:w-4 md:h-4
          sm:w-4 sm:h-4
           `,
}