**How to Run**

Change your current directory to the required PATH and type 
flask run main.py

This will create the RestAPI Flask APP

Using Postman, pass the json form data in POST method at flask localhost port. 

API Input params: {URL to be scraped, Starting Page, Ending Page}
API Output Params(TO FIREBASE REALTIME DATABASE): {Top Words for positive keywords and its count/occurence, Top Words for Negative Keywords and their count/occurence, other misc. data}

The API output is sent to database from which Front-end can retrieve the desired data with specific ProcessID
