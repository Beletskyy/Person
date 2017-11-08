/**
 *
 */
define(function (require) {

    var Backbone = require('backbone'),
        ViewPerson = require('viewPerson'),
        ViewModal = require('viewModal');

    return Backbone.View.extend({
        /*el: '.table',*/
        el: '.contact',

        events: {
            "click .btn_delete": "confirm"
        },
        initialize: function(){
            this.listenTo(this.collection, 'remove', this.render);
        },

        render: function() {
            this.$el.empty();
            var fragment = document.createDocumentFragment();

            this.collection.each(function(model) {
                fragment.appendChild(new ViewPerson({
                    model: model
                }).render().el);
            }, this);

            this.$el.append(fragment);

            return this;
        },

        confirm: function(e){
            e.preventDefault();
            var userId = $(e.currentTarget).data("id");
            var person = this.collection.get(userId);
            var modalView = new ViewModal({
                model : new Backbone.Model({
                    userId: userId,
                    firstName: person.get("firstName"),
                    parent: this
                })

            });
            modalView.render();
        }
    });

});