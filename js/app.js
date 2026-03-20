import { getPlayers } from './supabaseFetch.js';

const { createApp, ref, onMounted } = Vue;

const App = {
components: {
MatchCard,
MatchLog
},

template: `
<div class="container">

  <match-card
    v-if="teamA.players.length"
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
const players = ref([]);

const teamA = ref({ name: "Team A", logo: "", players: [] });
const teamB = ref({ name: "Team B", logo: "", players: [] });

const minute = ref(0);
const scoreA = ref(0);
const scoreB = ref(0);
const logs = ref([]);

let interval = null;

function shuffle(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function createTeams() {
  const shuffled = shuffle([...players.value]);

  teamA.value.players = shuffled.slice(0, 11);
  teamB.value.players = shuffled.slice(11, 22);

  teamA.value.name = teamA.value.players[0]?.club || "Team A";
  teamB.value.name = teamB.value.players[0]?.club || "Team B";
}

function getStrength(team) {
  return team.players.reduce((sum, p) => {
    return sum + parseInt(p.overall || 50);
  }, 0);
}

function log(text) {
  logs.value.unshift(text);
}

function startMatch() {
  if (interval) return;

  const strengthA = getStrength(teamA.value);
  const strengthB = getStrength(teamB.value);

  interval = setInterval(() => {
    minute.value++;

    if (minute.value > 90) {
      clearInterval(interval);
      log("FULL TIME");
      return;
    }

    const chanceA = Math.random() * strengthA;
    const chanceB = Math.random() * strengthB;

    if (chanceA > strengthB * 0.85) {
      scoreA.value++;
      log(minute.value + "' ⚽ " + teamA.value.name + " Goal");
    }

    if (chanceB > strengthA * 0.85) {
      scoreB.value++;
      log(minute.value + "' ⚽ " + teamB.value.name + " Goal");
    }

  }, 500);
}

onMounted(async () => {
  players.value = await getPlayers(100);
  createTeams();
});

return {
  teamA,
  teamB,
  minute,
  scoreA,
  scoreB,
  logs,
  startMatch
};

}
};
