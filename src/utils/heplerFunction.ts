import Block from "../helpers/block";

type Indexed<T = any> = {
    [key in string]: T;
};

type PlainObject<T = any> = {
    [k in string]: T;
};

//функция - склеивает два объекта
export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

//функция - устанавливает полученное значение по указанному пути
export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== "string") {
        throw Error("path must be string");
    }

    if (typeof object !== "object") {
        return value;
    }

    const splittedPath = path.split(".");
    const result = splittedPath.reduceRight<Indexed>(
        (previousValue, currentValue) => ({
            [currentValue]: previousValue,
        }),
        value as any
    );

    return merge(object as Indexed, result as Indexed);
}

export function isPlainObject(value: unknown): value is PlainObject {
    return (
        typeof value === "object" &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === "[object Object]"
    );
}

export function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject): boolean {
    if (Object.keys(lhs)?.length !== Object.keys(rhs)?.length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

export function trim(string: string, chars?: string): string {
    if (string && !chars) {
        return string.trim();
    }

    const reg = new RegExp(`[${chars}]`, "gi");
    return string.replace(reg, "");
}

export const debounce = (fn: any, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export function renderPage(query: string = "#app", block: Block) {
    const root = document.querySelector(query);
    if (root) {
        root.appendChild(block.getContent()!);
    }
    block.dispatchComponentDidMount();
    return root;
}
