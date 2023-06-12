import { Typography } from '@mui/material';
import { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Stack } from '@mui/system';
import { ArrowForwardIos } from '@mui/icons-material';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import DiscountCard from '../../../components/DiscountCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/services/product.service';


export default function BigDiscounts() {

    const products = useSelector((state) => state.products.data);
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    return (
        <Stack direction={'column'}>
            <div style={{ marginBottom: '40px' }}>

                <Stack direction={'row'} justifyContent="space-between" alignItems="flex-end" >
                    <Typography variant="h5" color='primary' gutterBottom my={3} sx={{ fontWeight: 'bold' }}>
                        <CardGiftcardRoundedIcon fontSize='large' color='error' />  Big Discounts
                    </Typography>
                    <Typography variant="subtitle2" color='primary' gutterBottom my={3}>
                        view more  <ArrowForwardIos fontSize='small' />
                    </Typography>
                </Stack>

                {
                    loading
                        ?
                        <Typography variant="subtitle2" align="center" color='info' my={10}>loading.....</Typography>
                        :
                        <>
                            {
                                error
                                    ?
                                    <Typography variant="subtitle2" align="center" color='error' my={10}>{error}</Typography>

                                    :
                                    <Carousel
                                        additionalTransfrom={0}
                                        arrows
                                        autoPlaySpeed={3000}
                                        centerMode={false}
                                        className=""
                                        dotListClass=""
                                        draggable
                                        focusOnSelect={false}
                                        infinite
                                        itemClass="item-card"
                                        keyBoardControl
                                        minimumTouchDrag={80}
                                        pauseOnHover
                                        renderArrowsWhenDisabled={false}
                                        renderButtonGroupOutside={false}
                                        renderDotsOutside={false}
                                        responsive={{
                                            desktop: {
                                                breakpoint: {
                                                    max: 3000,
                                                    min: 250
                                                },
                                                items: 6,
                                                partialVisibilityGutter: 40
                                            },
                                            mobile: {
                                                breakpoint: {
                                                    max: 464,
                                                    min: 0
                                                },
                                                items: 1,
                                                partialVisibilityGutter: 30
                                            },
                                            tablet: {
                                                breakpoint: {
                                                    max: 1024,
                                                    min: 10
                                                },
                                                items: 2,
                                                partialVisibilityGutter: 30
                                            }
                                        }}
                                        rewind={true}
                                        rewindWithAnimation={true}
                                        rtl={false}
                                        shouldResetAutoplay={false}
                                        showDots={false}
                                        sliderClass=""
                                        slidesToSlide={1}
                                        swipeable
                                    >
                                        {products.map((product) => {
                                            return (
                                                    <DiscountCard key={product.id} props={product} />
                                            );
                                        })}
                                    </Carousel>
                            }
                        </>
                }








            </div>
        </Stack>


    );
}