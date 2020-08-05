# 05-Day-Planner
## Pseudocode
Use moment.js to display time and date, update every second to keep time accurate

    format to display spelled out month, date with st (1st, 2nd, 3rd), full year, and current hour, minute, seconds and am pm

    if 24 hour format is set, display moment format to show 24 hour hour, and no am or pm

    set div with id currentDay's text content to the output of moment.js

    set an interval to call the function every 1000 milliseconds



create time blocks and render them to the page dynamically using js

    *first create a time block in the HTML to make sure all the classes and element types are included and the html is styled correctly based on those classes or ids

    variables timeChart= 0 time index= 0, dayHours= 24, and isTwelveHourFormat = true
    
    create a for loop, in the loop set i to 0, incrementing every loop, looping as long as i is less than day hours. Every loop, do the following:

        if we are using a 12 hour format and the time chart is greater than 11, set the time chart to 0. we can use the time chart to set the text of the hour div in the time block. when that value reaches 12, set it back to 1

        declare a variable of amPM

        if the 12 hour format is being used, so long is the time index is greater than 22 or less than 11, set the amPM variable to AM, if thw 12 format is true but the time index is any other value, set amPM to PM

        increment timeIndex and timeChart

        create a variable called rowElement. this variable should create a div, set the class of the div to row, and append it to the div with the id of timeContainer

        create a variable of hourElement. this variable should create a div with the class col-md-1 and hour. set the text equal to timeChart and amPM variables, append to row element

        create a variable of planInput. this variable should create an input element with the type attribute of text, an id equal to the timeIndex (added after the fact. used to target specific inputs in for loop later on), a class of col-md-10 and planner-input and append it to the row div

        create a variable of saveBtn. this variable should create a button element with the class col-md-1 and saveBtn, an id of (S + timeIndex) and append it to the row div

        create a variable called saveImg. this variable should create an image element with the source referencing the relative file path to my save image, an alt description of save icon, a class of saveImg and append it to the save button. (later used the class saveBtn to resize the image in css and set pointer events to none for my js to work properly)

    (later called my format 24 hour time function outside of the for loop)


        
format time between a 12 and 24 hour format

    if 12 hour format is not used loop through all the time blocks

        grab the [i]th div with the class hour

        grab that element's current text

        if the text is a single digit, add a 0 in front of it

        if the text is equal to 24, change the text to 00

        add :00 after the existing text 
            (had to do this in a seperate for loop for some reason)



create 12 or 24 hour format button, on click have time blocks and time display adjust formatting

    add button in html

    add event listener to that button. on click, change 12 hour format variable to to false, call display time and time format button



add styling to time blocks based on current time, update every minute to keep time blocks correctly styled based on time

    use moment js to get current hour in 24 hour format

    create a for loop, i starting at 1 looping for the length of the time block 

        use jquery to target the element with the id equal to i

        if i is less than the current hour, add the class past to current input

        if i is equal to the current hour, add the class present to current input

        if i is greater than the current hour, add the class future to current input

    call function in an interval to refresh formatting every minute

find way to select the input that corresponds to the button we click

    use event.target.previousSibling

create an array with a length equal to number of time blocks, leave each index empty

on click, fill the array's index that corresponds with the button with its matching input text, save to local storage

pull the array from local storage and render the saved text to corresponding input