import { FC, useEffect, useState } from 'react';
import { DashboardWidget } from '../containers/dashboard-widget.container';
import { disputes } from '@prisma/client';
import { useAppSelector } from '../../../+state';
import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface DisputesListDetailProps {
    data: disputes[] | null;
}
export const DisputesListDetail: FC<DisputesListDetailProps> = ({ data }) => {

    const [selectedEmails, setSelectedEmails] = useState<disputes[] | null>();
    const selected = useAppSelector(state => state.orderReducer.bulkSelection);

    useEffect(() => {
        setSelectedEmails(data?.filter(x => selected?.some(y => y === x.id)))
    }, [selected, data])

    return (
        <DashboardWidget headerText="Disputes list" subHeaderText="" linkText="View all disputes" href="/disputes">
            <Box sx={{ overflow: 'scroll', maxHeight: 'inherit', paddingBottom: 20 }}>
                {selectedEmails?.map((x, idx) => <div className="p-4" key={idx}>
                    <Typography>
                        <code>
                            <pre>
                                {(JSON.stringify(x, undefined, 2))}
                            </pre>
                        </code>
                    </Typography>
                    <Divider />
                </div>
                )}
            </Box>
        </DashboardWidget>
    )
}