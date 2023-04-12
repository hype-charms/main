import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { FC, useState, useCallback } from 'react';
import { DashboardWidget } from '../containers/dashboard-widget.container';
import Button from '@mui/material/Button';
import { InventoryFormDialog, InventoryFormDialogOutput } from '../dialog/inventory.dialog';
import { useUpdateProductInventory } from '../../../+state/hooks/orders.hook';
import Stripe from 'stripe';
import { inventory } from '@prisma/client';
interface InventoryListWidgetProps {
    data: inventory[] | null;
}
export const InventoryListWidget: FC<InventoryListWidgetProps> = ({ data }) => {

    const [open, setOpen] = useState<boolean>();
    const [products, setProducts] = useState<{ name: string, id: string }[]>();
    const updateInventory = useUpdateProductInventory();

    const loadProducts = useCallback(async () => {
        const res = await fetch('/api/products');
        const products = await res.json();
        setProducts(await products.map((x: Stripe.Product) => ({ name: x.name, id: x.id })))
        setOpen(true);
    }, [])

    const onConfirm = (data: InventoryFormDialogOutput) => {
        if (data.id && data.orderedStock && data.currentStock && data.name) {
            setOpen(false);
            updateInventory(data.id, { id: data.id, ordered_stock: data.orderedStock, current_stock: data.currentStock, name: data.name })
        }
    }

    return (
        <DashboardWidget
            headerText="Inventory"
            subHeaderText=""
            linkText="View detailed inventory"
            href="/inventory"
            components={<>
                <Button variant={"outlined"} size="small" color="success" onClick={() => loadProducts()}>
                    add
                </Button>
            </>}>
            <>
                {open && products && <InventoryFormDialog
                    confirm={(data) => onConfirm(data)}
                    cancel={() => setOpen(false)}
                    open={open}
                    products={products}
                />}
                {data && <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'scroll', maxHeight: 'inherit', paddingBottom: 20 }}>
                    {data.map((value, idx) => {
                        return (
                            <ListItem
                                sx={{ paddingLeft: 2 }}
                                key={idx}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments">
                                        <CommentIcon />
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemText id={value.id} primary={value.name} secondary={value.current_stock} />
                            </ListItem>
                        );
                    })}
                </List>}
            </>
        </DashboardWidget>
    )
}