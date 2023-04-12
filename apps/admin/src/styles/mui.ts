import { createTheme } from "@mui/material";
import { ThemeColors } from '../+state/reducers/application.reducer'

const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#202020',
            light: '#f7f3f3',
            dark: '#2d2c2c',
        },
        secondary: {
            main: '#f15353',
            light: '#ff7a70',
        },
        background: {
            default: '#232222',
            paper: '#282e2f',
        },
    },

});

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#f6f6f9',
            light: '#2d2c2c',
            dark: '#f7f3f3',
            contrastText: 'rgba(0,0,0,0.84)',
        },
        secondary: {
            main: '#f15353',
            light: '#ff7a70',
        },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        },
        text: {
            secondary: 'rgba(43,43,43,0.54)',
            disabled: 'rgba(0,0,0,0.38)',
            primary: 'rgba(22,22,22,0.87)',
        },
    },
})

export const themes = {
    [ThemeColors.light]: lightTheme,
    [ThemeColors.dark]: darkTheme,
}