export default class AddInfo {
    constructor() {
        this.cards = document.querySelector('.cards')
        this.rangeInput = document.querySelectorAll('.price-range__input')
        this.priceInput = document.querySelectorAll('.price-values__input')
        this.price = document.querySelector('.price')
        this.valuesPrice = document.querySelector('.price-values') 
        this.range = document.querySelector('.price-slider .price-slider__progress')
        this.priceGap = 5000
    }

    minMaxPrice(json, action) {
        const arr = []
        json.map(flat => arr.push(flat.price))
        if (action === 'min') {
            let minPrice = Math.min(...arr)
            return minPrice
        }
        if (action === 'max') {
            let maxPrice = Math.max(...arr)
            return maxPrice
        }
    }

    renderPriceValue(json) {
        this.priceInput[0].value = this.minMaxPrice(json, 'min')
        this.priceInput[1].value = this.minMaxPrice(json, 'max')

        this.rangeInput[0].min = this.minMaxPrice(json, 'min')
        this.rangeInput[0].max = this.minMaxPrice(json, 'max')
        this.rangeInput[1].min = this.minMaxPrice(json, 'min')
        this.rangeInput[1].max = this.minMaxPrice(json, 'max')
        this.rangeInput[0].value = this.minMaxPrice(json, 'min')
        this.rangeInput[1].value = this.minMaxPrice(json, 'max')
    }

    inputValue() {
        const fixedMin = this.priceInput[0].value
        this.priceInput.forEach(input => {
            input.addEventListener('input', e => {
                this.minPrice = parseInt(this.priceInput[0].value)
                this.maxPrice = parseInt(this.priceInput[1].value)
                if ((this.maxPrice - this.minPrice >= this.priceGap) && this.maxPrice <= this.rangeInput[1].max) {
                    if (e.target.classList.contains('price-min')) {
                        this.rangeInput[0].value = this.minPrice
                        this.range.style.left = (((this.minPrice - fixedMin) / (this.rangeInput[0].max - fixedMin)) * 100) + '%'
                        console.log(this.range.style.left)
                    } else {
                        this.rangeInput[1].value = this.maxPrice
                        this.range.style.right = 100 - ((this.maxPrice - fixedMin) / (this.rangeInput[1].max - fixedMin)) * 100 + '%'
                    }
                }
            })
        })
    }

    inputRangeValue() {
        const fixedMin = this.priceInput[0].value
        this.rangeInput.forEach(input => {
            input.addEventListener('input', e => {
                this.minPrice = parseInt(this.rangeInput[0].value)
                this.maxPrice = parseInt(this.rangeInput[1].value)

                if (this.maxPrice - this.minPrice < this.priceGap) {
                    if (e.target.classList.contains('range-min')) {
                        this.rangeInput[0].value = this.maxPrice - this.priceGap
                    } else {
                        this.rangeInput[1].value = this.minPrice + this.priceGap
                    }
                } else {
                    this.priceInput[0].value = this.minPrice
                    this.range.style.left = (((this.minPrice - fixedMin) / (this.rangeInput[0].max - fixedMin)) * 100) + '%'
                    this.priceInput[1].value = this.maxPrice
                    this.range.style.right = 100 - ((this.maxPrice - fixedMin) / (this.rangeInput[1].max - fixedMin)) * 100 + '%'
                    console.log(this.range.style.left)
                }
            })
        })
    }

    createSelectStreet(json) {
        const list = document.querySelector('.streetlist')
        json.map(flat => {
            this.selectStreet = `<li class="streetlist__li">${flat.street}</li>`
            list.innerHTML += this.selectStreet
        })
    }

    conditionsForSelects(e, wrapper, list, zeroItem) {  // logic for open and close selects
        list.forEach(li => {
            if (e.target === li) {
                if (zeroItem.classList.contains('streetlist__search')) {
                    zeroItem.value = li.outerText;
                } else if (zeroItem.classList.contains('open__zero')) {
                    zeroItem.innerHTML = li.outerText;
                }
            }
        })
        if (e.target === zeroItem && !wrapper.classList.contains('open')) {
            wrapper.classList.add('open')
            list.forEach(street => street.classList.add('open'))
            return
        } else {
            wrapper.classList.remove('open')
            list.forEach(street => street.classList.remove('open'))
            return
        }
    }

    openCloseModalStreet() {  // method for open & close select street
        const list = document.querySelector('.streetlist')
        const li = document.querySelectorAll('.streetlist__li')
        const search = document.querySelector('.streetlist__search')
        document.addEventListener('click', (e) => {
            this.conditionsForSelects(e, list, li, search)
        })
    }

    openCloseModalRooms() {  // method for open & close select rooms
        const list = document.querySelector('.rooms-filter-options')
        const li = document.querySelectorAll('.rooms-filter-options__value')
        const first = document.querySelector('.open__zero')
        document.addEventListener('click', (e) => {
            this.conditionsForSelects(e, list, li, first)
        })
    }
}