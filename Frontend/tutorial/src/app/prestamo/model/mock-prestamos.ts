import { PrestamoPage } from "../model/PrestamoPage";

export const PRESTAMOS_DATA: PrestamoPage = {
    content: [
        { id: 1, gamename: 'Catan', clientname: 'Pau Aguilar', fechaprestamo: new Date(), fechadevolucion: new Date() },
        { id: 2, gamename: 'Pandemic', clientname: 'Pau Aguilar', fechaprestamo: new Date(), fechadevolucion: new Date() },
        { id: 3, gamename: 'Carcassonne', clientname: 'Maria', fechaprestamo: new Date(), fechadevolucion: new Date() },
        { id: 4, gamename: 'Dixit', clientname: 'Ana', fechaprestamo: new Date(), fechadevolucion: new Date() },
        { id: 5, gamename: '7 Wonders', clientname: 'Luis', fechaprestamo: new Date(), fechadevolucion: new Date() },
        { id: 6, gamename: 'Ticket to Ride', clientname: 'Carlos', fechaprestamo: new Date(), fechadevolucion: new Date() },
        { id: 7, gamename: 'Dominion', clientname: 'Sofia', fechaprestamo: new Date(), fechadevolucion: new Date() },
        ],
        
        pageable: {
            pageSize: 5,
            pageNumber: 0,
            sort: [{ property: 'id', direction: 'ASC' }],
        },
        totalElements: 7,

}