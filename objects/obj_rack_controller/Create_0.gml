rack = ["0", "0", "1", "2", "3"];

rack_flex = flexpanel_create_node({
   left: 0, top: -256, flexDirection: "row"
});

for (var _i = 0; _i < 8; _i++) {
   flexpanel_node_insert_child(rack_flex, flexpanel_create_node({
      width: sprite_get_width(spr_tile),
      height: sprite_get_height(spr_tile)
   }), 0)
}

flexpanel_calculate_layout(rack_flex, undefined, undefined, flexpanel_direction.LTR);

