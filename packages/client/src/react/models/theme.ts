export interface HypeTheme {
    screens: {
        sm: string,
        md: string,
        lg: string,
        xl: string,
    };
    colors: {
        "primary": string,
        "secondary": string,
        "secondary-dark": string,
        "light-text": string,
        "primary-text": string,
        "secondary-text": string,
        "secondary-light": string,
        "accent-one": string,
        "accent-two": string,
        "border": string,
        "primary-text-light": string,
    };
    fontFamily: { 'mono': string[], 'sans': string[] };
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