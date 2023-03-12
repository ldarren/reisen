return {
	deps: {
		tmpl: 'file',
		model: 'model'	
	},
	create(deps, params){
		this.el = deps.tmpl({d:deps.model})
	}
}
