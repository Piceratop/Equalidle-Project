import pygame
import random

# initialize pygame
pygame.init()

# define colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
YELLOW = (255, 255, 0)
GRAY = (128, 128, 128)

# set up the game window
WINDOW_WIDTH = 400
WINDOW_HEIGHT = 400
game_window = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption('Wordle')

# set up the font
font = pygame.font.SysFont(None, 48)

# define the game variables
clock = pygame.time.Clock()
word_list = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'melon', 'orange', 'peach', 'pear']
secret_word = random.choice(word_list)
guesses_left = 6
feedback = ''

# define a function to check the guess against the secret word
def check_guess(guess):
    global feedback
    if guess == secret_word:
        feedback = 'Congratulations! You guessed the word!'
    else:
        correct_position = 0
        correct_letter = 0
        for i in range(len(guess)):
            if guess[i] == secret_word[i]:
                correct_position += 1
            elif guess[i] in secret_word:
                correct_letter += 1
        feedback = f'{correct_position} correct position, {correct_letter} correct letter, {5-correct_position-correct_letter} incorrect'

# game loop
while True:
    # handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            quit()
        if event.type == pygame.KEYDOWN and guesses_left > 0:
            if event.unicode.isalpha() and len(feedback) < 5:
                feedback += event.unicode
            elif event.key == pygame.K_RETURN and len(feedback) == 5:
                check_guess(feedback)
                guesses_left -= 1
                feedback = ''
            elif event.key == pygame.K_BACKSPACE:
                feedback = feedback[:-1]

    # fill the background
    game_window.fill(WHITE)

    # display the secret word
    secret_word_text = font.render(secret_word, True, BLACK)
    game_window.blit(secret_word_text, (50, 50))

    # display the guesses left
    guesses_left_text = font.render(f'{guesses_left} guesses left', True, BLACK)
    game_window.blit(guesses_left_text, (50, 150))

    # display the feedback
    feedback_text = font.render(feedback, True, BLACK)
    if len(feedback) == 5:
        if feedback == '5 correct position, 0 correct letter, 0 incorrect':
            feedback_text = font.render('Congratulations! You guessed the word!', True, GREEN)
        else:
            feedback_text = font.render(feedback, True, YELLOW)
    for i in range(len(feedback)):
        if feedback[i] == '1':
            pygame.draw.circle(game_window, GREEN, (280+i*20, 250), 10)
        elif feedback[i] == '2':
            pygame.draw.circle(game_window, YELLOW, (280+i*20, 250), 10)
        elif feedback[i] == '0':
            pygame.draw.circle(game_window, GRAY, (280+i*20, 250), 10)
    game_window.blit(feedback_text, (50, 250))

    # update the display
    pygame.display.update()

    # tick
    # game over
    if guesses_left == 0:
        feedback_text = font.render(f'Game over! The word was {secret_word}.', True, BLACK)
        game_window.blit(feedback_text, (50, 250))
        pygame.display.update()
        pygame.time.wait(3000)
        pygame.quit()
        quit()

    # update the clock
    clock.tick(60)
