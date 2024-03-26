
import { Router } from "express";
import btoa from "btoa";
import User from "../../dto/UtenteDTO";
import { UNAUTHENTICATED, COOKIE_SESSION } from "../../constants/constants";
import UserDomain from "../../domain/UtenteDomain";
import { isNull, isNullOrUndefined } from "util";
import { SUCCESS, INTERNAL_SERVER_ERROR, FORBIDDEN } from "../../constants/statuscode";
import { HEADER_NAME } from "../../constants/authentication/cookie";
import { logger } from "utility/logger/getInstance";

/**
 * 
 * EndPoint to logout and invalidate the token
 * 
 */
const invokeLogout = Router();

invokeLogout.get('/', async (req, res) => {
    /* TODO SOMETHING */
    try {
        const token = req.headers[HEADER_NAME] || req.cookies[HEADER_NAME];
        logger.info('logging out.....');
        if (!isNullOrUndefined(token) && token !== UNAUTHENTICATED) {
            const utenteDomain = new UserDomain();
            const utente = new User();
            utente.setToken(btoa(token));
            const risultato = await utenteDomain.deleteUserToken(utente);
            if (!isNull(risultato)) {
                res.setHeader(HEADER_NAME, UNAUTHENTICATED);
                res.clearCookie(HEADER_NAME);
                res.clearCookie(COOKIE_SESSION);
                res.status(SUCCESS).send({ success: true });
            }
            else {
                res.status(SUCCESS).send({ success: false });
            }
        }
        else {
            res.status(FORBIDDEN).send({ success: false });
        }
    }
    catch (error) {
        logger.error(error, 'Error invoke logout');
        res.status(INTERNAL_SERVER_ERROR).send({ success: false });
    }
});

export { invokeLogout };