<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>(:title ~ Manage Employer:)</title>

    <link href="css/style.css" rel="stylesheet" type="text/css">

	<script src="js/jquery-2.2.3.min.js" type="text/javascript"></script>
    <script src="js/support.js" type="text/javascript"></script>
    

</head>
<body>
	<div id="main-container" class="clearfix">

    <h1>Manage your Employees</h1>
    <h2>Request Type (:mode ~ GET:)</h2>
    <div id="search-div" class="container"> 
      <h3>Search an Employer</h3>
      <form action="search" method="POST" id="search">
        <input type="number" 
               value="(:search ~ "":)"
               name="search" placeholder="Search employer by id">
        <input type="submit" value="Search">
      </form>
    </div>
    <div id="result" class="container">
      <form action="delete" method="POST" id="result" class="(:if[show]~ [:then~ show:][:else~ hide:]:)">
        <input type="number" name="id" value="(: id ~ "":)">
        <input type="text" name="name" value="(: name ~ "":)">
        <input type="text" name="surname" value="(: surname~ "":)">
        <input type="text" name="level" value="(: level~ "":)">
        <input type="text" name="salary" value="(: salary ~ "":)">
        <input type="submit" value="Delete">
      </form>
    </div>
    <div class="container">
      <button id="add-form-button">Add new Employer</button>
      <form action="add" method="POST" id="new-empl">
              <input type="number" name="id" placeholder="Insert Id">
          <input type="text" name="name" placeholder="Insert Name">
          <input type="text" name="surname" placeholder="Inser Surname">
                  <input type="number" name="level" placeholder="Insert Level">
          <input type="number" name="salary" placeholder="Insert Salary">
          <input type="submit" value="Add">
      </form>
    </div>
  </div>
</body>
</html>
