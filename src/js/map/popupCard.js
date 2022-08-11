import photo from '../../../resources/image/home2.jpg'

export default class Content {
    constructor() {
        this.wrapper = document.querySelector('.wrapper')
    }

    popupCard(data) {
        const item = `
            <div class="item" data-street="${data.dataset.street}">
                <img class="item__photo" src="./fonts/home2.jpg" alt="home"> 
                    <div class="item__text">
                        <h3 class="item__street">Вулиця - ${data.dataset.street}</h3>
                        <h3 class="item__price">Ціна - ${data.dataset.price}$</h3>
                    </div>
                <span class="item__close">&#10006;</span>
            </div>
            `
        this.wrapper.insertAdjacentHTML('beforeend', item)
    }

    destroy() {
        const item = document.querySelector('.item')
        item.innerHTML = ''
        item.remove()
    }

    initPopup(e) {
        const item = document.querySelector('.item')
        if (e.target.classList.contains('hide')) {
            item ? this.destroy() : null
            this.popupCard(e.target)
            return
        }
        const btn = document.querySelector('.btn-render'),
            loop = document.querySelector('.loop')

        if (e.target === btn || e.target === loop) {
            return
        }

        const close = document.querySelector('.item__close'),
            map = document.querySelector('.block-map')

        if (e.target === close || e.target === map) {
            this.destroy()
        }
    }
}
