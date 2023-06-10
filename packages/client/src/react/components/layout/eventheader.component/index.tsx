import styled from "styled-components"
import React, { useEffect, useState } from "react";
import { BaseNavData, HypeTheme } from "../../../models";
import { useThemeContext } from "../../../context";
import { StandardLink } from "../header.component/template";

interface SubHeaderComponentProps {
    eventheader_content: { navigation: BaseNavData[] },
    visible: boolean;
}
export const EventheaderComponent = ({ eventheader_content, visible }: SubHeaderComponentProps) => {
    const theme = useThemeContext();
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            if (count < 2) {
                setCount(c => c + 1);
            } else {
                setCount(0)
            }
        }, 3000)
        return () => window.clearInterval(interval);
    }, [count])

    return <EventheaderContainer theme={theme} visible={visible}>
        <SubLinkContainer>
            <EventStandardLink href={eventheader_content.navigation[count].href} theme={theme}>{eventheader_content.navigation[count].title}</EventStandardLink>
        </SubLinkContainer>
    </EventheaderContainer>
}

export const EventStandardLink = styled(StandardLink)(({ theme }: { theme: HypeTheme }): string => `
align-items: center;
cursor: pointer;
color: ${theme.colors['primary-text']};
&:hover{
    opacity: 90%;
    color: ${theme.colors["accent-two"]};
    background-color: inherit;
}
`);

export const SubLinkContainer = styled.div((): string => `
width: 50%;
display: flex;
flex-direction: row;
justify-content: evenly;
`)

export const EventheaderContainer = styled.div(({ theme, visible }: { theme: HypeTheme, visible: boolean }): string => `
height: ${visible ? "0rem" : "2rem"};
opacity: ${visible ? "0%" : "100%"};
transition: all 0.5s;
background-color: ${theme.colors['secondary-light']};
width: 100vw;
transition: height: 0.5s;
box-shadow: 0 0 0.4rem 0.01rem rgba(0,0,0, 0.1);
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px ${theme.ui_theme.margins};
border-bottom: ${theme.ui_theme?.borders ? 'solid 1px ' + theme.colors.border : ''};
z-index: 40;
`);