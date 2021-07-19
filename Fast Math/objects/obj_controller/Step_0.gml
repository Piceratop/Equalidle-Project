// Change page
if (text_page < array_length(text) - 1) {
	if (text_alpha > 0) {
		text_alpha -= 0.01
	} else {
		text_page += 1
		showing_text = text[text_page]
		if (text_page < array_length(text) - 2) {
			text_alpha = 2
		}
	}
} else if (math_page < array_length(math)) {
	showing_text = math[math_page]
	if (cal_time > 0) {
		text_alpha = 1
		cal_time -= 1
	} else if (wait_time > 0){
		wait_time -= 1
		text_alpha = 0
	} else {
		math_page += 1
		cal_time = init_cal_time
		wait_time = init_wait_time
	}
} else if (submit == 0) {
	showing_text = text[array_length(text) - 1]
	text_alpha = 1
	allow = 1
}

// User input
if (keyboard_check_pressed(vk_anykey)) {
	if (string_check(keyboard_string) and allow == 1 and string_length(user_input) < 20) {
		if (user_input == "0") {
			user_input = string(keyboard_string)
		} else {
			user_input += string(keyboard_string)
		}
	}
	if (keyboard_check(vk_enter) and allow == 1 and submit == 0) {
		if (user_input == sum) {
			showing_text = correct_ans[irandom_range(0, array_length(correct_ans) - 1)]
		} else {
			showing_text = wrong_ans[irandom_range(0, array_length(wrong_ans) - 1)]
		}
		submit = 1
	}
	keyboard_string = ""
}
if (keyboard_check_pressed(vk_add) or keyboard_check_pressed(vk_backspace)) {
	user_input = string_delete(user_input, string_length(user_input), 1)
	keyboard_string = ""
}