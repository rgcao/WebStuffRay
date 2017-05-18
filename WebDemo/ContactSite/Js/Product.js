var ProductModel = Backbone.Model.extend({
    defaults: {       
        productID : -1,
        Name : 'newProduct',
        Category : 'unclassed',
        Price : 100
    }
});


var ProductsModel = Backbone.Collection.extend({
    model: ProductModel,
    url:""
});

//var ProductsModel = Backbone.Collection.extend({
//    model: ProductModel
//});
var appRouter = Backbone.Router.extend({  
    routes: {
        "": "AddProd",
        "ViewAll": "ViewAllProds",
        "AddNew": "AddProd"
    },
    Start: function () {
        $("#content").empty();
        $("#content").append("<a>this is a test</a>");
    },
    ViewAllProds: function () {
    },
    AddProd: function () {
        //product1 = new ProductModel();
        //alert(JSON.stringify(product1));
        var newproduct = new ProductView();
        newproduct.render();
        $("#content").empty();        
        $("#content").append(newproduct.el);
    }
});
var MainFun = function main() {
    var app = new appRouter();
    Backbone.history.start();
    // Router, Initialize is start from this function
};



//var products = new ProductsModel();
   
var ProductView = Backbone.View.extend({
    tagName: "li",
    model:  new ProductModel(),
    template: _.template($('#tplAddNewProduct').html()),
    initialize: function () {
        //this.listenTo(this.model, 'change', this.render);
    },
    Validate: function (result) {
        // to validate the data before save into query
    },
    events: {
        'keypress #EditName': 'EditNamefun',
        'keypress #EditCategory': 'EditCategoryfun',
        'click #btSubmit': 'Save',
        'keypress #EditPrice': 'EditPricefun'
    },

    EditNamefun :function(e)
    {
        if (e.keyCode == 13) 
        {
            alert(e.keyCode);
        }
    },

    EditCategoryfun :function(e)
    {
        if (e.keyCode == 13) {
            alert("Endter while edit Category");
        }
    },

    EditPricefun : function(e)
    {
        if (e.keyCode == 13) {
            alert("Endter while edit Price");
        }
    },

    render: function () {
        // to load the add/delete product view function
        this.$el.html(this.template(this.model.toJSON()));
        //return this.$el.html();
        return this;
    },
    Save: function () {
        // If Product ID is 0, then create new Product
        // else, doing update
        alert(this.model.toJSON());

       //products.add(this)
    },
    Delete: function () {
        // call web service to delete an exieted product
        products.remove( this)
    }
})

//var ProductMrgView = Backbone.View.extend({
//    model: Product,
//    Initialize: function ()
//    {
        
//        // load the data from webservice
//    },

//    render: function()
//    {
//        this.el.html("<a>this is a test</a>");
//    }    
//})


MainFun(); // execute the mainfuncion
