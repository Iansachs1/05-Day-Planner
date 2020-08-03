var isTwelveHourFormat = true;
var dayHours = 24;
var timeChart = 0;
var timeIndex = 0;

var inputValues = [
    "", "", "", "", "", "",
    "", "", "", "", "", "",
    "", "", "", "", "", "",
    "", "", "", "", "", "",
];



// create a formatted date and time and append it to the empty div designated to display time
function DisplayDateaAndTime() {
    var momentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    if (isTwelveHourFormat === false) {
        momentDate = moment().format('MMMM Do YYYY, HH:mm:ss ')
    } 
    $("#currentDay").text(momentDate);
}

DisplayDateaAndTime();
// execute the date and time display to refesh every second keeping the time accurate
setInterval(DisplayDateaAndTime, 1000);



// Dynamically create each time block, formatting the hour based on a 12 or 24 hour format
function DisplayTimeBlocks() {
    
    for (let i = 0; i < dayHours; i++) {
        // if we are using 12 houor format, rest the time chart variable to start at 1 again
        if (isTwelveHourFormat && timeChart > 11) {
            timeChart = 0;
        }
        let amPM = "";
        if (isTwelveHourFormat) {
            if (timeIndex < 11 || timeIndex > 22) {
                amPM = "AM";
            } else {
                amPM = "PM";
            }
        }
        
        timeIndex++
        timeChart++

        // create row div element with class row
        const rowElement = $("<div>").attr("class", "row").appendTo($(".timeContainer"));

        // create hour div with inner text to display the time and am/pm when necessary
        const hourElement = $("<div>").attr("class", "col-md-1 hour").text(timeChart + amPM).appendTo(rowElement);

        // create input element to hold text and to have an id equal to the hour in 24 hour format
        var planInput = $("<input>").attr("type", "text").attr("id", timeIndex).attr("class", "col-md-10 planner-input").appendTo(rowElement);
        
        // create save button element with same id as inout element but with s for save
        const SaveBtn = $("<button>").attr("class", "col-md-1 saveBtn").attr("id", "S" + timeIndex).appendTo(rowElement);

        // img element of save icon to append in the button element
        const saveImg = $("<img>").attr("src", "./Assets/save-icon-alpha.png").attr("alt", "Save icon").attr("class", "saveImg").appendTo(SaveBtn);
    }
    Format24HourTime();
}

DisplayTimeBlocks();

// function to format 24 hour clock to display in 00:00 
function Format24HourTime() {
    if (isTwelveHourFormat === false) {
        for (let i = 0; i < 24; i++) {
            var currentHourElement = $(".hour")[i];
            var currentHourText = currentHourElement.innerText;
            
            if (currentHourText.length < 2) {
                currentHourElement.innerHTML = "0" + currentHourText;
            } else if (currentHourText > 23) {
                
                currentHourElement.innerHTML = "00";
            }
        }
        for (let i = 0; i < 24; i++) {
            var currentHourElement = $(".hour")[i];
            var currentHourText = currentHourElement.innerText;
            currentHourElement.innerText = currentHourText + ":00";
        }
    }
    
}



// adds css styling to all time blocks based on if the time block is in the past present or future
function PastPresentFutureFormat() {
    for (let i = 1; i < (dayHours + 1); i++) {
        var momentHour = parseInt(moment().format("H"));
        var inputTimeIndex = parseInt($('#' + i).attr('id'));
        var inputElement = $("#" + i)
    
        if (inputTimeIndex < momentHour) {
            inputElement.attr("class", "col-md-10 planner-input past");
    
        } else if (inputTimeIndex === momentHour) {
            inputElement.attr("class", "col-md-10 planner-input present");
    
        } else if (inputTimeIndex > momentHour) {
            inputElement.attr("class", "col-md-10 planner-input future");
    
        }
    }
}

PastPresentFutureFormat();
// update the formatting every minute to make sure all time blocks are correctly styled based on time
setInterval(PastPresentFutureFormat, 60000);



// used to reset all vital variables so the DisplayTimeBlocks function runs properly if called multiple times
function ResetTimeIndexes() {
    dayHours = 24;
    timeChart = 0;
    timeIndex = 0;
    $(".timeContainer").empty();
}



// on click switch between 12 and 24 hour format and redisplay all elements
$("#timeFormatBtn").on("click", function() {
    
    if (isTwelveHourFormat) {
        isTwelveHourFormat = false;
    } else if (isTwelveHourFormat === false) {
        isTwelveHourFormat = true;
    }
    ResetTimeIndexes();
    DisplayTimeBlocks();
    PastPresentFutureFormat();
    DisplayDateaAndTime();
});



// save the array inputValues to local storage
function SaveInputValue() {
    localStorage.setItem("InputValues", JSON.stringify(inputValues));
}



// clear local storage
function ClearLocalStorage() {
    localStorage.clear();
}


// get array from local storage and pass back into inpuValues array
function RenderInputValues () {
    inputValues = JSON.parse(localStorage.getItem("InputValues"));
    if (inputValues === null) {
        inputValues = [
            "", "", "", "", "", "",
            "", "", "", "", "", "",
            "", "", "", "", "", "",
            "", "", "", "", "", "",
        ];
    } else {
        
        for (let i = 0; i < inputValues.length; i++) {
            const currentInputElement = $("#" + (i + 1));
            const currentInputValue = inputValues[i];
            
            currentInputElement.val(currentInputValue);
        }

    }
}


// when you click on any button with the class saveBtn
$(".saveBtn").on("click", function(event) {
    // find the clicked button and get its id, then remove everything but the number
    var btnIndex = event.target.getAttribute("id");
    btnIndex = parseInt(btnIndex.replace(/\D/g, ""));
    
    // get the input element with the id that matches the button's index
    var matchingInputElement = event.target.previousSibling;
    
    // save the value of the selected input field to the array inpiut values
    inputValues[btnIndex - 1] = matchingInputElement.value;
    
    SaveInputValue();
    
});
RenderInputValues();