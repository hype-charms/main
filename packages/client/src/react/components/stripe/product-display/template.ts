import styled from "styled-components"
import { HypeTheme } from "../../../models"

export const ParagraphText = styled.p(({ theme }: { theme: HypeTheme }) => `
text-align: left;
font-family: ${theme.fontFamily.sans}
`)

export const HeadingText = styled.h3(({ theme }: { theme: HypeTheme }) => `
text-align: left;
font-family: ${theme.fontFamily.mono};
`)

export const TextCard = styled.span((): string => `
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: space-between;
`)

export const TextContainer = styled.div(({ theme }: { theme: HypeTheme }): string => `
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 2px;
color: ${theme.colors["primary-text"]};
`)

export const ProductContainer = styled.div(({ theme }: { theme: HypeTheme }): string => `
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
width: 18rem;
min-width: 18rem;
height: 20rem;
box-shadow: 0 0 0.3rem 0.01rem rgba(0,0,0,0.3);
border-bottom: ${theme.ui_theme.borders ? "solid 5px " + theme.colors.border : ""};
`)

export const ClipperContainer = styled.div`
width: 100%;
height: 100%;
overflow: clip;
min-width: 10rem;
`

export const ImageWrapper = styled.button(({ theme }: { theme: HypeTheme }): string => `
height: 100%;
width: 100%;
background-color: ${theme.colors["secondary-light"]};
cursor: pointer;
transition: all 0.5s;
display: flex;
justify-content: center;
align-items: center;
`)