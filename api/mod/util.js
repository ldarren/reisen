const ACCEPT = 'accept'
const ALLOW_ORIGIN = process.env.mod_web_ac_allow_origin
const MAX_AGE = process.env.mod_web_ac_max_age

module.exports = {
	setup(host, cfg, rsc, paths){
		return this
	},

	handleOption(req, res){
		if (!ALLOW_ORIGIN) return this.next()
		res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN)
		res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
		res.setHeader('Access-Control-Max-Age', MAX_AGE)
		if ('OPTIONS' === req.method){
			res.statusCode = 204
			return res.end()
		}
		return this.next()
	},

	branchByContentType(map, def){
		return function(req){
			const ct = req.headers[ACCEPT]
			const route = map[ct] || map[def]
			if (!route) return this.next(`no route for ${ACCEPT}: ${ct}`)
			return this.next(null, route)
		}
	},

	async wait(sec){
		await new Promise((resolve, reject) => {
			setTimeout(resolve, sec)
		})
		return this.next()
	},
}
