const fetchFlats = async () => {
    return await fetch('../flats.txt')
    .then(response => {
        if (response.status === 200 && response.ok) {
            return response.json()
        } else {
            return new Error(response.statusText)
        }
    })
}

const markersForInitMap = () => {
    const newArray = [];
    const fetch = fetchFlats();
    fetch.then(flats => {
        flats.map(flat => {
            newArray.push(flat);
        })
    })
    return newArray;
}

const flatsArrayObj = {
    flats: markersForInitMap(),
    newFlats: [],
}

const initMarker = (elem, map) => {
    const position = {
        lat: Number(elem.lat),
        lng: Number(elem.lng),
    }

    const marker = new google.maps.Marker({
        position,
        map
    });

    return marker;
}

const finalStep = (arr, map) => {
    return arr.map(elem => {
        return initMarker(elem, map);
    })
}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 49.594085, lng: 34.543770 },
    });

    setTimeout(() => {
        const markers = finalStep(flatsArrayObj.flats, map);
        new markerClusterer.MarkerClusterer({ map, markers });
    }, 500)
}