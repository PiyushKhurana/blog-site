var express  = require("express"),
bodyParser   = require("body-parser"),
mongoose     = require("mongoose"),
app          = express(), 
methodOverride=require("method-override");


mongoose.connect("mongodb://localhost/restful_app_blog");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err)
        {console.log(err);}
        else
        {res.render("index",{blogs :blogs}) ;}
    });
    
});

app.get("/",function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs/new",function(req,res){
    res.render("new");
});

app.post("/blogs",function(req,res){
    Blog.create(req.body.blog,function(err,newBlog){
        if(err)
        {res.render("new");}
        else{
            res.redirect("/blogs");
        }
    });
    
});

app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
       if(err)
       {
           res.redirect("/blogs");
       }
       else
       {
           res.render("show",{blog:foundBlog});
       }
    });
    
});

app.get("/blogs/:id/edit",function(req, res) {
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
        res.redirect("/blogs");
        }
        else{
            res.render("edit",{blog:foundBlog});
        }
    });
    
});



app.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
       if(err)
      {
          res.redirect("/blogs");
      }
      else{
          res.redirect("/blogs/"+req.params.id);
      }
    });
    
});

app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {res.redirect("/blogs");}
        else
        {
            res.redirect("/blogs");
        }
    })
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("BLOG APP has started !!!");
});

var blogSchema=new mongoose.Schema({

 title:String,
 image:String,
 body:String,
 created:{type:Date,default:Date.now}
})

var Blog=mongoose.model("Blog",blogSchema);




// Blog.create({
//   title:"Test Blog",
//   image:"https://images.unsplash.com/photo-1555434992-f1670f5e8fce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
//   body:"Hello this is a blog post !"
// });
















