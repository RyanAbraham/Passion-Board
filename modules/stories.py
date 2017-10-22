import json
import random

story_uris = {
    "joy": [
        { "title": "HSLC shelter news: Best friends, a success story for homeless pets", "uri": "http://www.ruidosonews.com/story/news/local/community/2016/09/22/hslc-shelter-news-best-friends-success-story-homeless-pets/90827634/", "img_uri": "https://www.gannett-cdn.com/-mm-/e3062f89c036833d9235d3c6822aebe31b1eb5dc/c=171-0-831-496&r=x404&c=534x401/local/-/media/2016/09/22/TXNMGroup/Ruidoso/636101328204187077-HSLC.jpg" },
        { "title": "Success Story \"Chance\"", "uri": "https://www.petsofthehomeless.org/news-blog/success-story-chance/", "img_uri": "https://www.petsofthehomeless.org/wp-content/uploads/2017/04/Chance-02.15.2017-300x300.jpg" },
        { "title": "Tails of Success - Nebraska Humane Society", "uri": "http://www.nehumanesociety.org/about-nhs/success-stories/", "img_uri": "http://www.nehumanesociety.org/assets/images/thumbnails/success-norman.jpg" }
    ], "sadness": [
        { "title": "Top 10 Reasons to Adopt from an Animal Shelter", "uri": "http://www.hhhstopeka.org/adopt/top-10-reasons-to-adopt-from-an-animal-shelter/", "img_uri": "http://events.cjonline.com/sites/events.cjonline.com/files/Dark%20HHHS%20logo%20copy.jpg" },
        { "title": "Adopt a Pet from the Animal Rescue League of Boston", "uri": "http://www.arlboston.org/adopt/adopt-a-pet/", "img_uri": "http://www.arlboston.org/wp-content/uploads/2017/02/search_adoptables_dogs2.jpg" },
        { "title": "Adopt a Shelter Pet Day: What You Need to Know", "uri": "http://people.com/pets/adopt-a-shelter-pet-day-advice-veterinarian/", "img_uri": "http://peopledotcom.files.wordpress.com/2017/10/dog-mailbox.jpg?crop=0px%2C632px%2C2000px%2C1340px&resize=420%2C281" }
    ]
}

def get_story_uri(emotion):
    if(not emotion in story_uris):
        # Invalid emotion
        return json.dumps(random.choice(story_uris['sadness']))
    # Return JSON with random URI to corresponding emotion
    return json.dumps(random.choice(story_uris[emotion]))

