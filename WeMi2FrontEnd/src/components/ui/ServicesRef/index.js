
export const getRef = () => {
    return sessionStorage.getItem('servicesRef')
}
export const setRef = value =>{
    sessionStorage.setItem('servicesRef', value.current.offsetParent.offsetTop)
}