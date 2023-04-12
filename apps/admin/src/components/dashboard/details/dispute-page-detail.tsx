import { FC } from 'react';
import { DashboardWidget } from '../containers/dashboard-widget.container';
import { Box, Typography } from '@mui/material';
import { disputes } from '@prisma/client';


interface DisputePageDetailProps {
    data: disputes[] | null
}
export const DisputePageDetail: FC<DisputePageDetailProps> = ({ data }) => {

    return (
        <DashboardWidget
            headerText="Dispute details"
            subHeaderText=""
            linkText=""
            href=""
        >
            <>
                <Box sx={{ overflow: 'scroll', maxHeight: 'inherit', paddingBottom: 20 }}>
                    <Typography variant="body2" color="orange">
                        <code>
                            <pre>
                                {(JSON.stringify(data, undefined, 2))}
                            </pre>
                        </code>
                    </Typography>
                </Box>
            </>
        </DashboardWidget>
    )
}