# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
import urllib.parse


# intialized value

def extract_url(url):
    all_letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
               'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    all_numbers = ['1','2','3','4','5','6','7','8','9','0']
    
    total_symbols = 0
    total_numbers = 0
    total_letters = 0
    url = urllib.parse.unquote(url)
    
    url = url.lower()   
    
    data = []
    
    if "&lt" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "<script>" and "</script>" in url:
        data.append(1)
    else:
        data.append(0)
        
    
    for s in url:
      
        # if character found in all_digits then increment total_digits by one
        if s in all_letters:
            total_letters += 1
      
        # if character found in all_letters then increment total_letters by one
        elif s in all_numbers:
            total_numbers += 1
        else :
            total_symbols += 1
    
    readability = total_letters / (total_symbols+total_letters+total_numbers)
    
    
    if readability > 0.65:
        data.append(1)
    else:
        data.append(0)
        
    if '"><' in url:
        data.append(1)
    else:
        data.append(0)
    
    if "'><" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "&" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "%" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "/" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "\\" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "+" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "document" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "window" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "onload" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "onerror" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "div" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "iframe" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "img" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "src" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "var" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "eval" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "href" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "cookie" in url:
        data.append(1)
    else:
        data.append(0)
        
    
    if "string.fromcharcode" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "'" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "?" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "!" in url:
        data.append(1)
    else:
        data.append(0)
        
    if ";" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "http" in url:
        data.append(1)
    else:
        data.append(0)
        
    if ".js" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "#" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "=" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "[" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "]" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "[]" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "$" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "(" in url:
        data.append(1)
    else:
        data.append(0)
    
    if ")" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "*" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "," in url:
        data.append(1)
    else:
        data.append(0)
    
    if "-" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "<" in url:
        data.append(1)
    else:
        data.append(0)
        
    if ">" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "@" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "_" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "location" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "search" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "&#" in url:
        data.append(1)
    else:
        data.append(0)
        
    if ":" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "." in url:
        data.append(1)
    else:
        data.append(0)
        
    if "{" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "}" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "~" in url:
        data.append(1)
    else:
        data.append(0)
        
    if " " in url:
        data.append(1)
    else:
        data.append(0)
    
    if '"' in url:
        data.append(1)
    else:
        data.append(0)
        
    if "‘" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "==" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "//" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "|" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "^" in url:
        data.append(1)
    else:
        data.append(0)
    
    if "¦" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "alert" in url:
        data.append(1)
    else:
        data.append(0)
        
    if "<br>" in url:
        data.append(1)
    else:
        data.append(0)
        
        
    data.append(readability)
    
    numbersReadability= total_numbers/ (total_letters+total_numbers+total_symbols)
    data.append(numbersReadability)
    
    
    symbolsReadability= total_symbols/ (total_letters+total_numbers+total_symbols)
    data.append(symbolsReadability)
    
    print(url)
    print(readability)
    print(numbersReadability)
    print(symbolsReadability)
    
    return data



