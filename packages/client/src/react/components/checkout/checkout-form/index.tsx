import React, { useState, useCallback, ChangeEvent, FC, FormEvent } from "react";
import Link from 'next/link';
import styled from "styled-components";
import { HypeTheme } from "../../../models";
import { useThemeContext } from "../../../context";

export const useCheckoutPageForm = () => {
    const [emailForm, setEmailForm] = useState<string | undefined>(undefined);
    const [formIsInvalid, setFormInvalid] = useState<boolean>(true);
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmailForm(event.currentTarget?.value)
        setFormInvalid(!event.currentTarget?.value || event.currentTarget?.value === '');
    }, [setEmailForm, setFormInvalid]);
    return { handleChange, emailForm, formIsInvalid }
}

interface CheckoutFormProps {
    onSubmit: (email: string) => void;
}
export const CheckoutFormComponent: FC<CheckoutFormProps> = ({ onSubmit }) => {
    const { handleChange, emailForm, formIsInvalid } = useCheckoutPageForm();
    const theme = useThemeContext();
    const submit = useCallback((event: FormEvent<HTMLFormElement>) => {
        if (formIsInvalid || !emailForm) return
        event.preventDefault();
        onSubmit(emailForm);
    }, [formIsInvalid, emailForm, onSubmit]);
    return (
        <StyledForm theme={theme} onSubmit={e => submit(e)}>
            <label htmlFor="email">Email</label>
            <InputContainer theme={theme} >
                <StyledInput
                    theme={theme}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={emailForm}
                    onChange={e => handleChange(e)}
                />
            </InputContainer>
            <InputContainer theme={theme}>
                <LinkText theme={theme}>Something missing?</LinkText>
                <Link href="/"><LinkText theme={theme}>Return to store</LinkText></Link>
                <InfoText theme={theme}>If you have a promotion code, your discount will be applied at the checkout</InfoText>
            </InputContainer>
            <InputContainer theme={theme}>
                <CheckoutButton
                    theme={theme}
                    disabled={formIsInvalid}
                    type="submit"
                    title="Proceed to Checkout"
                    style={{ cursor: formIsInvalid ? "not-allowed" : "pointer" }}
                >
                    Proceed to Checkout
                </CheckoutButton>
            </InputContainer>
        </StyledForm>
    )
}

const LinkText = styled.p(({ theme }: { theme: HypeTheme }) => `
    font-family: ${theme.fontFamily.sans};
    opacity: 60%;
    cursor: pointer;
    font-size: medium;
`)

const InfoText = styled.p(({ theme }: { theme: HypeTheme }) => `
    font-size: smaller;
    text-align: left;
    width: 100%;
    opacity: 60%;
    color: black;
    font-family: ${theme.fontFamily.sans};
`)

const CheckoutButton = styled.button(({ theme, disabled }: { theme: HypeTheme, disabled: boolean }) => `
    opacity: ${disabled ? '80%' : '100%'};
    background-color: ${theme.colors.secondary};
    color: ${theme.colors["primary-text"]};
    padding: 2rem 1rem;
    border-radius:  ${theme.ui_theme.rounded ? "1rem" : ""};
`)

const StyledInput = styled.input(({ theme }: { theme: HypeTheme }) => `
    height: 3rem;
    width: 100%;
    border: solid 2px ${theme.colors["accent-one"]};
    border-radius: ${theme.ui_theme.rounded ? "1rem" : ""};
    padding: 1rem 0rem;
`)

const StyledForm = styled.form(({ theme }: { theme: HypeTheme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`)

const InputContainer = styled.span(({ theme }: { theme: HypeTheme }) => `
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-height: 3rem;
`)