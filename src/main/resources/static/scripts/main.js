require.config({
    paths: {
        jquery : "vendors/jquery/dist/jquery.min",
        jquery_ui : "vendors/jquery-ui/jquery-ui.min",
        underscore : "vendors/underscore/underscore-min",
        backbone : "vendors/backbone/backbone-min",
        backboneValidation : "vendors/backbone-validation/dist/backbone-validation-amd-min",
        backbonePaginator : "vendors/backbone.paginator/lib/backbone.paginator.min",
        routeControl: "vendors/backbone-route-control/backbone-route-control",
        dust : "vendors/dustjs-linkedin/dist/dust-full.min",
        dustCore : "vendors/dustjs-linkedin/dist/dust-core.min",
        dustjs_helpers : "vendors/dustjs-helpers/dist/dust-helpers.min",
        text : "vendors/requirejs-text/text"
    },
    map : {
        "*" : {
            person : "model/model.person",
            persons : "collection/collection.person",
            //views
            baseView : "view/base.view",
            viewSearch : "view/view.search",
            viewPagination : "view/view.pagination",
            viewForm : "view/view.form",
            viewModal : "view/view.modal",
            viewPerson : "view/view.person",
            viewPersons : "view/view.persons",
            //controller & router
            controller : "controller/controller",
            router : "router/router"
        }
    }
});

define.amd.dust = true;
require(['router', 'controller'], function (Router, Controller) {

    new Router({
        controllers: {
            users: new Controller()
        }
    });
    Backbone.history.start();
});
