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
                this.removeObjects([app.viewForm, app.viewUsers, app.users, app.viewPagination, app.viewSearch]);
                app.users = new Persons();
                app.users.fetch({fetch: true}).done(function () {
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
                    if(app.viewUsers){
                        app.viewUsers.remove();
                    }
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

            showSearch: function () {
                app.viewSearch = new ViewSearch({
                    collection: app.users
                });
                $(document.body).prepend(app.viewSearch.render().el);
            },

            searchUsers: function (query) {
                if (!app.viewUsers && !app.users) {
                    this.showUsers();
                    return;
                }
                this.removeObjects([app.viewUsers]);
                $(".paginator").hide();
                $('#noResult').empty();
                var result = app.users.search(query);
                var prevCollection = app.users.fullCollection;
                app.users.reset(result, {silent: true});
                app.users.fullCollection = prevCollection;
                $(document.body).append(app.viewUsers.render().el);
                if (result.length === 0) {
                    $('#noResult').text("No result to show");
                }
            },

            showForm: function (id) {
                this.removeObjects([app.viewForm, app.viewUsers, app.viewPagination, app.viewSearch]);
                if (!app.users) {
                    this.showUsers();
                    return;
                }
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
            },

            removeObjects: function (obj) {
                _.each(obj, function (item) {
                    !item || item.leave();
                });
            }
        };
    }
});