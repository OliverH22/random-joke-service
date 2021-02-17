// 6 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here
const randomJokeJSON = (limit = 1) => {
  const jokes = [
    { q: 'Why did the chicken cross the road?', a: 'To get to the other side!' },
    { q: 'What do you call a very small valentine?', a: 'A valen-tiny!' },
    { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!' },
    { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!' },
    { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!" },
    { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!' },
  ];
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  const responseObj = {
    timestamp: new Date(),
    joke,
  };
  return JSON.stringify(responseObj);
};

const getRandomJokeResponse = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(randomJokeJSON(params.limit));
  response.end();
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
