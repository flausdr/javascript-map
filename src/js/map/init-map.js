import L, {marker} from 'leaflet'

export default class InitMap {
    constructor() {
        this.map = L.map('map').setView([49.587085, 34.543770], 13)
        this.tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
        this.layer = L.layerGroup().addTo(this.map)
    }
}