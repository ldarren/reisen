const promise = import('@planetscale/database')

function PlanetScale(connect, cfg){
	this.conn = connect(cfg)
}

PlanetScale.prototype = {
}

module.exports = {
	async setup(host, cfg, rsc, paths){
		const {connect} = await promise
		return PlanetScale(connect, cfg)
	},
	async get(){
		const results = await conn.execute('select 1 from dual where 1=?', [1])
		console.log(results)
	},
	async set(){
	}
}
