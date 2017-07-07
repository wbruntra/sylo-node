import requests

site = "http://localhost:3000/faq"

r = requests.get(site)

with open("faq.html", "wb") as f:
    f.write(r.content)
