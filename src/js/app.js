import '../style/style.scss'

import InitMap from './map/init-map'
import InitFlats from './map/fetch'
import Cards from './dynamic-info/add-info'
import Content from './map/popupCard'
import RightBlock from './dynamic-info/right-block'
import Filters from './dynamic-info/filter'

document.addEventListener('DOMContentLoaded', async () => {
    const map = new InitMap()
    const flats = new InitFlats()
    const rightBlock = new RightBlock()
    
    await flats.fetchFlats()
    map.initMarkers(flats.flats)
    
    rightBlock.initSelectsOptions(flats.flats)
    rightBlock.windowScroll(flats.flats)
    
    document.querySelector('.wrapper').addEventListener('click', (e) => {
        const content = new Content()
        content.initPopup(e)
    })
    
    const filter = new Filters()
    document.querySelector('.container').addEventListener('click', e => {
        const minRange = document.querySelector('.range-min'),
            maxRange = document.querySelector('.range-max'),
            zeroStreet = document.querySelector('.streetlist__search'),
            zeroRooms = document.querySelector('.open__zero')
        if (e.target.classList.contains('streetlist__li')) {
            const street = e.target.innerText
            map.updateLayers()
            map.initMarkers(filter.filterStreet(flats.flats, street))
            zeroRooms.innerHTML = zeroRooms.dataset.first
        }
        if (e.target.classList.contains('rooms-filter-options__value')) {
            const rooms = e.target.innerText
            map.updateLayers()
            map.initMarkers(filter.filterRooms(flats.flats, rooms))
            zeroStreet.value = ''
        }
        if (e.target.classList.contains('price-range__input') || e.target.classList.contains('price-values__input')) {
            map.updateLayers()
            map.initMarkers(filter.filterPrice(flats.flats, minRange.value, maxRange.value))
            zeroStreet.value = ''
            zeroRooms.innerHTML = zeroRooms.dataset.first
        }
    })
})