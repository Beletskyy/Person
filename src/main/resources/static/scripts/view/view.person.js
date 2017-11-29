/**
 *
 */
define(function (require) {

    var BaseView = require('baseView'),
        Template = require('text!template/template.person.dust');

    return BaseView.extend({
        template: Template,

        render: function() {
            BaseView.prototype.render.apply(this, arguments);
            return this;
        },

        onClose: function () {
            this.remove();
        }
    });

});