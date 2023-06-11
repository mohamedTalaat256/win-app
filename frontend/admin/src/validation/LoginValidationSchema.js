import * as Yup from 'yup';



const LoginValidationSchema = Yup.object().shape({
  username: Yup.string().required('username is required')
    //.email('provide a valid email'),

    ,password: Yup.string()
      .required('password describtion is required')
      //.min(6, 'password must be at least 6 characters')
     // .max(20, 'password must not exceed 20 characters')
});


export default LoginValidationSchema;