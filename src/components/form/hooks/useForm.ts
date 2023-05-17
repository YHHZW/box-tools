import {useRef} from "react";
import type {FormInstance} from "../types/interface";
import FormFactory from "../factory/FormFactory";

function useForm<T>(form?: FormInstance<T>): [FormInstance<T>] {
    const formRef = useRef<FormInstance>()
    if (!formRef.current) {
        if (form) {
            formRef.current = form
        } else {
            const formFactory = new FormFactory()
            formRef.current = formFactory.getForm()
        }
    }
    return [formRef.current]
}

export default useForm