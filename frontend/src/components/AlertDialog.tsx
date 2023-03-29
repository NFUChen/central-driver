import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  isOpen: boolean
  handleDisagree: () => void
  handleAgree: () => void
}

export const AlertDialog: React.FC<AlertDialogProps> = ({isOpen, handleDisagree, handleAgree})   => {
  return (
    <>
      <Dialog
        open={isOpen}
      >
        <DialogTitle id="alert-dialog-title">
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset?
          </DialogContentText>
          <DialogContentText>
            All inforamtion will be gone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>No</Button>
          <Button onClick={handleAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}