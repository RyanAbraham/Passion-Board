# Utilizes Azure Cloud WebSearch API to generate n number of URL's for images that have positive/happy connotations.

import http.client, urllib.parse
import json
import random
import modules.config as config

subscriptionKey = config.azure_api_key
host = "api.cognitive.microsoft.com"
path = "/bing/v7.0/search"
filter = "&responseFilter=images" #search filters

NUM_SEARCHES = 10

def get_image_uri(emotion):
    search_results = {}

    if len(subscriptionKey) == 32:
        print('Searching the Web for: ', emotion)

        # Takes in emotion dictionary and deemotionines if user is sad, which is sadness > 0.30

        # Performs a Bing Web search when user is sad, and returns the results

        headers = {'Ocp-Apim-Subscription-Key': subscriptionKey}
        conn = http.client.HTTPSConnection(host)
        query = urllib.parse.quote(emotion)
        conn.request("GET", path + "?q=" + query + filter, headers=headers)
        response = conn.getresponse()
        result = response.read().decode("utf8")

        json_obj = (json.loads(result))

        try:
            # adds n (in range(n)) URL's to JSON
            for x in range(NUM_SEARCHES):
                search_results[x] = ((json_obj['images']['value'])[x])['contentUrl']
        except Exception as e:
            print("ERROR: No images found for " + emotion + ".")
            print(e)

    else:
        print("Invalid Bing Search API subscription key!")
        print("Please paste yours into the source code.")
    if(search_results != {}):
        return json.dumps({'uri': random.choice(search_results)})
    else:
        return json.dumps({})

