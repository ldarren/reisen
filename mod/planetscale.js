const promise = import('@planetscale/database')

function PlanetScale(connect, cfg){
	this.conn = connect(cfg)
}

PlanetScale.prototype = {
	async get(){
		const results = await this.conn.execute('select 1 from dual where 1=?', [1])
		console.log(results)
	},
	async set(){
	}
}

module.exports = {
	async setup(host, cfg, rsc, paths){
		const {connect} = await promise
		const ps = new PlanetScale(connect, cfg)
		await ps.get()
		return ps
	},
}
