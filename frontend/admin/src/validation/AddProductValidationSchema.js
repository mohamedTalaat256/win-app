import * as Yup from 'yup';



const AddProductValidationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    sku: Yup.string().required('sku is required'),
    price: Yup.number().required('price is required'),
    discount: Yup.number().required('discount is required'),
    stockQti: Yup.number().required('stockQti qti is required'),
    description: Yup.string()
      .required('description is required')
      .min(6, 'Username must be at least 6 characters')
      .max(120, 'Username must not exceed 120 characters'),
    
});


export default AddProductValidationSchema;