export function generateRandomSeed() {
    return Math.random().toString(36).substring(2, 10);
}

export function dateComparator(date1: string, date2: string) {
    const date1Number = monthToComparableNumber(date1);
    const date2Number = monthToComparableNumber(date2);
    if (date1Number === null && date2Number === null) {
        return 0;
    }
    if (date1Number === null) {
        return -1;
    }
    if (date2Number === null) {
        return 1;
    }
    return date1Number - date2Number;
}


export function monthToComparableNumber(date: string) {
    if (date === undefined || date === null || date.length !== 10) {
        return null;
    }
    const yearNumber = Number.parseInt(date.substring(6, 10));
    const monthNumber = Number.parseInt(date.substring(3, 5));
    const dayNumber = Number.parseInt(date.substring(0, 2));
    return yearNumber * 10000 + monthNumber * 100 + dayNumber;
}

export function getRandomColor() {
    const colorsArr = ['success', 'error', 'secondary', 'primary', 'warning'];

    return colorsArr[Math.floor(Math.random() * 5)]
}