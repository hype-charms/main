import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useCallback, useState } from 'react'
import { Carriers } from '../../../models/orders.model';

export interface FormDialogProps {
  confirm: (data: Carriers) => void;
  cancel: () => void;
  open: boolean;
  orderId: string[];
}
export const CarrierFormDialog: FC<FormDialogProps> = ({ confirm, cancel, open, orderId }) => {

  const [carrier, setCarrier] = useState<Carriers | null>();

  const handleClose = useCallback(() => {
    cancel();
  }, [cancel])

  const handleConfirm = useCallback(() => {
    if (carrier) {
      confirm(carrier)
    }
  }, [confirm, carrier])

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Orders Carriers</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Updating orders {orderId.map(x => <>{x}<br /></>)}
          </DialogContentText>
          <select>
            {Object.values(Carriers).map(x => <option onClick={() => setCarrier(x)} key={x}>{x}</option>)}
          </select>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
          <Button color="info" onClick={handleConfirm} disabled={!carrier}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}