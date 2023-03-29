import pygame

# Initialize Pygame
pygame.init()

# Set the size of the screen
screen_width = 800
screen_height = 600
screen = pygame.display.set_mode((screen_width, screen_height))

# Set the colors
black = (0, 0, 0)
white = (255, 255, 255)

# Set the size and spacing of the squares
square_size = 50
square_spacing = 10

# Calculate the position of the top-left square in the grid
grid_width = 5 * (square_size + square_spacing) - square_spacing
grid_height = 6 * (square_size + square_spacing) - square_spacing
grid_x = (screen_width - grid_width) // 2
grid_y = (screen_height - grid_height - square_size - 3 * square_spacing) // 2

# Create a list to store the digits in the squares
current_answers = []

# Create a font object for rendering text
font = pygame.font.Font(None, 36)

allow_character = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '='}

# Run the game loop
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            quit()
        elif event.type == pygame.KEYDOWN:
            input_key = event.unicode
            if input_key in allow_character and len(current_answers) < 5:
                input_key = input_key.replace('*', '×')
                current_answers.append(input_key)
            elif input_key == '\b' and len(current_answers) > 0:
                current_answers.pop()
            elif input_key == '\r' and len(current_answers) == 5:
                print(current_answers)
        
        screen.fill(black)
        # Draw the grid of squares and the line of squares
        for row in range(6):
            for col in range(5):
                square_x = grid_x + col * (square_size + square_spacing)
                square_y = grid_y + row * (square_size + square_spacing)
                pygame.draw.rect(screen, black, (square_x, square_y, square_size, square_size))
                pygame.draw.rect(screen, white, (square_x, square_y, square_size, square_size), 3)
            if row == 5:
                for col in range(5):
                    square_x = grid_x + col * (square_size + square_spacing)
                    square_y = grid_y + grid_height + 2 * square_spacing
                    pygame.draw.rect(screen, black, (square_x, square_y, square_size, square_size))
                    pygame.draw.rect(screen, white, (square_x, square_y, square_size, square_size), 3)
                    if col < len(current_answers):
                        text = font.render(current_answers[col], True, white)
                        text_rect = text.get_rect()
                        text_rect.center = (grid_x + col * (square_size + square_spacing) + square_size // 2, grid_y + grid_height + 2 * square_spacing + square_size // 2)
                        screen.blit(text, text_rect)
            
    # Update the display
    pygame.display.update()
