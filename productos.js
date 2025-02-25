//Listado de TODOS los productos
document.addEventListener('DOMContentLoaded', () => {
    fetch('productos.json')
        .then(res => res.json())
        .then(json => {
            verProductos(json.products);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});

//Listado de todos los productos despues de hacer click en el boton de productos
function verProductos(products) {
    const container = document.getElementById('producto-container');
    container.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="producto">
                <img class="img-producto" src="${product.image}" alt="${product.title}" style="height:300px;margin-top:20px;" onclick="verProducto(${product.id})">
                <h2 style="height:55px; overflow:hidden;">${product.title}</h2>
                <p><b>${product.price}€</b></p>
            </div>
            <br>
        `;
        container.appendChild(div);
    });
}

//Ver un producto en especifico
function verProducto(productId) {
    fetch('productos.json')
        .then(res => res.json())
        .then(json => {
            const product = json.products.find(p => p.id == productId);
            const container = document.getElementById('producto-container');
            container.innerHTML = '';
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="producto">
                    <img class="img-producto" src="${product.image}" alt="${product.title}" style="height:300px;margin-top:20px;">
                    <h2 style="height:55px; overflow:hidden;">${product.title}</h2>
                    <p><a class="Descripcion" style="height:200px; overflow:auto;">${product.description}</a></p>
                    <p><b>${product.price}€</b></p>
                    <button style="border : none; background-color: white;"><a onclick="AñadirCarrito(${product.id})">Añadir al carrito</a></button>
                </div>
                <br>
            `;
            container.appendChild(div);
        })
        .catch(error => console.error('Error al cargar el producto:', error));
}

//Ver todos los productos de una categoria
function verCategoria(category) {
    fetch('productos.json')
        .then(res => res.json())
        .then(json => {
            const products = json.products.filter(p => p.category == category);
            const container = document.getElementById('producto-container');
            container.innerHTML = '';
            products.forEach(product => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <div class="producto">
                        <img class="img-producto" src="${product.image}" alt="${product.title}" style="height:300px;margin-top:20px;" onclick="verProducto(${product.id})">
                        <h2 style="height:55px; overflow:hidden;">${product.title}</h2>
                        <p><b>${product.price}€</b></p>
                    </div>
                    <br>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}