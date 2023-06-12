import {  Card, Stack, Typography } from "@mui/material";



export default function ShopNowHeader() {



    return (
        <>
            <Card sx={{ height: 100, marginTop: 12,padding: 2 }}>
                <Stack direction={'column'} spacing={2}>
                <Typography variant='h6' color={'info'}>
                    Searching for “ Cars ”
                </Typography>

                <Typography variant='subtitle2' color={'info'} >
                 
                    3 results found
                </Typography>
                </Stack>
                

            </Card>
        </>
    )
}