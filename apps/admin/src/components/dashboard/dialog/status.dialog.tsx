import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useCallback, useState } from 'react'
import { ShippingStatus } from '../../../models/orders.model';

export interface FormDialogProps {
  confirm: (data: ShippingStatus) => void;
  cancel: () => void;
  open: boolean;
  orderId: string[];
}
export const StatusFormDialog: FC<FormDialogProps> = ({ confirm, cancel, open, orderId }) => {

  const [status, setStatus] = useState<ShippingStatus | null>();

  const handleClose = useCallback(() => {
    cancel();
  }, [cancel])

  const handleConfirm = useCallback(() => {
    if (status) {
      confirm(status)
    }
  }, [confirm, status])

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update order shipping status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Updating orders {orderId.map(x => <>{x}<br /></>)}
          </DialogContentText>
          <select>
            {Object.values(ShippingStatus).map(x => <option onClick={() => setStatus(x)} key={x}>{x}</option>)}
          </select>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
          <Button color="info" onClick={handleConfirm} disabled={!status}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}