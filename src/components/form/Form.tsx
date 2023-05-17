import React from "react"
import FieldContext from "./context/FieldContext";
import type {Callbacks, FormInstance} from './types/interface'
import useForm from "./hooks/useForm";

interface FormProps extends Callbacks{
    children?: React.ReactElement | React.ReactElement[]
    form?: FormInstance;
}

const Form: React.FC<FormProps> = (props) => {
    const { children, onFinish, onFinishFailed, form } = props
    const [ formInstance ] = useForm(form)
    formInstance.setCallbacks({ onFinish, onFinishFailed })

    return (
        <form
            onSubmit={e => {
                e.preventDefault()
                formInstance.submit()
            }}
        >
            <FieldContext.Provider value={formInstance}>
                {children}
            </FieldContext.Provider>
        </form>
    )
}

export default Form