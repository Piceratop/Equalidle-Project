/*
 * @description This function will draw a single tile
 * @parameter {Real} _x The x coordinate of the tile
 * @parameter {Real} _y The y coordinate of the tile
 * @parameter {String} _label The type of the tile
 * @parameter {Constant.Color} _color The drawn color of the tile
 */

function draw_number_tile(_x, _y, _label, _color=c_yellow){
   var _store_halign = draw_get_halign();
   var _store_font = draw_get_font();
   draw_set_halign(fa_center);
   draw_set_font(global.fnt_tile);
   
   // Draw the tile's label
   draw_sprite_ext(spr_tile, 0, _x, _y, 1, 1, 0, _color, 1);
   draw_text(_x + sprite_get_width(spr_tile) / 2, _y - 8, _label);
   
   // Draw the score of the tile
   draw_set_font(global.fnt_text);
   draw_text(
      _x + sprite_get_width(spr_tile) - 20,
      _y + sprite_get_height(spr_tile) - string_height("0") - 8,
      string(
         struct_get(global.tile_score_dictionary, "ts" + _label)
      )
   );
   
   draw_set_font(_store_font);
   draw_set_halign(_store_halign);
}