export default class ProxyFilters {

    proxyActiveFlats(json, myProp, myValue, minVal, maxVal) {
        const arr = []

        const proxy = new Proxy(json, {
            set(target, prop, value) {
                target.forEach(item => {
                    if ((prop === 'street' || prop === 'rooms') && item[prop] == value) {  // for street filter
                        arr.push(item)
                    }
                    if (prop === 'price') {
                        if (item[prop] >= minVal && item[prop] <= maxVal) {
                            arr.push(item)
                        }
                    }
                })
                return true
            }
        })
        proxy[myProp] = myValue

        return arr
    }
    
}