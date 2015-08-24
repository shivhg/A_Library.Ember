App = Ember.Application.create();

App.Book = Ember.Object.extend({
	int : function() {
		console.log("intr" + name);
	}
})
App.books = [App.Book.create({id:1, name:"One Night At Call Centre", author:"chethan bagath",description:"average",imagesrc:"../WebContent/lib/img/onacc.jpg",favourite:false}),
             App.Book.create({id:2, name:"Two states", author:"chethan bagath",description:"good",imagesrc:"../WebContent/lib/img/2states.jpg",favourite:true}),
             App.Book.create({id:3, name:"Three mistakes", author:"chethan bagath",description:"ok",imagesrc:"../WebContent/lib/img/3mistakes.jpg",favourite:true})];

App.Router.map(function() {
	this.route('library');
	this.route('about');
	this.route('contactme');
	this.resource('books', function() {
		this.route('details', {path : "/:bid/details"} );
		this.route('new');
	});
	
});

App.IndexRoute = Ember.Route.extend({

})

App.BooksRoute = Ember.Route.extend({
	model : function() {
		return App.books;
	},
	
});

App.BooksController = Ember.ArrayController.extend({
	needs : "booksNew",
	increate : false,
	
	actions :  {
		createbook : function() {
			this.set("increate",true);
			this.transitionTo('books.new');
			this.set("increate",false);
		}

	},
	
	favouritecnt : function() {
		return App.books.filterBy('favourite',true).get('length');
	}.property('this.@each.favourite')
	
	
});

$("button").hover(function(){
	alert("hover");
});

App.BooksDetailsRoute = Ember.Route.extend({
	
	model : function(parm) {
		return App.books.findBy('id',parseInt(parm.bid));
	}
	
});

App.BooksDetailsController = Ember.ObjectController.extend({
	needs : "books",
	btnType :"btn btn-warning",
	Favouritelabel:function() {
		if(this.get('favourite')) {
			this.set("btnType","btn btn-danger");
			return  "Remove Favourite";
		}
		else {
			this.set("btnType","btn btn-warning");
			return "Favourite";
		}
	}.property('favourite'),
	imageobsr:function() {
		if(this.get("imagesrc")=="" || this.get("imagesrc").search(/jpg/i) == -1) {
			
			this.set("imagesrc","../WebContent/lib/img/default.jpg")
		}
	}.observes('imagesrc'),
	
	actions : {
		makefav : function() {
			this.toggleProperty('favourite');
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
	checkall : true,
 
	checkInp : function(){
		if(this.get("name")!="" && this.get("author")!=""){
			this.set("checkall", false);
		}else {
			this.set("checkall",true);
		}
	}.observes('name','author'),
	actions : {
		addbook : function() {
			this.set("controllers.books.increate",false);
			var bookdetail = Ember.copy(this.model);
			this.get('controllers.books').addObject(bookdetail);
			this.transitionToRoute('books.details',this.get("id"));
		}
	}
});

