function parseMinute(s) { 
	multiplier = 1
	split = s.split(" ")
	time = split[0]
	unit = split[1]

	if (unit.includes("hour")) {
		multiplier = 60
	}

	return parseFloat(s.split(" ")[0]) * multiplier 
}

//
function parseMinute(s) { return parseFloat(s.split(" ")[0]) }