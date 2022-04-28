import json


wordNumber = int(input('輸入單字數量'))
email = input('輸入使用者email')
password = input('輸入使用者密碼')

seedList = []
num = 1
while num <= wordNumber:
    example = {
        'id': num,
        'word': 'example' + str(num),
        'partOfSpeech': 'n.',
        'enExplain': 'something that is typical of the group of things that it is a member of',
        'explain': '範例',
        'sentence': 'This painting is a marvellous example of her work.'
    }
    seedList.append(example)
    num += 1
userInfo = {
    "email": email,
    "password": password
}

seedWordJson = json.dumps(seedList)
seedUserJson = json.dumps(userInfo)

seedWord = open('./models/seeds/seedJson/seedWord.json', 'w')
seedWord.write(seedWordJson)

seedUser = open('./models/seeds/seedJson/seedUser.json', 'w')
seedUser.write(seedUserJson)
