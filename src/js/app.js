import InitMap from './map/init-map'
import InitFlats from './map/fetch'
import Content from './map/popup-card'
import RightBlock from './dynamic-info/right-block'
import Upload from './form/upload'
import ProxyFilters from './map/proxy-filters'

import '../style/style.scss'

document.addEventListener('DOMContentLoaded', async () => {
    const map = new InitMap()
    const flats = new InitFlats()
    const rightBlock = new RightBlock()
    const upload = new Upload()
    const proxyFilters = new ProxyFilters()

    const btn = document.querySelector('.btn-render'),
        formOpen = document.querySelector('.app'),
        search = document.querySelector('.street'),
        container = document.querySelector('.container'),
        slider = document.querySelector('.price')

    await flats.fetchFlats()
    map.initMarkers(flats.flats)

    rightBlock.initSelectsOptions(flats.flats)
    rightBlock.windowScroll(flats.flats)

    search.addEventListener('input', (e) => {
        if (e.target.classList.contains('streetlist__search')) {
            rightBlock.searchStreet(e)
        }
    })

    btn.addEventListener('click', async () => {
        const block = document.querySelector('.cards')
        map.updateLayers()
        map.initMarkers(flats.flats)
        rightBlock.rerenderRightBlock(flats.flats)
        block.classList.remove('active')
    })

    document.querySelector('.wrapper').addEventListener('click', (e) => {
        const content = new Content()
        content.initPopup(e)
    })
    
    container.addEventListener('click', e => {
        if (e.target.classList.contains('streetlist__li')) {
            const text = e.target.innerText
            const newJson = proxyFilters.proxyActiveFlats(flats.flats, 'street', text)
            map.updateLayers()
            map.initMarkers(newJson)
            rightBlock.rerenderRightBlock(newJson)
        }
        if (e.target.classList.contains('rooms-filter-options__value')) {
            const text = e.target.innerText
            const newJson = proxyFilters.proxyActiveFlats(flats.flats, 'rooms', text)
            map.updateLayers()
            map.initMarkers(newJson)
            rightBlock.rerenderRightBlock(newJson)
        }
    })

    slider.addEventListener('input', e => {
        const minRange = document.querySelector('.range-min'),
            maxRange = document.querySelector('.range-max')
        if (e.target.classList.contains('price-values__input') || e.target.classList.contains('price-range__input')) {
            console.log('test')
            const price = e.target.value
            const newJson = proxyFilters.proxyActiveFlats(flats.flats, 'price', price, minRange.value, maxRange.value)
            map.updateLayers()
            map.initMarkers(newJson)
            rightBlock.rerenderForPrice(newJson)
        }
    })

    formOpen.addEventListener('click', (e) => upload.openForm(e))

    upload.btnOpen.addEventListener('click', () => upload.triggerInput())
    upload.input.addEventListener('change', (e) => upload.changeHandler(e))
    upload.createBlockForImage()
    upload.deleteImage()

    document.querySelector('.btn-send').addEventListener('click', () => {
        upload.sendForm()
    })

    document.querySelector('.form').addEventListener('change', (e) => {
        upload.collectInfoObject(e)
    })
})
