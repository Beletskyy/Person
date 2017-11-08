/**
 *
 */
define(function (require) {

    var BaseView = require('baseView'),
        Template = require('text!template/template.person.dust');

    return BaseView.extend({
        /*tagName: "ul",*/
        template: Template,

        render: function() {
            BaseView.prototype.render.apply(this, arguments);
            return this;
        }
    });

});