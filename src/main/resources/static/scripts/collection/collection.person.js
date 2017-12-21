/**
 *
 */
define(function (require) {

    var Person = require('person'),
        PageableCollection = require('backbonePaginator');
        _ = require('underscore');

    return PageableCollection.extend({
        url: '/rest/users',
        model: Person,

        state: {
            firstPage: 1,
            currentPage: 1,
            pageSize: 6,
            totalRecords: 200
        },
        queryParams: {
            currentPage: "current_page",
            pageSize: "page_size"
        },

        mode: "client",

        comparator: function (model) {
            return model.get("name");
        },

        search: function (searchString) {
            var filtered = _.filter(this.fullCollection.models, function(model){
                return model.get("name").toUpperCase() === searchString.toUpperCase()
                    || model.get("phone").toUpperCase() === searchString.toUpperCase()
                    || model.get("gender").toUpperCase() === searchString.toUpperCase()
                    || model.get("department").toUpperCase() === searchString.toUpperCase()
            });
            var result = [];
            _.each(filtered, function (model) {
                result.push(new Person(model.attributes));
            });
            return result;
        },

        leave: function () {
            this.remove();
        }
    });

});