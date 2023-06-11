import * as Yup from 'yup';



const AddAttributeGroupValidationSchema = Yup.object().shape({
    attrKey: Yup.string().required('attribute key is required'),
    attrValues: Yup.string().required('attribute values is required')
});


export default AddAttributeGroupValidationSchema;