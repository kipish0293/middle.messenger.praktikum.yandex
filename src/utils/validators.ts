export function validatorForm(inputElements: Element[] | null): boolean {
    const hasError = inputElements!.some((element) => {
        const inp = element as HTMLInputElement;
        return !validatorInput(inp)
    })

    return hasError
}

function addClass(inputNode: HTMLInputElement, helperText: string = "") {
    inputNode.classList.add("input-error");
    inputNode.nextElementSibling!.textContent = helperText
}

function removeClass(inputNode: HTMLInputElement) {
    inputNode.classList.remove("input-error");
    inputNode.nextElementSibling!.textContent = null
}

function checkLogin(inputValue: string, inputNode: HTMLInputElement) {
    const check = /^(?=.*[a-zA-Z])[\w\d_-]{3,20}/.test(inputValue)
    const helperText = `От 3 до 20 символов, латиница, может содержать цифры,
    но не состоять из них, без пробелов,
    без спецсимволов (допустимы дефис и нижнее подчёркивание)`
    check ? removeClass(inputNode) : addClass(inputNode, helperText)
    return check
}

function checkPassword(inputValue: string, inputNode: HTMLInputElement) {
    const check = /^(?=.*[A-Z])[a-zA-Z0-9_-]{8,20}/.test(inputValue)
    const helperText = `От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра`
    check ? removeClass(inputNode) : addClass(inputNode, helperText)
    return check
}

function checkName(inputValue: string, inputNode: HTMLInputElement) {
    const check = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(inputValue)
    const helperText = `Латиница или кириллица, первая буква должна быть заглавной,
    без пробелов и без цифр, нет спецсимволов (допустим только дефис)`
    check ? removeClass(inputNode) : addClass(inputNode, helperText)
    return check
}

function checkEmail(inputValue: string, inputNode: HTMLInputElement) {
    const check = /^[a-zA-Z_-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/.test(inputValue)
    const helperText = `Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания,
    обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы`
    check ? removeClass(inputNode) : addClass(inputNode, helperText)
    return check
}

function checkPhone(inputValue: string, inputNode: HTMLInputElement) {
    const check = /^\+?[0-9]{10,15}$/.test(inputValue)
    const helperText = `От 10 до 15 символов, состоит из цифр, может начинается с плюса`
    check ? removeClass(inputNode) : addClass(inputNode, helperText)
    return check
}

function checkMessage(inputValue: string, inputNode: HTMLInputElement) {
    const check = /^.+$/.test(inputValue)
    const helperText = `Не должно быть пустым`
    check ? removeClass(inputNode) : addClass(inputNode, helperText)
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
