var state = {};

function init () {
    // Load the state object from local storage
    loadState();

    // current day and time
    var time = moment().format("LLLL");
    $("#currentDay").text(time);
    renderTimeBlocks();
}

// display the bussiness hours (time blocks)
function renderTimeBlocks () {
    var sampleRow = $('#sample-row');
    var timeBlocks = $('#time-blocks');

    // Set current hour without minutes
    var currentTime = moment().minutes(0).seconds(0).millisecond(0);

    var startHour = 9;
    var endTime = 17;

    for (var i = startHour ; i <= endTime; i++) {
        // Create a new timeblock
        var newRow = sampleRow.clone();
        newRow.removeClass("d-none");

        // Set the hour for each time block line so that we can run the save button function
        newRow.attr('data-hour', i);
        
        // Select the column with the hour
        var hourColumn = newRow.children('.hour');

        var timeBlockTime = moment().hour(i).minutes(0).seconds(0).millisecond(0);

        // if currentTime == timeBlockTime then backgroundcolor = red (present)
        if (currentTime.isSame(timeBlockTime)) {
            newRow.addClass("present");
        }
        // if currentTime < timeBlockTime then backgroundcolor = green (future)
        if (currentTime.isBefore(timeBlockTime)) {
            console.log(currentTime, timeBlockTime)
            newRow.addClass("future");
        }
        // if currentTime > timeBlockTime then backgroundcolor = grey (past)
        if (currentTime.isAfter(timeBlockTime)) {
            newRow.addClass("past");
        }
        
        // Display time in AM/PM format
        hourColumn.text(timeBlockTime.format('h a'));

        var textArea = newRow.children('textarea');
        
        // Check if we have any data in this time block...
        if (state.hasOwnProperty(i)) {
            // ... if we do, render the text in the textarea
            textArea.val(state[i]);
        }

        // When save button is clicked then save textarea data to local storage
        var saveButton = newRow.children('.saveBtn').children('i');
        saveButton.on("click", function(event){
            // Get the save button that the user clicked and convert it to a jQuery object
            var button = $(event.target);
            
            // Get the text area section on the same row as the save button
            var textArea = button.parent().siblings('textarea');

            // Get what the user entered
            var userTasks = textArea.val();
            
            // Read the hour attribute that is stored on the time block row
            var hourIndex = textArea.parent().attr('data-hour');

            // Add what the user entered to our state object
            state[hourIndex] = userTasks;

            // Save the state object to the local storage
            saveState();
        });

        // Add to the list of timeBlocks
        newRow.appendTo(timeBlocks);
    }
}

function loadState() {
    var json = localStorage.getItem("work_day_scheduler");

    if (json !== null) {
        state = JSON.parse(json);
    }
}

function saveState() {
    var json = JSON.stringify(state);

    localStorage.setItem("work_day_scheduler", json);
}

init();
