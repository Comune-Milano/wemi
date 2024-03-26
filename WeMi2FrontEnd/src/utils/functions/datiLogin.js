
export const validateLoginData  = () => {
    try{
        const sessionData = sessionStorage.getItem('userData');
        const readSession = JSON.parse(sessionData);
        return readSession;
    }
    catch(error){
        return null;
    }
}