const querySelectItems = {
    btnShow: document.querySelector('.filter-btn'),
    renderBlock: document.querySelector('.info-window'),
    updateBlock: document.querySelector('.filter'),
}

const fetchFlats = async () => {
    return await fetch('../flats.txt')
        .then(response => {
            if (response.status === 200 && response.ok) {
                return response.json()
            } else {
                return new Error(response.statusText)
            }
        })
}
// функция фетча данных с сервера

const markersForInitMap = () => {
    const newArray = [];
    const fetch = fetchFlats();
    fetch.then(flats => {
        flats.map(flat => {
            newArray.push(flat);
        })
    })
    return newArray;
}

// Обьект двух массивов стандартного и пустой, который будет дальше заполняться
const flatsArrayObj = {
    flats: markersForInitMap(),
    newFlats: [],
}

const filtersArray = {
    filterPrice: (dubl, value) => {
        const arr = [];
        dubl.filter(item => {
            if (item.price <= value) {
                arr.push(item);
            }
        })
        return arr;
    },

    filterRooms: (dubl, value) => {
        const arr = [];
        dubl.filter(item => {
            if (item.rooms === value) {
                arr.push(item);
            }
        })
        return arr;
    }
}

// гугловская функция создания инфоомационного окна
const createInfoWindow = (str = "") => {
    return infoWindow = new google.maps.InfoWindow({
        content: str,
        disableAutoPan: true,
    });
}

// функция с работой всплывающегося окна
const overAndOut = (marker, elem) => {
    createInfoWindow();

    marker.addListener("mouseover", (e) => {
        infoWindow.setContent(elem.street);
        infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', (e) => {
        infoWindow.close();
    })

    return marker;
}

// обьект по роботе с модальным окном маркера
const modalObject = {
    closeModal: (e, marker) => {
        const btnClose = document.querySelector('.modal__btn-close');
        const modal = document.querySelector('.modal');
        const parent = document.querySelector('.info-window');
        btnClose.addEventListener('click', (e) => {
            parent.removeChild(modal);
        })
    },

    renderModalInfo: (flat) => {
        const div = document.querySelector('.info-window');
        const contentString = `
        <div class="modal">
            <div class="modal__box">
                <h2 class="modal__info">Детальна інформація</h2>
                <h3 class="modal__street">Вулиця - ${flat.street}</h3>
                <h3 class="modal__price">Ціна - ${flat.price}$</h3>
                <h3 class="modal__rooms">Кількість кімнат - ${flat.rooms}</h3>
                <h3 class="modal__status">Статус квартири - ${flat.status}</h3>
                <p class="modal__text">Ми маємо найкращі пропозиції для вас!</p>
                <button class="modal__btn-ok">Купити</button>
                <button class="modal__btn-close">Закрити</button
            </div>
        </div>
        `;
        div.innerHTML += contentString;
        return div;
    },

    clickBuy: () => {
        const btnBuy = document.querySelector('.modal__btn-ok');
        btnBuy.addEventListener('click', () => {
            alert('Поздравляем! Вы купили квартиру!');
        })
    }
}

const clickModal = (marker, elem) => {
    return marker.addListener('click', (e) => {
        modalObject.renderModalInfo(elem);
        modalObject.closeModal();
        modalObject.clickBuy();
    })
}


querySelectItems.btnShow.addEventListener('click', () => {
    const block = document.querySelector('.filter');
    if (block.classList.contains('hide')) {
        block.classList.remove('hide')
    } else {
        block.classList.add('hide');
    }
})

const initMarker = (elem, map) => {
    const position = {
        lat: Number(elem.lat),
        lng: Number(elem.lng),
    }

    const marker = new google.maps.Marker({
        position,
        map
    });

    overAndOut(marker, elem);
    clickModal(marker, elem);

    return marker;
}

const finalStep = (arr, map) => {
    return arr.map(elem => {
        return initMarker(elem, map);
    })
}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 49.594085, lng: 34.543770 },
    });

    setTimeout(() => {
        const markers = finalStep(flatsArrayObj.flats, map);
        let cluster;
        cluster = new markerClusterer.MarkerClusterer({ map, markers });

        querySelectItems.updateBlock.addEventListener('click', (e) => {
            cluster.setMap(null);

            const target = e.target;
            const price = document.querySelector('.input-price');
            const rooms = document.querySelector('.rooms');
            const allr = rooms.querySelectorAll('.filter-il');
            let value = target.value;
            let clc = flatsArrayObj.flats;

            if (target.classList.contains('btn-post')) {
                const markers = finalStep(flatsArrayObj.flats, map);
                cluster = new markerClusterer.MarkerClusterer({ map, markers });
                price.classList.remove('active');
                rooms.classList.remove('active');
            }
            if (target.classList.contains('filter__price')) {
                price.classList.add('active');
                flatsArrayObj.newFlats = filtersArray.filterPrice(clc, value);
                clc = flatsArrayObj.newFlats;
                if(rooms.classList.contains('active')){
                    allr.forEach(item => {
                        if(item.type === 'radio' && item.checked){
                            flatsArrayObj.newFlats = filtersArray.filterRooms(clc, item.value);
                        }
                    })
                }
                const markers = finalStep(flatsArrayObj.newFlats, map);
                cluster = new markerClusterer.MarkerClusterer({ map, markers });
            }
            if (target.classList.contains('filter-il')) {
                rooms.classList.add('active');
                if (price.classList.contains('active') && rooms.classList.contains('active')) {
                    clc = filtersArray.filterPrice(flatsArrayObj.flats, price.value);
                }
                flatsArrayObj.newFlats = filtersArray.filterRooms(clc, value);
                const markers = finalStep(flatsArrayObj.newFlats, map);
                cluster = new markerClusterer.MarkerClusterer({ map, markers });
            }
        })
    }, 500)
}