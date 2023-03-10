const pObj = require('pico/obj')

const user_spec = {
	type: 'object',
	spec: {
		name: {
			type: 'array',
			required: 1,
			gt: 0,
			lt: 5,
			spec: 'string'
		},
		ccode: {
			type: 'number',
			gt: 0,
			lt: 1000
		},
		mobile: {
			type: 'number',
			gt: 60000000,
			lt: 100000000
		},
		email: {
			type: 'string',
			regex: '^([a-z]\\w{3,32})@([a-z]\\w{3,16})\\.([a-z]\\w{1,2})$'
		},
		address: {
			type: 'array',
			gt: 0,
			lt: 5,
			spec: 'string'
		}
	}
}

function signup(ctx, body, cb){
	pico.ajax('POST', `${ctx.domain}/1.0/user`, body, ctx.params, (err, state, xhr) => {
		if (4 !== state) return
		if (err) return cb(err)
		let users
		try {
			users = JSON.parse(xhr).body
			if (users.length) ctx.currUserI = users[0].i
			ctx.set(users)
		} catch (ex) {
			return cb(ex)
		}
		cb(null, users)
	})
}

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
				Authorization: env.cred
			}
		}
		this.currUserI = 0
	},
	ready(){
		if (this.modelIndex.length){
			const currUser = this.at(0)
			this.currUserI = currUser.i
		}else{
			const user = pObj.create(user_spec, {randex: RandExp.randexp})
			signup(this, user, (err, currUser) => {
				if (err) return console.error(err)
			})
		}
	},
	request(method, url, body, params, cb){
		request(method, `${this.domain}${url}`, body, pObj.extends({}, [this.params, params]), cb)
	}
}
