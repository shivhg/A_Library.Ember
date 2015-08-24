App = Ember.Application.create();

App.books = [{id:1, name:"One Night At Call Centre", author:"chethan bagath",description:"average",imagesrc:"../WebContent/lib/img/2states.jpg"},
             {id:2, name:"Two states", author:"chethan bagath",description:"good",imagesrc:""},
             {id:3, name:"Three mistakes", author:"chethan bagath",description:"ok",imagesrc:""}];

App.Router.map(function() {
	this.route('library');
	this.route('about');
	this.route('contactme');
	this.resource('books', function() {
		this.route('details', {path : "/:bid/details"} );
		this.route('new');
	});
	
});

App.BooksDetailsRoute = Ember.Route.extend({
	
	model : function(parm) {
		return App.books.findBy('id',parseInt(parm.bid));
	}
	
});

App.BooksRoute = Ember.Route.extend({
	model : function() {
		return App.books;
	},
	actions :  {
		createbook : function() {
			this.transitionTo('books.new');
		}
	}
});

App.BooksNewRoute = Ember.Route.extend({
	model :function() {
		return {id : App.books.length + 1 ,name :"",author:"",description:"",imagesrc:""}	
	}
});

App.BooksNewController = Ember.ObjectController.extend({
	needs : "books",
	actions : {
		create : function() {
			var newbook = Ember.copy(this.content)
			this.get('controllers.books').addObject(newbook);
			this.transitionToRoute('books');
		}
	}
});