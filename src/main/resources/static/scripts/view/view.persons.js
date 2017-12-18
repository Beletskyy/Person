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

        initialize: function(options){
            this.pagination = options.pagination;
            this.personSubViews = [];
            this.listenTo(this.collection, "remove", this.afterRemove);
            this.listenTo(this.collection, "reset", this.renderAfterModify);
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

        afterRemove: function () {
            var pageNum = this.collection.state.currentPage;
            this.collection.getPage(pageNum);
        },

        renderAfterModify: function () {
            this.removeChildViews();
            this.render();
            this.updatePaginator();
            var pageNum = this.collection.state.currentPage;
            Backbone.history.navigate("users/page/" + pageNum, false);
        },

        updatePaginator: function () {
            this.collection.state.size = this.collection.size();
            this.pagination.set("state", this.collection.state);
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
            // this.remove();
        },

        removeChildViews: function () {
            _(this.personSubViews).each(function(view) {
                view.onClose();
            }, this);
            this.personSubViews = [];
        }
    });

});