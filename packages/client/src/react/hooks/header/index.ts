import { useState, useEffect, useCallback } from "react";
import { NavigationDataProps } from "../../models";

export const useHeaderStateWithSnigleDropdowns = () => {
    const [dropdown, onSetDropdownMenu] = useState<number>(-1);
    const [windowLoaded, setWindowLoaded] = useState(false);
    const [screenPositionAtZero, setScreenPositionAtZero] = useState<boolean | null>(true);
    const scroller = () => setScreenPositionAtZero(window.scrollY < 100)

    useEffect(() => {
        setWindowLoaded(true);
        window.addEventListener('scroll', scroller);
        return () => window.removeEventListener('scroll', scroller)
    }, [])

    const setDropdownMenu = useCallback((value: number) => {
        onSetDropdownMenu(value)
    }, [])

    return { dropdown, windowLoaded, screenPositionAtZero, setDropdownMenu }
}

export const useHeaderStateWithMainDropdown = (navigation: NavigationDataProps[]) => {
    const [dropdown, onSetDropdownMenu] = useState<number>(-1);
    const [renderNavMenu, setRenderNavMenu] = useState<boolean>(false);
    const [screenPositionAtZero, setScreenPositionAtZero] = useState<boolean | null>(true);
    const scroller = () => setScreenPositionAtZero(window.scrollY < 100)


    useEffect(() => {
        setScreenPositionAtZero(window.scrollY < 100);
        window.addEventListener('scroll', scroller);
        return () => window.removeEventListener('scroll', scroller)
    }, [])

    useEffect(() => {
        setRenderNavMenu(dropdown >= 0 && navigation[dropdown].sub_routes !== undefined);
    }, [dropdown, navigation]);

    const setDropdownMenu = useCallback((value: number) => {
        onSetDropdownMenu(value);
    }, [])

    return { dropdown, renderNavMenu, screenPositionAtZero, setDropdownMenu }
}