//MODULES
var em = module.exports = {};
var fs = require('fs');

//DECLARATION
em.add = add;
em.init = init;
em.search = search;
em.deleteEmploye = deleteEmploye;

var employersList = [];
var nextID = 0;
var max = 0;

function parseEmployers() {
  // Import all employers in this object
  fs.readFile('employers.json', function (err, data) {
    employersList = JSON.parse(data);

    var max = 0;
    employersList.map(function(empl) {
      if (empl.id >= max) {
        max = empl.id;
      }
    });

    nextID = parseInt(max) + 1;

    console.log("Lista creata con elementi: ", employersList.length);
    console.log("NextID: ", nextID);
  });
}

function init() {
  console.log("EmployerManager is init!");

  // Create the json if not present
  fs.exists('employers.json', function (fileExists) {
    if (fileExists) {
      console.log("Il File esiste già!");
      parseEmployers();
    } else {
      console.log("Il File non esiste");
      fs.writeFile('employers.json', "[]", { flag: 'w' }, function (err, data) {
        if (err) throw err;
        parseEmployers();
      });
    }
  });
};

function add(newEmployer, cb) {
  //booleand added init false
  var added = false;

  //check if employer has no empty field    
  if(newEmployer.name == "" || newEmployer.surname == "" || newEmployer.level == "" || newEmployer.salary == "") {
    //if added has empty field return to server false value
    added = false;
  } else {

    if (newEmployer.id) {
      var newEmployerIsPresent = false;

      // Check if user is present in the list
      // Check by ID
      for (var i = 0; i<employersList.length; i++) {
        var employer = employersList[i];

        if (employer.id == newEmployer.id) {
          // Found elem, just update it!
          // Edit the original employersList[i] elem not the employer
          // because it is only a copy! We want modifications to be reflected
          // in the original list!
          employersList[i] = newEmployer;
          newEmployerIsPresent = true;
          break;
        }
      }

      if (!newEmployerIsPresent) {
        // If not present add the user
        employersList.push(newEmployer);
      }
    } else {
      // If not present add the user at nextID
      newEmployer.id = nextID;
      employersList.push(newEmployer);
    }

    // Update nextID
    var max = 0;
    employersList.map(function(empl) {
      if (empl.id >= max) {
        max = empl.id;
      }
    });

    // Smarter and more coincise versione
    // max = Math.max.apply(this, employersList.map(function(e) { return e.id}));

    nextID = max + 1;

    // Write the files in employer.json
    fs.writeFile('employers.json', JSON.stringify(employersList), function (err, data) {});

    added = true;
  }

  cb(added);
}

function deleteEmploye(id,cb){
  var deleted = false;
  for(var i = 0; i < employersList.length; i++){
        if(employersList[i].id == id){
            employersList.splice(i,1)
            deleted = true;
         }
  }       
  cb(deleted);      
}
function search(id, cb) {
  // Search by id inside employersList
  // If found the employer it will store here
  var foundEmployer = {};

  // Iterate over the JSON file
  for (var i = 0; i < employersList.length; i++) {

    //if the id are the same store the founded employer
    if (employersList[i].id == id) {
      console.log("************************************");
      console.log("FOUND->position:[" + i + "]: " + JSON.stringify(employersList[i]) + "\n");
      console.log("************************************");

      // Store the found employer
      foundEmployer = employersList[i];

      // When we found the employer, we don't need to continue searching
      break;
    };
  };

  //if not found return an empty object if found something return it
  cb(foundEmployer);
}
