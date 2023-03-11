import { FC, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"

export const MobileMenuComponent: FC<{ showMenu: boolean, closeMenu: () => void }> = ({ showMenu, closeMenu }): JSX.Element => {
    const onCloseMenu = useCallback(() => closeMenu(), [closeMenu])
    return (
        <div className={CartClasses.wrapper(showMenu)}>
            <div className="flex flex-row items-center justify-between w-full px-3">
                <h2 className="text-xl">Hype Charms</h2>
                <button
                    type="button"
                    aria-label="closes the navigation menu"
                    onClick={() => onCloseMenu()}>
                    <Image src="/white-eye.svg" alt="" height={20} width={20} />
                </button>
            </div>
            <div className={CartClasses.navContainer}>
                {navigation.map((data, idx) => <Link key={idx} href={data.href}><span
                    id="results"
                    className="flex flex-row justify-between items-center  bg-stone-900 p-3 hover:bg-stone-800 cursor-pointer"
                ><p className="font-semibold opacity-90">{data.items}</p></span></Link>)}
            </div>
        </div>
    )
}

const CartClasses = {
    wrapper: (showCart: boolean) => `${showCart ? ' left-0 bottom-0' : 'left-0 -bottom-[100vh]'}
     shadow-xl px-5  duration-300 transition-all fixed z-50 shadow right-0 bg-secondary-dark text-primary py-8 flex flex-col items-start justify-start gap-3 px-5
     w-screen bottom-0 h-[80vh]
     `,
    navContainer: ` flex flex-col items-start justify-start`
}

const navigation = [
    { type: 'navigation', items: ['Home'], href: '/' },
    { type: 'navigation', items: ['All products'], href: '/products' },
    // { type: 'navigation', items: ['Charms'], href: '/products/?type=charms' },
    // { type: 'navigation', items: ['Charm packs'], href: '/products/?type=packs' },
    // { type: 'navigation', items: ['Key rings'], href: '/products/?type=charms' },
]