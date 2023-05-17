import React from "react"
import {createRoot} from "react-dom/client";
import FormTest from "./FormTest";

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(<FormTest />)