import { FC, useState } from 'react';
import { DashboardWidget } from '../containers/dashboard-widget.container';
import { Carriers, ShippingStatus } from '../../../models/orders.model';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button'
import { CarrierFormDialog } from '../dialog/carriers.dialog';
import { useUpdateShippingCarrier, useUpdateShippingStatus, useUpdateShippingTrackingNumber } from '../../../+state/hooks/orders.hook';
import { StatusFormDialog } from '../dialog/status.dialog';
import { TrackingNumberFormDialog } from '../dialog/tracking-number.dialog copy';
import { order_list } from '@prisma/client';


interface OrderListDetailProps {
    data: order_list[] | null
}
export const OrderPageDetail: FC<OrderListDetailProps> = ({ data }) => {

    const [dialog, setDialog] = useState<'tracking' | 'carrier' | 'status' | null>(null);
    const updateShippingTrackingNumber = useUpdateShippingTrackingNumber()
    const updateShippingStatus = useUpdateShippingStatus()
    const updateShippingCarrier = useUpdateShippingCarrier();

    const handleTrackingNumberUpdates = (tracking_number: string) => {
        if (data) {
            updateShippingTrackingNumber(data[0]?.id as string, tracking_number);
            setDialog(null);
        }
    }

    const handleStatusUpdates = (status: ShippingStatus) => {
        if (data && data[0]?.id) {
            updateShippingStatus([data[0]?.id as string], status);
            setDialog(null);
        }
    }

    const handleCarrierUpdates = (carrier: Carriers) => {
        if (data && data[0]?.id) {
            updateShippingCarrier([data[0]?.id as string], carrier);
            setDialog(null);
        }
    }

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
                        onClick={() => setDialog('status')}>
                        update shipping_status
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => setDialog('carrier')}>
                        update carriers
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => setDialog('tracking')}
                    >
                        update tracking_number
                    </Button>
                </>
            }
        >
            <>
                {data && <Button
                    color="success"
                    onClick={() => window.open(`${data[0]?.receipt}`)}
                >
                    View receipt
                </Button>}
                <Box sx={{ overflow: 'scroll', maxHeight: 'inherit', paddingBottom: 20 }}>
                    <Typography variant="body2" color="orange">
                        <code>
                            <pre>
                                {(JSON.stringify(data, undefined, 2))}
                            </pre>
                        </code>
                    </Typography>
                </Box>
                {data && data[0]?.id && <TrackingNumberFormDialog
                    confirm={(data: string) => handleTrackingNumberUpdates(data)}
                    cancel={() => setDialog(null)}
                    open={dialog === 'tracking'}
                    orderId={[data[0].id as string]}
                />}
                {data && data[0]?.id && <StatusFormDialog
                    confirm={(data: ShippingStatus) => handleStatusUpdates(data)}
                    cancel={() => setDialog(null)}
                    open={dialog === 'status'}
                    orderId={[data[0].id as string]}
                />}
                {data && data[0]?.id && <CarrierFormDialog
                    confirm={(data: Carriers) => handleCarrierUpdates(data)}
                    cancel={() => setDialog(null)}
                    open={dialog === 'carrier'}
                    orderId={[data[0].id as string]}
                />}
            </>
        </DashboardWidget>
    )
}