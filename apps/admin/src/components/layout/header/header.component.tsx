import { FC, useState } from "react"
import { IconButton, styled, Toolbar } from "@mui/material"
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { signOut } from "next-auth/react";
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useSetTheme } from "../../../+state/hooks";
import { ThemeColors } from "../../../+state/reducers";
import { SidebarComponent } from "../sidebar/sidebar.component";

interface HeaderProps {
    children: JSX.Element;
    location: 'dashboard' | 'orders' | 'emails' | "Disputes" | ""
}
export const HeaderComponent: FC<HeaderProps> = ({ children, location }) => {
    const [theme, setTheme] = useSetTheme()
    const [open, setMenuState] = useState(false);

    return (
        <AppBar open={open}>
            <Toolbar variant="regular" >
                <Typography variant="h6" component="div" color={(theme) => theme.palette.primary.light} sx={{ flexGrow: 1 }}>
                    {location}
                </Typography>
                {children}
                <Button variant="outlined" color="secondary" size="small" onClick={() => signOut()}>sign out</Button>
                <Switch defaultChecked color="secondary" onChange={() => {
                    switch (theme) {
                        case ThemeColors.light:
                            setTheme(ThemeColors.dark)
                            break;
                        case ThemeColors.dark:
                            setTheme(ThemeColors.light)
                            break;
                    }
                }} />
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="secondary"
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
            <SidebarComponent open={open} onsetMenuState={(data) => setMenuState(data)} />
        </AppBar>
    )
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    paddingLeft: 60,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        paddingLeft: 0,
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));