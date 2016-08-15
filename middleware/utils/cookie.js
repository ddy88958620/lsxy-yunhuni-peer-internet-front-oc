import Cookie from 'js-cookie'

const cookieConfig =  {domain: 'localhost', expires: 3}

export function saveCookie(key ,value) {
	Cookie.set(key, value, cookieConfig)
}

export function removeCookie(key) {
	Cookie.remove(key, cookieConfig)
}

export function getCookie(key) {
	return Cookie.get(key, cookieConfig)
}