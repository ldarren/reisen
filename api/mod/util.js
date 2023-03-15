const ACCEPT = 'accept'
const CORS_HEADERS = {
	'Access-Control-Allow-Origin': 'https://reisen-ui-dev.onrender.com',
	'Access-Control-Allow-Methods': 'POST, GET, PUT, PATCH, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Max-Age': 86400
}

module.exports = {
	setup(host, cfg, rsc, paths){
		return this
	},

	handleOption(req, res){
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type')
		res.setHeader('Access-Control-Max-Age', 86400)
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
