
import { fetchData, BASEURL } from './fechModule.js'
async function getProdctGen(id_genero) {
    let productos = await fetchData(BASEURL + '/api/producto/genero/' + id_genero, 'GET');
    const divCard = document.querySelector('#cardContainer');
    cardContainer.innerHTML = '';
    productos.forEach((producto, index) => {
        let card = `
            <div class="card">
                <div class="card-image">
                    <img src=${producto.url_image} >
                </div>
                <div class="card-content">
                    <h3>${producto.nombre}</h3>
                    <p>
                    ${producto.descripcion}
                        <br>
                        <span class="after-br">Talle ${producto.talle}, Color ${producto.color} </span>
                        <span class="after-br">Precio promocional $ ${producto.price}</span>
                                          
                    </p>
                   
            </div>
                    `
        divCard.insertAdjacentHTML("beforeend", card);
    });
}

function viewOrigin() {
    const url = window.location.href
    console.log(url)
    if (url.includes('Mujer')) {
        getProdctGen(2)
    } else if (url.includes('Hombre')) {
        getProdctGen(1)
    }

}
viewOrigin()