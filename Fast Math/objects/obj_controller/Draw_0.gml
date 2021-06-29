// Draw textbox
draw_sprite_ext(spr_box, 0, draw_x, draw_y, box_width / sprite_get_width(spr_box), 1, 0, c_white, 1)

// Draw text
draw_set_font(fon_text)
draw_set_alpha(alpha)
draw_text_ext(draw_x + padding, draw_y + padding, text[page], text_height, box_width - padding)