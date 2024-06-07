import * as yup from 'yup'; 

const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

const addContactSchema = yup.object().shape({
    name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    email: yup.string().email('Email is not valid'),
    number: yup.array().of(
        yup.string().matches(phoneNumberRegex, 'Phone number is not valid')
    ).required('Phone is required'),
})

export default addContactSchema;