import os, sys
import requests

saveDir = os.path.join(os.getcwd(), 'saved')
print(saveDir)
baseUrl = "http://localhost:3000/"

sites = ['contact/all','contact/brand','contact/creator',
        'thanks/brand','thanks/contact','thanks/creator',
        'contact/influencer-marketing','faq','brands',
        'about']

for site in sites:
    r = requests.get(baseUrl + site)
    sitePath = site.split('/')
    saveFile = os.path.join(saveDir, *sitePath, "index.html")
    print(saveFile)
    if not os.path.exists(os.path.dirname(saveFile)):
        try:
            os.makedirs(os.path.dirname(saveFile))
        except OSError as exc: # Guard against race condition
            if exc.errno != errno.EEXIST:
                raise
    with open(saveFile, "wb") as f:
        f.write(r.content)
