import Apartments from "./create-object"

export default class Fetch {

    flats = []

    async fetchFlats() {
        const response = await fetch(
            'http://site-constructor.stage/appartaments.json',
        )
        const json =
            response.status === 200 && response.ok
                ? await response.json()
                : new Error(response.statusText)
        this.flats = await json.map((flat) => new Apartments(flat))
        console.log(this.flats)
    }
}
