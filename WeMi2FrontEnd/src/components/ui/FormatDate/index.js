export const FormatDate = (day, format) => {
    let inputValue = ''
    if (day) {
    if(typeof day === 'string') {
    if(format === 'it') {
    let year = day.split('T')[0].split('-')[0];
    let month = day.split('T')[0].split('-')[1].split('-')[0];
    let dayValue = day.split('T')[0].split('-')[2];
    inputValue = `${dayValue}/${month}/${year}`;
    }
    else if(format === 'db') {
        let year = day.split('T')[0].split('-')[0];
        let month = day.split('T')[0].split('-')[1].split('-')[0];
        let dayValue = day.split('T')[0].split('-')[2];
        inputValue = `${year}-${month}-${dayValue}`;
        }

    }
    else if(format === 'db') {
        let year = day.toJSON().split('T')[0].split('-')[0];
        let month = day.toJSON().split('T')[0].split('-')[1].split('-')[0];
        let dayValue = day.toJSON().split('T')[0].split('-')[2];
        inputValue = `${year}-${month}-${dayValue}`;
        }
    else {
        let year = day.toJSON().split('T')[0].split('-')[0];
        let month = day.toJSON().split('T')[0].split('-')[1].split('-')[0];
        let dayValue = day.toJSON().split('T')[0].split('-')[2];
        inputValue = `${dayValue}/${month}/${year}`;
    }
}
    return inputValue
}