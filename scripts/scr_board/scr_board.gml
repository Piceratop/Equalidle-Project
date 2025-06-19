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
         height: _height
      });
      
      // Insert every square
      for (var _col = 0; _col <array_length(_layout[_row]); _col++) {
         flexpanel_node_insert_child(_row_flex, flexpanel_create_node({
            width: _width,
            height: "100%"
         }), _col);
      }
      
      // Insert row
      flexpanel_node_insert_child(_board_flexpanel, _row_flex, _row);
   }
   
   return _board_flexpanel;
}