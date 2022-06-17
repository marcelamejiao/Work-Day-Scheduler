function init () {
    // current day and time
    var time = moment().format("LLLL");
    $("#currentDay").text(time);
    renderTimeBlocks();
}

function renderTimeBlocks () {
    var sampleRow = $('#sample-row');
    var timeBlocks = $('#time-blocks');
    sampleRow.clone().appendTo(timeBlocks); 
}

init();