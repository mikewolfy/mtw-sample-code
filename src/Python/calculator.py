import datetime
import random
import requests

income = 100000.00
annual_raise = 0.03
years = 5.0
multiple=(1.0+annual_raise)**int(years)

class Me:
    firstName = "Michael"
    lastName = "Wolfgang"

# inflation=int(input("What's the inflation rate?:\n"))

newincome = income * multiple

# array
seasons=[
    "summer",
    "spring",
    "fall",
    "winter"
]
print(seasons)
print("Ramdom season selection: " + str(random.choice(seasons)))

## dictionary
acronyms ={}
acronyms['LOL']='laugh out loud'
acronyms['IDK']="I don't know"
acronyms['TBH']='To be honest'
print(acronyms['TBH'])
del acronyms['TBH']
print(acronyms)

# datetime
now = datetime.datetime.now()
print(now)

# if else
if 10>9:
    print("higher")
else:
    print("lower")

print ("$" + str(newincome))

print (Me.firstName)
print (seasons[1])

# loop and random
for x in range(20):
    dice1roll = random.randint(1,6)
    dice2roll = random.randint(1,6)
    print('First dice roll is', str(dice1roll), 'and second dice roll is', dice2roll, 'for a total of', str(dice1roll+dice2roll))

# more dictionaries

contacts = {
    'number': 2,
    'students':
    [
        { 'name':'Michael Wolfgang', 'email':'mike_wolfy@yahoo.com'},
        { 'name':'Sam Smith', 'email':'sam_smith@yahoo.com'}
    ]
}

print('Student emails:')
for student in contacts['students']:
    print(student['email'])

# HTTP Requests
# The URL for the API endpoint
url = 'https://jsonplaceholder.typicode.com/posts'

# Make a GET request to the API
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse JSON data from the response
    posts = response.json()
    
    # Print the first 5 posts as an example
    for post in posts[:5]:
        print(f"Post ID: {post['id']}, Title: {post['title']}")
        print(f"Body: {post['body']}\n")
else:
    print(f"Failed to retrieve data, status code: {response.status_code}")
