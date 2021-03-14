from flask import Flask,request,jsonify,abort
from scraping import scrape
import sys
import logging
app=Flask(__name__)
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)
book_list=[

]

#import firebase
from firebase import firebase
firebase = firebase.FirebaseApplication('https://hackbash-c75bb-default-rtdb.firebaseio.com/', None)
y="hackbash-c75bb-default-rtdb/Data/"
@app.route('/books', methods=['GET','POST'])
def books():
    if request.method=='GET':
        return "hello"

    if request.method=='POST':

        content2 = request.json
        name= content2['name']
        spage = content2['spage']
        epage = content2['epage']
        url = content2['url']

        data = {'pid': 0,
                'name': name,
                'url': 0,
                'start_page': 0,
                'end_page': 0,
                'goodreviews': 0,
                'badreviews':0,
                'no_of_comm':0,
                'avg':0,
                'exit' : 0
                }

        result = firebase.post(y, data)
        print(result)
        subPart=result.get('name')

        path=y+subPart
        url=str(url)
        good,bad,no_of_comm, avg = scrape(url,spage,epage)
        #whole code

        #a1 = ['car', 'bike', 'bhavik', 'truck', 'quality555', 'little', 'shabby', 'side', 'money', 'expecting', 'dollar',
         #    'snap', 'jumper', 'cable', 'chinese', 'knock', 'shop', 'harbor', 'freight', 'buck']
    
        send(url,spage,epage,good,bad,path,no_of_comm,avg)
        
        #new_obj2 = {
        #    'response': result
        #}

        # os.remove("temp.png")
        # return Response(response = image_url)
        try:
            return jsonify(result), 201
        except FileNotFoundError:
            abort(404)


def send(url,spage,epage,a,b,path,no_of_comm,avg):
        firebase.put(path,'pid',1)
        firebase.put(path,'url',url)
        firebase.put(path,'start_page',spage)
        firebase.put(path,'end_page',epage)
        firebase.put(path,'goodreviews',a)
        firebase.put(path,'badreviews',b)
        firebase.put(path,'no_of_comm',no_of_comm)
        firebase.put(path,'avg',avg)
        firebase.put(path,'exit',1)

#        result = firebase.post(y, data)

if __name__=='__main__':
    app.run()