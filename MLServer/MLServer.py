# -*- coding: utf-8 -*-
"""
Created on Tue Jul 13 13:07:41 2021

@author: Jati Wicaksono
"""


# -*- coding: utf-8 -*-
"""
Created on Wed Nov 18 13:07:51 2020
@author: win10
"""
#pip install fastapi uvicorn

# 1. Library imports
import urllib.parse
import uvicorn
from fastapi import FastAPI
from url_feature_extractor import extract_url
import numpy as np
import pickle
#import pandas as pd

app = FastAPI()
pickle_in = open("MLModel.pkl","rb")
classifier=pickle.load(pickle_in)
# 2. Create the app object


# 3. Index route, opens automatically on http://127.0.0.1:8000



@app.get('/predict')
def predict_banknote(url):
    results= extract_url(url)
    print(results);
   # print(classifier.predict([[variance,skewness,curtosis,entropy]]))
    prediction = classifier.predict([results])
    
    if(prediction[0] == '0'):
        print('benign')
        prediction="Benign"
    else:
        print('malicious')
        prediction="Malicious"
    return {
        'prediction': prediction
    }