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
                "primary-text-light": "#f8fafc",
                "secondary": "#ffffff",
                "secondary-text": "#09090b",
                "secondary-light": "#ffffff",
                "secondary-dark": "#57534e",
                "light-text": "#f8fafc",
                "accent-one": "#f87171",
                "accent-two": "#171717",
                "border": "rgba(0,0,0,0.3)",
            },
            fontFamily: { 'mono': ['"Nova Flat"', 'ui-monospace', 'SFMono-Regular'], 'sans': ['"Noto Sans"'] },
        }
    },
    ui_theme: {
        borders: false,
        rounded: true,
        margins: "10%",
        spacing: "compact",
        icon_modifier: " fa-regular fa-light",
        header: {
            shrink: true,
            height: "3rem",
            menu_configuration: "link-specific",
            position: "fixed",
            cart_configuration: "navigate",
        }
    }
}