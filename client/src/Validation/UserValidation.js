import * as yup from 'yup'
export const userSchema=yup.object().shape({
    name:yup.string().required('Please Enter A Full Name'),
    email:yup.string().email('Please Enter A Valid Email').required('Please Enter An Email'),
    password:yup.string().min(8).required('Please Enter A Password'),
    passwordConfirm:yup.string().required('Please Confirm Your Password')}).oneOF([yup.ref("password"),null])