from firebase import firebase
firebase = firebase.FirebaseApplication('https://hackbash-c75bb-default-rtdb.firebaseio.com/', None)

def send(b):
    if b == []:
        data ={'pid': '1',
                  'url': '',
                  'start_page': 2,
                  'end_page':5,
                  'output': b,
                   'final':0
                  }
        result = firebase.post('/hackbash-c75bb-default-rtdb/Data/',data)
        print(result)
    else:
        data = {'pid': '1',
                'url': '',
                'start_page': 2,
                'end_page': 5,
                'output': b,
                'final': 1
                }
        result = firebase.post('/hackbash-c75bb-default-rtdb/Data/', data)
        print(result)
