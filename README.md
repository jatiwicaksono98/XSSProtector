# XSSProtector
A Chrome extension for detecting Reflected XSS


The dataset inside the MLServer folder was the modified version of the dataset from https://github.com/fmereani/Cross-Site-Scripting-XSS

It was modified to only focus on detecting Reflected XSS

To run the machine learning server, please go to the MLServer folder and run this command:

          uvicorn MLServer:app --reload --host 0.0.0.0 --port 5000
          
The port and host used in the command are port 5000 and host 0.0.0.0, could be change as necessary

To add the extension into your Google Chrome browser: 

1. Open Google Chrome and go to the URL chrome://extensions/
2. Click the "Load Unpacked" button on the top left part of screen

By now, the extension should be ready to be used

The extension's UI is believed to be self-explanatory

Please feel free to email me at cl20627@bristol.ac.uk if there is any question regarding this project

Note : Currently the extension would communicate with localhost:5000 where the MLServer was put
       If the port where the MLServer running was changed, please also change the code inside the extension
       The code would be on the 'background.js' file


