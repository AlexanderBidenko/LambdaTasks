"""
Код
(Время: 1 сек. Память: 16 Мб Сложность: 36%)
В наши дни в космосе находятся сотни спутников, и все они обмениваются данными. При этом система распознавания сигналов
 работает по схеме «Свой-Чужой». Один из спутников отправляет запрос другому спутнику в формате двух целых чисел,
  а второй спутник отвечает первому так же двумя целыми числами. Первые два числа первого спутника представляют
   собой сумму цифр и количество цифр тех двух чисел, которыми должен ответить второй спутник. При этом в качестве
    ответа должны получиться числа, представляющие наибольшее и наименьшее возможные значения, которые могут быть
     сформированы по описанному выше методу.

Вам предстоит написать программу, формирующую ответ для второго спутника по известным числам, полученным от первого
 спутника.

Входные данные
Во входном файле INPUT.TXT записаны 2 натуральных числа S и K, представляющих сумму и количество цифр соответственно
(K ≤ 100). При этом гарантируется, что возможно составить хотя бы одно K-значное число, сумма цифр которого равна S.

Выходные данные
В выходной файл OUTPUT.TXT выведите два числа – ответ второго спутника. При этом следует помнить, что все числа не
 имеют лидирующих нулей.

Выходные данные
В выходной файл OUTPUT.TXT выведите в алфавитном порядке оставшиеся в таблице буквы.

Примеры
№	INPUT.TXT	    OUTPUT.TXT
1	1 3	            100 100
2	2 3	            200 101
3	3 4	            3000 1002
"""


def code():
    fin = open("input.txt")
    fout = open("output.txt", "w")

    inputData = fin.readline()

    s, k = inputData.split(" ")
    s = int(s)
    k = int(k.replace('\n', ''))

    if (k == 1):
        fout.write(' '.join([str(s), str(s)]))
        return
    elif (s == 1):
        minSumOfDigits = '1' + ('0' * (k - 1))
        maxSumOfDigits = minSumOfDigits
        fout.write(' '.join([maxSumOfDigits, minSumOfDigits]))
        return
    elif ((s != 1) and (s <= 9)):
        minSumOfDigits = '1' + '0' * (k - 2) + str(s - 1)
        maxSumOfDigits = str(s) + '0' * (k - 1)
        fout.write(' '.join([maxSumOfDigits, minSumOfDigits]))
        return
    elif ((s % 9) != 0) :
            minSumOfDigits = ''
            maxSumOfDigits = ''

            for i in range(0, (s // 9)):
                minSumOfDigits += '9'
                maxSumOfDigits += '9'
            if ((k - (s // 9) - 1) > 0):
                minSumOfDigits = '1' + ('0' * (k - (s // 9) - 2)) + str(s - ((s // 9) * 9) - 1) + minSumOfDigits
            else:
                minSumOfDigits = str(s - ((s // 9) * 9)) + ('0' * (k - (s // 9) - 1)) + minSumOfDigits
            maxSumOfDigits = maxSumOfDigits + str(s - ((s // 9) * 9)) + ('0' * (k - (s // 9) - 1))
            fout.write(' '.join([maxSumOfDigits, minSumOfDigits]))
            return
    else:
        minSumOfDigits = ''
        maxSumOfDigits = ''
        for i in range(0, (s // 9)):
            maxSumOfDigits += '9'
            minSumOfDigits += '9'
        if (len(maxSumOfDigits) != k):
            maxSumOfDigits = maxSumOfDigits + ((k - len(maxSumOfDigits)) * '0')
            minSumOfDigits = minSumOfDigits[0:-1]
            minSumOfDigits = '1' + ('0' * (k - (s // 9) - 1)) + '8' + minSumOfDigits
        fout.write(' '.join([maxSumOfDigits, minSumOfDigits]))
        return


code()

print(open("output.txt").readline())
