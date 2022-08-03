import L, {marker} from 'leaflet'

import markerDot from '../../../resources/image/marker.svg'

export default class InitMap {

    constructor() {
        this.map = L.map('map').setView([49.587085, 34.543770], 13)
        this.tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
        this.layer = L.layerGroup().addTo(this.map)
    }

    initMarkers(arrayFlats) {
        console.log(arrayFlats + '   ' + 'test')
        arrayFlats.forEach(flat => {
            const myIcon = L.icon({
                iconUrl: markerDot,
                iconSize: [20, 20]
            })

            L.marker([flat.lat, flat.lng], {
                icon: myIcon,
                alt: flat.street,
                opacity: 0.9
            }).addTo(this.layer)
        })
    }
}