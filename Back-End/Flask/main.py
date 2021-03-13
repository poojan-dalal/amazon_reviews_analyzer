from flask import Flask,request,jsonify,abort

from upload import send
import sys
import logging
app=Flask(__name__)
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)
book_list=[

]
@app.route('/books', methods=['GET','POST'])
def books():
    if request.method=='GET':
        return "hello"


    if request.method=='POST':

        #whole code



        a = ['long2', 'cable', 'fine', 'truck', 'quality', 'little', 'shabby', 'side', 'money', 'expecting', 'dollar',
             'snap', 'jumper', 'cable', 'chinese', 'knock', 'shop', 'harbor', 'freight', 'buck']
        send(a)



        new_obj2 = {
            'response': a
        }

        # os.remove("temp.png")
        # return Response(response = image_url)
        try:
            return new_obj2, 201
        except FileNotFoundError:
            abort(404)



if __name__=='__main__':
    app.run()