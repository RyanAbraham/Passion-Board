let data = { currentMood: 'Happy' };

Vue.component('header-bar', {
  template: `<div id="header-bar"><p>I want content that is: {{ currentMood }}</p></div>`,
  data: function() {
    return data;
  }
});

Vue.component('svg-background', {
  template: `<svg id="gradient" viewBox="0 0 100 100" preserveAspectRatio="none">
               <gradient-defs></gradient-defs>
               <rect width="100" height="100" fill="url('#gradient-fill')"></rect>
             </svg>`
});

Vue.component('gradient-defs', {
  template: `<defs>  
        <linearGradient id="gradient-fill" x1="50%" y1="0%" x2="50%" y2="100%" > 
            
            <stop offset="0%" stop-color="#064C96">
                <animate attributeName="stop-color" values="#064C96; #0A7BA1; #064C96" dur="10s" repeatCount="indefinite"></animate>
            </stop>

            <stop offset="100%" stop-color="#0A7BA1">
                <animate attributeName="stop-color" values="#0A7BA1; #064C96; #0A7BA1" dur="10s" repeatCount="indefinite"></animate>
            </stop>

        </linearGradient> 

    </defs>`
});

Vue.component('feed-box', {
  template: `<div class="feed-box">
               <h3 class="feed-title"> {{ feedTitle }} </h3>
               <div class="feed-content">
               </div>
             </div>`,
  data: function() {
    return { feedTitle: 'Song for the Mood: ' + data.currentMood };
  }
});

new Vue({ el: '#app'});
