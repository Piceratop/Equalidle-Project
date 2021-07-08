// Draw textbox
draw_sprite_ext(spr_box, 0, draw_x, draw_y, box_width / sprite_get_width(spr_box), 1, 0, c_white, 1)
draw_sprite_ext(spr_answer, 0, draw_x, draw_y + sprite_get_height(spr_box), box_width / sprite_get_width(spr_answer), 1, 0, c_white, 1)

// Draw text
draw_set_font(fon_text)
draw_set_alpha(text_alpha)
text_width = string_width(showing_text)
draw_text_ext((room_width - text_width) / 2, draw_y + pad_y, showing_text, text_height, box_width - pad_x)

// Draw user input
draw_set_alpha(1)
draw_text_ext((room_width - string_width(user_input)) / 2, draw_y + pad_y + sprite_get_height(spr_box), user_input, text_height, box_width - pad_x)