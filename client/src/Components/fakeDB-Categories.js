//simula la respuesta del back a un get a la ruta que devuelve las categorias

export const categoriesF = [
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


const anillos = [{ id: 1, name: 'Un anillo', price: '1002', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '2' },
{ id: 2, name: 'anillo 1', price: '1000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '3' },
{ id: 3, name: 'anillo 2', price: '150', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '5' },
{ id: 4, name: 'Un anillo mas', price: '10000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '5' },
{ id: 5, name: 'anillos', price: '4000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '5' }
]
const collares = [{ id: 2, name: 'collar1234', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'], review: '3' },
{ id: 2, name: 'Un collar', price: '200', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'], review: '3' },
{ id: 3, name: 'collar master 3000', price: '543', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'], review: '3' },
{ id: 4, name: 'collar tincho', price: '13450', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'], review: '3' }
]
const aretes = [{ id: 1, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '5' },
{ id: 2, name: 'Un arete 1', price: '809', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '1' },
{ id: 3, name: 'Un arete2', price: '555', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '5' },
{ id: 4, name: 'aritos', price: '3456', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: 5, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: 6, name: 'Un arete', price: '100', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: 7, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '4' }
]
const earcuffs = [{ id: 8, name: 'Un earcuffs', price: '1000', image: ['https://i.pinimg.com/736x/9a/d7/06/9ad7065d354a328708fccc8a6b930d30.jpg'], review: '4' },
{ id: 9, name: 'Un earcuffs', price: '567', image: ['https://i.pinimg.com/736x/9a/d7/06/9ad7065d354a328708fccc8a6b930d30.jpg'], review: '3' },
{ id: 10, name: 'earcuffs re piolix', price: '498', image: ['https://i.pinimg.com/736x/9a/d7/06/9ad7065d354a328708fccc8a6b930d30.jpg'], review: '5' }
]
const sets = [{ id: 11, name: 'Un set', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' },
{ id: 12, name: 'Un set 2 ', price: '5520', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' },
{ id: 13, name: 'alto set', price: '2312', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '5' },
{ id: 14, name: 'Un set2', price: '1010', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '2' },
{ id: 15, name: 'Un set3', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '2' },
{ id: 16, name: 'Un set11', price: '4563', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '4' }
]
const cuelgaGafas = [{ id: 17, name: 'Un Cuelga Gafas', price: '1000', image: ['https://http2.mlstatic.com/D_NQ_NP_721564-MCO43970127309_112020-O.jpg'], review: '2' },
{ id: 18, name: 'Un Cuelga Gafas', price: '1000', image: ['https://http2.mlstatic.com/D_NQ_NP_721564-MCO43970127309_112020-O.jpg'], review: '3' },

]

const alfs = [{ id: 19, name: 'Un Alf', price: '1000', image: ['https://www.tierragamer.com/wp-content/uploads/2018/08/ALF_Fichas.jpg'], review: '5' },
{ id: 20, name: 'Un Alf', price: '3009', image: ['https://www.tierragamer.com/wp-content/uploads/2018/08/ALF_Fichas.jpg'], review: '5' },
{ id: 21, name: 'Un Alf', price: '1002', image: ['https://www.tierragamer.com/wp-content/uploads/2018/08/ALF_Fichas.jpg'], review: '4' },

]

export const filtrado = [anillos, collares, aretes, earcuffs, sets, cuelgaGafas, alfs];