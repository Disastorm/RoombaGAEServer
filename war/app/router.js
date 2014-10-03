define(["app/roomba"], function(Wito) {
    Wito.module("RoombaRouter", function(RoombaRouter, Roomba, Backbone, Marionette, $, _) {
    	RoombaRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                
            },
            initialize: function(options) {
                this.options = options;
                console.log(Backbone.history.start({ root: window.location.pathname, pushState: true, silent: false }));
                this.controller = options.controller;
            }
        });
    });
});