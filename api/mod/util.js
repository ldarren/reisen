module.exports = {
	setup(host, cfg, rsc, paths){
		return this
	},

	async wait(sec){
		await new Promise((resolve, reject) => {
			setTimeout(resolve, sec)
		})
		return this.next()
	},
}
