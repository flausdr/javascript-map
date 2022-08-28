import AddInfo from './add-info'
import Cards from './loadCards'

export default class RightBlock {

    constructor() {
        this.info = new AddInfo()
        this.cards = new Cards()
    }

    initSelectsOptions(jsonFlats) {
        this.info.createSelectStreet(jsonFlats)
        this.info.openCloseModalStreet()
        this.info.openCloseModalRooms()
        this.info.renderPriceValue(jsonFlats)
        this.info.inputValue()
        this.info.inputRangeValue()

        this.cards.loaded(jsonFlats[0])
        this.cards.loaded(jsonFlats[1])
        this.cards.loaded(jsonFlats[2])
    }

    windowScroll(jsonFlats) {
        let j = 3
        const cards = document.querySelector('.cards')
        window.addEventListener('scroll', () => {
            if (!cards.classList.contains('active')) {
                const documentRec = document.documentElement.getBoundingClientRect()
                if (documentRec.bottom < document.documentElement.clientHeight + 100) {
                    this.cards.loaded(jsonFlats[j])
                    j++
                }
            }
        })
    }

    searchStreet(e) {
        let word = e.target.value.trim()
        let requestSearch = new RegExp (word, 'i')
        const list = document.querySelectorAll('.streetlist__li')
        console.log(word)
        list.forEach(li => {
            if (word.length < 2) {
                li.classList.add('open')
                return
            }
            if(li.innerHTML.search(requestSearch) !== -1) {
                li.classList.add('open')
            } else {
                li.classList.remove('open')
            }
        })
    }

    rerenderRightBlock(json) {
        this.info.clearCardsBlock()
        this.info.refreshFilters(json)
        this.initSelectsOptions(json)
        this.windowScroll(json)
    }

    rerenderForPrice(json) {
        this.info.clearCardsBlock()
        json.forEach(item => this.cards.loaded(item))
    }
}