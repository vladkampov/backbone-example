(function ($) {
	$(document).ready(function() {
		var things = [
			{
				id: "301", 
				key: "0-{301}-0", 
				make: "Ferrari", 
				model: "Enzo", 
				region: "Italy", 
				price: "$500 000"
			}
		]

		// MODEL
		var Thing = Backbone.Model.extend({
			defaults: {
				id: "0",
				key: "0",
				make: "No make",
				model: "No model",
				region: "No region",
				price: "0"
			}
		})

		// COLLECTION
		var Directory = Backbone.Collection.extend({
			model: Thing,
		})

		// VIEWS
		var ThingView = Backbone.View.extend({
			tagName: "div",
			className:"row",
			template: $("#thingTemplate").html(),

			render: function() {
				tmpl = _.template(this.template);
				this.$el.html(tmpl(this.model.toJSON()));
				return this;
			},

			events: {
			    "click a.delete": "deleteThing"
			},

			//delete a contact
			deleteThing: function () {
			    //remove model
			    this.model.destroy();

			    //remove view from page
			    this.remove();
			}
		})

		var BaseView = Backbone.View.extend({
			el: $("#things"),
			
			initialize: function() {
				this.collection = new Directory(things);
				this.render();
            	this.collection.on("add", this.renderThing, this);
            	this.collection.on("remove", this.removeThing, this);
			},

			render: function() {
	            this.$el.find("div.row").remove();

	            _.each(this.collection.models, function (item) {
	                this.renderThing(item);
	            }, this);
			},

			renderThing: function(item) {
				var thingView = new ThingView({
					model: item
				})
				this.$el.append(thingView.render().el)
			},

			events: {
				"click #add": "AddThing"
			},

			AddThing: function(e) {
				e.preventDefault();

				var newModel = []
				$("#AddingThing").find("input").each(function(i, el) {
					if ($(el).val() !== "") {
						newModel[el.id] = $(el).val()
						$(el).val("")
					}
				})

				var lastId = 0
				var lastIndex = 0
				$(things).each(function(i, el) {
					lastId = parseInt(el.id)
					lastIndex = i
				})
				lastId++
				lastIndex++

				newModel.id = lastId.toString()
				newModel.key = lastIndex + "-{" + lastId + "}-" + lastIndex
				if (newModel.price === undefined || newModel.price === null)
					newModel.price = "0"
				newModel.price = "$" + newModel.price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')

				things.push(newModel);
				newThing = new Thing(newModel)

				this.collection.add(newThing);
			},

			removeThing: function (removedModel) {
			    var removed = removedModel.attributes;

			    //remove from things array
			    _.each(things, function (thing) {
			        if (_.isEqual(thing, removed)) {
			            things.splice(_.indexOf(things, thing), 1);
			        }
			    });
			}
		})
		new BaseView();

		//Denied to type "not numbers" symbols in price area
		$("#price").keydown(function(e) {
			// Allow backspace, delete, tab и escape, Ctrl+A, home, end, left arrow and right arrow
	        if ( e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 || 
	            (e.keyCode == 65 && e.ctrlKey === true) || 
	            (e.keyCode >= 35 && e.keyCode <= 39)) {
	                 return;
	        }
	        else {
	            // Сonvinced that this is the exact figure.
	            if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105 )) {
	                e.preventDefault(); 
	            }   
	        }
		})


		// NOW LETS BEGINNING TESTS
		module( "About Backbone.Model");
		test("Can be created with default values for its attributes.", function() {
		    expect(6);
		    var thing = new Thing();
		    equal(thing.get("id"), "0");
		    equal(thing.get("key"), "0");
		    equal(thing.get("make"), "No make");
		    equal(thing.get("model"), "No model");
		    equal(thing.get("region"), "No region");
		    equal(thing.get("price"), "0");
		});
		test("Will set attributes on the model instance when created.", function() {
		    expect(6);
		    var thing = new Thing({
		    	make: "Italy/Milan"
		    });
		    equal(thing.get("make"), "Italy/Milan");
		    equal(thing.get("id"), "0");
		    equal(thing.get("key"), "0");
		    equal(thing.get("model"), "No model");
		    equal(thing.get("region"), "No region");
		    equal(thing.get("price"), "0");
		});
		module( "About Backbone.Collection");
		test("Can add Model instances as objects and arrays.", function() {
		    expect(3);
		    var things = new Directory();
		    equal(things.length, 0 );
		    things.add({
		    	make: "Clean the kitchen" 
		    });
		    equal(things.length, 1);
		    things.add([
		        {make: "Do the laundry", price: "$321 000"},
		        {region: "Egypt"}
		    ]);
		    equal(things.length, 3);
		});

		module( "About Backbone.Events", {
		    setup: function() {
		        this.obj = {};
		        _.extend( this.obj, Backbone.Events );
		        this.obj.unbind();
		    }
		});
		test("Can extend JavaScript objects to support custom events.", function() {
		    expect(3);
		    var basicObject = {};
		    _.extend(basicObject, Backbone.Events);
		    equal(typeof basicObject.bind, "function");
		    equal(typeof basicObject.unbind, "function");
		    equal(typeof basicObject.trigger, "function");
		});
		test("Can also bind the passed context to the event callback.", function() {
		    expect(1);
		    var foo = {color: "blue"};
		    var changeColor = function() {
		        this.color = "red";
		    };
		    this.obj.bind("an event", changeColor, foo);
		    this.obj.trigger("an event");
		    equal(foo.color, "red");
		});
	})
} (jQuery));