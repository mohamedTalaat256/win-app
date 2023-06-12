import { Avatar, CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DefaultHeader() {

    return (
        <>

        <CardHeader
                    
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title='Select User To Chat'
                    subheader=''
                />

        </>
    )
}