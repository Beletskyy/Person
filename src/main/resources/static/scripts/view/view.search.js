/**
 *
 */
define(function (require) {

    var BaseView = require('baseView'),
        Template = require('text!template/template.search.dust');

    return BaseView.extend({
        className: "options",
        template: Template,

        events: {
            'click #search': 'search',
            'click #reset': 'reset'
        },

        render: function() {
            BaseView.prototype.render.apply(this, arguments);
            return this;
        },

        reset: function () {
            var searchSelector = $('.search');
            if(searchSelector.val().trim().length === 0) {
                searchSelector.val('');
                return;
            }
            searchSelector.val('');
            $('.paginator').show();
            $('#noResult').empty();
            this.collection.reset(null, {silent: true});
            this.collection.getFirstPage({fetch: false});
            var pageNum = this.collection.state.currentPage;
            Backbone.history.navigate("users/page/" + pageNum, false);
        },

        search: function () {
            var query = $('.search').val().trim();
            if(query.length > 0) {
                Backbone.history.navigate("users/search/" + query, true);
            }
        }
    });

});