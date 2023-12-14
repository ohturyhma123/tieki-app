import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const SaveConfirm = ({ open, onClose }) => {
  const navigate = useNavigate()

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
          Tiedot tallennettu onnistuneesti
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { onClose(); navigate('/edit') }} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SaveConfirm