import styled from "styled-components";
import { HypeTheme } from "../../../models";

export interface HeaderContainerStyleProps {
    theme: HypeTheme,
    position?: "sticky" | "absolute" | "fixed" | "static",
    top: boolean | null;
}
export const HeaderContainer = styled.div(({ theme, position, top }: HeaderContainerStyleProps) => `
    background-color: ${top ? theme.colors['secondary'] : theme.colors['secondary-dark']};
    width: 100vw;
    height: ${top && theme.ui_theme.header.shrink ? theme.ui_theme.header.height : "1.5rem"};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    min-height: 50px;
    position: ${position};
    top: 0;
    left:0;
    transform: ${!top ? "translateY(-1px)" : ""};
    padding: 0px ${theme.ui_theme.margins};
    border-bottom: ${theme.ui_theme?.borders ? 'solid 1px ' + theme.colors.border : ''};
    box-shadow: 0 0 0.4rem 0.01rem rgba(0,0,0, 0.1);
    z-index: 30;
    transition: all 1s;
`)

export const HeaderWrapper = styled.div(({ position }: Omit<HeaderContainerStyleProps, 'theme' | 'top'>) => `
display: flex;
flex-direction: column;
justify-content: center;
align-items:center;
z-index: 50;
position: ${position};
`)

//div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", position: theme?.ui_theme.header.position }}

export const LogoContainer = styled.div(({ top, theme }: { theme: HypeTheme, top: boolean | null }) => `
    cursor: pointer;
    flex: 1;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items:center;
    height: 100%;
    justify-content: center;
        background-color: ${top ? theme.colors['primary-text'] : theme.colors['primary-text-light']};
`)

export const NavigationContainer = styled.div(({ theme }: { theme: HypeTheme }) => `
    padding: ${theme.ui_theme.spacing === "between" ? "0 0 0 20%" : "0"};
    display: flex;
    flex: 4;
    flex-direction: row;
    justify-content: ${theme.ui_theme.spacing === "between" ? "space-between" : "flex-end"};
    align-items: center;
    height: 100%;
`)

export const NavigationMenuContainer = styled.div(({ theme, active }: { theme: HypeTheme, active: boolean }) => !theme.ui_theme.rounded ? `
    background-color: ${theme.colors['accent-one']};
    box-shadow: 0.2rem 0.1rem 0.5rem 0.01rem rgba(0,0,0,0.1);
    width: 100%;
    transform: translateY(1px);
    gap: 10px;
    display: flex;
    align-items: start;
    flex-direction: column;
    z-index: 20;
    padding: 0 10px;
` : `
    padding-top: 0.3rem;
    transition: all 0.5s;
    background-color: ${theme.colors['accent-one']};
    box-shadow: 0.2rem 0.1rem 0.5rem 0.01rem rgba(0,0,0,0.1);
    width: 100%;
    opacity: ${!active ? "0%" : "100%"};
    gap: 10px;
    display: flex;
    top: 1.4rem;
    border-radius: 10px;
    flex-direction: column;
    z-index: 1;
`)

export const StyledControlIcon = styled.i(({ theme, top }: { theme: HypeTheme, top: boolean | null | undefined }) => `
height:1.3rem;
width: 1.3rem; 
cursor: pointer;
padding: 1rem;
color: ${top ? theme.colors['primary-text'] : theme.colors['primary-text-light']};
&:hover {
    color: ${theme.colors["accent-one"]};
}
`)

export const HeaderControls = styled.div(() => `
flex: 1;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
`)

export const MenuContainer = styled.div(({ theme, active }: { theme: HypeTheme, active: boolean }): string => `
box-shadow: 0.2rem 0.1rem 0.5rem 0.01rem rgba(0,0,0,0.1);
z-index:20;
display: flex;
flex-direction: row;
flex-wrap: no-wrap;
justify-content: space-evenly;
align-items: start;
width: 80vw;
transition: all 0.5s;
padding: ${active ? "1rem" : ""};
transform: translateY(-3px);
background-color: ${theme.colors["secondary-dark"]};
color: ${theme.colors["secondary-text"]};
height: ${!active ? "0px" : "fit-content"};
`)


export const LinkSection = styled.div(({ theme }: { theme: HypeTheme }) => `
z-index: 30;
flex:1;
height: 100%;
`);


export const StandardLink = styled.a(({ theme }: { theme: HypeTheme }) => `
    height: 100%;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items:start;
    justify-content: center;
    text-align: start;
    transition: all 0.5s;
    color: ${theme.colors ? theme.colors["secondary-light"] : ""};
    padding: 0.1rem 0.5rem;
    &:hover{
        background-color: ${theme.colors ? theme.colors['secondary-dark'] : ""};
    }
    &:hover ${MainLinkTextLight}{
        color: ${theme?.colors && theme.colors['secondary-dark']};
    }
    &:hover ${MainLinkTextDark}{
        color: ${theme?.colors && theme.colors["accent-one"]}
    }
    &:hover ${SubLinkTextDark}{
        color: ${theme?.colors && theme.colors["accent-one"]}
    }
    &:hover ${ChildLinkDark}{
        color: ${theme?.colors && theme.colors['secondary-dark']};
    }
    &:hover ${ChildLinkLight}{
        color: ${theme?.colors && theme.colors['secondary-light']};
    }
    &:hover ${SubLinkTextLight}{
        opacity: 50%;
    }
`)

export const MainLinkTextLight = styled.h3(({ theme }: { theme: HypeTheme }) => `
font-family: ${theme.fontFamily.mono};
color: ${theme?.colors["light-text"]};
text-align: center;
width: 100%;
&:hover{
    color: ${theme.colors['secondary-dark']};
}
`)

export const LinkMenuSection = styled.div(() => `
flex: 1;
display: flex;
padding: 0rem 0.5rem;
flex-direction:column;
justify-content: flex-start;
align-items:center;
`)


export const MainLinkTextDark = styled.h3(({ theme }: { theme: HypeTheme }) => `
font-family: ${theme.fontFamily.mono};
color: ${theme?.colors["primary-text"]};
text-align: center;
width: 100%;
&:hover{
    color: ${theme.colors["accent-one"]}
}
`)


export const ChildLinkDark = styled(MainLinkTextDark)(({ theme }: { theme: HypeTheme }) => `
color: ${theme.colors['secondary-dark']};
text-align: left;
width: 100%;
&hover:{
    color: ${theme.colors['secondary-dark']};
    opacity: 80%;
}
`)

export const ChildLinkLight = styled(MainLinkTextLight)(({ theme }: { theme: HypeTheme }) => `

color: ${theme.colors['secondary-light']};
text-align: left;
width: 100%;
&hover:{
    color: ${theme.colors['secondary-light']};
    opacity: 80%;
}
`)

export const SubLinkTextDark = styled.h3(({ theme }: { theme: HypeTheme }) => `
font-family: ${theme.fontFamily.mono};
color: ${theme.colors['primary-text']};
text-align: center;
width: 100%;
&:hover{
    color: ${theme.colors["accent-one"]}
}
`)

export const SubLinkTextLight = styled.h3(({ theme }: { theme: HypeTheme }) => `
font-family: ${theme.fontFamily.mono};
color: ${theme.colors['secondary-text']};
text-align: center;
width: 100%;
&:hover{
    opacity: 50%;
}
`)

export const FlexGrowLink = styled(StandardLink)`
flex: 1;
`