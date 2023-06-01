import styled from "styled-components"
import React from "react";
import { StandardLink } from "../header.component/template";
import { useThemeContext } from "../../../context";
import { BaseNavData, HypeTheme } from "../../../models";

interface SubHeaderComponentProps {
    subheader_content?: { navigation: BaseNavData[] },
    menuActive?: boolean;
    visible: boolean;
}
export const SubheaderComponent = ({ subheader_content, menuActive, visible }: SubHeaderComponentProps) => {
    const theme = useThemeContext();
    return <SubheaderContainer menuActive={menuActive} visible={visible} theme={theme}>
        <SubLinkContainer theme={theme}>
            {subheader_content?.navigation.map((data, idx) => <SubStandardLink theme={theme} notLast={(idx + 1) !== subheader_content?.navigation.length} key={idx}>{data.title}</SubStandardLink>)}
        </SubLinkContainer>
    </SubheaderContainer>
}

export const SubStandardLink = styled(StandardLink)(({ theme, notLast }: { theme: HypeTheme, notLast: boolean }): string => `
border-right: ${notLast && "solid 2px" + theme.colors["secondary-dark"]};
align-items: center;
transform: skew(-15deg);
cursor: pointer;
&:hover{
    color: ${theme.colors["accent-two"]};
}
`);

const SubLinkContainer = styled.div((): string => `
transition: opacity 0.3s;
width: 50%;
display: flex;
flex-direction: row;
justify-content: evenly;
`)

export const SubheaderContainer = styled.div(({ theme, menuActive, visible }: { theme: HypeTheme, visible: boolean, menuActive?: boolean }): string => `
transition: all 0.5s;
opacity: ${menuActive || visible ? "0%" : "100%"};
height: ${menuActive || visible ? "0rem" : "2rem"};
background-color: ${theme.colors['secondary-light']};
width: 100vw;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px ${theme.ui_theme.margins};
border-bottom: ${theme.ui_theme?.borders ? 'solid 1px ' + theme.colors.border : ''};
box-shadow: 0 0 0.4rem 0.01rem rgba(0,0,0, 0.1);
z-index: 20;
`);