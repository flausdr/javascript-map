import '../style/style.scss'

import InitMap from './map/init-map'
import InitFlats from './map/fetch'
import Cards from './dynamic-info/loadCards'
import Content from './map/popupCard'
import RightBlock from './dynamic-info/right-block'

document.addEventListener('DOMContentLoaded', async () => {
    const map = new InitMap()
    const flats = new InitFlats()
    const cards = new Cards()
    const rightBlock = new RightBlock()

    await flats.fetchFlats()
    map.initMarkers(flats.flats)

    rightBlock.initSelectsOptions(flats.flats)
    rightBlock.windowScroll(flats.flats)

    document.querySelector('.wrapper').addEventListener('click', (e) => {
        const content = new Content()
        content.initPopup(e)
    })
})