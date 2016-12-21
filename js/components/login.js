myApp.component('login', {
	template:`<div class="panel">
				<label>name</label>
				<input type="text" name="name" ng-model="$ctrl.name">
			</div>
			<div class="panel">
				<label>password</label>
				<input type="password" name="password" ng-model="$ctrl.password">
			</div>
			<button class="btn" ng-click="$ctrl.login()">login</button>`,
	controller:function(){
		this.name = 'cara';
		this.password = '123456';
		this.login = function(){
			console.log(this.name + '/' + this.password);
		}
	}
})