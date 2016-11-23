var express = require('express');
var bind = require('bind');
var bodyParser = require('body-parser');
var EmployerManager = require('./modules/employmanager.js');

// Create Express App
var app = express();

// Attach BodyParser
app.use(bodyParser.urlencoded({extended: false}));
// Use JSON formatting of request/response
app.use(bodyParser.json());


app.use(express.static(__dirname+'/static'));

app.get('/', function(request, response) {
    var context = {
        show: false
    };

    bind.toFile('view/main.tpl', {show: false}, function(data) {
        response.end(data);
    });
});


// EMPLOYER ADDED WITH SUCCESS
app.get('/user-added', function(request, response) {
    response.end("<h1>Utente aggiunto con successo!</h1><br><a href='/'>Torna alla home!</a>");
});

// EMPLOYER NOT ADDED
app.get('/user-not-added', function(request, response) {
    response.end("<h1>Utente non aggiunto!</h1><br><a href='/'>Torna alla home!</a>");
});

// ADD AN EMPLOYER
app.post('/add', function(request, response) {
    if (request.body) {
        // Check wheter there's a correct employer 
        EmployerManager.add(request.body, function(added) {

            if(added)
              response.redirect("/user-added");
            else
              response.redirect("/user-not-added");
        });
    } else {
        response.redirect("/");
    }
});

// DELETE AN EMPLOYER 
app.post('/delete', function(request, response){
    EmployerManager.deleteEmploye(request.body.id, function(deleteBool){
         if(deleteBool){
            console.log("delete with success");
            response.redirect('/delete_success');
         }else{
            console.log("delete operation aborted");
            response.redirect('/not_deleted')
            }
    });   

});

app.get('/delte_success', function(request, response){
    response.end("<h1>Utente non eliminato</h1><br><a href='/'>Torna alla home");
});


app.get('/not_deleted', function(request, response){
    response.end("<h1>Utente non eliminato</h1><br><a href='/'>Torna alla home");
});


app.post('/search',function(request,response){
    //look for employeer
    EmployerManager.search(request.body.search,function(foundEmployer){
        
        //if the employeer is not null
        if(foundEmployer !== undefined){
            
            console.log("Full\n");
            console.log("found id: " + foundEmployer.id);

            bind.toFile('view/main.tpl',{
              mode: "POST",
              show: true,
              id: foundEmployer.id,
              name: foundEmployer.name,
              surname: foundEmployer.surname,
              level: foundEmployer.level,
              salary: foundEmployer.salary
              },function(data){
                    response.end(data);
              });      
        }else if(foundEmployer == {}){
                console.log("nothing");
                bind.toFile('view/main.tpl',{show:"false"},function(data){
                response.end(data);
            });
        }
    });
});
  
app.post('/', function(request, response) {

  var context = {
      mode: "POST",
      search: ""
  };

  if (request.body) {
      context.search = request.body.search;
  }

  bind.toFile('main.tpl', context, function(data) {
      response.end(data);
  });
});

app.listen(8000, function(data) {
  EmployerManager.init();



  console.log("Server Init!");
});

