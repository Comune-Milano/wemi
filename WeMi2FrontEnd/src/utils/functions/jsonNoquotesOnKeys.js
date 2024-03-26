const jsonNoquotesOnKeys = (obj) => {
    if (typeof obj === "object")
        obj = JSON.stringify(obj);
    obj = obj.replace(/"(\w+)"\s*:/g, '$1:');
    return obj;
}

export default jsonNoquotesOnKeys;