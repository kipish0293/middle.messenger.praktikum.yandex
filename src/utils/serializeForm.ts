export default function serializeForm(formNode: EventTarget | null) {
    if (!formNode) {
        return { formData: null, inputElements: null };
    }
    const { elements } = formNode as HTMLFormElement;
    const inputElements = Array.from(elements).filter((item) => {
        if (item instanceof HTMLInputElement) {
            return !!item.name;
        }
        return false;
    });
    const formData = inputElements.map((element: any) => {
        const { name, type } = element as HTMLInputElement;
        const value = type === 'checkbox' ? element.checked : element.value
        return [name, value];
    });

    return { formData: Object.fromEntries(formData), inputElements};
}
