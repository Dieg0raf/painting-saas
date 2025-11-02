export function isValidIndex(
    index: number,
    arrayLength: number,
    context: string = "index"
): boolean {
    if (index < 0 || index >= arrayLength) {
        console.error(
            `Invalid ${context} index: ${index}. Array length: ${arrayLength}`
        );
        return false;
    }
    return true;
}

export function isArray(
    value: unknown,
    context: string = "value"
): value is unknown[] {
    if (!Array.isArray(value)) {
        console.error(`${context} is not an array`);
        return false;
    }
    return true;
}

export function isValidIndexAndArray<T>(
    index: number,
    array: unknown,
    context: string = "item"
): array is T[] {
    if (!isArray(array, context)) {
        return false;
    }
    return isValidIndex(index, array.length, context);
}
