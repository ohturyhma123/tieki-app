import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

const SaveConfirm = ({ open, onClose }) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Tietojen tallennus epäonnistui
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { onClose() }} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SaveConfirm
