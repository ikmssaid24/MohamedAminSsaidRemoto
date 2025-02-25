document.addEventListener('DOMContentLoaded', () => {
    fetch('estadisticas.json')
        .then(res => res.json())
        .then(data => {
            initializeSlider(data.stockBajo, 'stockBajo', 'producto');
            initializeSlider(data.usuariosConMasPedidos, 'usuariosConMasPedidos', 'usuario');
            initializeSlider(data.GananciasPorMes, 'GananciasPorMes', 'ganancia');
            initializeSlider(data.productosNuncaCompr, 'productosNuncaCompr', 'producto');
            initializeSlider(data.gananciasMasDeQuinientos, 'gananciasMasDeQuinientos', 'producto');
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});

function createSlide(item, type) {
    const div = document.createElement('div');
    div.className = 'slide';
    if (type === 'producto') {
        div.innerHTML = `
            <div class="producto">
                <h2>${item.title}</h2>
                <img src="${item.image}" alt="${item.title}">
                <p>Precio: ${item.price}€</p>
            </div>
        `;
    } else if (type === 'usuario') {
        div.innerHTML = `
            <div class="usuario">
                <h2>${item.nombrePersona}</h2>
                <p>Usuario: ${item.nombreUsuario}</p>
                <p>Pedidos: ${item.cantidad}</p>
            </div>
        `;
    } else if (type === 'ganancia') {
        div.innerHTML = `
            <div class="ganancia">
                <h2>Mes: ${item.mes}</h2>
                <p>Ganancia: ${item.ganancia}€</p>
            </div>
        `;
    }
    return div;
}

function initializeSlider(items, sliderId, type) {
    const slider = document.getElementById(`slider-${sliderId}`);
    const indicators = document.getElementById(`slider-indicators-${sliderId}`);
    items.forEach((item, index) => {
        const slide = createSlide(item, type);
        slider.appendChild(slide);
        const indicator = document.createElement('span');
        indicator.className = index === 0 ? 'active' : '';
        indicator.addEventListener('click', () => moveToSlide(sliderId, index));
        indicators.appendChild(indicator);
    });
    updateIndicators(sliderId);
}

const currentSlides = {
    stockBajo: 0,
    usuariosConMasPedidos: 0,
    gananciasPorMes: 0,
    productosNuncaCompr: 0,
    gananciasMasDeQuinientos: 0
};

function moveSlide(sliderId, direction) {
    const slides = document.querySelectorAll(`#slider-${sliderId} .slide`);
    currentSlides[sliderId] = (currentSlides[sliderId] + direction + slides.length) % slides.length;
    updateSlider(sliderId);
}

function moveToSlide(sliderId, index) {
    currentSlides[sliderId] = index;
    updateSlider(sliderId);
}

function updateSlider(sliderId) {
    const slider = document.getElementById(`slider-${sliderId}`);
    slider.style.transform = `translateX(-${currentSlides[sliderId] * 100}%)`;
    updateIndicators(sliderId);
}

function updateIndicators(sliderId) {
    const indicators = document.querySelectorAll(`#slider-indicators-${sliderId} span`);
    indicators.forEach((indicator, index) => {
        indicator.className = index === currentSlides[sliderId] ? 'active' : '';
    });
}