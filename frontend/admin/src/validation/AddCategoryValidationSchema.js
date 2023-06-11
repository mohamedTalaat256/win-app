import * as Yup from 'yup';



const AddCategoryValidationSchema = Yup.object().shape({
    name: Yup.string().required('category name is required'),
    description: Yup.string()
      .required('category description is required')
      .min(6, 'category must be at least 6 characters')
      .max(20, 'category must not exceed 20 characters')
});


export default AddCategoryValidationSchema;