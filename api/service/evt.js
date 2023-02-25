const icalgen = pico.import('ical-generator')

return {
	async read(output){
		const res = await this.ps.Event.query().where('s', 1).exec()	
		output.push(...res.rows)
		return this.next()
	},
	create(rows, key, data){
		const cal = icalgen({name: this.params.user})

		for (let i = 0, l = rows.length, row; i < l; i++){
			row = rows[i]
			const startTime = new Date(row.cat)
			const endTime = new Date(startTime.getTime())
			endTime.setHours(startTime.getHours()+1)
			const evt = cal.createEvent({
				start: startTime,
				end: endTime,
				summary: row.name,
				description: row.desc,
				location: row.contact.loc,
				url: row.contact.url || ''
			})
			const a = row.contact.alarm
			evt.createAlarm({
				triggerAfter: -1 * 60 * 10,
				description: a.desc,
				type: a.act
			})
		}
		data[key] = cal.toString()
		return this.next()
	},
}
