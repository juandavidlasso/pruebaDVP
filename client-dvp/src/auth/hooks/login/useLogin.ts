import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import type { FormDataLogin } from "../../../shared/types/login";

const schemaValidation = yup.object({
    email: yup.string().email().required('The email is required'),
    password: yup.string().required('The password is required'),
}).required()


export const useLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataLogin>({
        resolver: yupResolver(schemaValidation),
        mode: "all",
    })
    
    const onSubmit = handleSubmit((data) => console.log(data))

    return {
        errors,
        register,
        onSubmit,
    }
}