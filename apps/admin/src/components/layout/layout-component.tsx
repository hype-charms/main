
import { signIn, useSession } from "next-auth/react"
import { FC, useEffect } from "react"
import { HeaderComponent } from "./header/header.component";
import Box from '@mui/material/Box'

interface LayoutProps {
    children: JSX.Element[] | JSX.Element,
    location: 'dashboard' | 'orders' | 'emails' | "Disputes" | ""
}
export const Layout: FC<LayoutProps> = ({ children, location }) => {
    return (
        <AuthValidator components={
            <>
                <HeaderComponent location={location}>
                    <></>
                </HeaderComponent>
                <Box sx={{ paddingLeft: 7, paddingTop: 7, paddingBottom: 10 }}>
                    {children}
                </Box>
            </>
        } />

    )
}
const AuthValidator: FC<{ components: JSX.Element }> = ({ components }) => {
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status !== 'loading' && !session) {
            signIn('google');
        }
    }, [status, session])
    if (status === 'loading' || !session) {
        return (
            <div className="h-screen flex flex-row items-center justify-center">
                Loading
            </div>
        )
    } else {
        return components
    }
}