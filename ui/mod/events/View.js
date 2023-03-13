return {
	deps: {
		tmpl: 'file',
		model: 'model'	
	},
	create(deps, params){
		this.el.innerHTML = deps.tmpl(deps.model)
	}
}
