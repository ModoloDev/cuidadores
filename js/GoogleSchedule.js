var p = MindFusion.Scheduling;

var calendar = new p.Calendar(document.getElementById("calendar"));
calendar.currentView = p.CalendarView.SingleMonth;
calendar.theme = "light";
calendar.itemSettings.titleFormat = "%s[hh:mm tt] %h";

calendar.render();

calendar.useForms = false;

calendar.itemDoubleClick.addEventListener(handleItemDoubleClick);
calendar.selectionEnd.addEventListener(handleSelectionEnd);

function handleItemDoubleClick(sender, args)
{
	var form = new TimeForm(sender, args.item, "edit");
	form.showForm();
}

function handleSelectionEnd(sender, args)
{
	var item = new p.Item();
	item.startTime = args.startTime;
	item.endTime = args.endTime;

	var form = new TimeForm(sender, item, "new");
	form.showForm();
}