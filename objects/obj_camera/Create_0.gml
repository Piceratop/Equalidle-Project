view_enabled = true;
view_visible[0] = true;

global.resolution_width = display_get_width();
global.resolution_height = display_get_height();

//camera_width = global.resolution_width;
//camera_height = global.resolution_height;

board_camera_height = sprite_get_height(spr_fnt_tile) * 7 + 64;
board_camera_width = board_camera_height * global.resolution_width / global.resolution_height;
board_camera_x = -32;
board_camera_y = -32;

board_camera = camera_create_view(
   board_camera_x, board_camera_y,
   board_camera_width, board_camera_height
);

view_set_camera(0, board_camera);
view_wport[0] = board_camera_width;
view_hport[0] = board_camera_height; 

surface_resize(application_surface, board_camera_width, board_camera_height);

mouse_x_previous = device_mouse_x_to_gui(0);
mouse_y_previous = device_mouse_y_to_gui(0);