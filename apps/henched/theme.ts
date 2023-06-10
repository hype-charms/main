import { HypeTheme } from "@hype-charms/client"

export const hype: HypeTheme = {
    content: [
        "./src/pages/**/*.{jsx,tsx}",
        "./src/components/**/*.{jsx,tsx}",
        "./src/containers/**/*.{jsx,tsx}",
        "./src/context/**/*.{jsx,tsx}"
    ],
    plugins: [],
    theme: {
        extend: {
            screens: {
                sm: '480px',
                md: '800px',
                lg: '1000px',
                xl: '1440px',
            },
            colors: {
                "primary": "#ffffff",
                "primary-text": "#171717",
                "primary-text-light": "#ffffff",
                "secondary": "#ffffff",
                "secondary-text": "#09090b",
                "secondary-light": "#ffffff",
                "secondary-dark": "#ffffff",
                "light-text": "#09090b",
                "accent-one": "#475569",
                "accent-two": "#65a30d",
                "border": "rgba(0,0,0,0.3)",
            },
            fontFamily: { 'mono': ['"Nova Flat"', 'ui-monospace', 'SFMono-Regular'], 'sans': ['"Noto Sans"'] },
        }
    },
    ui_theme: {
        borders: true,
        rounded: true,
        margins: "10%",
        spacing: "compact",
        icon_modifier: " fa-regular fa-light",
        header: {
            shrink: false,
            height: "3rem",
            menu_configuration: "link-specific",
            position: "fixed",
            cart_configuration: "navigate",
        }
    }
}