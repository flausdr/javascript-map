import AddInfo from './add-info'
import Cards from './loadCards'

export default class RightBlock {

    constructor() {
        this.info = new AddInfo()
        this.cards = new Cards()
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

    initRightBlock(json) {
        this.info.renderProps(json)
        this.windowScroll(json)
        this.cards.loaded(json[0])
        this.cards.loaded(json[1])
        this.cards.loaded(json[2])
    }

    rerenderRightBlock(json) {
        this.info.clearCardsBlock()
        this.info.refreshFilters(json)
        this.rerenderForPrice(json)
    }

    rerenderForPrice(json) {
        this.info.clearCardsBlock()
        json.forEach(item => this.cards.loaded(item))
    }
}