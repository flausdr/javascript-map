import { map, tileLayer, layerGroup, divIcon, marker } from 'leaflet'

export default class InitMap {
    constructor() {
        this.myMap = map('map').setView([49.587085, 34.54377], 13)
        this.tileLayer = tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        ).addTo(this.myMap)
        this.layer = layerGroup().addTo(this.myMap)
    }

    initMarkers(arrayFlats) {
        arrayFlats.forEach((flat) => {
            const info = `<span class="hide" data-street="${flat.street}" data-price="${flat.price}"></span>`

            const iconDiv = divIcon({
                className: 'my-div-icon',
                html: info,
            })

            marker([flat.lat, flat.lng], {
                icon: iconDiv,
                alt: flat.street,
                opacity: 0.9,
            }).addTo(this.layer)
        })
    }

    updateLayers() {
        let layerArr = this.layer.getLayers()

        this.layer.eachLayer((layer) => {
            let layerIndex = layerArr.indexOf(layer)

            if (layerIndex !== 0 || layerIndex !== 1) {
                this.layer.removeLayer(layer)
            }
        })
    }
}
