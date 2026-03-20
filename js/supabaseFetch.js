import supabase from './supabase.js';


// 📥 GET PLAYERS
export async function getPlayers(limit = 50) {
const { data, error } = await supabase
.from('players')
.select('')
.limit(limit);

if (error) {
console.error('❌ getPlayers error:', error.message);
return [];
}

return data ?? [];
}


// 🔍 GET PLAYER BY ID
export async function getPlayerById(id) {
const { data, error } = await supabase
.from('players')
.select('')
.eq('id', id)
.single();

if (error) {
console.error('❌ getPlayerById error:', error.message);
return null;
}

return data;
}


// 🔎 SEARCH PLAYER
export async function searchPlayers(keyword) {
const { data, error } = await supabase
.from('players')
.select('')
.ilike('name', "%${keyword}%")
.limit(20);

if (error) {
console.error('❌ searchPlayers error:', error.message);
return [];
}

return data ?? [];
}


// 🏟️ GET PLAYERS BY CLUB
export async function getPlayersByClub(clubName) {
const { data, error } = await supabase
.from('players')
.select('')
.eq('club', clubName)
.limit(30);

if (error) {
console.error('❌ getPlayersByClub error:', error.message);
return [];
}

return data ?? [];
}

// ⭐ TOP PLAYERS (BY OVERALL)
export async function getTopPlayers(limit = 20) {
const { data, error } = await supabase
.from('players')
.select('')
.order('overall', { ascending: false })
.limit(limit);

if (error) {
console.error('❌ getTopPlayers error:', error.message);
return [];
}

return data ?? [];
}


// 🎲 RANDOM PLAYERS (FOR TEAM)
export async function getRandomPlayers(count = 22) {
const { data, error } = await supabase
.from('players')
.select('');

if (error) {
console.error('❌ getRandomPlayers error:', error.message);
return [];
}

if (!data) return [];

// shuffle aman (tidak mutate langsung)
const shuffled = [...data].sort(() => 0.5 - Math.random());

return shuffled.slice(0, count);
}
