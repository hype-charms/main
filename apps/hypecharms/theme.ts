import { HypeTheme } from "@hype-charms/client"

export const hype: HypeTheme = {
    content: [
        "./src/pages/**/*.{jsx,tsx}",
        "./src/components/**/*.{jsx,tsx}",
        "./src/containers/**/*.{jsx,tsx}",
        "./src/context/**/*.{jsx,tsx}"
    ],
    theme: {
        extend: {
            screens: {
                sm: '480px',
                md: '800px',
                lg: '1000px',
                xl: '1440px',
            },
            colors: {
                "primary": "#0c0a09",
                "primary-text": "#fff",
                "primary-text-light": "#0c0a09",
                "secondary": "#3f3f46",
                "secondary-text": "#ffffff",
                "secondary-light": "#18181b",
                "secondary-dark": "#18181b",
                "light-text": "#f8fafc",
                "accent-one": "#0f766e",
                "accent-two": "#ef4444",
                "border": "rgba(0,0,0,0.3)",
            },
            backgroundImage: {
                'naruto-pack': "url(https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
                'rick-and-morty': "url(/assets/main-backgrounds/rick-and-morty.jpg)",
                'kaws-pack': "url(https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)"
            },
            fontFamily: { 'mono': ['"Nova Flat"', 'ui-monospace', 'SFMono-Regular'], 'sans': ['"Noto Sans"'] },
        }
    },
    ui_theme: {
        borders: true,
        rounded: false,
        margins: "0%",
        spacing: "compact",
        icon_modifier: " fa-sharp fa-solid",
        header: {
            shrink: true,
            height: "2rem",
            menu_configuration: "link-specific",
            position: "fixed",
            cart_configuration: "navigate",
        }
    }
}
