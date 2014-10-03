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
        	RoombaController.Controller = Marionette.Controller.extend({
                
                initialize: function(options) {
                	var controller = this;
                	
                	buttonView = new Roomba.RoombaView.ButtonView({
                		forwardBtnId: options.forwardBtnId,
                		leftBtnId: options.leftBtnId,
                		rightBtnId: options.rightBtnId,
                		controller: controller
                	});
                	
                	
                	 $.getJSON("/token?c=key").done(function(response){
                     	console.log(response);
                     	$("#token").text(response.token);
                         
                     	this.channel = new goog.appengine.Channel(response.token);
                     	
                     	this.socket = this.channel.open();
                     	this.socket.onmessage = this.onMessage;
                     });   
                	
                },
                
                onRightKeyDown: function() {
                	console.log("Right Key Down");
                	this.sendMessage("SPIN_RIGHT");
                },
                
                onRightKeyUp: function() {
                	console.log("Right Key Up");
                	this.sendMessage("STOP");
                },
                
                onLeftKeyDown: function() {
                	console.log("Left Key Down");
                	this.sendMessage("SPIN_LEFT");
                },
                
                onLeftKeyUp: function() {
                	console.log("Left Key Up");
                	this.sendMessage("STOP");
                },
                
                onForwardKeyDown: function() {
                	console.log("Foward Key Down");
                	this.sendMessage("MOVE_FORWARD");
                },
                
                onForwardKeyUp: function() {
                	console.log("Foward Key Up");
                	this.sendMessage("STOP");
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
