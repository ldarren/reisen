const ACCEPT = 'accept'

module.exports = {
	setup(host, cfg, rsc, paths){
		return this
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
