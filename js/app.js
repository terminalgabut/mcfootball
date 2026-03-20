const { createApp, ref } = Vue;

/* ===============================
⚽ MATCH CARD COMPONENT
=============================== */
const MatchCard = {
props: ['teamA', 'teamB', 'scoreA', 'scoreB', 'minute'],

template: `
<div class="match-card">

  <div class="match-teams">

    <div class="match-team">
      <img :src="teamA.logo" />
      <div>{{ teamA.name }}</div>
    </div>

    <div class="match-score">
      <div class="match-score-value">
        {{ scoreA }} : {{ scoreB }}
      </div>

      <div class="match-minute">
        {{ minute }}'
      </div>
    </div>

    <div class="match-team">
      <img :src="teamB.logo" />
      <div>{{ teamB.name }}</div>
    </div>

  </div>

</div>

`
};

/* ===============================
📜 LOG COMPONENT
=============================== */
const MatchLog = {
props: ['logs'],

template: `
<div class="card">

  <div class="log">
    <div v-for="(item, i) in logs" :key="i" class="log-item">
      {{ item }}
    </div>
  </div>

</div>

`
};

/* ===============================
🎮 ROOT APP
=============================== */
const App = {
components: {
MatchCard,
MatchLog
},

template: `
<div class="container">

  <match-card
    :teamA="teamA"
    :teamB="teamB"
    :scoreA="scoreA"
    :scoreB="scoreB"
    :minute="minute"
  />

  <match-log :logs="logs" />

  <button class="btn btn-primary" @click="startMatch">
    Start Match
  </button>

</div>

`,

setup() {
const minute = ref(0);
const scoreA = ref(0);
const scoreB = ref(0);
const logs = ref([]);

const teamA = ref({
  name: "Man United",
  logo: "https://cdn.sofifa.net/teams/11/30.png"
});

const teamB = ref({
  name: "Bayern",
  logo: "https://cdn.sofifa.net/teams/21/30.png"
});

let interval = null;

function log(text) {
  logs.value.unshift(text);
}

function startMatch() {
  if (interval) return;

  interval = setInterval(() => {
    minute.value++;

    if (minute.value > 90) {
      clearInterval(interval);
      log("FULL TIME");
      return;
    }

    const r = Math.random();

    if (r < 0.08) {
      scoreA.value++;
      log(minute.value + "' ⚽ " + teamA.value.name + " Goal");
    } 
    
    else if (r < 0.16) {
      scoreB.value++;
      log(minute.value + "' ⚽ " + teamB.value.name + " Goal");
    }

  }, 500);
}

return {
  minute,
  scoreA,
  scoreB,
  logs,
  teamA,
  teamB,
  startMatch
};

}
};

createApp(App).mount('#app');
