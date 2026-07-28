import requests
from bs4 import BeautifulSoup

url = "https://codeavecjonathan.com/scraping/recette/"

response = requests.get(url)
response.encoding = "utf-8"

def get_text_if_not_none(e):
    if e:
        return e.text.strip()
    return None

if response.status_code == 200:
    html = response.text
    # print(html)

    f = open("./scraping_web/recette.html", "w")
    f.write(html)
    f.close()

    soup = BeautifulSoup(html, "html5lib")

    titre = soup.find("h1").text # retourne juste le premier element
    print(titre)

    description = get_text_if_not_none(soup.find("p", class_="description"))
    print(description)

    # Ingredients
    div_ingredients = soup.find("div", class_="ingredients")
    e_ingredients = div_ingredients.find_all("p")
    for e_ingredient in e_ingredients:
        print ("INGREDIENT: ", e_ingredient.text)

    # Etapes de preparation
    table_etapes_preparation = soup.find("table", class_="preparation")
    e_etape = table_etapes_preparation.find_all("td", class_="preparation")
    for e_etape in e_etapes:
        print ("ETAPES: ", e_etape.text)
    
else:
    print("ERREUR:", response.status_code)

print("FIN")