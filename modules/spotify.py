import json
import random

playlist_uris = {
    "joy": [
        "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DXdPec7aLTmlC",
        "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWYBO1MoTDhZI",
        "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX7KNKjOK0o75"
    ], "sadness": [
        "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634",
        "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX2pSTOxoPbx9",
        "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWSqBruwoIXkA"
   ], "anger": [
        "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX1tyCD9QhIWF"
    ], "fear": [
        "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DXa2PsvJSPnPf"
    ], "surprise": [
        "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX1uG5byNIgDA",
        "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX56qfiUZBncF"
    ]
}

def fetch_playlist_uri(emotion):
    if(not emotion in playlist_uris):
        # Invalid emotion
        return False
    # Return JSON with random URI to corresponding emotion
    return json.dumps({"uri": random.choice(playlist_uris[emotion])})
