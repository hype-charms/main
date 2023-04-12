/* eslint-disable @typescript-eslint/no-non-null-assertion */
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { FC, useEffect, useState } from 'react';
import { DashboardWidget } from '../containers/dashboard-widget.container';
import { useSetBulkSelectOrders } from '../../../+state/hooks/orders.hook';
import Button from '@mui/material/Button'
import { useRouter } from 'next/router';
import { order_list } from '@prisma/client';
import { ShippingStatus } from '../../../models/orders.model';

interface OrderListComponentProps {
    data: order_list[] | null;
}
export const OrderListComponent: FC<OrderListComponentProps> = ({ data }) => {

    const [selected, setBulkSelection] = useSetBulkSelectOrders();
    const [activeFilter, setActiveFilter] = useState<'complete' | 'failed' | 'shipped' | 'pending' | 'shipping_failed' | null>();
    const [filteredOrders, setFilteredOrders] = useState<order_list[] | null>();
    useEffect(() => setFilteredOrders(data), [data])
    const router = useRouter();

    const filterOrders = (type?: 'complete' | 'failed' | 'shipped' | 'pending' | 'shipping_failed' | null) => {
        if (!type) {
            setActiveFilter(null)
            setFilteredOrders(data)
        }
        switch (type) {
            case 'complete':
                setActiveFilter('complete')
                setFilteredOrders(data?.filter(x => x.status === 'succeeded'));
                break;
            case 'failed':
                setActiveFilter('failed')
                setFilteredOrders(data?.filter(x => x.status === 'failed'));
                break;
            case 'shipping_failed':
                setActiveFilter('shipping_failed')
                setFilteredOrders(data?.filter(x => x.shipping?.status === ShippingStatus.FAILED));
                break;
            case 'shipped':
                setActiveFilter('shipped');
                setFilteredOrders(data?.filter(x => x.shipping?.status === ShippingStatus.SHIPPED));
                break;
            case 'pending':
                setActiveFilter('pending');
                setFilteredOrders(data?.filter(x => x.shipping?.status === ShippingStatus.PENDING));
                break;
        }
    }

    return (
        <DashboardWidget
            headerText="All Orders"
            subHeaderText=""
            linkText="View all orders"
            href="/orders"
            components={
                <>
                    <Button variant={activeFilter === 'complete' ? "outlined" : "outlined"} size="small" color="primary" onClick={() => filterOrders()}>
                        clear
                    </Button>
                    <Button variant={activeFilter === 'complete' ? "contained" : "outlined"} size="small" color="info" onClick={() => filterOrders('complete')}>
                        payment complete
                    </Button>
                    <Button variant={activeFilter === 'failed' ? "contained" : "outlined"} size="small" color="info" onClick={() => filterOrders('failed')}>
                        payment failed
                    </Button>
                    <Button variant={activeFilter === 'shipping_failed' ? "contained" : "outlined"} size="small" color="error" onClick={() => filterOrders('shipping_failed')}>
                        shipping failed
                    </Button>
                    <Button variant={activeFilter === 'pending' ? "contained" : "outlined"} size="small" color="warning" onClick={() => filterOrders('pending')}>
                        shipping pending
                    </Button>
                    <Button variant={activeFilter === 'shipped' ? "contained" : "outlined"} size="small" color="success" onClick={() => filterOrders('shipped')}>
                        shipping shipped
                    </Button>
                </>
            }
        >
            <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'scroll', maxHeight: 'inherit', paddingBottom: 20 }}>
                {filteredOrders && filteredOrders.length > 0 && filteredOrders.map((value, idx) => {
                    return (
                        <ListItem
                            color={value?.shipping?.status === ShippingStatus.SHIPPED ? 'default' :
                                value?.shipping?.status === ShippingStatus.PENDING ? 'warning' :
                                    value?.shipping?.status === ShippingStatus.DELIVERED ? 'danger' : 'default'
                            }
                            key={idx}
                            secondaryAction={
                                <IconButton onClick={() => router.push(`/orders/${value.id}`)} edge="end" aria-label="comments">
                                    <CommentIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} disabled={!value.id} onClick={() => setBulkSelection(value.id!)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={selected?.some(x => x === value.id)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': value.id }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={value.id} primary={value.id} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </DashboardWidget>
    )
}