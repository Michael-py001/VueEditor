/**
 * 缓存模块，防止多次引入相同模块
 */

class Loader {
    constructor() {
        this.map = {}
    }
    set(key, value) {
        this.map[key] = value
    }
    get(key) {
        return this.map[key]
    }
}

export default Loader
