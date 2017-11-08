require.config({
    paths: {
        //libs
        "jquery" : "vendors/jquery/dist/jquery",
        "jquery-ui" : "vendors/jquery-ui/jquery-ui",
        "underscore" : "vendors/underscore-amd/underscore",
        "backbone" : "vendors/backbone-amd/backbone",
        "dust" : "vendors/dustjs-linkedin/dist/dust-full",
        "text" : "vendors/requirejs-text/text",
        //model
        "person" : "model/model.person",
        //collection
        "persons" : "collection/collection.person",
        //views
        "baseView" : "view/base.view",
        "viewModal" : "view/view.modal",
        "viewPerson" : "view/view.person",
        "viewPersons" : "view/view.persons"
    }
});

define.amd.dust = true;
require(['viewPersons', 'persons'], function (ViewPersons, Persons) {

    var users = new Persons([
        { id: 1, firstName: 'John', phone: '123456789', sex: 'male'},
        { id: 2, firstName: 'Ann', phone: '123456788', sex: 'female'},
        { id: 3, firstName: 'Mike', phone: '123456787', sex: 'male'},
        { id: 4, firstName: 'James', phone: '123456786', sex: 'male'},
        { id: 5, firstName: 'Carrie', phone: '123456785', sex: 'female'},
        { id: 6, firstName: 'Sara', phone: '123456784', group: 'job', sex: 'female'},
        { id: 7, firstName: 'Mason', phone: '123456783', group: 'job', sex: 'male'},
        { id: 8, firstName: 'Isabella', phone: '123456782', group: 'job', sex: 'female'},
        { id: 9, firstName: 'William', phone: '123456781', group: 'job', sex: 'male'},
        { id: 10, firstName: 'Ava', phone: '123456780', group: 'job', sex: 'female'}
        ]);

    var viewPersons = new ViewPersons({
        collection: users
    });

    $(document.body).append(viewPersons.render().el);
});
