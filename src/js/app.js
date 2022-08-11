import '../style/style.scss'

import InitMap from './map/init-map'
import InitFlats from './map/fetch'
import Cards from './map/loadCards'
import Content from './map/popupCard'


document.addEventListener('DOMContentLoaded', async () => {
    const map = new InitMap()
    const flats = new InitFlats()
    const cards = new Cards()

    await flats.fetchFlats()
    map.initMarkers(flats.flats)
    cards.loadedAllCards(flats.flats)

    document.querySelector('.wrapper').addEventListener('click', (e) => {
        const content = new Content()
        content.initPopup(e)
    })
})