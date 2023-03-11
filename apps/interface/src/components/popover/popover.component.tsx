import Image from "next/image";
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { LayoverPositions } from "../../models";

interface PopoverProps {
    position: LayoverPositions,
    children: JSX.Element,
    title: string,
    closePopover: () => void
}
export const Popover: FC<PopoverProps> = ({ position, children, closePopover, title }): JSX.Element => {

    const [moduleClasses, setModuleClasses] = useState<ModuleClasses>();
    const [open, setOpen] = useState<boolean>(false);
    const getClasses = useModuleClasses();

    useEffect(() => { setTimeout(() => setOpen(true), 500) }, [])

    useEffect(() => setModuleClasses(getClasses(position)), [position, getClasses])

    const onClosePopover = useCallback(() => {
        setOpen(false);
        closePopover()
    }, [closePopover])

    if (!moduleClasses) {
        return <></>
    }
    return (
        <>
            <div className={moduleClasses.main(open)} >
                <header onClick={() => onClosePopover()} className={moduleClasses.header}>
                    <p>{title}</p>
                    <button
                        type="button"
                        aria-label="closes the pop up"
                        className="h-full w-fit"
                    >
                        <Image src="/eye.svg" alt="" height={20} width={20} />
                    </button>
                </header>
                <div className={moduleClasses.content}>
                    {children}
                </div>
            </div>
            <button
                type="button"
                aria-label="closes the pop up"
                className={moduleClasses.underlay}
                onClick={() => onClosePopover()}
            />
        </>
    )
}

export default function useModuleClasses(): (type: LayoverPositions) => ModuleClasses {
    const MainClassesTop: ModuleClasses = useMemo(() => ({
        main: (open) => `${open ? "opacity-100" : "opacity-0"} transition-opacity duration-300 w-[70vw] h-[60vh] bg-primary my-12 -translate-x-[50%] -translate-y-[50%] left-[50%] top-[45%] fixed z-50 `,
        underlay: ` w-screen h-screen fixed top-0 left-0 bg-secondary opacity-70 z-40`,
        header: ` h-12 flex flex-row justify-between items-center px-12 bg-white`,
        content: ` pb-4 px-4`
    }), [])
    const MainClassesBottomLeft: ModuleClasses = useMemo(() => ({
        main: (open) => `${open ? "bottom-[2rem]" : "-bottom-[50rem]"} bg-primary border-white border-2 shadow-xl shadow-[rgba(0,0,0,0.5)] max-w-[90vw] transition-all duration-300 h-fit-content w-[25rem] xl:left-[2rem] lg:left-[2rem] md:left-[2rem] left-[5vw] fixed z-50`,
        underlay: ` hidden`,
        header: ` h-12 flex flex-row justify-between items-center bg-stone-900 w-full px-4`,
        content: ` p-2`
    }), [])
    const MainClassesBottomRight: ModuleClasses = useMemo(() => ({
        main: (open) => `${open ? "bottom-[2rem]" : "-bottom-[50rem]"} bg-primary border-white border-2 shadow-xl shadow-[rgba(0,0,0,0.5)] max-w-[90vw] transition-all duration-300 h-fit-content w-[25rem] xl:right-[2rem] lg:right-[2rem] md:right-[2rem] right-[5vw] fixed z-50`,
        underlay: ` hidden`,
        header: ` h-12 flex flex-row justify-between items-center bg-stone-900 w-full px-4`,
        content: ` p-2`
    }), [])
    return useCallback((type) => {
        const allClasses = { 'middle': MainClassesTop, 'bottom-left': MainClassesBottomLeft, 'bottom-right': MainClassesBottomRight };
        return allClasses[type]
    }, [MainClassesTop, MainClassesBottomLeft])
}
interface ModuleClasses {
    main: (open: boolean) => string,
    underlay: string,
    header: string,
    content: string
}
