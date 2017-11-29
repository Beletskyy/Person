/**
 *
 */
var app = app || {};

define(function (require) {

    var ViewUsers = require('viewPersons'),
        ViewForm = require('viewForm'),
        Person = require('person'),
        Persons = require('persons'),
        Backbone = require('backbone');

    return function() {
        return {
            users: function () {
                Backbone.history.navigate("users", true);
            },

            showUsers: function () {
                $(".btn_add").show();
                if(app.viewForm) {
                    app.viewForm.remove();
                }
                if (app.viewUsers) {
                    app.viewUsers.leave();
                }
                if (app.users) {
                    app.users.remove();
                }

                app.users = new Persons();
                app.users.fetch({
                    success: function () {
                        app.viewUsers = new ViewUsers({
                            collection: app.users
                        });
                        $(document.body).append(app.viewUsers.render().el);
                    }
                });
            },

            showForm: function (id) {
                app.viewUsers.leave();
                if (app.viewForm) {
                    app.viewForm.remove();
                }
                $(".btn_add").hide();

                if (id === undefined) {
                    var user = new Person();
                    app.users.add(user);
                    app.viewForm = new ViewForm({
                        model: user
                    });
                } else {
                    app.viewForm = new ViewForm({
                        model: app.users.get(id)
                    });
                }
                $(document.body).append(app.viewForm.render().el);
            }
        };
    };

});