import React, {useCallback, useLayoutEffect} from "react"
import {useFieldContent} from "./context/FieldContext"
import type {EventArgs, NamePath, Rule, StoreValue} from "./types/interface"
import {Store} from "./types/interface";
import {defaultGetValueFromEvent} from "./utils/valueUtil";

interface FiledProps {
    children: React.ReactElement
    name: NamePath
    rules?: Rule[]
    trigger?: string
    valuePropName?: string
    getValueProps?: (value: StoreValue) => Record<string, unknown>
    getValueFromEvent?: (...args: EventArgs) => StoreValue
}

const Field: React.FC<FiledProps> = (props) => {
    const { children, name, trigger = 'onChange', valuePropName = 'value', getValueProps, getValueFromEvent } = props;
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

    const getControlled = useCallback((childProps: Store = {}) => {
        const mergedGetValueProps = getValueProps || ((val: StoreValue) => ({ [valuePropName]: val }))
        const value: StoreValue = (getFieldValue && getFieldValue(name)) || undefined

        const control = {
            ...childProps,
            ...mergedGetValueProps(value)
        }

        control[trigger] = (...args: EventArgs) => {
            let newValue: StoreValue
            if (getValueFromEvent) {
                newValue = getValueFromEvent(...args)
            } else {
                newValue = defaultGetValueFromEvent(valuePropName, ...args)
            }
            setFieldsValue && setFieldsValue({ [name]: newValue })
        }

        return control
    }, [name])

    return React.cloneElement(children, getControlled(children.props))
};

export default Field
