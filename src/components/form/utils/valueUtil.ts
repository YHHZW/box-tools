import {EventArgs} from "../types/interface"

export function defaultGetValueFromEvent(valuePropName: string, ...args: EventArgs) {
    const event = args[0]
    if (event && event.target && typeof event.target === 'object' && valuePropName in event.target) {
        return event.target[valuePropName]
    }
    return event
}