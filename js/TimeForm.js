var p = MindFusion.Scheduling;
var hoursList;

var TimeForm = function (calendar, item, type)
{
	p.BaseForm.call(this, calendar, item);

	this._id = "TimeForm";
	this._type = type;
	this.headerText = "Evento";
	
}

TimeForm.prototype = Object.create(p.BaseForm.prototype);
TimeForm.prototype.constructor = TimeForm;

TimeForm.prototype.drawContent = function ()
{
	p.BaseForm.prototype.drawContent.call(this);

	var content = this.getContent();	
	
	var row = this.row();
	row.innerHTML = 'Mensagem';
	content.appendChild(row);
	
	var textArea = this.createTextArea({ id: "subject", initValue: this.item.subject, events: { keydown: this._areaKeyDown} });
	textArea.element.style.width = "200px";
	this.addControl(textArea);

	row = this.row();
	row.appendChild(textArea.element);
	content.appendChild(row);

	row = this.row();
	row.innerHTML = "Início";
	content.appendChild(row);

	var control = this.createDropDownList({ id: "start_time", items: this.getHourLabels(), initValue: this.getStartTimeIndex(), addEmptyValue: false });
	control.element.style.width = "200px";
	this.addControl(control);

	row = this.row();
	row.appendChild(control.element);
	content.appendChild(row);

	row = this.row();
	row.innerHTML = "Fim";
	content.appendChild(row);

	var item = this.item;
	control = this.createDropDownList({ id: "end_time", items: hoursList, initValue: this.getEndTimeIndex(),  addEmptyValue: false});
	control.element.style.width = "200px";
	this.addControl(control);

	row = this.row();
	row.appendChild(control.element);
	content.appendChild(row);

	if (identificacao == 'paciente') {
		row = this.row();
		row.innerHTML = "Cuidador";
		content.appendChild(row);

		var cuid = this.createDropDownList({ id: "cuidador", items: cuidObj, initValue: "", addEmptyValue: false });
		cuid.element.style.width = "200px";
		this.addControl(cuid);

		row = this.row();
		row.style.margin = "0px 0px 30px 0px";
		row.appendChild(cuid.element);
		content.appendChild(row);
	}
	
	document.getElementsByClassName('mfp-header').innerHTML = "";

	return content;
};

TimeForm.prototype.getHourLabels = function ()
{
	hoursList = [];
	hoursList.push({ value: 0, text: "12:00am" });
	hoursList.push({ value: 1, text: "12:30am" });
	
	let index = 1;
	
	for(var i = 1; i < 12; i++)
	{
		hoursList.push({ value: index+1, text: i.toString() + ":00am" });
	    hoursList.push({ value: index+2, text: i.toString() + ":30am" });
		
		index += 2;
	}
	
	hoursList.push({ value: index + 1, text: "12:00pm" });
	hoursList.push({ value: index + 2, text: "12:30pm" });
	
	index += 2;
	
	for(i = 1; i < 12; i++)
	{
		hoursList.push({ value: index+1, text: i.toString() + ":00pm" });
	    hoursList.push({ value: index+2, text: i.toString() + ":30pm" });
		
		index += 2;
	} 

	return hoursList;
}

TimeForm.prototype.getStartTimeIndex = function ()
{
	if (this.item != null && this.item.startTime != null)
	{
		
		let index  = this.item.startTime.__getHours() * 2;
		if(this.item.startTime.__getMinutes() > 0)
			index++;
		return index;		
		
	}
	return -1;
}

TimeForm.prototype.getSubject = function()
{
		return this.item.subject;
}

TimeForm.prototype.getEndTimeIndex = function ()
{
	if (this.item != null && this.item.endTime != null)
	{
		let hours = this.item.endTime.__getHours();
		let minutes = this.item.endTime.__getMinutes();
		
		let index = hours * 2;
		
		if (minutes > 0)
			index += 1;
		return index;
		
	}
	return -1;
}

TimeForm.prototype.drawButtons = function ()
{
	var thisObj = this;

	var btnSave = this.createButton({
		id: "btnSave",
		text: 'Salvar',
		events: { "click": function click(e)
		{
			return thisObj.onSaveButtonClick(e);
		}
		}
	});

	var btnCancel = this.createButton({
		id: "btnCancel",
		text: 'Cancelar',
		events: { click: function click(e)
		{
			return thisObj.onCancelButtonClick(e);
		}
		}
	});
	
	var buttons = this.row();
	buttons.classList.add("mfp-buttons-row");
	buttons.appendChild(btnSave.element);
	buttons.appendChild(btnCancel.element);

	return buttons;
};

TimeForm.prototype.onSaveButtonClick = function (e)
{
	var startIndex = +this.getControlValue("start_time");
	var startTime = this.item.startTime.date.clone().addHours(startIndex * 0.5);

	var endIndex = +this.getControlValue("end_time");
	var endTime = this.item.endTime.date.clone().addHours(endIndex * 0.5);

	if (endIndex != 0 && this.item.endTime.hour == 0)
	endTime.addDays(-1);

	if (startTime.valueOf() > endTime.valueOf())
			endTime = startTime.clone().addHours(1);

	this.item.subject = this.getControlValue("subject"); 
	this.item.startTime = startTime;
	this.item.endTime = endTime;
	if (identificacao == 'paciente') {
		this.item._cuidador = this.getControlValue("cuidador");
		syncCuidador(this.getControlValue("cuidador"), this.item)
	}
	if (this.type === "new") {
		this.calendar.schedule.items.add(this.item);
	}

	this.closeForm();

	this.calendar.repaint(true);
};

TimeForm.prototype.onCancelButtonClick = function (e)
{
	this.closeForm();
};

syncCuidador = async (cpf, evento) => {
	var eventos = "";
	var payloadJSONVerif = JSON.stringify({cpf: cpf});

	var verif = await fetch(`${URL_API}/user/cpf`, {
		method: 'POST',
		body: payloadJSONVerif,
		headers: {"Content-Type": "application/json; charset=UTF-8"}
	})
	await verif.json().then(data => {
		eventos = JSON.parse(data.data.cuidador[0].calendario)
		eventos.items.push(evento.toJson())
	})

	payloadJSON = JSON.stringify({
		cpf: cpf,
		calendario: eventos
	})

	await fetch(`${URL_API}/save/calendario/cuidador`, {
		method: 'POST',
		body: payloadJSON,
		headers: {"Content-Type": "application/json; charset=UTF-8"}
	})

}

