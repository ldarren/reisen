const promise = import('@planetscale/database')
const QueryBuilder = require('./QueryBuilder')

function PlanetScale(connect, cfg){
	this.conn = connect(cfg)
}

PlanetScale.prototype = {
	query(tname){
		const qb = new QueryBuilder(tname, (err, sql, params, pool) => {
			if (err) return console.error(err)
			return this.conn.execute(sql, params)
		})
		return qb
	}
}

module.exports = {
	async setup(host, cfg, rsc, paths){
		const {connect} = await promise
		const ps = new PlanetScale(connect, cfg)
		const result = await ps.query('dual').select(1).where(1, 1).exec()
		console.log(result)
		return ps
	},
}
