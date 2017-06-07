var ProductModel = Backbone.Model.extend({
    defaults: {
        productID: -1,         Name: 'newProduct',         Category: 'unclassed',         Price: 100
    }
});  var ProductsModel = Backbone.Collection.extend({
    model: ProductModel,     // to save modified products to local     localStorage: new Backbone.LocalStorage("Products"),     // read the data from local stroages     getProducts: function () {
        this.fetch();
    },     ModifyProd: function (prod)     { },     comparator: 'productID'
});  // to save all saved products   ///close any open view before opening another view //Backbone.View.prototype.close = function () {
//    console.log('Closing view ' + this); //    if (this.beforeClose) {
//        this.beforeClose();
//    } //    this.remove(); //    this.unbind();
//};     var ProductView = Backbone.View.extend({
    tagName: "li",     model: ProductModel,     template: _.template($('#tplAddNewProduct').html()),     initialize: function () {         //this.listenTo(this.model, 'change', this.render);         this.model = new ProductModel();
        this.coll = new ProductsModel();
    },     Validate: function (result) {         // to validate the data before save into query     },     events: {
        'keypress #EditName': 'EditNamefun',         'keypress #EditCategory': 'EditCategoryfun',         'click #btSubmit': 'Save',         'keypress #EditPrice': 'EditPricefun'
    },      EditNamefun: function (e) {
        if (e.keyCode == 13) {
            alert(e.keyCode);
        }
    },      EditCategoryfun: function (e) {
        if (e.keyCode == 13) {             //alert(JSON.stringify( this.model.toJSON()));             //alert(this.$("#EditCategory").val());             //this.model.set("Category", this.$("#EditCategory").val());             //alert(JSON.stringify( this.model.toJSON()));         }
    },      EditPricefun: function (e) {
        if (e.keyCode == 13) {
            alert("Endter while edit Price");
        }
    },      render: function () {         // to load the add/delete product view function         this.$el.html(this.template(this.model.toJSON()));          if (this.model.productID == -1) {
            $("#btDelete").hide();
        }         else {
            $("#btDelete").show();
        }          //return this.$el.html();         return this;
    },     Save: function () {         // If Product ID is 0, then create new Product         // else, doing update         this.model.set("Category", this.$("#EditCategory").val());         this.model.set("Name", this.$("#EditName").val());         this.model.set("Price", this.$("#EditPrice").val());          //this.coll.localStorage.clear();          this.coll.getProducts();         // to empty the local storeage         //this.coll.each(function (mod) {
        //    //alert(JSON.stringify(mod.toJSON()));
        //    mod.destroy();
        //});          //this.coll.reset();         alert(this.coll.length);          if (this.coll.length == 0)         { this.model.set("productID", 1); }         else         {
            var lastProd = this.coll.at(this.coll.length - 1);

            var productid = lastProd.get("productID");
            if (!productid)
            { productid = 1 }
            alert(productid);
            this.model.set("productID", productid + 1);
        }          this.coll.create(this.model.toJSON());         alert("Success");         //window.app.navigate("viewall",{trigger:true})         alert(JSON.stringify(this.model.toJSON()));          //products.add(this)     },     Delete: function () {         // call web service to delete an exieted product         allProducts.remove(this)
    }
});  var productHeadView = Backbone.View.extend({
    el: "<div></div>",     //model :ProductModel,     template: _.template($('#tplAllProductsHead').html()),     events: {
        "click #btCreateProd": "CreateProd"
    },     CreateProd: function () {

        window.app.navigate('AddNew', { trigger: true });
    },     render: function () {         // alert(_.template($('#tplAllProductsHead').html()));         //this.model = new ProductModel();         this.$el.html();         this.$el.html(this.template(this.model));         //alert(this.$el.innerHTML);         return this;
    }
});  var productDataView = Backbone.View.extend({
    tagName: "li",     template: _.template($('#tplAllProductsRow1').html()),     initialize: function () {
        this.model = new ProductModel();
    },      render: function () {
        //alert(JSON.stringify(prod.toJSON()));

        this.$el.append(this.template(this.model.toJSON()));

        // body.append("<tr><td> id  </td> <td> Name  </td> <td> Category </td><td> Price </td><td> <a>Edit</a> <a >Delete</a> </td></tr>");
        return this.$el;
    }
});  var ProductMrgView = Backbone.View.extend({
    model: new ProductsModel(),     //tagName: "li",     el: "<div ></div>",     Initialize: function () {          // load the data from webservice     },      render: function () {
        $("#content").empty();         //$("#content").append(allProducts.render());         // empty el         // load table head         // load storied product         var prodhead = new productHeadView();          var tb = prodhead.render().el;          $("#content").append(prodhead.render().el);         var prodData = new productDataView();         // prodData.render();         alert("TBody alert");         var body = this.$('tbody');         this.model = new ProductsModel();         this.model.getProducts();          this.model.each(function (prod) {
            alert(JSON.stringify(prod.toJSON()));
            var proddata = new productDataView({ model: prod });
            proddata.render();
            body.append(proddata.render().el);
        });           //this.$("tbody").append(prodData.render().el);         //alert("body.append");         //$("#content").append(tb);         //this.$el.append(prodData.render());         //this.$el.html("<a> this will show all products </a>");         // return this.$el;     }
})  function IsNumeric(input) {
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;     return (RE.test(input));
} var appRouter = Backbone.Router.extend({
    routes: {
        "": "ViewAllProds",         "ViewAll": "ViewAllProds",         "AddNew": "AddProd"
    },     Start: function () {
        $("#content").empty();         $("#content").append("<a>this is a test</a>");
    },     ViewAllProds: function () {
        allProducts = new ProductMrgView();         allProducts.render();
    },     AddProd: function () {
        var newproduct = new ProductView();         newproduct.render();         $("#content").empty();         $("#content").append(newproduct.el);
    }
});  //var allProducts = new ProductsModel(); var MainFun = function main() {
    window.app = new appRouter();     window.allProducts = new ProductsModel();     window.allProducts.getProducts();     Backbone.history.start({ pushState: true });     // Router, Initialize is start from this function }; MainFun(); // execute the mainfuncion //window.app = new appRouter(); //Backbone.history.start();