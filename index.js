document.addEventListener('DOMContentLoaded', function () {
    const menuHamburguesa = document.getElementById('menuHamburguesa');
    const navLinks = document.getElementById('navLinks');

    menuHamburguesa.addEventListener('click', function () {
        menuHamburguesa.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
});

fetch('estadisticas.json')
    .then(res => res.json())
    .then(json => {
        const container = document.getElementById('producto-container');
        container.innerHTML = '<div class="carousel-inner"></div>';
        const carouselInner = container.querySelector('.carousel-inner');

        json.stockBajo.slice(0, 5).forEach(product => {
            const div = document.createElement('div');
            div.className = 'carousel-item';
            div.innerHTML = `
                <div class="producto">
                    <img class="img-producto" src="${product.image}" alt="${product.title}" onclick="verProducto(${product.id})">
                    <h2 style="height:55px; overflow:hidden;">${product.title}</h2>
                    <p>${product.description}</p>
                    <p><b>${product.price}€</b></p>
                </div>
            `;
            carouselInner.appendChild(div);
        });

        // Add carousel controls
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&#10094;';
        prevButton.className = 'prev';
        prevButton.onclick = () => moveCarousel(-1);

        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&#10095;';
        nextButton.className = 'next';
        nextButton.onclick = () => moveCarousel(1);

        const controls = document.createElement('div');
        controls.className = 'carousel-controls';
        controls.appendChild(prevButton);
        controls.appendChild(nextButton);

        container.appendChild(controls);

        let currentIndex = 0;

        function moveCarousel(direction) {
            const items = document.querySelectorAll('.carousel-item');
            currentIndex = (currentIndex + direction + items.length) % items.length;
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    })
    .catch(error => console.error('Error al cargar los productos:', error));

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