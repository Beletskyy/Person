/**
 *
 */
define(function (require) {

    var BaseView = require('baseView'),
        Template = require('text!template/template.form.contact.dust'),
        Backbone = require('backbone'),
        BackboneValidation = require('backboneValidation');

    return BaseView.extend({
        className: "form",
        template: Template,
        events: {
            "click .btn_update" : "update",
            "click .btn_create" : "create"
        },

        initialize: function () {
            Backbone.Validation.bind(this.model, {
                valid: function(view, attr, selector) {
                    var $el = $('[name=' + attr + ']'),
                        $group = $el.closest('.form-group');

                    $group.removeClass('has-error');
                    $group.find('.help-block').html('').addClass('hidden');
                },
                invalid: function(view, attr, error, selector) {
                    var $el = $('[name=' + attr + ']'),
                        $group = $el.closest('.form-group');

                    $group.addClass('has-error');
                    $group.find('.help-block').html(error).removeClass('hidden');
                }
            });
        },

        render: function() {
            this.$el.empty();
            BaseView.prototype.render.apply(this, arguments);
            return this;
        },

        create: function(){
            var newUser = this.model;
            this.setUserAttrs(newUser);
            this.saveToServer(newUser);
        },

        update: function(){
            var userToUpdate = this.model;
            this.setUserAttrs(userToUpdate);
            this.saveToServer(userToUpdate);
        },

        setUserAttrs: function (model) {
            model.set("name", $("#name").val());
            model.set("phone", $("#phone").val());
            model.set("gender", $("#gender").find(":selected").text());
            model.set("department", $('#department').find(":selected").text());
        },

        saveToServer: function (model) {
            if (model.isValid(true)) {
                model.save({}, {
                    dataType:"text",
                    success : function() {
                        Backbone.history.navigate('users', true);
                    }
                });
            }
        }
    });

});