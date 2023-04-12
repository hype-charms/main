import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { FC } from 'react';
import { DashboardWidget } from '../containers/dashboard-widget.container';
import { useSetBulkSelectOrders } from '../../../+state/hooks/orders.hook';
import { disputes } from '@prisma/client';
import { useRouter } from 'next/router';

interface DisputeListWidgetProps {
    data: disputes[] | null;
}
export const DisputeListWidget: FC<DisputeListWidgetProps> = ({ data }) => {
    const [selected, setBulkSelection] = useSetBulkSelectOrders();
    const router = useRouter();

    return (
        <DashboardWidget headerText="Disputes list" subHeaderText="" linkText="View all disputes" href="/disputes">
            <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'scroll', maxHeight: 'inherit', paddingBottom: 20 }}>
                {data && data.length > 0 && data.map((value, idx) => {
                    return (
                        <ListItem
                            key={idx}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments" onClick={() => router.push(`/disputes/${value.id}`)}>
                                    <CommentIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={() => setBulkSelection(value.id)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={selected?.some(x => x === value.id)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': value.id }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={value.id} primary={value.id} secondary={value.charge} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </DashboardWidget>
    )
}