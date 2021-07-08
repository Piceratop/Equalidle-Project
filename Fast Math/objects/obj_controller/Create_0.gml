// Draw variables
randomise()
draw_x = 100
draw_y = 100
pad_x = 20
pad_y = 10
text_alpha = 2
text_page = 0
text = ["Add the number below.", "Type the answer in the box."]
correct_ans = ["Correct!"]
wrong_ans = ["How about keeping calm?"]
showing_text = text[text_page]
submit = 0
box_width = room_width - 2 * draw_x
text_height = string_height(text[text_page])
text_width = string_width(showing_text)

// Math
init_cal_time = 0.5 * room_speed
init_wait_time = 0.05 * room_speed
cal_time = init_cal_time + room_speed
wait_time = init_wait_time
number_length = 4
lowest = 1
highest = 9
math_page = 0
math = []
sum = 0
for (var i = 0; i < number_length; i++) {
	math[i] = irandom_range(lowest, highest);
	sum += math[i]
}
math_width = string_width(math[math_page])

// User input
allow = 0
user_input = ""