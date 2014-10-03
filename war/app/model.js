define(["app/roomba"], function(Roomba) {
    Roomba.module("RoombaModel", function(RoombaModel, Roomba, Backbone, Marionette, $, _) {

    		RoombaModel.ControlStateModel = Backbone.Model.extend({
    			defaults: {
    				forwardEngaged: false,
    				leftEngaged: false,
    				rightEngaged: false,
    				ctrlEngaged: false,
    				backwardEngaged: false,
    				spacebarEngaged: false,
    				vacuumKeyEngaged: false,
    				vacuumState: false
    			},
    			
				initialize: function(options) {
	                this.options = options || {};
	            },
	            
	            getDriveCommand: function() {
	            	
	            	if(this.get("backwardEngaged")) {
	            		return "MOVE_BACK";
	            	} else if(this.get("forwardEngaged") && this.get("rightEngaged")) {
	            		return "TURN_RIGHT";
	            		
	            	} else if(this.get("forwardEngaged") && this.get("leftEngaged")) {
	            		return "TURN_LEFT";
	            		
	            	} else if(this.get("forwardEngaged")) {
	            		return "MOVE_FORWARD";
	            		
	            	} else if(this.get("rightEngaged")) {
	            		return "SPIN_RIGHT";
	            		
	            	} else if(this.get("leftEngaged")) {
	            		return "SPIN_LEFT";
	            		
	            	} else {
	            		return "STOP";
	            	}
	            	
	            },
	            
	            getSpeedCommand: function() {
	            	if(this.get("ctrlEngaged")) {
	            		return "SPEED:500";
	            	} else {
	            		return "SPEED:200";
	            	} 
	            }, 
	            
	            getVacuumCommand: function() {
	            	if(this.get("vacuumState")) {
	            		return "VACUUM_ON"; 
	            	} else {
	            		return "VACUUM_OFF";
	            	}
	            	
	            }
    			
    		});
    });
});