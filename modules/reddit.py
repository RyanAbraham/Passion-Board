# Delivers reddit posts from a subreddit that matches a chosen emotion
import indicoio
import praw
import json
import modules.config as config
from collections import Counter

indicoio.config.api_key = config.indico_api_key
MAX_POSTS, MAX_COMMENTS = 3, 0

def fetch_posts(subreddit, target_emotion):
    submissions = {}
    return_data = {}
    return_data['submissions'] = []

    if(target_emotion=="joy"):
        subreddit = "happy"
    elif(target_emotion=="sadness"):
        subreddit = "worldnews"

    # Connect to Reddit via PRAW
    reddit = praw.Reddit(client_id='Us-byLFTjQmSJQ',
                         client_secret=config.reddit_client_secret,
                         user_agent='python:com.hackharvard.sentient-dashboard:v1.0')

    # Fetch top X posts from hot of chosen subreddit
    for submission in reddit.subreddit(subreddit).hot(limit=MAX_POSTS):
        # Run emotional analysis on each emotion
        emotion_sum = Counter(indicoio.emotion(submission.title))
        for counter, comment in enumerate(submission.comments):
            if counter >= MAX_COMMENTS:
                break
            if comment.body != "[removed]" and "http" not in comment.body: # Ignore removed comments
                emotion_sum.update(Counter(indicoio.emotion(comment.body)))
            else:
                counter -= 1
        # Average the emotion values
        for emotion in emotion_sum:
            emotion_sum[emotion] /= counter+1
        submissions[submission.title] = [emotion_sum, submission.shortlink]

    # Cut out all emotions except the chosen one
    for sub in submissions:
        submissions[sub][0] = submissions[sub][0][target_emotion]

    # Construct JSON to return
    for post in reversed(sorted(submissions, key=submissions.get)):
        return_data['submissions'].append({'title': post, 'score': submissions[post][0], 'shortlink': submissions[post][1]})
    return json.dumps(return_data)
