const promise = import('@planetscale/database')
const QB = require('./QueryBuilder')

function PlanetScale(connect, cfg){
	this.conn = connect(cfg)
}

PlanetScale.prototype = {
	async get(){
		const results = await this.conn.execute('select 1 from dual where 1=?', [1])
		console.log(results)
	},
	query(){
		const qb = new QueryBuilder()
	}
}

module.exports = {
	async setup(host, cfg, rsc, paths){
		const {connect} = await promise
		const ps = new PlanetScale(connect, cfg)
		await ps.get()
		await ps.query().select().exec()
		return ps
	},
}
