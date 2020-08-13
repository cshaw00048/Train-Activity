$(document).ready(function(){
	$(document).ready(function(){
          
        // Button for adding Trains
        $("#addTrainBtn").on("click", function(){
    
            // Grabs user input and assign to variables
            var trainName = $("#trainNameInput").val().trim();
            var lineName = $("#lineInput").val().trim();
            var destination = $("#destinationInput").val().trim();
            var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(1, "years").format("X");;
            var frequencyInput = $("#frequencyInput").val().trim();
    
            // Creates local "temporary" object for holding train data
            // Will push this to firebase
            var newTrain = {
                name:  trainName,
                line: lineName,
                destination: destination,
                trainTime: trainTimeInput,
                frequency: frequencyInput,
            }
    
            // pushing trainInfo to Firebase
            trainData.push(newTrain);
    
            // clear text-boxes
            $("#trainNameInput").val("");
            $("#destinationInput").val("");
            $("#trainInput").val("");
            $("#frequencyInput").val("");
    
            // Prevents page from refreshing
            return false;
        });
    
        trainData.on("child_added", function(childSnapshot, prevChildKey){
    
            console.log(childSnapshot.val());
    
            // assign firebase variables to snapshots.
            var trainName = childSnapshot.val().name;
            var trainDestination = childSnapshot.val().destination;
            var trainTimeInput = childSnapshot.val().trainTime;
            var trainFrequency = childSnapshot.val().frequency;
            
            var diffTime = moment().diff(moment.unix(trainTimeInput), "minutes");
            var timeRemainder = moment().diff(moment.unix(trainTimeInput), "minutes") % firebaseFrequency ;
            var minutes = trainFrequency - timeRemainder;
    
            var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
            
            // Test for correct times and info
            console.log(minutes);
            console.log(nextTrainArrival);
            console.log(moment().format("hh:mm A"));
            console.log(nextTrainArrival);
            console.log(moment().format("X"));
    
            // Append train info to table on page
            $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
    
        });
    });
});