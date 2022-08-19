export default class Upload {

    openForm(e) {
        const modal = document.querySelector('.modal'),
            add = document.querySelector('.btn-post')

        if (e.target === add || e.target.classList.contains('post')) {
            modal.classList.remove('js-hide')
            return
        }
        if (
            e.target.classList.contains('overflow') ||
            e.target.classList.contains('close')
        ) {
            modal.classList.add('js-hide')
            return
        }
    }
}
