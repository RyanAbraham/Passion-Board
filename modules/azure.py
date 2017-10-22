# Utilizes Azure Cloud WebSearch API to generate n number of URL's for images that have positive/happy connotations.

import http.client, urllib.parse, json
import json

host = "api.cognitive.microsoft.com"
path = "/bing/v7.0/search"
filter = "&responseFilter=images" #search filters
term = "happiness"

def fetch_search_result(emotion):
    return(json.dumps({}))

# sample Sad dictionary
sad_dict = {
    'anger': 0.0886223167181015,
    'joy': 0.10006538033485413,
    'fear': 0.1751064658164978,
    'sadness': 0.5425705313682556,
    'surprise': 0.09363535046577454
}

# sample Happy dictionary
happy_dict = {
    'anger': 0.007581704296171665,
    'joy': 0.07016665488481522,
    'fear': 0.8000516295433044,
    'sadness': 0.02512381225824356,
    'surprise': 0.06534374748375202
}

def SadWebSearch(search):
    "Performs a Bing Web search when user is sad, and returns the results"

    headers = {'Ocp-Apim-Subscription-Key': config.azure_api_key}
    conn = http.client.HTTPSConnection(host)
    query = urllib.parse.quote(search)
    conn.request("GET", path + "?q=" + query + filter, headers=headers)
    response = conn.getresponse()
    # headers = [k + ": " + v for (k, v) in response.getheaders()
    #                if k.startswith("BingAPIs-") or k.startswith("X-MSEdge-")]
    return response.read().decode("utf8")

def IsSad(dict):
    "Takes in emotion dictionary and determines if user is sad, which is sadness > 0.30"

    if (dict.get('sadness')>0.30):
        SadWebSearch(term)

    else:
        print("User is not sad!")

# not sure whether necessary to include a HappyWebSearch
#def HappyWebSearch(search):

def main():
    if len(config.azure_api_key) == 32:
        print('Searching the Web for: ', term)

        IsSad(sad_dict)
        result = SadWebSearch(term)
        print("\nJSON Response:\n")

        json_obj = (json.loads(result))

        print(json.dumps(json.loads(result), indent=4))

        try:
            # prints n url's in range(n)
            for x in range(2):
                print(((json_obj['images']['value'])[x])['contentUrl'])
                print()
        except:
            print("ERROR: No images found for " + term + ".")

    else:
        print("Invalid Bing Search API subscription key!")
        print("Please paste yours into the source code.")

if __name__ ==  "__main__":
    main()
