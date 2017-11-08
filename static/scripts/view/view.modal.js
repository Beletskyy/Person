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

        initialize: function(options) {
            this.parent = options.model.get("parent");
        },

        render: function() {
            BaseView.prototype.renderModal.apply(this, arguments);
            return this;
        },

        close: function () {
            this.$el.dialog('destroy').remove();
        },

        delete: function() {
            var id = this.model.get("userId");
            var modelToDelete =  this.parent.collection.get(id);
            this.parent.collection.remove(modelToDelete);
            this.$el.dialog('destroy').remove();
        }
    });

});