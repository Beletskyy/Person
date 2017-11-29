/**
 *
 */
define(function (require) {

    var Backbone = require('backbone');

    return Backbone.Model.extend({
        validation: {
            name: [
                {
                    required: true,
                    msg: 'Please enter a first name!'},
                {
                    rangeLength: [2, 20],
                    msg: 'First name should be in the range from 2 to 20 characters'
                }],
            phone: {
                required: true,
                pattern:  /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/,
                msg: 'Please enter a valid phone!'
            },
            gender: {
                required: true,
                oneOf: ['female', 'male'],
                msg: 'Please select gender!'
            },
            department: {
                required: true,
                oneOf: ['home', 'job'],
                msg: 'Please select group!'
            }
        }
    });

});