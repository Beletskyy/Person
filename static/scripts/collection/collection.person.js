/**
 *
 */
define(function (require) {

    var Backbone = require('backbone'),
        Person = require('person');

    return Backbone.Collection.extend({
        model: Person
    });

});