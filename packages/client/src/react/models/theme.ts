export interface HypeTheme {
    screens: {
        sm: string,
        md: string,
        lg: string,
        xl: string,
    };
    colors: {
        "primary": string,
        "primary-text": string,
        "secondary": string,
        "secondary-text": string,
        "secondary-light": string,
        "secondary-dark": string,
        "accent-one": string,
        "accent-two": string,
    };
    fontFamily: { 'mono': string[], 'sans': string[] };
}