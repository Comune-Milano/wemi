

export const setCheckBoxCarattere = (id, arrayCarattere) => {
    let newArr = arrayCarattere.length ? arrayCarattere.slice() : [];
    if (newArr.includes(id)) {
        return newArr.filter(el => el !== id);
    }
    return newArr.concat(id);
};