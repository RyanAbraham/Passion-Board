
class FeedObject {
  constructor(title, endpoint, callbackMethod) {
    this.title = title;
    this.endpoint = endpoint;
    this.callbackMethod = callbackMethod;
  }
  content() {
    return this.callbackMethod(this.endpoint);
  }
}

class Mood {
  constructor(name, colors, id) {
    this.name = name;
    this.colors = colors;
    this.id = id;
  }
}

const feeds = [
  new FeedObject("Reddit Analysis", "/reddit/", function(endpoint_args) {
    return "<h1> wholesome memes </h1>";
  }),
  new FeedObject("Azure Analysis", "/azure/", function(endpoint_args) {
    return "<h1> azure maymays </h1>";
  })
];

const moods = [
  new Mood("Sad", ["#064C96","#0A7BA1"], 0),
  new Mood("Happy", ["#2ecc71", "#e67e22"], 1),
  new Mood("Angry", ["#e74c3c", "#d35400"], 2),
];

let store = {
  debug: true,
  state: {
    currentMood: moods[0],
    currentMoodIndex: 0,
    moods: moods,
    feeds: feeds
  },
  setCurrentMood(mood) {
    if (this.debug) console.log("Setting current mood to " + mood);
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
  }
}

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
  template: `<div class="feed-box">
               <h3 class="feed-title"> {{ feedObject.title }} </h3>
               <div class="feed-content">
                 <feed-content :content="computedContent"></feed-content>
               </div>
             </div>`,
  computed: {
    computedContent: function() {
      return this.feedObject.content();
    }
  }
});

Vue.component('feed-content', {
  props: ["content"],
  template: `<div class="fake-feed-content" v-html="rawHtml"></div>`,
  data: function() {
      return { rawHtml: this.content }
  }
});

Vue.component('feeds', {
  template: `<feed-box :feedObject="store.state.feeds[0]"></feed-box>`,
  data: function() {
    return { store: store };
  }
})

new Vue({ el: '#app'});
