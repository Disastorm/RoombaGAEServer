define([
    "app/roomba",
], function(Roomba, ShowTemplate) {
	Roomba.module("RoombaView", function(RoombaView, Roomba, Backbone, Marionette, $, _){
		
		RoombaView.ButtonView = Marionette.ItemView.extend({
			
			initialize: function(options) {
				this.rightBtnId = options.rightBtnId;
				this.leftBtnId = options.leftBtnId;
				this.forwardBtnId = options.forwardBtnId;
				this.controller = options.controller;
				this.model = options.model;
				_.bindAll(this,"onKeyDown", "onKeyUp");
				$(document).bind('keydown', this.onKeyDown);
				$(document).bind('keyup', this.onKeyUp);
				
			},
			
			onKeyDown: function(e) {
				
				if(e.keyCode === 86 && !this.model.get("vacuumKeyEngaged")) {
					this.model.set("vacuumState", !this.model.get("vacuumState"));
					this.model.set("vacuumKeyEngaged", true);
					this.controller.onVacuumCommandChange();
				}
				
				if(e.keyCode === 32 && !this.model.get("spacebarEngaged")) {
					this.model.set("spacebarEngaged", true);
					this.controller.sendMessage("BEEP_HI");
				}
				
				if(e.keyCode === 16 && !this.model.get("ctrlEngaged")) {
					this.model.set("ctrlEngaged", true);
					this.controller.onSpeedCommandChange();
				}
				
				// W and up arrow
				if((e.keyCode === 87 || e.keyCode === 38) && !this.model.get("forwardEngaged")) {
					this.model.set("forwardEngaged", true);
					this.controller.onDriveCommandChange();
			    // a and left arrow
				} else if((e.keyCode === 65 || e.keyCode === 37) && !this.model.get("leftEngaged")) {
					this.model.set("leftEngaged", true);
					this.controller.onDriveCommandChange();
				// d and right arrow
				} else if((e.keyCode === 68 || e.keyCode === 39) && !this.model.get("rightEngaged")) {
					this.model.set("rightEngaged", true);
					this.controller.onDriveCommandChange();
				} else if((e.keyCode === 83 || e.keyCode === 40) && !this.model.get("backwardEngaged")) {
					this.model.set("backwardEngaged", true);
					this.controller.onDriveCommandChange();
				}
				
			},
			
			onKeyUp: function(e) {
				
				if(e.keyCode === 86) {
					this.model.set("vacuumKeyEngaged", false);
				}
				
				if(e.keyCode === 32) {
					this.model.set("spacebarEngaged", false);
				}
				
				if(e.keyCode === 16) {
					this.model.set("ctrlEngaged", false);
					this.controller.onSpeedCommandChange();
				}
				
				// W and up arrow
				if(e.keyCode === 87 || e.keyCode === 38) {
					this.model.set("forwardEngaged", false);
					this.controller.onDriveCommandChange();
				// a and left arrow
				} else if(e.keyCode === 65 || e.keyCode === 37) {
					this.model.set("leftEngaged", false);
					this.controller.onDriveCommandChange();
				// d and right arrow
				} else if(e.keyCode === 68 || e.keyCode === 39) {
					this.model.set("rightEngaged", false);
					this.controller.onDriveCommandChange();
				} else if(e.keyCode === 83 || e.keyCode === 40) {
					this.model.set("backwardEngaged", false);
					this.controller.onDriveCommandChange();
				}
				
			},
			
			
		});
		
    });
});