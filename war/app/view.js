define([
    "app/roomba",
], function(Roomba, ShowTemplate) {
	Roomba.module("RoombaView", function(RoombaView, Roomba, Backbone, Marionette, $, _){
		
		RoombaView.ButtonView = Marionette.ItemView.extend({
			
			initialize: function(options) {
				this.ignoreKeyDown = false;
				this.rightBtnId = options.rightBtnId;
				this.leftBtnId = options.leftBtnId;
				this.forwardBtnId = options.forwardBtnId;
				this.controller = options.controller;
				_.bindAll(this,"onKeyDown", "onKeyUp");
				$(document).bind('keydown', this.onKeyDown);
				$(document).bind('keyup', this.onKeyUp);
			},
			
			onKeyDown: function(e) {
				if(this.ignoreKeyDown) {
					return;
				} 
				if(e.keyCode === 87 || e.keyCode === 38) {
					this.controller.onForwardKeyDown();
				} else if(e.keyCode === 65 || e.keyCode === 37) {
					this.controller.onLeftKeyDown();
				} else if(e.keyCode === 68 || e.keyCode === 39) {
					this.controller.onRightKeyDown();
				}
				
				this.ignoreKeyDown = true;
				
				 e.preventDefault();
			},
			
			onKeyUp: function(e) {
				if(e.keyCode === 87 || e.keyCode === 38) {
					this.controller.onForwardKeyUp();
				} else if(e.keyCode === 65 || e.keyCode === 37) {
					this.controller.onLeftKeyUp();
				} else if(e.keyCode === 68 || e.keyCode === 39) {
					this.controller.onRightKeyUp();
				}
				
				this.ignoreKeyDown = false;
				
				 e.preventDefault();
				
			}
			
		});
		
    });
});