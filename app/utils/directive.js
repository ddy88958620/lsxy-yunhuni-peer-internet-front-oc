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
	});
}