# Delivers reddit posts from a subreddit that matches a chosen emotion
import indicoio
import praw
import modules.config as config
from collections import Counter

indicoio.config.api_key = config.indico_api_key
MAX_POSTS = 10
MAX_COMMENTS = 1
submissions = {}

def fetchposts(target_emotion):
    return_string = ""
    reddit = praw.Reddit(client_id='Us-byLFTjQmSJQ',
                         client_secret=config.reddit_client_secret,
                         user_agent='python:com.hackharvard.sentient-dashboard:v1.0')

    for submission in reddit.subreddit('wholesomememes').hot(limit=MAX_POSTS):
        emotion_sum = Counter(indicoio.emotion(submission.title))
        for counter, comment in enumerate(submission.comments):
            if counter >= MAX_COMMENTS:
                break
            if comment != "[removed]": # Ignore removed comments
                emotion_sum.update(Counter(indicoio.emotion(comment.body)))
            else:
                counter -= 1
        # Average the emotion values
        for emotion in emotion_sum:
            emotion_sum[emotion] /= counter+1
        #print("\nTitle: " + submission.title + "\nEmotion: ", end='')
        #print(emotion_sum)
        submissions[submission.title] = emotion_sum

    for sub in submissions:
        submissions[sub] = submissions[sub][target_emotion]

    for post in reversed(sorted(submissions, key=submissions.get)):
        return_string += post + "\n<br />"
        return_string += str(submissions[post]) + "\n<br />"
    return return_string

