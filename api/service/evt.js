const icalgen = pico.import('ical-generator')

return {
	async read(output){
		const res = await this.ps.Event.query().where('s', 1).exec()	
		output.push(...res.rows)
		return this.next()
	},
	create(rows, key, data){
		const cal = icalgen({name: this.params.user})
		const startTime = new Date()
		const endTime = new Date()
		endTime.setHours(startTime.getHours()+1)
		cal.createEvent({
			start: startTime,
			end: endTime,
			summary: 'Example Event',
			description: 'It works )',
			location: 'my room',
			url: 'http://sebbo.net/'
		})
		data[key] = cal.toString()
		return this.next()
	},
}
