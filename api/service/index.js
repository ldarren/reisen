const pObj = require('pico/obj')
const base = require('service/base.json')
const env = require(`service/env.${process.env.NODE_ENV}.json`)
const routes = require('service/routes.json')
const out = {}

this.load = () => {
	pObj.extends(out, [base, env, routes])
}

return out
