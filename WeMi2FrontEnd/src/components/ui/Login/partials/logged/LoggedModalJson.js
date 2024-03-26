/** @format */

import contacts from 'images/homepage/navbar/usermodal/contactsIcon.png';
import login from 'images/homepage/navbar/usermodal/loginIcon.png';
import register from 'images/homepage/navbar/usermodal/registerIcon.png';
import { PAGE_AREAPERSONALE_URL, PAGE_AREAPERSONALELAVORATORE_URL } from 'types/url';

const LoggedModalJson = {
    Cittadino: [{
        profile: "C",
        img: login,
        text: 'Area riservata',
        button: 'Entra',
        url: PAGE_AREAPERSONALE_URL,
    },
    {   profile: "C",
        img: contacts,
        text: 'Disconnettiti',
        button: 'Logout',
        url: '/',
        logout: true,
    }],
    Lavoratore: [{
        profile: "L",
        img: login,
        text: 'Area riservata',
        button: 'Entra',
        url: PAGE_AREAPERSONALE_URL,
    },
    {
        profile: "L",
        img: contacts,
        text: 'Disconnettiti',
        button: 'Logout',
        url: '/',
        logout: true,
    }],
    Ente: [{
        profile: "E",
        img: contacts,
        text: 'Area riservata Ente',
        button: 'Entra',
        url: PAGE_AREAPERSONALE_URL,
        logout: false,
    },
    {   profile: "E",
        img: contacts,
        text: 'Disconnettiti',
        button: 'Logout',
        url: '/',
        logout: true,
    }],
    Amministratore: [{
        profile: "A",
        img: contacts,
        text: 'Area riservata Amministratore',
        button: 'Entra',
        url: PAGE_AREAPERSONALE_URL,
    },
    {
        profile: "A",
        img: contacts,
        text: 'Disconnettiti',
        button: 'Logout',
        url: '/',
        logout: true,
    }]
};

export default LoggedModalJson;
