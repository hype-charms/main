import styled from "styled-components"
import { HypeTheme } from "../../../../models";

export const Container = styled.div(({ theme, width }: { theme: HypeTheme, width: string }) => `
    background-color: ${theme.colors["accent-one"]};
    height: 5rem;
    color: ${theme.colors["accent-one"]};
    width: ${width};
    overflow: clip;
    padding: 0 3px 0 3px;
`)

export const Timer = styled.div(({ theme, width }: { theme: HypeTheme; width: string }) => `
    position: absolute;
    height: 100%;
    border-bottom: solid 4px ${theme.colors.primary};
    width: ${width};
`)

export const NotificationContent = styled.div(() => `
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2px 0;
    background-opacity: 0;
`)

export const ExitButton = styled.button(() => `
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
    padding: 0 3px;
`)