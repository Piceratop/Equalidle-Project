function string_check(_string){
	for (var i = 0; i < string_length(_string); i++) {
		var char = string_copy(_string, i, 1)
		if (char != "0" and 
		char != "1" and 
		char != "2" and 
		char != "3" and 
		char != "4" and 
		char != "5" and 
		char != "6" and 
		char != "7" and 
		char != "8" and 
		char != "9") { 
			return false	
		}
	}
	return true
}