import { FC } from "react"
import { EmailListModule } from '../emails/email-list-modal'
import { useRouter } from 'next/router'

export const FooterComponent: FC = (): JSX.Element => {

    const router = useRouter()
    return (
        <footer className={FooterClasses.footer}>
            <div className={FooterClasses.mainContainer}>
                <section className={`${FooterClasses.section} w-[35rem]`}>
                    <div className="opacity-80 h-full flex flex-col justify-center items-center w-full">
                        <h2 className="text-6xl text-accent-one text-left w-full">HYPE</h2><br />
                        <h2 className="text-6xl text-accent-two text-left w-full">CHARMS</h2>
                    </div>
                </section>
                <section className={`${FooterClasses.section} flex flex-row justify-evenly items-start flex-wrap w-[40rem]`}>
                    {navigationData.map(({ listItems, title }, idx) => <span className="xl:w-1/2 lg:w-1/2 md:w-1/2 w-full " key={idx}>
                        <ul className="min-w-[10rem] w-full text-left">
                            <h3 className="text-xl w-full text-left">{title}</h3>
                            {listItems.map(({ title, href }, idx) => <li key={idx} className="cursor-pointer hover:text-stone-300 w-full text-left" onClick={() => router.push(href)}>{title}</li>)}
                        </ul>
                    </span>)}
                </section>
                <section className={`${FooterClasses.section} w-[35rem]`}>
                    <EmailListModule size="small" description="By signing up to our mail list you will receive special offers and be notified of our latest items" title="Join our mail list" />
                </section>
            </div>
            <div className="flex flex-row justify-center items-center px-8">
                <p>Copyright © 2023 Tailwind Labs Inc.</p>
            </div>
        </footer>
    )
}
const FooterClasses = {
    footer: `w-full h-fit-content z-40 flex flex-col items-center bg-secondary-dark text-secondary-text pb-8`,
    section: `  max-w-[90vw] px-3 justify-center items-center filter h-[16rem]`,
    mainContainer: ` flex h-fit-content flex-row flex-wrap justify-center items-center w-full py-8`
}
const navigationData = [
    {
        title: 'Join us', listItems: [{
            title: 'Facebook', href: '/'
        },
        {
            title: 'Twitter', href: '/'
        },
        {
            title: 'Instagram', href: '/'
        }]
    },
    {
        title: 'How can we help?', listItems: [{
            title: 'Deliveries', href: '/'
        },
        {
            title: "FAQ's", href: '/'
        },
        {
            title: 'Careers', href: '/'
        }]
    },
    {
        title: '', listItems: [{
            title: '', href: '/'
        }]
    }
]