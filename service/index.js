const pObj = require('pico/obj')
const base = require('service/base.json')
const routes = require('service/routes.json')

const out = {}

this.load = () => {
	pObj.extends(out, [base, routes])
}

return out
