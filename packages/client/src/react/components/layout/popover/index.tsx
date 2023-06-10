import React, { FC, useCallback } from "react"
import styled from "styled-components";
import { HypeTheme } from "../../../models";
import { useThemeContext } from "../../../context";
import { PopoverPosition } from "../../../models/popover";

interface PopoverProps {
    title: string;
    position: PopoverPosition;
    open: boolean;
    onClose: () => void;
    children: JSX.Element
}
export const PopoverComponent: FC<PopoverProps> = ({ onClose, position, title, children, open }) => {
    const theme = useThemeContext();
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose])
    if (open) {
        return (
            <Container position={position}>
                <Content theme={theme}>
                    <Header>
                        <h3>{title}</h3>
                        <ExitButton onClick={handleClose}>
                            x
                        </ExitButton>
                    </Header>
                    {children}
                </Content>
            </Container>
        )
    } else {
        return <></>
    }
}

const Container = styled.div(({ position }: { theme: HypeTheme, position: PopoverPosition }) => {
    const baseStyles = `
    position: fixed;
    z-index: 50;
    `
    switch (position) {
        case PopoverPosition.center:
            return baseStyles + `
                bottom: 0;
                top: 0;
                left: 0;
                right: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(0,0,0,0.5);
            `
        case PopoverPosition["bottom-left"]:
            return ``
        case PopoverPosition["bottom-right"]:
            return ``
        case PopoverPosition.top:
            return ``
    }
})

export const ExitButton = styled.button(() => `
    display: flex;
    flex-direction: column;
    justify-content: start;
    cursor: pointer;
    height: 100%;
    padding: 2rem 0.5rem;
`);

const Header = styled.div(() => `
    height: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1rem;
`)

const Content = styled.div(({ theme }) => `
    background-color: ${theme.colors.primary};
    width: fit-content;
    height: fit-content;
`)