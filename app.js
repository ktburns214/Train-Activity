var config = {
    apiKey: "AIzaSyChsI65j1XX9695eEe1cPk_qBt-owLspY0",
    authDomain: "train-activity-hw7.firebaseapp.com",
    databaseURL: "https://train-activity-hw7.firebaseio.com",
    projectId: "train-activity-hw7",
    storageBucket: "train-activity-hw7.appspot.com",
    messagingSenderId: "1052435786785"
      };
    firebase.initializeApp(config);

    var database = firebase.database();

    $(document).on("click", "#form-submit", function (event) {
      event.preventDefault();
  
      var trainName = $("#train-input").val().trim();
      var departCity = $("#depart-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstDepart = $("#first-input").val().trim();
      var frequency = $("#frequency-input").val().trim();
  
      database.ref("/data").push({
          train: trainName,
          departCity: departCity,
          destination: destination,
          firstDepart: firstDepart,
          frequency: frequency
      })
    }); 
  
    database.ref("/data").on("child_added", function (snap) {
        var newRow = $("<div>").addClass("row");
  
      var newTrain = snap.val();
  
      newRow.append($("<div>").addClass("col-2").text(newTrain.train));
  
      newRow.append($("<div>").addClass("col-2").text(newTrain.departCity));
  
      newRow.append($("<div>").addClass("col-2").text(newTrain.destination));
  
      newRow.append($("<div>").addClass("col-2").text(newTrain.frequency + " min"));
  
      console.log(parseInt(newTrain.frequency));
      var firstTimeConverted = moment(newTrain.firstDepart, "HH:mm").subtract(1, "years");
  
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  
      var remainder = diffTime % parseInt(newTrain.frequency);
  
      var minRemain = newTrain.frequency - remainder;   
  
      newRow.append($("<div>").addClass("col-2").text(moment().add(minRemain, "minutes").format("0h:mm a")));
  
      if (minRemain > 4) {
              newRow.append($("<div>").addClass("col-2").text(minRemain));
      } else {
          newRow.append($("<div>").addClass("col-2 urgent").text(minRemain));
      }
      
      $("#schedule-display").append(newRow);
      $("#schedule-display").append("<hr>")
    });