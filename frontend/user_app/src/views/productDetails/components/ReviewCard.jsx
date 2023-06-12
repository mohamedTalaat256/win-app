import { Avatar, Box, CardActions, CardContent,IconButton,Rating, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import imagesUrl from "../../../imagesUrl";

export default function ReviewCard({review}) {

    return (
        <>
            <Box sx={{ maxWidth: '50%', padding: 1 }} key={review.id}>
                <CardActions>
                    <Avatar src={imagesUrl+review.user.image} sx={{ marginX: 1 }} />

                    <Stack direction={'column'}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{review.user.fullName}</Typography>
                        <Rating name="read-only" value={review.reviewValue} readOnly />
                        <Typography sx={{mt:1}} variant="subtitle2" color={'info'}>
                        {review.text}
                    </Typography>
                    </Stack>
                </CardActions>             
            </Box>
        </>
    )

}