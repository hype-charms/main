import { FC } from "react"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useRouter } from "next/router";
import Container from '@mui/material/Container'

interface DashboardWidgetProps {
    children: JSX.Element;
    subHeaderText: string;
    headerText: string;
    linkText: string;
    href: string;
    components?: JSX.Element;
}
export const DashboardWidget: FC<DashboardWidgetProps> = ({ children, headerText, subHeaderText, linkText, href, components }) => {
    const router = useRouter();
    return (
        <Box sx={{ maxHeight: 'inherit' }}>
            <Paper sx={{ maxHeight: 'inherit' }}>
                <Grid container gridTemplateColumns={{ sm: '1fr 1fr' }} sx={{ width: '100%', paddingX: 2, paddingTop: 2, maxHeight: 'inherit' }}>
                    <Grid item gridTemplateRows={{ md: '1fr 1fr' }} >
                        <Typography variant="h4" component="h4">
                            {headerText}
                        </Typography>
                        <Typography variant="h6" component="h6">
                            {subHeaderText}
                        </Typography>
                        <Typography onClick={() => router.push(href)} variant="body1">
                            {linkText}
                        </Typography>
                    </Grid>
                    {components && <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', gap: '2'}}>
                        {components}
                    </Container>}
                </Grid>
                {children}
            </Paper>
        </Box>)
}