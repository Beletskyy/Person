/**
 *
 */
define(function (require) {

    var BackboneRouteControl = require('routeControl');

    return BackboneRouteControl.extend({
        routes: {
            '': 'users#users',
            'users(/)': 'users#showUsers',
            'users/:id/form': 'users#showForm',
            'users/form': 'users#showForm',
            "*other": 'users#showUsers'
        }
    });

});