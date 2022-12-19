import Apartments from "./create-object"
import jsonApp from '../../../flats.json'

export default class FetchData {

    flats = []

    async fetchFlats() {
            this.flats = jsonApp.map((flat) => new Apartments(flat))
    }
}
