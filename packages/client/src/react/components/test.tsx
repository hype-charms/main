import React from "react";
import styled from "styled-components"
import { useThemeContext } from "../context/theme.context";
import { HypeTheme } from "../models";

const Container = styled.div(({ theme }: { theme: HypeTheme | null }) => `
    height: 20px;
    width: 100px;
    background-color: ${theme?.colors["accent-one"]};
`)

export const Test = () => {
    const theme = useThemeContext();
    return (
        <Container theme={theme}>
            testing
        </Container>
    )
}