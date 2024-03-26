/** @format */

import contacts from 'images/homepage/navbar/usermodal/contactsIcon.png';
import login from 'images/homepage/navbar/usermodal/loginIcon.png';
import register from 'images/homepage/navbar/usermodal/registerIcon.png';

export const LoggedModalJson = {
    Cittadino: [{
        img: login,
        text: 'Area riservata Cittadino',
        button: 'Entra',
        url: '/it/AreaPersonale',
    },
    {
        img: contacts,
        text: 'Disconnettiti',
        button: 'Logout',
        url: '/',
        logout: true,
    }],
    Lavoratore: [{
        img: register,
        text: 'Area riservata Lavoratore',
        button: 'Entra',
        url: '/it/AreaPersonale',
    },
    {
        img: contacts,
        text: 'Disconnettiti',
        button: 'Logout',
        url: '/',
        logout: true,
    }],
    Ente: [{
        img: contacts,
        text: 'Area riservata Ente',
        button: 'Entra',
        url: '/it/AreaPersonale',
        logout: false,
    },
    {
        img: contacts,
        text: 'Disconnettiti',
        button: 'Logout',
        url: '/',
        logout: true,
    }],
    Amministratore: [{
        img: contacts,
        text: 'Area riservata Amministratore',
        button: 'Entra',
        url: '/it/AreaPersonale',
    },
    {
        img: contacts,
        text: 'Disconnettiti',
        button: 'Logout',
        url: '/',
        logout: true,
    }]
}
