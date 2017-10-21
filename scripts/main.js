
class FeedObject {
  constructor(title, endpoint, callbackMethod) {
    this.title = title;
    this.endpoint = endpoint;
    this.callbackMethod = callbackMethod;
    this.content = this.callbackMethod(this.endpoint);
  }
}

let feeds = [
  new FeedObject("Reddit Posts", "/api/RedditAnalysis", function() {
    return "<h1> wholesome memes </h1>";
  }),
  new FeedObject("Facebook Posts", "/api/FacebookAnalysis", function() {
    return "<h1> FACEBOOK maymays </h1>";
  })
];

class Mood {
  constructor(name, colors, id) {
    this.name = name;
    this.colors = colors;
    this.id = id;
  }
}

let moods = [
  new Mood("Sad", ["#064C96","#0A7BA1"], 0),
  new Mood("Happy", ["#2ecc71", "#e67e22"], 1),
  new Mood("Angry", ["#e74c3c", "#d35400"], 2),
];

let data = { currentMoodIndex: 0, currentMood: moods[0], currentFeed: feeds[0], moods: moods, feeds: feeds };

function getCurrentMood() {
  return data.moods[data.currentMoodIndex];
}

Vue.component('header-bar', {
  template: `<div id="header-bar">
              <p>
                I want content that is:
                <select v-model="currentMoodIndex">
                  <option v-for="mood in moods" v-bind:value="mood.id">
                   {{ mood.name }}
                  </option>
                </select>
              </p>
            </div>`,
  data: function() {
    return data;
  }
});

Vue.component('svg-background', {
  template: `<svg id="gradient" viewBox="0 0 100 100" preserveAspectRatio="none">
               <gradient-defs v-bind:first-color="currentMood.colors[0]" v-bind:second-color="currentMood.colors[1]"></gradient-defs>
               <rect width="100" height="100" fill="url('#gradient-fill')"></rect>
             </svg>`,
  data: function() {
    return { currentMood: getCurrentMood() };
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
  template: `<div class="feed-box">
               <h3 class="feed-title"> {{ feedObject.title }} </h3>
               <div class="feed-content">
                 <feed-content v-bind:content="feedObject.content"></feed-content>
               </div>
             </div>`
});

Vue.component('feed-content', {
  props: ["content"],
  template: `<div class="fake-feed-content" v-html="rawHtml">{{ content }}</div>`,
  data: function() {
    return { rawHtml: this.content };
  }
});

Vue.component('feeds', {
  template: `<feed-box :feedObject="currentFeed"></feed-box>`,
  data: function() {
    return data;
  }
})

new Vue({ el: '#app'});
