/**
 *
 */
define(function (require) {

    var BaseView = require('baseView'),
        Template = require('text!template/template.search.dust');

    return BaseView.extend({
        className: "options",
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