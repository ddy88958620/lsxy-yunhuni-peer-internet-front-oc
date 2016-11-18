import store from 'localStorage'

export default function(Vue) {
	// 控制权限
	Vue.directive('permission', {
		update: function(value)
		{
			let permission = store.get('lsxyPermission')
			if(permission.tenant.see) $(this.el).show();
			// if(permission.tenant.see) $(this.el).hide();
		}
	})
	
	// 表单清除
	Vue.directive('reset-form', {
		twoWay: true,
		bind: function () {
			const formData = JSON.stringify(this.vm[this.expression])
			this.temp = Object.assign({}, JSON.parse(formData))
		},
		unbind: function () {
			this.set(this.temp)
		}
	})
}