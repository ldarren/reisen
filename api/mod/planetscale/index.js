const promise = import('@planetscale/database')
const QueryBuilder = require('./QueryBuilder')

function Table(conn, name, schema){
	this.conn = conn
	this.name = name
	this.schema = schema
}

Table.prototype = {
	/*
	 * ExampleL select * from event where s = 1;
	 * const result = await table.query().where('s', 1).exec()
	 * console.log(result)
	 */
	query(){
		const qb = new QueryBuilder(this.name, (err, sql, params, pool) => {
			if (err) return console.error(err)
			return this.conn.execute(sql, params)
		})
		return qb
	}
}

module.exports = {
	async setup(host, cfg, rsc, paths){
		const {connect} = await promise
		const conn = connect(cfg)
		var db = Object.keys(rsc).reduce((acc, name) => {
			const rs = rsc[name]
			if (!rs || cfg.db !== rs.db) return acc
			const table = new Table(conn, name, rs)
			acc[name] = table
			return acc
		}, {})
		return db
	},
}
