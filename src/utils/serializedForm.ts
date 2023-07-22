export default function serializeForm(formNode: EventTarget | null) {
  if (!formNode) {
    return null;
  }
  const { elements } = formNode as HTMLFormElement;
  const data = Array.from(elements)
    .filter((item) => {
      if (item instanceof HTMLInputElement) {
        return !!item.name;
      }
      return false;
    })
    .map((element) => {
        const { name, value } = element as HTMLInputElement;
        return [ name, value ];
    });

    console.log(Object.fromEntries(data))
  return Object.fromEntries(data);
}
