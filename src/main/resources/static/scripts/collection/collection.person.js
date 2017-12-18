/**
 *
 */
define(function (require) {

    var Person = require('person'),
        PageableCollection = require('backbonePaginator');

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
        }
    });

});