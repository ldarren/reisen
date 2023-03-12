return {
	deps: {
		list: 'models',
		Item: 'View'
	},
	create(deps, params){
		deps.list.forEach((model, i) => {
			this.spawn(deps.Item, {i})
		})
	}
}
