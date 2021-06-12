//simula la respuesta del back a un get a la ruta que devuelve las categorias

export const categories = [
    {
        id: 0,
        name: 'Anillos',
        img: 'https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'
    },
    {
        id: 1,
        name: 'Collares',
        img: 'https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'
    },
    {
        id: 2,
        name: 'Aretes',
        img: 'https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'
    },
    {
        id: 3,
        name: 'Earcuffs',
        img: 'https://i.pinimg.com/736x/9a/d7/06/9ad7065d354a328708fccc8a6b930d30.jpg'
    },
    {
        id: 4,
        name: 'Sets',
        img: 'https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'
    },
    {
        id: 5,
        name: 'Cuelga Gafas',
        img: 'https://http2.mlstatic.com/D_NQ_NP_721564-MCO43970127309_112020-O.jpg'
    },
    {
        id: 6,
        name: 'Fichas de Alf',
        img: 'https://www.tierragamer.com/wp-content/uploads/2018/08/ALF_Fichas.jpg'
    },
]


const anillos = [{ id: 1, name: 'Un anillo', price: '1000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '3' },
{ id: 2, name: 'Un anillo', price: '1000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '3' },
{ id: 3, name: 'otro anillo', price: '1000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '3' },
{ id: 4, name: 'Un anillo mas', price: '1000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '3' },
{ id: 5, name: 'Un anillo', price: '1000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '3' }
]
const collares = [{ id: 1, name: 'Un collar', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'], review: '3' },
{ id: 2, name: 'Un collar', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'], review: '3' },
{ id: 3, name: 'Un collar', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'], review: '3' },
{ id: 4, name: 'Un collar', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'], review: '3' }
]
const aretes = [{ id: 1, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: 2, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: 3, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id:4, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: 5, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: 6, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: 7, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' }
]
const earcuffs = [{ id: 8, name: 'Un earcuffs', price: '1000', image: ['https://i.pinimg.com/736x/9a/d7/06/9ad7065d354a328708fccc8a6b930d30.jpg'], review: '3' },
{ id: 9, name: 'Un earcuffs', price: '1000', image: ['https://i.pinimg.com/736x/9a/d7/06/9ad7065d354a328708fccc8a6b930d30.jpg'], review: '3' },
{ id: 10, name: 'Un earcuffs', price: '1000', image: ['https://i.pinimg.com/736x/9a/d7/06/9ad7065d354a328708fccc8a6b930d30.jpg'], review: '3' }
]
const sets = [{ id: 11, name: 'un reloj', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' },
{ id: 12, name: 'Un set', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' },
{ id: 13, name: 'sett', price: '1000', image: ['data:image/jpeg;base64,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'], review: '3' },
{ id: 14, name: 'relojes', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' },
{ id: 15, name: 'otro set', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' },
{ id: 16, name: 'boke boke', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' }
]
const cuelgaGafas = [{ id: 17, name: 'cuelga gafas', price: '1000', image: ['https://http2.mlstatic.com/D_NQ_NP_721564-MCO43970127309_112020-O.jpg'], review: '3' },
{ id: 18, name: 'tirita gafas', price: '1000', image: ['https://http2.mlstatic.com/D_NQ_NP_721564-MCO43970127309_112020-O.jpg'], review: '3' },

]

const alfs = [{ id: 19, name: 'Un Alf', price: '10', image: ['https://www.tierragamer.com/wp-content/uploads/2018/08/ALF_Fichas.jpg'], review: '3' },
{ id: 20, name: 'otro alf', price: '500', image: ['https://www.tierragamer.com/wp-content/uploads/2018/08/ALF_Fichas.jpg'], review: '3' },
{ id: 21, name: 'alfin', price: '300', image: ['https://www.tierragamer.com/wp-content/uploads/2018/08/ALF_Fichas.jpg'], review: '3' },

]

export const filtrado = [anillos, collares, aretes, earcuffs, sets, cuelgaGafas, alfs];