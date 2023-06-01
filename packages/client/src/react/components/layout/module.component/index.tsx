import React, { FC } from "react"
import Link from "next/link"
import styled from "styled-components"
import { HypeTheme } from "../../../models"
import { useThemeContext } from "../../../context"

export interface ModuleProps {
    children: JSX.Element,
    title?: string,
    height?: string,
    href?: string
}
export const Module: FC<ModuleProps> = ({ children, title, href }): JSX.Element => {
    const theme = useThemeContext();
    return (
        <ModuleContainer theme={theme} id={title?.split(' ').join('')}>
            <Link href={href ?? '/404'}><ModuleContainer theme={theme} >
                <StyledLink theme={theme}>{title}</StyledLink>
            </ModuleContainer></Link>
            <StyledSection>
                {children}
            </StyledSection>
        </ModuleContainer>
    )
}

const StyledSection = styled.section`
width: 100%;
dispaly: flex;
flex-direction: row;
padding: auto 20rem;
`
const StyledLink = styled.h3(({ theme }: { theme: HypeTheme }): string => `
width: 100%;
font-family: ${theme.fontFamily.mono};
color: ${theme.colors["primary-text"]};
text-align: center;
cursor: pointer;
transition: all 0.5s;
&hover:{
    color: ${theme.colors["accent-one"]};
    transform: scale(105%);
}
`)
const ModuleContainer = styled.div(({ theme }: { theme: HypeTheme }): string => `
margin: 0rem ${theme.ui_theme.margins};
height: fit-content;
max-width: 100vw;
padding-top: 2rem; 
`)