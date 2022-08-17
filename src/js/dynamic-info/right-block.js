import AddInfo from './add-info'
import Cards from './loadCards'

export default class RigthBlock {

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
}