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


const anillos = [{ id: null, name: 'Un anillo', price: '1000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '3' },
{ id: null, name: 'Un anillo', price: '1000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '3' },
{ id: null, name: 'otro anillo', price: '1000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '3' },
{ id: null, name: 'Un anillo mas', price: '1000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '3' },
{ id: null, name: 'Un anillo', price: '1000', image: ['https://bodasyweddings.com/wp-content/uploads/2019/04/orden-de-los-anillos-de-boda-y-de-compromiso.jpg'], review: '3' }
]
const collares = [{ id: null, name: 'Un collar', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'], review: '3' },
{ id: null, name: 'Un collar', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'], review: '3' },
{ id: null, name: 'Un collar', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'], review: '3' },
{ id: null, name: 'Un collar', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/37755/collares-verano-2012-dorado-con-colgantes.jpg'], review: '3' }
]
const aretes = [{ id: null, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: null, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: null, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: null, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: null, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: null, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' },
{ id: null, name: 'Un arete', price: '1000', image: ['https://static.ella-hoy.es/ellahoy/fotogallery/780X0/480607/pendientes-de-aro-tous-bear-de-oro.jpg'], review: '3' }
]
const earcuffs = [{ id: null, name: 'Un earcuffs', price: '1000', image: ['https://i.pinimg.com/736x/9a/d7/06/9ad7065d354a328708fccc8a6b930d30.jpg'], review: '3' },
{ id: null, name: 'Un earcuffs', price: '1000', image: ['https://i.pinimg.com/736x/9a/d7/06/9ad7065d354a328708fccc8a6b930d30.jpg'], review: '3' },
{ id: null, name: 'Un earcuffs', price: '1000', image: ['https://i.pinimg.com/736x/9a/d7/06/9ad7065d354a328708fccc8a6b930d30.jpg'], review: '3' }
]
const sets = [{ id: null, name: 'Un set', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' },
{ id: null, name: 'Un set', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' },
{ id: null, name: 'Un set', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' },
{ id: null, name: 'Un set', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' },
{ id: null, name: 'Un set', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' },
{ id: null, name: 'Un set', price: '1000', image: ['https://i.postimg.cc/yNBLVfmN/Set-combo-Reloj-Pulsera-y-Cadena-con-Diamantes-Simulados-Cz-chapado-en-oro-14-K-12.jpg'], review: '3' }
]
const cuelgaGafas = [{ id: null, name: 'Un Cuelga Gafas', price: '1000', image: ['https://http2.mlstatic.com/D_NQ_NP_721564-MCO43970127309_112020-O.jpg'], review: '3' },
{ id: null, name: 'Un Cuelga Gafas', price: '1000', image: ['https://http2.mlstatic.com/D_NQ_NP_721564-MCO43970127309_112020-O.jpg'], review: '3' },

]

const alfs = [{ id: null, name: 'Un Alf', price: '1000', image: ['https://www.tierragamer.com/wp-content/uploads/2018/08/ALF_Fichas.jpg'], review: '3' },
{ id: null, name: 'Un Alf', price: '1000', image: ['https://www.tierragamer.com/wp-content/uploads/2018/08/ALF_Fichas.jpg'], review: '3' },
{ id: null, name: 'Un Alf', price: '1000', image: ['https://www.tierragamer.com/wp-content/uploads/2018/08/ALF_Fichas.jpg'], review: '3' },

]

export const filtrado = [anillos, collares, aretes, earcuffs, sets, cuelgaGafas, alfs];