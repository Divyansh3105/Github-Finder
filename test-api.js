import http from 'https';

http.get('https://github-contributions-api.jogruber.de/v4/torvalds?y=last', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Contributions:', data.substring(0, 300) + '...'));
});

http.get('https://api.github.com/repos/torvalds/linux/languages', {
  headers: { 'User-Agent': 'DevBoard-App' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Languages:', data.substring(0, 300)));
});
