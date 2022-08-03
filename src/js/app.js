import InitMap from './map/init-map'
import InitFlats from './map/fetch'

import '../style/style.scss'

document.addEventListener('DOMContentLoaded', async () => {
    const map = new InitMap()
    const flats = new InitFlats()

    await flats.fetchFlats()
    map.initMarkers(flats.flats)
})