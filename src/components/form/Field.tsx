import React, { ChangeEvent, useLayoutEffect } from "react"
import {useFieldContent} from "./context/FieldContext"
import type { NamePath, Rule } from "./types/interface"


type FiledProps = {
    children: React.ReactElement
    name: NamePath
    rules: Rule[]
}

const Field: React.FC<FiledProps> = (props) => {
    const { children, name } = props;
    const { getFieldValue, setFieldsValue, registerFieldEntities } = useFieldContent()

    const [, forceUpdate] = React.useReducer((x) => x + 1, 0)

    useLayoutEffect(() => {
        const unregister =
            registerFieldEntities &&
            registerFieldEntities({
                props,
                onStoreChange: forceUpdate,
            });
        return unregister;
    }, [])

    const getControlled = () => {
        return {
            value: (getFieldValue && getFieldValue(name)) || "",
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const newValue = e?.target?.value;
                setFieldsValue && setFieldsValue({ [name]: newValue });
            },
        }
    }
    return React.cloneElement(children, getControlled())
};

export default Field
