const BASEURL = 'http://127.0.0.1:5000';
/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };
    try {
        const response = await fetch(url, options);  // Realiza la petición fetch
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();  // Devuelve la respuesta en formato JSON
    } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred while fetching data. Please try again.');
    }
}
let colorArray = []
let talleArray = []
let generoArray = []
const showTalles = async () => {
    let talles = await fetchData(BASEURL + '/api/talle/', 'GET');

    const selectTalle = document.querySelector('#selectTalle');
    selectTalle.innerHTML = '';

    talles.forEach((talle_, index) => {
        talleArray.push(talle_.talle)
        let option = `
                <option value=${talle_.id}>${talle_.talle}</option>
                `;
        selectTalle.insertAdjacentHTML("beforeend", option);
    });
}
const showColor = async () => {
    let colores = await fetchData(BASEURL + '/api/color/', 'GET');


    const selectColor = document.querySelector('#selectColor');
    selectColor.innerHTML = '';

    colores.forEach((color_, index) => {
        colorArray.push(color_.color)
        let option = `
                <option value=${color_.id}>${color_.color}</option>
                `;
        selectColor.insertAdjacentHTML("beforeend", option);
    });
}
const showGen = async () => {
    let generos = await fetchData(BASEURL + '/api/genero/', 'GET');

    const selectGenero = document.querySelector('#selectGenero');
    selectGenero.innerHTML = '';

    generos.forEach((genero_, index) => {
        generoArray.push(genero_.genero)
        let option = `
                <option value=${genero_.id}>${genero_.genero}</option>
                `;
        selectGenero.insertAdjacentHTML("beforeend", option);
    });
}
async function getProdctAll() {
    let productos = await fetchData(BASEURL + '/api/producto/', 'GET');
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
                    <div class="card_buttons">
                       
                        <a href="#formProducto" onclick='editProducto(${JSON.stringify(producto)})'><i class="fa-regular fa-pen-to-square"></i></a>
                        <a href="#" onclick='eliminarProducto(${JSON.stringify(producto)})'><i class="fa-solid fa-trash"></i></a>
                        
                        </button>
                        </div>
                    </div>
            </div>
                    `
        divCard.insertAdjacentHTML("beforeend", card);
    });
}
async function editProducto(producto) {
    var contenedor = document.getElementById('contenedor');
    contenedor.style.display = 'flex';
    console.log(producto.url_image)
    document.getElementById("id").value = producto.id;
    document.getElementById("name").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("selectTalle").selectedIndex = indexSelect(talleArray, producto.talle);
    document.getElementById("selectColor").selectedIndex = indexSelect(colorArray, producto.color);
    document.getElementById("selectGenero").selectedIndex = indexSelect(generoArray, producto.genero);
    document.getElementById("urlImagen").value = producto.url_image
    document.getElementById("precio").value = producto.price;

}
function newProducto() {
    var contenedor = document.getElementById('contenedor');
    contenedor.style.display = 'flex';
    document.getElementById("id").value = '';
    document.getElementById("name").value = '';
    document.getElementById("descripcion").value = '';
    document.getElementById("selectTalle").selectedIndex = 0
    document.getElementById("selectColor").selectedIndex = 0
    document.getElementById("selectGenero").selectedIndex = 0
    document.getElementById("urlImagen").value = ''
    document.getElementById("precio").value = ''
}

function indexSelect(object, value) {
    return Array.prototype.indexOf.call(object, value)

    //return Object.keys(object).find(key => object[key] === value);
}

async function eliminarProducto(producto) {
    console.log(typeof producto)
    if (confirm(`¿Estas seguro de eliminar el producto ${producto.nombre}?`)) {
        // Save it!
        let response = await fetchData(`${BASEURL}/api/producto/${producto.id}`, 'DELETE');
    } else {
        // Do nothing!
        console.log('producto no eliminado');
    }
    getProdctAll()
}


const submitForm = async (e) => {
    e.preventDefault();
    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const descripcion = document.querySelector('#descripcion').value;
    const selectTalle = document.querySelector('#selectTalle').value;
    const selectColor = document.querySelector('#selectColor').value;
    const selectGenero = document.querySelector('#selectGenero').value;
    const precio = document.querySelector('#precio').value;
    const urlImagen = document.querySelector('#urlImagen').value;

    const producto = {
        id: id,
        nombre: name,
        descripcion: descripcion,
        id_talle: selectTalle,
        id_color: selectColor,
        id_genero: selectGenero,
        url_image: urlImagen,
        price: precio,
    }
    generoSelect = selectGenero;
    if (!descripcion || !name || !precio) {
        alert('Colmpletar los Campos Nombre, Descripción o Precio')
        return;
    }
    console.log(producto)


    let result = null;
    // Si hay un id, realiza una petición PUT para actualizar el producto

    if (id != "") {
        result = await fetchData(`${BASEURL}/api/producto/${id}`, 'PUT', producto);
    } else {
        // Si no hay id, realiza una petición POST para crear un nuevo producto
        result = await fetchData(`${BASEURL}/api/producto/`, 'POST', producto);
    }
    var contenedor = document.getElementById('contenedor');
    contenedor.style.display = 'none';
    alert(result.message)
    getProdctAll()


}
showTalles()
showColor()
showGen()
getProdctAll()