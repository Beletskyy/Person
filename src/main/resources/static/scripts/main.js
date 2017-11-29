require.config({
    paths: {
        jquery : "vendors/jquery/dist/jquery",
        jquery_ui : "vendors/jquery-ui/jquery-ui",
        underscore : "vendors/underscore-amd/underscore",
        backbone : "vendors/backbone-amd/backbone",
        backboneValidation : "vendors/backbone-validation/dist/backbone-validation-amd",
        routeControl: "vendors/backbone-route-control/backbone-route-control",
        dust : "vendors/dustjs-linkedin/dist/dust-full",
        text : "vendors/requirejs-text/text"
    },
    map : {
        "*" : {
            person : "model/model.person",
            persons : "collection/collection.person",
            //views
            baseView : "view/base.view",
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
