return {
	deps: {
		list: 'models',
		Item: 'view'
	},
	create(deps, params){
		deps.list.forEach((model, i) => {
			this.spawn(deps.Item, {i: i+1})
		})
	}
}
