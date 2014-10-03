var ROOMBA = window.ROOMBA || {};
ROOMBA.Backbone = {
    Views : {},
    Models : {},
    Routers : {},
    Collections : {}
};

requirejs.config({
    baseUrl: '/lib',
    paths: {
        backbone: "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
        marionette: "//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.0.3/backbone.marionette.min",
        text: "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
        typeahead: 'https://twitter.github.io/typeahead.js/releases/latest/typeahead.bundle',
        underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min",
        app: "/app"
    },
    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        "text": {
            deps: ["backbone"]
        },
        "marionette": {
            deps: ["jquery", "underscore", "backbone"],
            exports: "Marionette"
        },
    }
});

requirejs([
    "app/roomba",
    "app/router",
    "app/view",
    "app/model"
], function(Roomba) {
        Roomba.module("RoombaController", function(RoombaController, Roomba, Backbone, Marionette, $, _) {
        	
        	var controlStateModel = null;
        	
        	RoombaController.Controller = Marionette.Controller.extend({
                	

				initialize: function(options) {
					var controller = this;
					
					controlStateModel = new Roomba.RoombaModel.ControlStateModel({});
					
					buttonView = new Roomba.RoombaView.ButtonView({
						forwardBtnId: options.forwardBtnId,
						leftBtnId: options.leftBtnId,
						rightBtnId: options.rightBtnId,
						model: controlStateModel,
						controller: controller
					});
					
					
					 $.getJSON("/token?c=key").done(function(response){
	                     	console.log(response);
	                     	$("#token").text(response.token);
	                         
	                     	this.channel = new goog.appengine.Channel(response.token);
	                     	
	                     	this.socket = this.channel.open();
	                     
	                     	this.socket.onmessage = this.onMessage;
	                  }.bind(this));    
					
				},
				
				onDriveCommandChange: function() {
					var command = controlStateModel.getDriveCommand();
					console.log(command);
					this.sendMessage(command);
				},
				
				onSpeedCommandChange: function() {
					var command = controlStateModel.getSpeedCommand();
					console.log(command);
					this.sendMessage(command);
				},
				
				onVacuumCommandChange: function() {
					var command = controlStateModel.getVacuumCommand();
					console.log(command);
					this.sendMessage(command);
				},
				
				sendMessage: function(msg) {
				  var path = "/chat?channelKey=key&message=" +msg;
				  
				 	  var xhr = new XMLHttpRequest();
				 	  xhr.open('POST', path, true);
				 	  xhr.send();    	    	
				},
                  
				onMessage: function(msg) {
					console.log(msg);
				}
               
            });
        });
        
        var controller = new Roomba.RoombaController.Controller({
            forwardBtnId: "#button-up",
            leftBtnId:"#button-left",
            rightBtnId:"#button-right"
         });
         router = new Roomba.RoombaRouter.Router({
            controller: controller
         });
        controller.router = router;
        Roomba.start();

});
