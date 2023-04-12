import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useCallback, useState } from 'react'

export interface FormDialogProps {
    confirm: (data: string) => void;
    cancel: () => void;
    open: boolean;
    productId: string[];
}
export const OrderedStockDialogForm: FC<FormDialogProps> = ({ confirm, cancel, open, productId }) => {

    const [quantity, setQuantity] = useState<string | null>();

    const handleClose = useCallback(() => {
        cancel();
    }, [cancel])

    const handleConfirm = useCallback(() => {
        if (quantity) {
            confirm(quantity)
        }
    }, [confirm, quantity])

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Updating stock</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Updating product {productId[0]}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={'current stock quantities'}
                        fullWidth
                        variant="standard"
                        type="number"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setQuantity(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="info" onClick={handleConfirm} disabled={!quantity}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export const CurrentStockFormDialog: FC<FormDialogProps> = ({ confirm, cancel, open, productId }) => {

    const [quantity, setQuantity] = useState<string | null>();

    const handleClose = useCallback(() => {
        cancel();
    }, [cancel])

    const handleConfirm = useCallback(() => {
        if (quantity) {
            confirm(quantity)
        }
    }, [confirm, quantity])

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Updating product {productId[0]}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={'ordered stock quantities'}
                        fullWidth
                        variant="standard"
                        type="number"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setQuantity(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="info" onClick={handleConfirm} disabled={!quantity}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export interface InventoryFormDialogOutput {
    name: string | null;
    id: string | null;
    currentStock: string | null;
    orderedStock: string | null;
}

interface InventoryFormDialogProps {
    confirm: (data: InventoryFormDialogOutput) => void;
    cancel: () => void;
    open: boolean;
    products: { name: string, id: string }[]
}

export const InventoryFormDialog: FC<InventoryFormDialogProps> = ({ confirm, cancel, open, products }) => {

    const [quantity, setQuantity] = useState<InventoryFormDialogOutput>({
        name: null,
        orderedStock: null,
        currentStock: null,
        id: null
    });

    const handleClose = useCallback(() => {
        cancel();
    }, [cancel])

    const handleConfirm = useCallback(() => {
        if (quantity) {
            confirm(quantity)
        }
    }, [confirm, quantity])

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={'current stock quantities'}
                        fullWidth
                        variant="standard"
                        type="number"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setQuantity({ ...quantity, currentStock: event.target.value });
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={'ordered stock quantities'}
                        fullWidth
                        variant="standard"
                        type="number"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setQuantity({ ...quantity, orderedStock: event.target.value });
                        }}
                    />
                    <select>
                        {products?.map((x, idx) =>
                            <option key={idx} value={x.name} onClick={() => {
                                setQuantity({ ...quantity, id: x.id, name: x.name })
                            }}>{x.name}</option>
                        )}
                    </select>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="info" onClick={handleConfirm} disabled={!quantity}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}