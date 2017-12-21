/**
 *
 */
define(function (require) {

    var BaseView = require('baseView'),
        Template = require('text!template/template.pagination.dust');

    return BaseView.extend({
        className: "paginator",
        template: Template,

        events: {
            "click .button_fst": "gotoFirst",
            "click .button_prev": "gotoPrev",
            "click .button_next": "gotoNext",
            "click .button_last": "gotoLast"
        },

        initialize: function(options){
            this.users = options.users;
            this.listenTo(this.model, "change", this.render)
        },

        render: function() {
            BaseView.prototype.render.apply(this, arguments);
            return this;
        },

        gotoFirst: function () {
            if(this.users.hasPreviousPage()){
                this.navigateToPage("first");
            }
        },

        gotoPrev: function () {
            if(this.users.hasPreviousPage()){
                this.navigateToPage("prev");
            }
        },

        gotoNext: function () {
            if(this.users.hasNextPage()){
                this.navigateToPage("next");
            }
        },

        gotoLast: function () {
            if(this.users.hasNextPage()){
                this.navigateToPage("last");
            }
        },

        navigateToPage: function (action) {
            if(this.users){
                if(action === 'first'){
                    this.users.getFirstPage({fetch: false});
                }
                if(action === 'prev'){
                    this.users.getPreviousPage({fetch: false});
                }
                if(action === 'next'){
                    this.users.getNextPage({fetch: false});
                }
                if(action === 'last'){
                    this.users.getLastPage({fetch: false});
                }
                this.updatePaginator();
                var pageNum = this.users.state.currentPage;
                Backbone.history.navigate('users/page/' + pageNum, true);
            } else {
                Backbone.history.navigate("users", true);
            }
        },

        updatePaginator: function(){
            this.users.state.size = this.users.size();
            this.model.set("state", this.users.state);
        }
    });

});