const icalgen = pico.import('ical-generator')
const pObj = require('pico/obj')

return {
	async read(output){
		const res = await this.ps.event.query().where('s', 1).exec()	
		output.push(...res.rows)
		return this.next()
	},
	create(rows, key, data){
		const cal = icalgen({name: this.params.user})

		for (let i = 0, l = rows.length, row; i < l; i++){
			row = rows[i]
			const start = new Date(row.cat)
			const end = new Date(start.getTime())
			end.setHours(start.getHours()+1)
			const evt = cal.createEvent(pObj.extends({
			}, [row.meta || {}, {
				id: row.id,
				start,
				end,
				summary: row.summary,
				description: row.description,
				location: row.location,
				sequence: row.sequence,
				url: row.url
			}]))
			row.alarms.forEach(alarm =>  evt.createAlarm(alarm))
		}
		data[key] = cal.toString()
		return this.next()
	},
}
