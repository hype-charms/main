import { FC } from "react"
import Grid from '@mui/material/Grid'

interface DashboardContainerProps {
    children: JSX.Element[] | JSX.Element;
    templateColumns: { [k in 'md' | 'sm' | 'lg']?: string } | null;
    padding?: number;
    maxHeight?: string;
}
export const DashboardContainer: FC<DashboardContainerProps> = ({ children, templateColumns, padding, maxHeight }) => {
    return (
        <Grid sx={{
            overflow: 'clip',
            paddingTop: padding ?? 6,
            paddingX: 4,
            bgcolor: 'background.default',
            display: 'grid',
            gridTemplateColumns: templateColumns,
            gap: 2,
            maxHeight: maxHeight
        }}>
            {children}
        </Grid>
    )
}