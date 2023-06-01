import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useThemeContext } from '../../../context';
import { BaseNavData, HypeTheme, NavigationDataProps } from '../../../models';
import { EventheaderComponent } from '../eventheader.component';
import { SubheaderComponent } from '../subheader.component';
import {
    ChildLinkDark, ChildLinkLight, FlexGrowLink, HeaderContainer, HeaderControls, HeaderWrapper,
    LinkMenuSection, LinkSection, LogoContainer, MainLinkTextDark, MainLinkTextLight, MenuContainer,
    NavigationContainer, NavigationMenuContainer, StandardLink, StyledControlIcon,
    SubLinkTextLight
} from './template';

export interface HeaderComponentSingleDropdownsProps {
    header_content: { logo: string; navigation: NavigationDataProps[] };
    subheader_content?: { navigation: BaseNavData[] },
    eventheader_content?: { navigation: BaseNavData[] },
}
export const HeaderComponentSingleDropdowns: FC<HeaderComponentSingleDropdownsProps> = ({ header_content, subheader_content, eventheader_content }) => {

    const [dropdown, setDropdownMenu] = useState<number>(-1);
    const theme = useThemeContext();
    const [screenPositionAtZero, setScreenPositionAtZero] = useState<boolean | null>(null);
    const scroller = () => setScreenPositionAtZero(window.scrollY < 100)

    useEffect(() => {
        window.addEventListener('scroll', scroller);
        return () => window.removeEventListener('scroll', scroller)
    }, [])

    return (
        <>
            <HeaderWrapper theme={theme} position={theme?.ui_theme.header.position}>
                {eventheader_content && <EventheaderComponent visible={!screenPositionAtZero} eventheader_content={eventheader_content} />}
                <HeaderContainer theme={theme} position={'static'} top={screenPositionAtZero}>
                    <LogoContainer top={!screenPositionAtZero} theme={theme}>
                        <i className={header_content.logo} />
                    </LogoContainer>
                    {header_content.navigation && <NavigationContainer theme={theme}>
                        {!header_content.navigation.some(x => x.sub_routes !== undefined) ? header_content.navigation.map(({ href, title }, idx) => {
                            // renders when no sub routes are defined
                            return <StandardLink theme={theme} key={idx} href={href}><MainLinkTextDark theme={theme}>{title}</MainLinkTextDark></StandardLink>
                        }) : header_content.navigation.map(({ href, title, sub_routes }, idx) => {
                            // renders when sub routes are defined
                            return (
                                <>
                                    <LinkSection id="link section" theme={theme}>
                                        <FlexGrowLink id="link" theme={theme} key={idx} href={href} onMouseEnter={() => setDropdownMenu(idx)}>
                                            {screenPositionAtZero ?
                                                <MainLinkTextDark theme={theme}>{title}</MainLinkTextDark> :
                                                <MainLinkTextLight style={{ opacity: "70%" }} theme={theme}>{title}</MainLinkTextLight>}
                                        </FlexGrowLink>
                                        <div style={{ paddingTop: "0.5rem" }}>
                                            <NavigationMenuContainer active={idx === dropdown} theme={theme}>
                                                {dropdown === idx && sub_routes?.map(({ href, title, childRoutes }, idx) => {
                                                    return (
                                                        <ul key={idx}><StandardLink href={href} >
                                                            <SubLinkTextLight theme={theme}>{title}</SubLinkTextLight>
                                                        </StandardLink>
                                                            <ul>
                                                                {childRoutes?.map(({ title, href }, idx2) => <li key={idx2}>
                                                                    <StandardLink theme={theme} href={href}>{
                                                                        screenPositionAtZero ?
                                                                            <ChildLinkDark theme={theme}>{title}</ChildLinkDark> :
                                                                            <ChildLinkLight theme={theme}>{title}</ChildLinkLight>
                                                                    }</StandardLink>
                                                                </li>)}
                                                            </ul>
                                                        </ul>
                                                    )
                                                })}
                                            </NavigationMenuContainer>
                                        </div>
                                    </LinkSection>
                                </>
                            )
                        })}
                    </NavigationContainer>}
                    <HeaderControlsComponent top={screenPositionAtZero} theme={theme} />
                </HeaderContainer>
                {subheader_content !== null && <SubheaderComponent visible={!screenPositionAtZero} menuActive={dropdown > -1} subheader_content={subheader_content} />}
            </HeaderWrapper>
            <PopupUnderlay onMouseEnter={() => setDropdownMenu(-1)} active={dropdown > -1} theme={theme} />
        </>
    )
}

const PopupUnderlay = styled.div(({ theme, active }: { theme: HypeTheme, active: boolean }) => `
opacity: ${active ? "20%" : "0%"};
background-color: black;
height: 100vh;
width: 100vw;
position: fixed;
top: 0;
left: 0;
transition: all 1s;
z-index: ${active ? "30" : "-10"};
`);

export interface HeaderComponentMainDropdown {
    header_content: { logo: string; navigation: NavigationDataProps[] };
    subheader_content?: { navigation: BaseNavData[] },
    eventheader_content?: { navigation: BaseNavData[] },
}
export const HeaderComponentMainDropdown: FC<HeaderComponentMainDropdown> = ({ header_content, subheader_content, eventheader_content }) => {

    const theme = useThemeContext();
    const [dropdown, setDropdownMenu] = useState<number>(-1);
    const [renderNavMenu, setRenderNavMenu] = useState<boolean>(false);
    const [screenPositionAtZero, setScreenPositionAtZero] = useState<boolean | null>(true);
    const scroller = () => setScreenPositionAtZero(window.scrollY < 100)


    useEffect(() => {
        setScreenPositionAtZero(window.scrollY < 100);
        window.addEventListener('scroll', scroller);
        return () => window.removeEventListener('scroll', scroller)
    }, [])

    useEffect(() => {
        setRenderNavMenu(dropdown >= 0 && header_content.navigation[dropdown].sub_routes !== undefined);
    }, [dropdown, header_content.navigation]);

    return (
        <>

            <HeaderWrapper theme={theme} position={theme?.ui_theme.header.position}>
                {eventheader_content && <EventheaderComponent visible={!screenPositionAtZero} eventheader_content={eventheader_content} />}
                <HeaderContainer theme={theme} position={"static"} top={screenPositionAtZero}>
                    <LogoContainer theme={theme} top={screenPositionAtZero}>
                        {/* <i className={header_content.logo} /> */}
                        <h2 style={{
                            fontSize: "35px",
                            color: !screenPositionAtZero ? theme?.colors["primary-text"] : theme?.colors["primary-text-light"],
                            // @ts-ignore 
                            fontFamily: theme?.fontFamily.mono ?? ""
                            // @ts-ignore
                        }}>{header_content.brandName}</h2>
                    </LogoContainer>
                    {header_content.navigation && <NavigationContainer theme={theme}>
                        <>
                            {header_content.navigation.map(({ href, title }, idx) => {
                                return <StandardLink onMouseEnter={() => setDropdownMenu(idx)} theme={theme} key={idx} href={href}>{
                                    screenPositionAtZero ?
                                        <MainLinkTextDark theme={theme}>{title}</MainLinkTextDark> :
                                        <MainLinkTextLight style={{ opacity: "70%" }} theme={theme}>{title}</MainLinkTextLight>
                                }</StandardLink>
                            })}
                        </>
                    </NavigationContainer>}
                    <HeaderControlsComponent top={screenPositionAtZero} theme={theme} />
                </HeaderContainer>
                {subheader_content !== null && <SubheaderComponent visible={!screenPositionAtZero} menuActive={renderNavMenu} subheader_content={subheader_content} />}
                <MenuContainer active={renderNavMenu} theme={theme}>
                    {header_content.navigation[dropdown]?.sub_routes?.map(({ href, title, childRoutes }, idx) => {
                        return (
                            <>
                                <LinkMenuSection key={idx} theme={theme}>
                                    <StandardLink id="link" theme={theme} href={href}>
                                        <MainLinkTextLight theme={theme}>{title}</MainLinkTextLight>
                                    </StandardLink>
                                    <ul style={{ color: theme?.colors["secondary-light"] }}>
                                        {childRoutes?.map((data, idx2) =>
                                            <li key={idx2}>
                                                <StandardLink id="link" theme={{ ...theme, ui_theme: { ...theme?.ui_theme, borders: false } }} href={href}>
                                                    <ChildLinkLight style={{ opacity: "80%" }} theme={theme}>{data.title}</ChildLinkLight>
                                                </StandardLink>
                                            </li>
                                        )}
                                    </ul>
                                </LinkMenuSection>
                            </>
                        )
                    })}
                </MenuContainer>
                {renderNavMenu && <div id="fade-in" style={{ height: "100vh", width: "100vw", top: 0, left: 0, backgroundColor: "rgba(0,0,0,0.3)", position: "absolute", zIndex: "-10" }} onMouseEnter={() => setDropdownMenu(-1)}></div>}
            </HeaderWrapper>
        </>
    )
}

const HeaderControlsComponent = ({ theme, top }: { theme: HypeTheme | undefined | null, top: boolean | null | undefined }) => {
    return <HeaderControls theme={theme}>
        <StyledControlIcon top={top} theme={theme} className={`${theme?.ui_theme.icon_modifier} fa-cart-shopping`} />
        <StyledControlIcon top={top} theme={theme} className={`${theme?.ui_theme.icon_modifier} fa-user`} />
    </HeaderControls>
}
