import { CartProduct, Currency, HypeItemReference } from '@hype-charms/types';
import React, { useEffect, useState } from 'react';
import { formatPrice } from '../../../../stripe';
import styled from 'styled-components';
import { HypeTheme } from '../../../models';
import { useThemeContext } from '../../../context';

export const useCheckoutSummaryValues = (cart: HypeItemReference[] | null) => {
    const [shipping, setShipping] = useState<string>();
    const [subTotal, setSubTotal] = useState<string>();
    const [total, setTotal] = useState<string>();
    useEffect(() => {
        if (!cart || cart.length === 0) {
            return;
        }
        const subTotal = cart?.map(x => x.unit_amount! * x.quantity!).reduce((x, y) => x! + y!)
        const shipping = 800;
        const total = subTotal + shipping;
        setShipping(formatPrice(shipping, Currency.AUD, 1));
        setSubTotal(formatPrice(subTotal, Currency.AUD, 1))
        setTotal(formatPrice(total, Currency.AUD, 1))
    }, [cart]);
    return { shipping, subTotal, total };
}

export const CheckoutSummaryComponent = ({ cart }: { cart: CartProduct[] }) => {
    const { shipping, subTotal, total } = useCheckoutSummaryValues(cart);
    const theme = useThemeContext();
    return (
        <Container>
            <TextHeader theme={theme}>Summary</TextHeader>
            <TextContainer>
                <TextLabel theme={theme}>Sub total: </TextLabel>
                <TextContent theme={theme}>{subTotal}</TextContent>
            </TextContainer>
            <TextContainer>
                <TextLabel theme={theme}>Package & Handling: </TextLabel>
                <TextContent theme={theme}>{shipping}</TextContent>
            </TextContainer>
            <StyledTextContainer theme={theme}>
                <TextLabel theme={theme}>Total: </TextLabel>
                <TextContent theme={theme}>{total}</TextContent>
            </StyledTextContainer>
        </Container>
    )
}

const TextHeader = styled.h3(({ theme }: { theme: HypeTheme }) => `
    text-align: start;
    width: 100%;
    font-family: ${theme.fontFamily.mono};
    font-size: larger;
`)

const TextLabel = styled.h4(({ theme }: { theme: HypeTheme }) => `
   opacity: 60%;
   text-align: start;
   width: 100%;
   font-weight: 600;
   font-family: ${theme.fontFamily.sans}
`)

const TextContent = styled.p(({ theme }: { theme: HypeTheme }) => `
   text-align: start;
   font-weight: 400;
   font-family: ${theme.fontFamily.sans}
`)

const Container = styled.div(() => `
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: inherit;
    width: 100%;
`)

const TextContainer = styled.div(() => `
    width: 100%;
    display: flex;
    flex-direction: row;
`)
const StyledTextContainer = styled(TextContainer)(({ theme }: { theme: HypeTheme }) => `
    padding: 0 2rem;
    border-bottom: solid 2px ${theme.colors['accent-one']};
    border-top: solid 2px ${theme.colors['accent-one']};
`)