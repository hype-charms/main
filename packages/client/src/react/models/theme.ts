import { Config } from 'tailwindcss'
export interface HypeTheme extends Config {
    ui_theme: {
        borders: boolean;
        rounded: boolean;
        margins: string;
        spacing: "compact" | "between";
        icon_modifier: string;
        header: {
            shrink: boolean;
            menu_configuration: "single" | "link-specific";
            position: "fixed" | "static" | "absolute",
            cart_configuration: "navigate" | "drop-down" | "side-menu",
            height: string;
        }
    }
}