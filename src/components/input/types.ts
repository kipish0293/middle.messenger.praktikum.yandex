export type InputType = {
    name: string,
    label: string,
    type: string,
    placeholder: string,
    value: string,
    disabled: string,
    required: string,
    events?: Record<string, (e: Event) => void>,
    attr: Record<string, any>
}