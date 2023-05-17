import {createContext, useContext} from "react";
import type { FormInstance } from '../types/interface'

const FieldContext = createContext<Partial<FormInstance>>({})

export function useFieldContent(): Partial<FormInstance> {
    return useContext(FieldContext)
}

export default FieldContext