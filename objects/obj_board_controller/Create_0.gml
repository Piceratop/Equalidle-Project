square_width = sprite_get_width(spr_fnt_tile);
square_height = sprite_get_height(spr_fnt_tile);

/*
 * Convention:
 * S: Square
 * S2, S3, S4, S5: Double Square, Triple Square, Quadruple Square, Quindruple Square
 * E2, E3, E4, E5: Double, Triple, Quadruple, Quindruple Expression
 * St: Starting Square
 * H: Hole
 */
board_layout = [
   ["E2", "S", "S", "S", "S", "S", "E2"],
   ["S", "H", "S", "S2", "S", "S", "S"],
   ["S", "S", "S", "S", "S2", "S", "S"],
   ["S", "S2", "S", "St", "S", "S2", "S"],
   ["S", "S", "S2", "S", "S", "S", "S"],
   ["S", "S", "S", "S2", "S", "H", "S"],
   ["E2", "S", "S", "S", "S", "S", "E2"]
]

flexpanel_board_layout = board_flexpanel_create(board_layout, square_width, square_height);

