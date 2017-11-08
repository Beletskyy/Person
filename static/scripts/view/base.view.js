/**
 *
 */
define(function (require) {

    var Backbone = require('backbone'),
        Dust = require('dust'),
        jquery_UI = require('jquery-ui');

    return Backbone.View.extend({

        render: function () {
            var output = this.getCompiledData();
            this.$el.html(output);

            return this;
        },

        renderModal: function () {
            var output = this.getCompiledData();
            this.$el.html(output).dialog({
                title: 'Delete Confirmation',
                resizable: false,
                autoOpen: true,
                width: 400,
                modal: true
            });
        },

        getCompiledData: function () {
            var data = (this.model) ? this.model.toJSON() : {};
            var output = '';
            Dust.renderSource(this.template, data, function(err, out) {
                if (err) {
                    // Oops, something didn't go as planned, let's see what it was
                    alert(err);
                } else {
                    output = out;
                }
            });
            return output;
        }

    });

});