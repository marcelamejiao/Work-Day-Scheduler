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

    var startHour = 9;
    var endTime = 17;

    for (var i = startHour ; i <= endTime; i++) {
        // Create a new timeblock
        var newRow = sampleRow.clone();
        
        // Select the column with the hour
        var hourColumn = newRow.children('.hour');
        
        // Display time in AM/PM format
        hourColumn.text(moment().hour(i).minutes(0).format('h a'));

        // Add to the list of timeBlocks
        newRow.appendTo(timeBlocks);
    }
}

init();

// display the bussiness hours (time blocks)
// display the current time (green for current, gray(?) for past)
// option to add the tasks
// save button
// json to save the data in local storage
// colours the tasks