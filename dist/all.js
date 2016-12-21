'use strict';

var myApp = angular.module('app', ['ui.router']);
'use strict';

myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  // An array of state definitions
  var states = [{ name: 'hello', url: '/hello', component: 'hello' }, { name: 'about', url: '/about', component: 'about' }, {
    name: 'people',
    url: '/people',
    component: 'people',
    resolve: {
      people: function people(PeopleService) {
        return PeopleService.getAllPeople();
      }
    }
  }, {
    name: 'people.person',
    url: '/{personId}',
    component: 'person',
    resolve: {
      person: function person(people, $stateParams) {
        return people.find(function (person) {
          return person.id === $stateParams.personId;
        });
      }
    }
  }, { name: 'login', url: '/login', component: 'login' }];

  // Loop over the state definitions and register them
  states.forEach(function (state) {
    $stateProvider.state(state);
  });
}]);

myApp.run(function ($http, $uiRouter) {
  window['ui-router-visualizer'].visualizer($uiRouter);
  $http.get('../data/people.json', { cache: true });
});
'use strict';

myApp.component('login', {
	template: '<div class="panel">\n\t\t\t\t<label>name</label>\n\t\t\t\t<input type="text" name="name" ng-model="$ctrl.name">\n\t\t\t</div>\n\t\t\t<div class="panel">\n\t\t\t\t<label>password</label>\n\t\t\t\t<input type="password" name="password" ng-model="$ctrl.password">\n\t\t\t</div>\n\t\t\t<button class="btn" ng-click="$ctrl.login()">login</button>',
	controller: function controller() {
		this.name = 'cara';
		this.password = '123456';
		this.login = function () {
			console.log(this.name + '/' + this.password);
		};
	}
});
'use strict';

myApp.controller('loginCtrl', function () {
	alert('1');
});
'use strict';

myApp.component('about', {
  template: '<h3>Its the UI-Router "Hello Galaxy" app!</h3>'
});
'use strict';

myApp.component('hello', {
  template: '<h3>{{$ctrl.greeting}} galaxy!</h3>' + '<button ng-click="$ctrl.toggleGreeting()">toggle greeting</button>',

  controller: function controller() {
    this.greeting = 'hello';

    this.toggleGreeting = function () {
      this.greeting = this.greeting == 'hello' ? 'whats up' : 'hello';
    };
  }
});
'use strict';

myApp.component('people', {
        bindings: { people: '<' },

        template: '<div class="flex-h">' + '  <div class="people">' + '    <h3>Some people:</h3>' + '    <ul>' + '      <li ng-repeat="person in $ctrl.people">' + '        <a ui-sref-active="active" ui-sref="people.person({ personId: person.id })">' + '          {{person.name}}' + '        </a>' + '      </li>' + '    </ul>' + '  </div>' + '  <ui-view></ui-view>' + '</div>'
});
'use strict';

myApp.component('person', {
    bindings: { person: '<' },
    template: '<h3>A person!</h3>' + '<div>Name: {{$ctrl.person.name}}</div>' + '<div>Id: {{$ctrl.person.id}}</div>' + '<div>Company: {{$ctrl.person.company}}</div>' + '<div>Email: {{$ctrl.person.email}}</div>' + '<div>Address: {{$ctrl.person.address}}</div>' + '<button ui-sref="people">Close</button>'
});
'use strict';

myApp.service('PeopleService', function ($http) {
  var service = {
    getAllPeople: function getAllPeople() {
      return $http.get('data/people.json', { cache: true }).then(function (resp) {
        return resp.data;
      });
    },

    getPerson: function getPerson(id) {
      function personMatchesParam(person) {
        return person.id === id;
      }

      return service.getAllPeople().then(function (people) {
        return people.find(personMatchesParam);
      });
    }
  };

  return service;
});