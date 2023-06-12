import * as Yup from 'yup';



const AddReviewValidationSchema = Yup.object().shape({
    text: Yup.string().required('review is required')
});


export default AddReviewValidationSchema;