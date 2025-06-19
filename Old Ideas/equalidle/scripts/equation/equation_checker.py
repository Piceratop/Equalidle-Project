import re

import re


def check_string(string):
    if re.search(r'\*0|0\*|0/', string):
        return False

    return True


digit_count = 7
inputFile = open(f'full{digit_count}Equations.txt', 'r')
outputFile = open(f'{digit_count}Equations.txt', 'w')
for line in inputFile:
    line = line.strip()
    if check_string(line):
        outputFile.write(line + '\n')
inputFile.close()
outputFile.close()
