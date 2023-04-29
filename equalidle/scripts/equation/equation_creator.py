import re

operators = ["+", "-", "*", "/"]
digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
allCharacters = digits + operators
counter = [0] * 6


def extract_numbers(string):
    number_pattern = r'\d+'
    matches = re.findall(number_pattern, string)
    if not matches:
        return False
    zero_starter_pattern = r'^0\d'
    for match in matches:
        if re.match(zero_starter_pattern, match):
            return False
    return True


def break_into_expression(equation):
    expressions = equation.split("=")
    if len(expressions) <= 1:
        return False
    try:
        for i in range(len(expressions)):
            if not re.match(r'^[-\d]', expressions[i]):
                return False
            if re.search(r'[^\d][^\d]', expressions[i]):
                return False
            expressions[i] = eval(expressions[i])
        if not (expressions[0] == expressions[1] and expressions[1] == expressions[-1]):
            return False
        return True
    except Exception:
        return False


with open('subEquations.txt', 'w') as equationFile:
    while counter[0] < len(allCharacters):
        currentEquation = ""
        for i in range(6):
            currentEquation += allCharacters[counter[i]]
            if i == 2:
                currentEquation += "="
        if extract_numbers(currentEquation) and break_into_expression(currentEquation):
            equationFile.write(f"{currentEquation}\n")
        for i in range(len(counter)-1, -1, -1):
            counter[i] += 1
            if counter[i] < len(allCharacters):
                break
            if i:
                counter[i] = 0
