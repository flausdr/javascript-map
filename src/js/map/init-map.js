import L from 'leaflet'

export default class InitMap {

    constructor() {
        this.map = L.map('map').setView([49.587085, 34.543770], 13)
        this.tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
        this.layer = L.layerGroup().addTo(this.map)
    }

    initMarkers(arrayFlats) {
        arrayFlats.forEach(flat => {
            const info = `<span class="hide" data-street="${flat.street}" data-price="${flat.price}"></span>`

            const iconDiv = L.divIcon({
                className: 'my-div-icon',
                html: info
            })


            L.marker([flat.lat, flat.lng], {
                icon: iconDiv,
                alt: flat.street,
                opacity: 0.9
            }).addTo(this.layer)
        })
    }
}