/**
 *
 */
var app = app || {};

define(function (require) {

    var Backbone = require("backbone"),
        ViewUsers = require('viewPersons'),
        ViewSearch = require('viewSearch'),
        ViewPagination = require('viewPagination'),
        ViewForm = require('viewForm'),
        Person = require('person'),
        Persons = require('persons');

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
                app.users.fetch({ fetch: true }).done(function () {
                    /*Create and generate Pagination*/
                    var Page = Backbone.Model.extend();
                    app.users.state.size = app.users.size();
                    var modelPagination = new Page({
                        state: app.users.state
                    });

                    app.viewPagination = new ViewPagination({
                        model: modelPagination,
                        users: app.users
                    });
                    $(document.body).append(app.viewPagination.render().el);

                    /*Create and generate Contacts View*/
                    app.viewUsers = new ViewUsers({
                        collection: app.users,
                        pagination: modelPagination
                    });
                    $(document.body).append(app.viewUsers.render().el);

                });

                this.showSearch();
                var pageNum = app.users.state.currentPage;
                Backbone.history.navigate("users/page/" + pageNum, false);
            },

            showPagination: function () {
                var Page = Backbone.Model.extend();
                var model = new Page({
                    state: app.users.state
                });

                app.viewPagination = new ViewPagination({
                    model: model,
                    users: app.users
                });
                $(document.body).append(app.viewPagination.render().el);
            },

            showSearch: function () {
                app.viewSearch = new ViewSearch();
                $(document.body).prepend(app.viewSearch.render().el);
            },

            showForm: function (id) {
                app.viewUsers.leave();
                if (app.viewForm) {
                    app.viewForm.remove();
                }
                if(app.viewPagination) {
                    app.viewPagination.remove();
                }
                if(app.viewSearch){
                    app.viewSearch.remove();
                }
                $(".btn_add").hide();

                if (id == null || id === undefined) {
                    var user = new Person();
                    app.users.add(user, {silent: true});
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