export const adjectives = [
  "Anonymous",
  "Curious",
  "Playful",
  "Friendly",
  "Sleepy",
  "Happy",
  "Clever",
  "Gentle",
  "Brave",
  "Quiet",
  "Wise",
  "Swift",
  "Calm",
  "Bright",
  "Peaceful",
  "Cheerful",
  "Nimble",
  "Eager",
  "Jolly",
  "Lively",
];

export const animals = [
  "Penguin",
  "Giraffe",
  "Elephant",
  "Lion",
  "Dolphin",
  "Koala",
  "Panda",
  "Tiger",
  "Fox",
  "Owl",
  "Bear",
  "Wolf",
  "Rabbit",
  "Deer",
  "Raccoon",
  "Kangaroo",
  "Zebra",
  "Kitten",
  "Seal",
  "Turtle",
];

export const generateAnonName = (): string => {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  return `${randomAdjective} ${randomAnimal}`;
};
