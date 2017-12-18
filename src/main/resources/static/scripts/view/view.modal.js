/**
 *
 */
define(function (require) {

    var BaseView = require('baseView'),
        Template = require('text!template/template.confirm.modal.dust');

    return BaseView.extend({
        template: Template,
        events: {
            'click ._closeModal': 'close',
            'click ._deleteModel': 'delete'
        },

        render: function() {
            BaseView.prototype.renderModal.apply(this, arguments);
            return this;
        },

        close: function () {
            this.$el.dialog('destroy').remove();
            this.remove();
        },

        delete: function() {
            this.close();
            this.model.destroy();
        }
    });

});