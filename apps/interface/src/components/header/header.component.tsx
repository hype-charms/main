import { FC, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAppSelector } from "../../+state";
import { flexCenterCol } from "../../styles";
import Image from "next/dist/client/image";
import { SearchComponent } from "./search.component";
import { MobileMenuComponent } from "../menu/menu.component";
import { CartProduct } from "../../models";
import { useMobileContext } from "../../context/mobile.context";
import Link from "next/link";

export const Header: FC<{ shrink?: boolean }> = ({ shrink }): JSX.Element => {

    const [showMenu, setShowMenu] = useState(false);
    const [screenPositionAtZero, setScreenPositionAtZero] = useState(true);
    const [count, setCount] = useState<number>(0);
    const cart = useAppSelector(state => state.cartReducer.cart.cartItems)
    const router = useRouter();

    const scroller = () => setScreenPositionAtZero(window.scrollY < 100)

    const mobile = useMobileContext()

    useEffect(() => {
        if (shrink) {
            window.addEventListener('scroll', scroller);
        } else {
            setScreenPositionAtZero(false);
        }
        return () => window.removeEventListener('scroll', scroller)
    }, [])

    useEffect(() => {
        const interval = window.setInterval(() => {
            if (count < 2) {
                setCount(count + 1);
            } else {
                setCount(0)
            }
        }, 8000)
        return () => window.clearInterval(interval);
    }, [])

    return (
        <>
            <header
                className={HeaderClasses.headerContainer(screenPositionAtZero)}>
                <nav className={HeaderClasses.navContainer}>
                    <div onClick={() => router.push('/')} className={HeaderClasses.mainLogo(screenPositionAtZero, showMenu)} >
                        <Image src="/logo-head-100x100.png" alt="" height={screenPositionAtZero ? 45 : 40} width={screenPositionAtZero ? 40 : 37} />
                    </div>
                </nav>
                <div className={HeaderClasses.searchContainer}>
                    <SearchComponent screenPositionAtZero={screenPositionAtZero} items={[]} />
                </div>
                <div className={HeaderClasses.controls}>
                    {!mobile ? <DesktopCartButton
                        cart={cart}
                        screenPositionAtZero={screenPositionAtZero} />
                        :
                        <MobileCartButton
                            cart={cart}
                            screenPositionAtZero={screenPositionAtZero} />
                    }
                    {mobile && <MobileMenuButton
                        showMenu={showMenu}
                        setShowMenu={event => setShowMenu(event)} />
                    }
                </div>
            </header>
            <div className={HeaderClasses.underlay(showMenu)} />
            {mobile && showMenu && <MobileMenuComponent showMenu={showMenu} closeMenu={() => setShowMenu(false)} />}
        </>
    )
}

interface MobileMenuButtonProps {
    setShowMenu: (val: boolean) => void
    showMenu: boolean;
}
const MobileMenuButton: FC<MobileMenuButtonProps> = ({ setShowMenu, showMenu }) => {
    const onShowMenu = useCallback(() => setShowMenu(!showMenu), [setShowMenu])
    return (
        <button className={HeaderClasses.hamburgerContainer} onClick={() => onShowMenu()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path className="fill-primary" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
        </button>
    )
}

interface MobileCartButtonProps {
    cart: CartProduct[], screenPositionAtZero: boolean
}
const MobileCartButton: FC<MobileCartButtonProps> = ({ cart, screenPositionAtZero }) => {
    return (
        <Link href="/checkout" >
            <span className={HeaderClasses.cartButton}>
                <div className={` ${!screenPositionAtZero ? 'saturate-0 hover:saturate-100' : 'saturate-100'} flex flex-col items-center justify-center transition-all duration-300 h-1/2 w-12`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path className={`fill-secondary-light`} d="M160 112v48H288V112c0-35.3-28.7-64-64-64s-64 28.7-64 64zm-48 96H48V464H400V208H336v56 24H288V264 208H160v56 24H112V264 208zm0-48V112C112 50.1 162.1 0 224 0s112 50.1 112 112v48h64 48v48V464v48H400 48 0V464 208 160H48h64z" />
                    </svg>
                </div>
            </span>
        </Link>
    )
}

interface DesktopCartButtonProps {
    cart: CartProduct[], screenPositionAtZero: boolean
}
const DesktopCartButton: FC<DesktopCartButtonProps> = ({ cart, screenPositionAtZero }) => {
    return (
        <Link href="/checkout">
            <div className={HeaderClasses.cartButton} >
                <div className={` ${!screenPositionAtZero ? 'saturate-0 hover:saturate-100' : 'saturate-100'} flex flex-col items-center justify-center transition-all duration-300 h-1/2 w-full`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path className={`fill-secondary-light`} d="M160 112v48H288V112c0-35.3-28.7-64-64-64s-64 28.7-64 64zm-48 96H48V464H400V208H336v56 24H288V264 208H160v56 24H112V264 208zm0-48V112C112 50.1 162.1 0 224 0s112 50.1 112 112v48h64 48v48V464v48H400 48 0V464 208 160H48h64z" />
                    </svg>
                </div>
                <div><p className="text-sm text-secondary-light">{cart?.length} Charms</p></div>
            </div>
        </Link>
    )
}

const HeaderClasses = {
    cartButton: `
    h-12 w-1/2 flex flex-col justify-center items-center cursor-pointer
    `,
    currency: (screenPositionAtZero: boolean) => `${screenPositionAtZero ? 'text-primary' : 'text-secondary-text'}
    h-12 rounded dark:bg-secondary font-semibold focus:border-stone-900 focus:border focus:ring-stone-900 w-[100%]
    xl:pl-3
    lg:px-0
    md:pl-3
    sm:pl-3
    `,
    hamburgerContainer: ` h-full w-6
    xl:hidden
    lg:hidden 
    md:block
    sm:block
    `,
    controls: `
    h-full flex flex-row justify-evenly items-center pr-6 gap-2
    xl:w-2/6
    lg:w-2/6
    md:w-3/6
    sm:w-3/6
    `,
    searchContainer: `
    w-4/6
    xl:block
    lg:block
    hidden
        `,
    navContainer: `
     w-2/6 h-full  text-lg flex justify-between items-center
     xl:w-1/6 xl:px-12
     lg:w-[27%] lg:px-12
     md:w-[27%] md:px-4
     sm:w-[40%] sm:px-4
     w-[40%] px-0
     `,
    eventHeader: `
    relative top-0 w-screen max-h-8 bg-secondary-light hover:bg-primary cursor-pointer z-50
    ` + flexCenterCol,
    bottomNav: `
     w-1/3 flex justify-evenly items-center
     `,
    bottomNavContainer: `
     h-12 w-screen bg-primary bg-secondary-dark shadow-md sticky top-0 z-30 flex justify-center items-center text-secondary-light
     `,
    headerContainer: (top: boolean) => `
    ${top ? 'h-24 text-primary' : 'h-12 text-secondary-text'} shadow-[rgba(0,0,0,0.3)]
     sticky top-0 flex flex-row items-center justify-between m-auto w-screen z-40 bg-secondary-dark shadow
     xl:px-20 
     lg:px-0 
     md:px-2
     sm:px-0
     `,
    underlay: (show: boolean) => `
    ${show ? ' opacity-20  fixed' : ' opacity-0 hidden'}
     top-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] z-30
     `,
    mainLogo: (top: boolean, hover: boolean) => `
    ${top ? " m-auto w-[18rem] h-full  h-12" : "saturate-0 h-12 w-full sticky m-auto"}
    ${hover ? "saturate-100" : ""} 
    cursor-pointer flex items-center justify-center transition-all duration-500 `
}