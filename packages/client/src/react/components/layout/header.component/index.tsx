import React, { FC, useCallback } from 'react';
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
import { useHeaderStateWithMainDropdown, useHeaderStateWithSnigleDropdowns } from '../../../hooks/header';

export interface HeaderComponentSingleDropdownsProps {
    header_content: { logo: string; navigation: NavigationDataProps[] };
    subheader_content?: { navigation: BaseNavData[] },
    eventheader_content?: { navigation: BaseNavData[] },
    onCartClick: () => void;
    onProfileClick: () => void;
}
export const HeaderComponentSingleDropdowns: FC<HeaderComponentSingleDropdownsProps> = ({ header_content, subheader_content, eventheader_content, onCartClick, onProfileClick }) => {

    const { dropdown, windowLoaded, screenPositionAtZero, setDropdownMenu } = useHeaderStateWithSnigleDropdowns();
    const theme = useThemeContext();

    return (
        <>
            <HeaderWrapper theme={theme} position={theme?.ui_theme.header.position}>
                {eventheader_content && <EventheaderComponent visible={!screenPositionAtZero} eventheader_content={eventheader_content} />}
                <HeaderContainer theme={theme} position={'static'} top={screenPositionAtZero}>
                    <LogoContainer top={!screenPositionAtZero} theme={theme}>
                        {windowLoaded && <i className={'fa-kit fa-logo'} />}
                    </LogoContainer>
                    {header_content.navigation && <NavigationContainer theme={theme}>
                        {!header_content.navigation.some(x => x.sub_routes !== undefined) ? header_content.navigation.map(({ href, title }, idx) => {
                            // renders when no sub routes are defined
                            return <StandardLink theme={theme} key={idx} href={href}><MainLinkTextDark theme={theme}>{title}</MainLinkTextDark></StandardLink>
                        }) : header_content.navigation.map(({ href, title, sub_routes }, idx) => {
                            // renders when sub routes are defined
                            return (
                                <LinkSection id="link section" theme={theme} key={idx}>
                                    <FlexGrowLink id="link" theme={theme} href={href} onMouseEnter={() => setDropdownMenu(idx)}>
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
                                                            {childRoutes?.map(({ title, href }, idx2) => <li key={`secondary ${idx2}`}>
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
                            )
                        })}
                    </NavigationContainer>}
                    <HeaderControlsComponent onCartClick={onCartClick} onProfileClick={onProfileClick} top={screenPositionAtZero} theme={theme} />
                </HeaderContainer>
                {subheader_content !== null && <SubheaderComponent visible={!screenPositionAtZero} menuActive={dropdown > -1} subheader_content={subheader_content} />}
            </HeaderWrapper>
            <PopupUnderlay onMouseEnter={() => setDropdownMenu(-1)} active={dropdown > -1} theme={theme} />
        </>
    )
}

const PopupUnderlay = styled.div(({ active }: { active: boolean }) => `
opacity: ${active ? "20%" : "0%"};
background-color: black;
height: 100vh;
width: 100vw;
pointer-events: ${active ? "auto" : "none"};
position: fixed;
top: 0;
left: 0;
transition: all 1s;
z-index: 30;

`);

export interface HeaderComponentMainDropdown {
    header_content: { logo: string; navigation: NavigationDataProps[] };
    subheader_content?: { navigation: BaseNavData[] },
    eventheader_content?: { navigation: BaseNavData[] },
    onCartClick: () => void;
    onProfileClick: () => void;
}
export const HeaderComponentMainDropdown: FC<HeaderComponentMainDropdown> = ({ header_content, subheader_content, eventheader_content, onCartClick, onProfileClick }) => {

    const theme = useThemeContext();
    const { dropdown, renderNavMenu, screenPositionAtZero, setDropdownMenu } = useHeaderStateWithMainDropdown(header_content.navigation)
    return (
        <>

            <HeaderWrapper theme={theme} position={theme?.ui_theme.header.position}>
                <>
                    {eventheader_content && <EventheaderComponent visible={!screenPositionAtZero} eventheader_content={eventheader_content} />}
                </>
                <HeaderContainer theme={theme} position={"static"} top={screenPositionAtZero}>
                    <LogoContainer theme={theme} top={screenPositionAtZero}>
                        <h2 style={{
                            fontSize: "35px",
                            color: !screenPositionAtZero ? theme?.colors["primary-text"] : theme?.colors["primary-text-light"],
                            fontFamily: theme?.fontFamily.mono ?? ""
                            // @ts-ignore
                        }}>{header_content.brandName}</h2>
                    </LogoContainer >
                    <>
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
                    </>
                    <HeaderControlsComponent onCartClick={onCartClick} onProfileClick={onProfileClick} top={screenPositionAtZero} theme={theme} />
                </HeaderContainer>
                {subheader_content !== null && <SubheaderComponent visible={!screenPositionAtZero} menuActive={renderNavMenu} subheader_content={subheader_content} />}
                <MenuContainer active={renderNavMenu} theme={theme}>
                    <>
                        {header_content.navigation[dropdown]?.sub_routes?.map(({ href, title, childRoutes }, idx) => {
                            return (
                                <>
                                    <LinkMenuSection key={idx} theme={theme}>
                                        <StandardLink id="link" theme={theme} href={href}>
                                            <MainLinkTextLight theme={theme}>{title}</MainLinkTextLight>
                                        </StandardLink>
                                        <ul style={{ color: theme?.colors["secondary-light"] }}>
                                            {childRoutes?.map((data, idx2) =>
                                                <li key={`secondary ${idx2}`}>
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
                    </>
                </MenuContainer>
                <>
                    {renderNavMenu && <div id="fade-in" style={{ height: "100vh", width: "100vw", top: 0, left: 0, backgroundColor: "rgba(0,0,0,0.3)", position: "absolute", zIndex: "-10" }} onMouseEnter={() => setDropdownMenu(-1)}></div>}
                </>
            </HeaderWrapper >
        </>
    )
}

const HeaderControlsComponent = ({ theme, top, onCartClick, onProfileClick }: { theme: HypeTheme | undefined | null, top: boolean | null | undefined, onCartClick: () => void, onProfileClick: () => void }) => {
    const handleProfileClick = useCallback(() => onProfileClick(), [onProfileClick])
    const handleCartClick = useCallback(() => onCartClick(), [onCartClick])
    return <HeaderControls theme={theme}>
        <button onClick={handleCartClick}><StyledControlIcon top={top} theme={theme} className={`${theme?.ui_theme.icon_modifier} fa-cart-shopping`} /></button>
        <button onClick={handleProfileClick}><StyledControlIcon top={top} theme={theme} className={`${theme?.ui_theme.icon_modifier} fa-user`} /></button>
    </HeaderControls>
}
