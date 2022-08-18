export default class Filters {

    filterStreet (jsonFlats, street) {
        return jsonFlats.filter(item => item.street === street)
    }

    filterRooms (jsonFlats, rooms) {
        return jsonFlats.filter(item => item.rooms === rooms)
    }

    filterPrice (jsonFlats, min, max) {
        return jsonFlats.filter(item => +item.price >= min && +item.price <= max)
    }
}