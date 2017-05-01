var Product = Backbone.Model.extend({
    defaults : function(){
        productID : -1;
        Name: "";
        Category: "unclassed"
        Price : 0
    },
    AddProduct: function () {
        // doing Add Product
    },
    EditProduct: function () {
        // will load the edit product form
    },
    DeleteProduct: function () {
        // wil doing delte product
    },
    Initialize : function()
    {
        // include intialize, and the events listen
    }
});

var Products = Backbone.Model.extend({
    model: Product
});
   
var ProductView = Backbone.View.extend({
    model: Product,
    render: function () {
        // to load the add/delete product view function
    },
    save: function () {
        // If Product ID is 0, then create new Product
        // else, doing delete 
    },
    Delete: function () {
        // call web service to delete an exieted product
    }
})

var ProductMrgView = Backbone.View.extend({
    model: Products,
    Initialize: function ()
    {
        // load the data from webservice
    }
})