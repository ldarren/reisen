return {
	async read(output){
		const res = await this.ps.Event.query().where('s', 1).exec()	
		output.push(...res.rows)
		return this.next()
	},
}
