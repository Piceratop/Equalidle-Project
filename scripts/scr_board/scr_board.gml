/*
 * @description Create a flex panel from a board layout
 * @parameter {Array<Array<String>>} _layout The array layout of the board
 * @parameter {Real} _width The width of a square
 * @parameter {Real} _height The height of a square
 * @return {Pointer.FlexpanelNode} The flex panel of the board
 */
function board_flexpanel_create(_layout, _width, _height){
   var _board_flexpanel = flexpanel_create_node({});

   for (var _row = 0; _row < array_length(_layout); _row++) {
      var _row_flex = flexpanel_create_node({
         flexDirection: "row",
         height: _height,
      });
      
      // Insert every square
      for (var _col = 0; _col < array_length(_layout[_row]); _col++) {
         flexpanel_node_insert_child(_row_flex, flexpanel_create_node({
            width: _width,
            height: _height,
            data: {
               cell_type: _layout[_row][_col],
               tile: ""
            },
         }), _col);
      }
      
      // Insert row
      flexpanel_node_insert_child(_board_flexpanel, _row_flex, _row);
   }
   
   return _board_flexpanel;
}

/*
 * @description Return a clear board with no played tile from a given layout
 * @parameter {Pointer.FlexpanelNode} _flex The flexpanel layout of the board
 * @return {Undefined}
 */
function clear_board(_flex) {
   for (var _i = 0; _i < flexpanel_node_get_num_children(_flex); _i++) {
      // Get the row
      var _row = flexpanel_node_get_child(_flex, _i);
      
      for (var _j = 0; _j < flexpanel_node_get_num_children(_row); _j++) {
         var _cell = flexpanel_node_get_child(_row, _j);
         var _data = flexpanel_node_get_data(_cell);
         
         _data.tile = "";
      }
   }
}

/*
 * @description Draw the board from a flexpanel layout
 * @parameter {Pointer.FlexpanelNode} _flex - The flexpanel layout of the board
 * @return {Undefined}
 */
function draw_board_from_flexpanel(_flex) {
   flexpanel_calculate_layout(_flex, room_width, room_height, flexpanel_direction.LTR);
   var _draw_cell_struct = {
      S: 0,
      H: 1,
      St: 2,
      S2: 3,
      E2: 4,
   };
   for (var _i = 0; _i < flexpanel_node_get_num_children(_flex); _i++) {
      // Get the row
      var _row = flexpanel_node_get_child(_flex, _i);
      
      for (var _j = 0; _j < flexpanel_node_get_num_children(_row); _j++) {
         var _cell = flexpanel_node_get_child(_row, _j);
         // Get cell's position and data
         var _pos = flexpanel_node_layout_get_position(_cell, false);
         var _data = flexpanel_node_get_data(_cell);
         
         if (_data.tile == "") {
            // Case where no tile is played on the cell
            var _draw_cell_id = 0;
            if (struct_exists(_draw_cell_struct, _data.cell_type)) {
               _draw_cell_id = struct_get(_draw_cell_struct, _data.cell_type);
            }
            // Draw the cell
            draw_sprite_ext(
               spr_cell, _draw_cell_id, _pos.left, _pos.top,
               _pos.width / sprite_get_width(spr_cell), _pos.height / sprite_get_height(spr_cell),
               0, c_white, 1
            );
         } else {
            // Case where a tile has been played on the cell
            draw_sprite_ext(
               spr_tile, 0, _pos.left, _pos.top,
               _pos.width / sprite_get_width(spr_tile), _pos.height / sprite_get_height(spr_tile),
               0, c_white, 1
            );
            
            var _store_halign = draw_get_halign();
            var _store_font = draw_get_font();
            draw_set_halign(fa_center);
            draw_set_font(global.fnt_tile);
            draw_text(_pos.left + _pos.width / 2, _pos.top - 8, _data.tile);
            
            draw_set_font(global.fnt_text);
            draw_text(
               _pos.left + _pos.width - 20,
               _pos.top + _pos.height - string_height("0") - 8,
               string(
                  struct_get(global.tile_score_dictionary, "ts" + _data.tile)
               )
            );
            
            draw_set_font(_store_font);
            draw_set_halign(_store_halign);
         }
      }
   }
}