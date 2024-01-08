$(document).ready(function () {
    // Display current day
    $('#currentDay').text(dayjs().format('dddd, MMMM D'));

    // Time blocks for standard business hours (7 AM - 10 PM)
    const businessHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

    businessHours.forEach(hour => {
        // Create time blocks
        const timeBlock = $('<div>').addClass('row time-block');
        const hourCol = $('<div>').addClass('col-md-1 hour');
        const descriptionCol = $('<textarea>').addClass('col-md-10 description');
        const saveBtnCol = $('<button>').addClass('col-md-1 saveBtn');

        // Set hour text and format
        const displayHour = hour <= 12 ? `${hour} AM` : `${hour-12} PM`;
        hourCol.text(displayHour);
        timeBlock.append(hourCol);

        // Load saved events from localStorage
        const event = localStorage.getItem(hour);
        descriptionCol.val(event);

        // Add save button with icon
        saveBtnCol.html('<i class="fas fa-save"></i>');
        timeBlock.append(descriptionCol, saveBtnCol);

        // Append time block to container
        $('.container').append(timeBlock);

        // Color coding based on past, present, future
        const currentHour = dayjs().hour();
        if (hour < currentHour) {
            descriptionCol.addClass('past');
        } else if (hour === currentHour) {
            descriptionCol.addClass('present');
        } else {
            descriptionCol.addClass('future');
        }
    });

    // Save event to local storage
    $('.saveBtn').on('click', function () {
        const hourText = $(this).siblings('.hour').text();
        const hour = hourText.includes('AM') ? parseInt(hourText) : parseInt(hourText) + 12;
        const event = $(this).siblings('.description').val();
        localStorage.setItem(hour, event);
    });
});
