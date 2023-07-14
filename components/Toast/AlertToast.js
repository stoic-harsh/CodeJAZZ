import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertToast({ open, color, message, setOpen }) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  let vertical="bottom", horizontal="center";

  return (

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical+horizontal}>
        <Alert onClose={handleClose} severity={color} className="w-[220px] sm:w-[100%]" >
          { message }
        </Alert>
      </Snackbar>

  );
}