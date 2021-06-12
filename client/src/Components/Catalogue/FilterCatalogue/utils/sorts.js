

export const sortNameAsc = (arr) => {
    return arr.sort(function (a, b) {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
        return 0;
    })
}

export const sortNameDesc = (arr) => {
    return arr.sort(function (a, b) {
        if (a.name.toUpperCase() < b.name.toUpperCase()) return 1;
        if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
        return 0;
    })
}

export const sortAscending = (arr, prop) => {
    return arr.sort(function (a, b) {
        if (Number(a[prop]) > Number(b[prop])) return 1;
        if (Number(a[prop]) < Number(b[prop])) return -1;
        return 0;
    })
}

export const sortDescending = (arr, prop) => {
    return arr.sort(function (a, b) {
        if (Number(a[prop]) < Number(b[prop])) return 1;
        if (Number(a[prop]) > Number(b[prop])) return -1;
        return 0;
    })
}