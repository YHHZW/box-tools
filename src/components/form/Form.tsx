import React, {useLayoutEffect, useRef} from "react"
import FieldContext from "./context/FieldContext";
import type {Callbacks, FormInstance, Store} from './types/interface'
import useForm from "./hooks/useForm";

interface FormProps extends Callbacks{
    children?: React.ReactElement | React.ReactElement[]
    form?: FormInstance
    initialValues?: Store
}

const Form: React.FC<FormProps> = (props) => {
    const { children, onFinish, onFinishFailed, form, initialValues = {} } = props
    const [ formInstance ] = useForm(form)

    formInstance.setCallbacks({ onFinish, onFinishFailed })

    const mountRef = useRef<boolean | null>(null)
    formInstance.setInitialValues(initialValues, !mountRef.current)
    if (!mountRef.current) {
        mountRef.current = true
    }

    return (
        <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                e.stopPropagation()

                formInstance.submit()
            }}

            onReset={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()

                formInstance.resetFields()
            }}
        >
            <FieldContext.Provider value={formInstance}>
                {children}
            </FieldContext.Provider>
        </form>
    )
}

export default Form