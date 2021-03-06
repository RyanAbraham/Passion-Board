class FeedObject {
  constructor(title, classname, endpoint, callbackMethod, id) {
    this.title = title;
    this.classname = classname;
    this.endpoint = endpoint;
    this.callbackMethod = callbackMethod;
    this.id = id;
    this.results = ``;
  }
  content() {
    return this.callbackMethod(store.getCurrentMood());
  }
}

class Mood {
  constructor(name, codename, colors, id) {
    this.name = name;
    this.codename = codename;
    this.colors = colors;
    this.id = id;
  }
}

let store = {
  debug: true,
  state: {
    currentMood: null,
    currentMoodIndex: 0,
    lastMoodId: 0,
    lastFeedId: 0
  },
  getCurrentMood() {
    return this.state.currentMood;
  },
  setCurrentMood(mood) {
    if (this.debug) console.log("Setting current mood to " + mood.name);
    this.state.currentMood = mood;
  },
  setCurrentMoodByIndex(index) {
    let newMood = moods[index];
    this.setCurrentMood(newMood);
  },
  setCurrentMoodIndex(number) {
    if (this.debug) console.log("Setting current mood index to " + number);
    this.state.currentMoodIndex = number;
    this.setCurrentMoodByIndex(this.state.currentMoodIndex);
  },
  assignMoodId() {
    if (this.debug) console.log("Assigning Mood Id " + this.state.lastMoodId);
    let givenId = this.state.lastMoodId;
    this.state.lastMoodId++;
    return givenId;
  },
  assignFeedId() {
    if (this.debug) console.log("Assigning Feed Id " + this.state.lastFeedId);
    let givenId = this.state.lastFeedId;
    this.state.lastFeedId++;
    return givenId;
  }
}

const SUCCESS_TEMPLATE = `<p> Winrar </p>`;
const ERROR_TEMPLATE = `<p> The analysis server could not be reached at this time. </p>`;
const SPOTIFY_TEMPLATE = `<iframe src="https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWXLeA8Omikj7" height="80px" frameborder="0" allowtransparency="true"></iframe>`;

const feeds = [
  new FeedObject("Reddit Feed", "reddit", "/reddit/", function(moodObject) {
    axios.get(this.endpoint + "all/" + moodObject.codename)
      .then(response => {
        let firstSubmission = response.data["submissions"][0];
        let submissionTitle = firstSubmission["title"];
        let submissionLink = firstSubmission["shortlink"];
        this.results = `<h3 class="reddit-submission-title"><a href="${submissionLink}">${submissionTitle}</a></h3><br /><img src="https://i.imgur.com/QYtPSU7.png" alt="Reddit Logo" />`;
      })
      .catch(error => {
        console.log(error);
        this.results = ERROR_TEMPLATE;
      });
      return this.results;
  }),
  new FeedObject("Azure Image Gallery", "azure", "/azure/", function(moodObject) {
    axios.get(this.endpoint + moodObject.codename)
      .then(response => {
        let imageUrl = response.data["uri"];
        this.results = `<img src=${imageUrl} alt=${moodObject.codename} />`;
      })
      .catch(error => {
        console.log(error);
        this.results = ERROR_TEMPLATE;
      });
    return this.results;
  }),
  new FeedObject("Spotify Selection", "spotify", "/spotify/", function(moodObject) {
    axios.get(this.endpoint + moodObject.codename)
      .then(response => {
        let responseUri = response.data["uri"];
        this.results = `<iframe src="${responseUri}" height="80px" frameborder="0" allowtransparency="true"></iframe>`
      })
      .catch(error => {
        console.log(error)
        this.results = ERROR_TEMPLATE;
      });
    return this.results;
  }),
  new FeedObject("Story of Interest", "story", "/stories/", function(moodObject) {
    axios.get(this.endpoint + moodObject.codename)
      .then(response => {
        let storyTitle = response.data["title"];
        let storyLink = response.data["uri"];
        let storyImage = response.data["img_uri"];
        this.results = `<h3 class="story-title"><a href="${storyLink}">${storyTitle}</a></h3><br /><img src=${storyImage} alt=${moodObject.codename} />`;
      })
      .catch(error => {
        console.log(error)
        this.results = ERROR_TEMPLATE;
      });
    return this.results;
  })
  // new FeedObject("Twitter Analysis", "twitter", "/twitter/", function(moodObject) {
  //   axios.get(this.endpoint + moodObject.codename)
  //     .then(response => {
  //       console.log(response);
  //       this.results = SUCCESS_TEMPLATE;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.results = ERROR_TEMPLATE;
  //     });
  //   return this.results;
  // })
];

const moods = [
  new Mood("Joyful", "joy", ["#F0D351", "#38E8F5"], store.assignMoodId()),
  new Mood("Sad", "sadness", ["#064C96","#0A7BA1"], store.assignMoodId()),
  new Mood("Angry", "anger",  ["#E0000B", "#631299"], store.assignMoodId()),
  new Mood("Scary", "fear", ["#A8161D", "#1C0307"], store.assignMoodId()),
  new Mood("Surprising", "surprise", ["#62A9D9", "#8DE31E"], store.assignMoodId())
];

store.state.currentMood = moods[0];
store.state.moods = moods;
store.state.feeds = feeds;

Vue.component('header-bar', {
  template: `<div id="header-bar">
              <p>
                I want content that is:
                <select :value="store.state.currentMoodIndex"
                      v-on:input="store.setCurrentMoodIndex($event.target.value)">
                  <option v-for="mood in store.state.moods" v-bind:value="mood.id">
                   {{ mood.name }}
                  </option>
                </select>
              </p>
            </div>`,
  data: function() {
    return { store: store };
  }
});

Vue.component('svg-background', {
  template: `<svg id="gradient" viewBox="0 0 100 100" preserveAspectRatio="none">
               <gradient-defs v-bind:first-color="store.state.currentMood.colors[0]" v-bind:second-color="store.state.currentMood.colors[1]"></gradient-defs>
               <rect width="100" height="100" fill="url('#gradient-fill')"></rect>
             </svg>`,
  data: function() {
    return { store: store };
  }
});

Vue.component('gradient-defs', {
  props: ['firstColor', 'secondColor'],
  template: `<defs>
              <linearGradient id="gradient-fill" x1="50%" y1="0%" x2="50%" y2="100%" >
                <stop offset="0%" v-bind:stop-color="firstColor">
                  <animate attributeName="stop-color" v-bind:values="''+firstColor+'; '+ secondColor + '; ' + firstColor" dur="10s" repeatCount="indefinite"></animate>
                </stop>
                <stop offset="100%" v-bind:stop-color="secondColor">
                  <animate attributeName="stop-color" v-bind:values="''+secondColor+'; '+firstColor+'; '+secondColor" dur="10s" repeatCount="indefinite"></animate>
                </stop>
              </linearGradient>
            </defs>`
});

Vue.component('feed-box', {
  props: ['feedObject'],
  template: `<div :class="'feed-box ' + feedObject.classname">
               <h3 class="feed-title"> {{ feedObject.title }} </h3>
               <div class="feed-content" v-html="computedContent">
                 {{ computedContent }}
               </div>
             </div>`,
  data: function() {
    return { store: store }
  },
  computed: {
    computedContent: function() {
      return this.feedObject.content();
    }
  }
});

Vue.component('feeds', {
  template: `<div class="feeds"><feed-box v-for="feed in store.state.feeds" :feedObject="feed" :key="feed.id"></feed-box></div>`,
  data: function() {
    return { store: store };
  }
})

new Vue({ el: '#app'});
