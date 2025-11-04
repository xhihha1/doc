import fs from 'fs';
const STATE_PATH = '.state.json';

// 確保有檔案
export function loadState() {
  if (!fs.existsSync(STATE_PATH)) {
    fs.writeFileSync(STATE_PATH, JSON.stringify({}, null, 2));
  }
  return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
}

export function saveState(data) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(data, null, 2));
}

export function updateState(partial) {
  const state = loadState();
  Object.assign(state, partial);
  saveState(state);
  return state;
}
