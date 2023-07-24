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
    const formData = inputElements.map((element) => {
        const { name, value } = element as HTMLInputElement;
        return [name, value];
    });

    console.log(Object.fromEntries(formData))

    return { formData : JSON.stringify(Object.fromEntries(formData), null, 2), inputElements};
}
