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
		if ('OPTIONS' === req.method){
			res.writeHead(204, CORS_HEADERS)
			res.end()
	console.log(req.method)
			return
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
