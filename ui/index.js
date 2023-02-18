// constraint: https://fullcalendar.io/docs/event-constraint-demo
document.addEventListener('DOMContentLoaded', function() {
	var Calendar = FullCalendar.Calendar;
	var Draggable = FullCalendar.Draggable;

	var containerEl = document.getElementById('external-events');
	var calendarEl = document.getElementById('calendar');
	var checkbox = document.getElementById('drop-remove');

	// initialize the external events
	// -----------------------------------------------------------------

	new Draggable(containerEl, {
		itemSelector: '.fc-event',
		eventData: function(eventEl) {
			return {
				title: eventEl.innerText
			};
		}
	});

	// initialize the calendar
	// -----------------------------------------------------------------

	var calendar = new Calendar(calendarEl, {
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay addEventButton'
		},
		timeZone: 'local',
		//initialDate: '2023-02-15',
		businessHours: [ // specify an array instead
			{
				daysOfWeek: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
				startTime: '08:00', // 8am
				endTime: '18:00' // 6pm
			},
			{
				daysOfWeek: [ 4, 5 ], // Thursday, Friday
				startTime: '10:00', // 10am
				endTime: '16:00' // 4pm
			}
		],
		initialView: 'timeGridWeek',
		nowIndicator: true,
		selectable: true,
		editable: true,
		droppable: true, // this allows things to be dropped onto the calendar
		drop: function(info) {
			// is the 'remove after drop' checkbox checked?
			if (checkbox.checked) {
				// if so, remove the element from the 'Draggable Events' list
				info.draggedEl.parentNode.removeChild(info.draggedEl);
			}
		},
		customButtons: {
			addEventButton: {
				text: 'add event...',
				click: function() {
					var dateStr = prompt('Enter a date in YYYY-MM-DD format');
					var date = new Date(dateStr + 'T00:00:00'); // will be in local time

					if (!isNaN(date.valueOf())) { // valid?
						calendar.addEvent({
							title: 'dynamic event',
							start: date,
							allDay: true
						});
					} else {
						alert('Invalid date.');
					}
				}
			}
		},
		eventClick: function(info) {
			var eventObj = info.event;

			if (eventObj.url) {
				alert(
					'Clicked ' + eventObj.title + '.\n' +
					'Will open ' + eventObj.url + ' in a new tab'
				);

				window.open(eventObj.url);

				info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
			} else {
				alert('Clicked ' + eventObj.title);
			}
		},
		dateClick: function(info) {
			alert('clicked ' + info.dateStr);
		},
		select: function(info) {
			alert('selected ' + info.startStr + ' to ' + info.endStr);
		},
		eventOverlap: function(stillEvent, movingEvent) {
			// fix for wrong timezone
			const end = movingEvent._instance.range.end
			const start = stillEvent._instance.range.start
			const delta = end.getTime() - start.getTime()
			console.log('###', delta)
			stillEvent.moveDates(delta)
			return true
		},
		events: [
			{
				title: 'simple event',
				start: '2023-02-02'
			},
			{
				title: 'event with URL',
				url: 'https://www.google.com/',
				start: '2023-02-03'
			}
		]
	});

	calendar.render();
});
