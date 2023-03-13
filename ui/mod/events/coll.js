const pObj = require('pico/obj')

function request(method, url, body, params, cb){
	pico.ajax(method, url, body, params, (err, state, xhr) => {
		if (4 !== state) return
		if (err) return cb(err)
		let obj
		try {
			obj = JSON.parse(xhr)
		} catch (ex) {
			return cb(ex)
		}
		cb(null, obj)
	})
}

return {
	init(deps){
		const env = deps.env
		this.domain = env.domain
		this.params = {
			headers: {
				Authorization: env.cred,
			}
		}
	},
	ready(){
		this.request('GET', '/1.0/darren/events', null, {
			headers: {
				Accept: 'application/json'
			}
		}, (err, xhr) => {
			xhr.body.forEach(evt => this.set(evt))
		})
	},
	request(method, url, body, params, cb){
		request(method, `${this.domain}${url}`, body, pObj.extends({}, [this.params, params]), cb)
	}
}
