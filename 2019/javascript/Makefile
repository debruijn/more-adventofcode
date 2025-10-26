DAY=17

create_day_folder:
	mkdir ${DAY}

create: create_day_folder
	cp util/template.js ${DAY}/main.js
	sed -i 's/XX/${DAY}/g' ${DAY}/main.js
