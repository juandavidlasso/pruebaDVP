import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import type { FormDataRegister } from "../../../shared/types/register";

const schemaValidation = yup.object({
    email: yup.string().email().required('The email is required'),
    password: yup.string().required('The password is required'),
}).required()


export const useRegister = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataRegister>({
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