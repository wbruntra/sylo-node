import os, sys
import requests
import shutil

saveDir = os.path.join(os.getcwd(), 'saved')

try:
    shutil.rmtree(saveDir)
except:
    pass

print(saveDir)
baseUrl = "http://localhost:3000/"

full_sites = ['contact/family','contact/food', 'contact/mens-active-lifestyle','contact/travel',]

sites = ['',
        'about',
        'brands',
        'contact',
        'contact/all','contact/brand','contact/creator',
        'contact/influencer-marketing',
        'creators',
        'faq',
        'privacy',
        'terms',
        'thanks/brand','thanks/contact',
        'thanks/creator','thanks/influencer',
        'js/bundle.js'
        ]

for site in sites:
    r = requests.get(baseUrl + site)
    sitePath = site.split('/')
    if '.' in sitePath[-1]:
        saveFile = os.path.join(saveDir, *sitePath)
    else:
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
