view_enabled = true;
view_visible[0] = true;

global.resolution_width = display_get_width();
global.resolution_height = display_get_height();

camera_width = global.resolution_width;
camera_height = global.resolution_height;

view_set_camera(0, camera_create_view(0, 0, camera_width, camera_height));
view_wport[0] = camera_width;
view_hport[0] = camera_height; 

surface_resize(application_surface, camera_width, camera_height);
