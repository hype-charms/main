import { HypeItemReference, ProductFilters } from "@hype-charms/types";
import React, { FC, useCallback } from "react";
import styled from "styled-components";
import { useThemeContext } from "../../../context";
import { HypeTheme } from "../../../models";

interface ProductWrapperProps {
    items?: HypeItemReference[],
    loadedItemQuantity: number,
    title: string,
    description: string,
    image: string,
    children?: JSX.Element,
    onFilterChange?: (key: ProductFilters) => void
}
export const ProductPageWrapperComponent: FC<ProductWrapperProps> = ({ loadedItemQuantity, title, description, image, children, onFilterChange }) => {
    return (
        <ProductPageLayout
            title={title}
            description={description}
            image={image}
            loadedItemQuantity={loadedItemQuantity}
            onFilterChange={onFilterChange}
        >
            {children}
        </ProductPageLayout>
    )
}

const ProductPageLayout: FC<ProductWrapperProps> = ({ children, title, description, image, loadedItemQuantity, onFilterChange }) => {
    const setFilter = useCallback((key: ProductFilters) => {
        onFilterChange && onFilterChange(key)
    }, [onFilterChange]);
    const theme = useThemeContext();
    return (
        <Container theme={theme}>
            <TitleSection theme={theme}>
                <PageInfo theme={theme}>
                    <HeadingText theme={theme}>{title}</HeadingText>
                    <HeadingDescription theme={theme}>
                        {description}
                    </HeadingDescription>
                </PageInfo>
                <Background theme={theme} url={image ? image : ''}>
                    {/* <Image src={image ? image : ""} alt="" height={350} width={700} /> */}
                </Background>
            </TitleSection>
            <Section theme={theme}>
                <p className="">{loadedItemQuantity} PRODUCTS</p>
                <StyledSelect theme={theme} disabled={onFilterChange !== undefined}>
                    {Object.values(ProductFilters).map(x => <StyledOption theme={theme} onClick={() => setFilter(x)} key={x} className="rounded-none text-secondary-light text-opacity-80">{x}</StyledOption>)}
                </StyledSelect>
            </Section>
            <Section theme={theme}>
                {children}
            </Section>
        </Container>
    )
}

const StyledOption = styled.option(({ theme }: { theme: HypeTheme }) => `
    font-family: ${theme.fontFamily.sans};
    font-size: smaller;
    cursor: pointer;
`);

const StyledSelect = styled.select(({ theme }: { theme: HypeTheme }) => `
    width: 15rem;
    font-family: ${theme.fontFamily.mono};
    border-radius: ${theme.ui_theme.rounded ? "0.5rem" : "0"};
    padding: 0.5rem;
    background-color: ${theme.colors["accent-one"]};
    color: ${theme.colors["primary-text-light"]};
    cursor: pointer;
`);

const Background = styled.div(({ theme, url }: { theme: HypeTheme, url: string }) => `
    flex: 1;
    background-image: linear-gradient(to right, ${theme.colors.primary}, rgba(0,0,0,0), ${theme.colors.primary}),url(${url});
    background-position: center;
    height: 20rem;
`);

const TitleSection = styled.section(({ theme }: { theme: HypeTheme }) => `
    background-color: ${theme.colors["secondary"]};
    border: ${theme.ui_theme.borders ? "solid 1px " + theme.colors.border : ""};
    border-radius: ${theme.ui_theme.rounded ? "0.5rem" : "0"};
    display: flex;
    flex-direction: row;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: center;
    padding: 0rem 0rem 0rem 1rem;
    overflow: clip;
`);

const HeadingText = styled.h2(({ theme }: { theme: HypeTheme }) => `
    font-family: ${theme.fontFamily.mono};
    color: ${theme.colors["primary-text"]};
`);

const HeadingDescription = styled.p(({ theme }: { theme: HypeTheme }) => `
    font-size: smaller;
    font-family: ${theme.fontFamily.sans};
    color: ${theme.colors["primary-text"]};
`);

const PageInfo = styled.div(() => `
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;
    justify-content: center;
    align-items: flex-start;
`);

const Container = styled.div(({ theme }: { theme: HypeTheme }) => `
    height: fit-content;
    width: 100%;
    padding: ${theme.ui_theme.margins ? "4rem" : "2rem"} ${theme.ui_theme.margins};
    display: flex;
    flex-direction: column;
    gap: 1rem;
`);

const Section = styled.section(({ theme }: { theme: HypeTheme }) => `
    width: 100%;
    padding: 1rem 1rem;
    height: fit-content;
    border: ${theme.ui_theme.borders ? "solid 1px " + theme.colors.border : ""};
    border-radius: ${theme.ui_theme.rounded ? "0.5rem" : "0"};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`);