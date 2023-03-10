import { FC } from "react"
import { useRouter } from 'next/router'

export interface ModuleProps {
    children: JSX.Element,
    title?: string,
    height?: string,
    href?: string
}
export const Module: FC<ModuleProps> = ({ children, title, height, href }): JSX.Element => {
    const router = useRouter()
    return (
        <div id={title?.split(' ').join('')} className="w-full h-fit-content min-w-[95vw] pt-4" >
            <h2
                className={`text-3xl text-slate-800 ${href && "hover:text-blue-500 hover:scale-105"}  text-center cursor-pointer transition-all duration-300`}
                onClick={() => href ? router.push(href) : ''}>
                {title}
            </h2>
            <section className={ModuleClasses.section(height)}>
                {children}
            </section>
        </div>
    )
}

const ModuleClasses = {
    section: (height: string | undefined) => ` ${height ?? 'h-fit-content'} w-full flex flex-row p-auto py-12`,
}