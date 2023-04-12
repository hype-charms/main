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
import { email_dto } from '@prisma/client';

interface EmailListWidgetProps {
    data: email_dto[] | null;
}
export const EmailListWidget: FC<EmailListWidgetProps> = ({ data }) => {
    const [selected, setBulkSelection] = useSetBulkSelectOrders();

    return (
        <DashboardWidget headerText="Email list" subHeaderText="" linkText="View all emails" href="/emails">
            <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'scroll', maxHeight: 'inherit', paddingBottom: 20 }}>
                {data && data.length > 0 && data.map((value, idx) => {
                    return (
                        <ListItem
                            key={idx}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <CommentIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={() => setBulkSelection(value.email)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={selected?.some(x => x === value.email)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': value.email }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={value.email} primary={value.email} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </DashboardWidget>
    )
}