var state = {};

function init () {
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

// display the bussiness hours (time blocks)
// display the current time (green for current, gray(?) for past)
// option to add the tasks
// save button
// json to save the data in local storage
// colours the tasks