import phone from '../../../resources/image/phone.svg'
import home from '../../../resources/image/home1.jpg'

export default class Cards {
    constructor() {
        this.cards = document.querySelector('.cards')
    }

    loaded(json) {  // create flats cards
        const card = `
                <div class="card" data-street="${json.street}">
                    <div class="card-photo">
                        <img src="${json.image || home}" class="card-info__img" alt="Flats photo">
                    </div>
                    <div class="card-info">
                        <h2 class="card-info__price">${json.price}$</h2>
                        <h2 class="card-info__city">${json.city}</h2>
                        <h2 class="card-info__street">${json.street}</h2>
                        <h2 class="card-info__rooms">Кількість кімнат - ${json.rooms}
                        <h3 class="card-info__date">${json.date}</h3></h2>
                        <button class="card-info__call">
                            <a href="${json.phone || 'tel:+380696771270'}">
                                <img src=${phone} alt="call">
                            </a>
                        </button>
                    </div>
                </div>
                `
        this.cards.insertAdjacentHTML('beforeend', card)
    }

    loadedAllCards(json) {
        json.forEach(item => this.loaded(item))
    }
}