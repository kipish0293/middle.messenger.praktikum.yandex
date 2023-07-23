export function validatorForm(inputElements: Element[] | null): boolean {
    const hasError = inputElements!.some((element) => {
        const inp = element as HTMLInputElement;
        return !validatorInput(inp)
    })

    return hasError
}

function addClass(inputNode: HTMLInputElement) {
    inputNode.classList.add("input-error");
}

function removeClass(inputNode: HTMLInputElement) {
    inputNode.classList.remove("input-error");
}

function checkLogin(inputValue: string, inputNode: HTMLInputElement) {
    const check = /^(?=.*[a-zA-Z])[\w\d_-]{3,20}/.test(inputValue)
    check ? removeClass(inputNode) : addClass(inputNode)
    return check
}

function checkPassword(inputValue: string, inputNode: HTMLInputElement) {
    const check = /^(?=.*[A-Z])[a-zA-Z0-9_-]{8,20}/.test(inputValue)
    check ? removeClass(inputNode) : addClass(inputNode)
    return check
}

function checkName(inputValue: string, inputNode: HTMLInputElement) {
    const check = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(inputValue)
    check ? removeClass(inputNode) : addClass(inputNode)
    return check
}

function checkEmail(inputValue: string, inputNode: HTMLInputElement) {
    const check = /^[a-zA-Z_-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/.test(inputValue)
    check ? removeClass(inputNode) : addClass(inputNode)
    return check
}

function checkPhone(inputValue: string, inputNode: HTMLInputElement) {
    const check = /^\+?[0-9]{10,15}$/.test(inputValue)
    check ? removeClass(inputNode) : addClass(inputNode)
    return check
}

function checkMessage(inputValue: string, inputNode: HTMLInputElement) {
    const check = /^.+$/.test(inputValue)
    check ? removeClass(inputNode) : addClass(inputNode)
    return check
}

export function validatorInput(inputNode: HTMLInputElement) {
    const { name: inputName, value: inputValue } = inputNode;
    console.log(inputNode, inputName, inputValue)

    switch (inputName) {
        case "login":
            return checkLogin(inputValue, inputNode)
        case "password":
            return checkPassword(inputValue, inputNode)
        case "first_name":
            return checkName(inputValue, inputNode)
        case "second_name":
            return checkName(inputValue, inputNode)
        case "email":
            return checkEmail(inputValue, inputNode)
        case "phone":
            return checkPhone(inputValue, inputNode)
        case "message":
            return checkMessage(inputValue, inputNode)
        default:
            return true
    }
}
