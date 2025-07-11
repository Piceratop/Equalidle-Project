rack = ["0", "0", "1", "2", "3"];

rack_flexpanel = flexpanel_create_node({
   left: 0, top: -256, flexDirection: "row"
});

for (var _i = 0; _i < 8; _i++) {
   flexpanel_node_insert_child(rack_flexpanel, flexpanel_create_node({
      width: sprite_get_width(spr_tile),
      height: sprite_get_height(spr_tile)
   }), 0)
}

flexpanel_calculate_layout(rack_flexpanel, undefined, undefined, flexpanel_direction.LTR);

for (var _i = 0; _i < flexpanel_node_get_num_children(rack_flexpanel); _i++) {
   var _rack_tile = flexpanel_node_get_child(rack_flexpanel, _i);
   
   var _rt_pos = flexpanel_node_layout_get_position(_rack_tile, false);
   show_debug_message($"{_rt_pos.left}, {_rt_pos.top}");
}