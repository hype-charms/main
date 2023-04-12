import { FC, useEffect, useState } from 'react';
import { DashboardWidget } from '../containers/dashboard-widget.container';
import { Carriers, ShippingStatus } from '../../../models/orders.model';
import { useAppSelector } from '../../../+state';
import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button'
import { CarrierFormDialog } from '../dialog/carriers.dialog';
import { useUpdateShippingCarrier, useUpdateShippingStatus, useUpdateShippingTrackingNumber } from '../../../+state/hooks/orders.hook';
import { StatusFormDialog } from '../dialog/status.dialog';
import { TrackingNumberFormDialog } from '../dialog/tracking-number.dialog copy';
import { order_list } from '@prisma/client';


interface OrderListDetailProps {
    data: order_list[] | null;
}
export const OrderListDetail: FC<OrderListDetailProps> = ({ data }) => {

    const [selectedOrders, setSelectedOrders] = useState<order_list[] | null>();
    const selected = useAppSelector(state => state.orderReducer.bulkSelection);
    const [dialog, setDialog] = useState<'tracking' | 'carrier' | 'status' | null>(null);
    const updateShippingTrackingNumber = useUpdateShippingTrackingNumber()
    const updateShippingStatus = useUpdateShippingStatus()
    const updateShippingCarrier = useUpdateShippingCarrier();

    const handleTrackingNumberUpdates = (data: string) => {
        if (selected && selected.length === 1) {
            updateShippingTrackingNumber(selected[0] as string, data);
            setDialog(null);
        }
    }

    const handleStatusUpdates = (data: ShippingStatus) => {
        if (selected) {
            updateShippingStatus(selected, data);
            setDialog(null);
        }
    }

    const handleCarrierUpdates = (data: Carriers) => {
        if (selected) {
            updateShippingCarrier(selected, data);
            setDialog(null);
        }
    }

    useEffect(() => {
        setSelectedOrders(data?.filter(x => selected?.some(y => y === x.id)))
    }, [selected, data]);

    return (
        <DashboardWidget
            headerText="Order details"
            subHeaderText=""
            linkText=""
            href=""
            components={
                <>
                    <Button
                        color="secondary"
                        disabled={!selectedOrders || selectedOrders?.length === 0}
                        onClick={() => setDialog('status')}>
                        update shipping_status
                    </Button>
                    <Button
                        color="secondary"
                        disabled={!selectedOrders || selectedOrders?.length === 0}
                        onClick={() => setDialog('carrier')}>
                        update carriers
                    </Button>
                    <Button
                        color="secondary"
                        disabled={!selectedOrders || selectedOrders?.length > 1 || selectedOrders?.length === 0}
                        onClick={() => setDialog('tracking')}
                    >
                        update tracking_number
                    </Button>
                </>
            }
        >
            <>
                <Box sx={{ overflow: 'scroll', maxHeight: 'inherit', paddingBottom: 20 }}>
                    {selectedOrders?.map((x, idx) => <div className="p-4" key={idx}>
                        <Button
                            color="success"
                            onClick={() => window.open(`${x["receipt"]}`)}
                        >
                            View receipt
                        </Button>
                        {orderKeys.map((y, idx) =>
                            <>

                                {y === 'shipping' ? <div key={idx}>
                                    <Typography variant="body2" color="orange">
                                        <>country: {x[y]?.address?.country}</>
                                    </Typography>
                                    <Typography variant="body2" color="orange">
                                        <>state: {x[y]?.address?.state}</>
                                    </Typography>
                                    <Typography variant="body2" color="orange">
                                        <>status: {x[y]?.status}</>
                                    </Typography>
                                    <Typography variant="body2" color="orange">
                                        <>
                                            tracking_no:
                                            <Button variant="text" disabled={!x[y]?.tracking_number} color={x[y]?.tracking_number ? "success" : "inherit"}>
                                                {x[y]?.tracking_number}
                                            </Button>
                                        </>
                                    </Typography>
                                </div> : <Typography variant="body2">
                                    {y}
                                </Typography>}
                            </>
                        )}
                        <Divider />
                    </div>)}
                </Box>
                {selected && <TrackingNumberFormDialog
                    confirm={(data: string) => handleTrackingNumberUpdates(data)}
                    cancel={() => setDialog(null)}
                    open={dialog === 'tracking'}
                    orderId={selected}
                />}
                {selected && <StatusFormDialog
                    confirm={(data: ShippingStatus) => handleStatusUpdates(data)}
                    cancel={() => setDialog(null)}
                    open={dialog === 'status'}
                    orderId={selected}
                />}
                {selected && <CarrierFormDialog
                    confirm={(data: Carriers) => handleCarrierUpdates(data)}
                    cancel={() => setDialog(null)}
                    open={dialog === 'carrier'}
                    orderId={selected}
                />}
            </>
        </DashboardWidget>
    )
}
type keys = keyof order_list
const orderKeys: keys[] = ["id", "amount_paid", "shipping", "dispute", "disputed", "receipt", "status"]