from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq
import re
import pandas as pd

from nltk import FreqDist


import matplotlib.pyplot as plt
import seaborn as sns
#start_page = int(input("Enter Start Page:"))
#end_page = int(input("Enter End Page:"))
def scrape(url='https://www.amazon.in/Redux-Analogue-Blue-Watch-RWS0216S/product-reviews/B07KVZD6XM?pageNumber=',startpg="1",endpg="1"):
    
    emoji_pattern = re.compile("["
                                 u"\U0001F600-\U0001F64F"  # emoticons
                                 u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                                 u"\U0001F680-\U0001F6FF"  # transport & map symbols
                                 u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                                 "]+", flags=re.UNICODE)
    start_page=startpg
    end_page =endpg
    filename = 'Reviews.csv'
    f = open(filename,'a')
    for pg in range(start_page,end_page+1):
        my_url = url+str(pg)
        uClient = uReq(my_url)
        page_html = uClient.read()
        uClient.close()
        page_soup = soup(page_html, 'html.parser')
        containers = page_soup.findAll("div",{"class":"a-section review aok-relative"})
        container = containers[0]
        
        #headers = 'Username,Ratings,Reviews\n'
        #f.write(headers)
        
        for container in containers:
            username_con = container.findAll("div",{"class":"a-profile-content"})
            username = username_con[0].text
            user_review = container.findAll("span",{"class":"a-size-base review-text review-text-content"})
            review = (emoji_pattern.sub(r'', (user_review[0].text.strip())))
            ratings_con = container.findAll("span",{"class":"a-icon-alt"})
            rating = ratings_con[0].text
            split_rating = rating.split(" ")
            final_rating = split_rating[0]
            
            f.write(username + "," + final_rating + "," + review.replace(',', '|') + "\n")
            # print(username + "," + final_rating + "," + review.replace(',', '|') + "\n")
        
        f.close()
        
        
    df = pd.read_csv('Reviews.csv',encoding='cp1252')
#df.head()

    def freq_words(x, terms = 30):
        all_words = ' '.join([text for text in x])
        all_words = all_words.split()

        fdist = FreqDist(all_words)
        words_df = pd.DataFrame({'word':list(fdist.keys()), 'count':list(fdist.values())})

        # selecting top 20 most frequent words
        d = words_df.nlargest(columns="count", n = terms) 
            #plt.figure(figsize=(20,5))
            #ax = sns.barplot(data=d, x= "word", y = "count")
            #ax.set(ylabel = 'Count')
            #plt.show()
        return d
        
# Here start part2

    df['Review'] = df['Review'].str.replace("[^a-zA-Z#]", " ")
  
    from nltk.corpus import stopwords
    stop_words = stopwords.words('english')

        # function to remove stopwords
    def remove_stopwords(rev):
        rev_new = " ".join([i for i in rev if i not in stop_words])
        return rev_new

        # remove short words (length < 3)
    df['Review'] = df['Review'].apply(lambda x: ' '.join([w for w in x.split() if len(w)>3]))

        # remove stopwords from the text
    reviews = [remove_stopwords(r.split()) for r in df['Review']]

        # make entire text lowercase
    reviews = [r.lower() for r in reviews]
        
        #op=freq_words(reviews, 35)
        
        #part3 Good&Bad keyword
    good_op=[]
    bad_op=[]
    for i in range (0,len(df)):
        if (int(df.iat[i,1]) > 3):
            good_op.append(reviews[i])
        else:
            bad_op.append(reviews[i])

    opgood=freq_words(good_op)
    opbad=freq_words(bad_op)
    opgoodresponse = opgood.to_json(orient='records')
    opbadresponse = opbad.to_json(orient='records')
    return(opgoodresponse,opbadresponse)



