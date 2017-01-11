class LocalStorage {
	constructor() {
		this.store = window.localStorage
	}
	get(key) {
		let result = this.store.getItem(key)
		if (!result) {
			return ''
		}
		return JSON.parse(result)
	}
	set(key, data) {
		this.store.setItem(key, JSON.stringify(data))
	}
	update(key, data) {
		this.store.setItem(key, JSON.stringify(data))
	}
}
export default new LocalStorage()
