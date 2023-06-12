
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Stack } from '@mui/system';



export default function SpecificationTap({ productSpecification }) {
    const [specification, setSpecification] = useState([]);

    useEffect(() => {
        setSpecification(productSpecification);
    }, []);

    return (
        <>
            <Typography variant="h4" color={'info'} sx={{ fontWeight: 'bold', marginY: 2 }}>Product Specifications: </Typography>
            <Stack direction={'column'}>
                {
                    specification.map((item) => {
                        return (
                                <Typography key={item.skey} variant="" color={'default'}>{item.skey} : {item.svalue}</Typography>
                        )
                    })
                }
            </Stack>
        </>
    )
}