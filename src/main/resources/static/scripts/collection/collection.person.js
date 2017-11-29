/**
 *
 */
define(function (require) {

    var Backbone = require('backbone'),
        Person = require('person');

    return Backbone.Collection.extend({
        url: '/rest/users',
        model: Person
    });

});