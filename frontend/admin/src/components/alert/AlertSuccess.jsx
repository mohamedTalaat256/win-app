// @mui
import { Alert, IconButton, Collapse} from '@mui/material';
import { useState } from 'react';


export default function AlertSuccess({message}){
    const [open, setOpen] = useState(true);

    return(
        <>
        <Collapse in={open}>
        <Alert
        
          action={
            <IconButton
              aria-label="close"
              color="success"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
             x
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
         {message}
        </Alert>
      </Collapse>
        </>
    );
}