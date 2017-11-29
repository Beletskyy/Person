/**
 *
 */
define(function (require) {

    var Backbone = require('backbone'),
        ViewPerson = require('viewPerson'),
        ViewModal = require('viewModal');

    return Backbone.View.extend({
        className: "contact",
        events: {
            "click .btn_delete": "confirm"
        },

        initialize: function(){
            this.personSubViews = [];
            this.listenTo(this.collection, 'remove', this.renderAfterRemove);
        },

        render: function() {
            this.$el.empty();
            this.collection.each(function(model) {
                var itemView = new ViewPerson({
                    model: model
                });
                $(this.el).prepend(itemView.render().el);
                this.personSubViews.push(itemView);
            }, this);

            return this;
        },

        renderAfterRemove: function () {
            this.removeChildViews();
            this.render();
        },

        confirm: function(e){
            e.preventDefault();
            var userId = $(e.currentTarget).data("id");
            var person = this.collection.get(userId);
            var modalView = new ViewModal({
                model: person
            });
            modalView.render();
        },

        leave: function() {
            this.removeChildViews();
            this.remove();
        },

        removeChildViews: function () {
            _(this.personSubViews).each(function(view) {
                view.onClose();
            }, this);
            this.personSubViews = [];
        }
    });

});