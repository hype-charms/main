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
  orderId: string[];
}
export const TrackingNumberFormDialog: FC<FormDialogProps> = ({ confirm, cancel, open, orderId }) => {

  const [tracking_number, setTracking_number] = useState<string | null>();

  const handleClose = useCallback(() => {
    cancel();
  }, [cancel])

  const handleConfirm = useCallback(() => {
    if (tracking_number) {
      confirm(tracking_number)
    }
  }, [confirm, tracking_number])

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update order tracking number</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Updating order {orderId[0]}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={'Enter a tracking number to update'}
            fullWidth
            variant="standard"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTracking_number(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
          <Button color="info" onClick={handleConfirm} disabled={!tracking_number}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}