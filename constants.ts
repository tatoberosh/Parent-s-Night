import { QuestionCategory, Round3Item, FinalRoundItem } from './types';

export const CHILDREN_DATA = [
  { name: 'Stephanie', age: 7, color: 'bg-pink-500' },
  { name: 'Bethanie', age: 5, color: 'bg-purple-500' },
  { name: 'Varchie', age: 3, color: 'bg-blue-500' },
];

// Round 1 Categories (Trivia) - 50 Questions each
export const ROUND_1_CATEGORIES: Record<string, QuestionCategory[]> = {
  Stephanie: [
    {
      category: 'Countries',
      items: [],
      questions: [
        'Where is the Eiffel Tower?', 'Where is the Great Wall?', 'Country with 50 stars on its flag?', 'Where do Kangaroos live?', 'Where is Big Ben?',
        'Country shaped like a boot?', 'Where are the Pyramids?', 'Tokyo is the capital of?', 'Where is the Amazon Rainforest?', 'Country with a maple leaf flag?',
        'Madrid is the capital of?', 'Where is the Taj Mahal?', 'Berlin is the capital of?', 'Country famous for pizza?', 'Where is the Statue of Liberty?',
        'Which country is also a continent?', 'Moscow is the capital of?', 'Where is the Colosseum?', 'Country with the most people?', 'Dublin is the capital of?',
        'Where is the Sydney Opera House?', 'Country just north of the USA?', 'Where does the King of England live?', 'Where is Hollywood?', 'Beijing is the capital of?',
        'Country famous for Bull fighting?', 'Where is the Leaning Tower?', 'Cardiff is the capital of?', 'Country famous for chocolate (starts with B)?', 'Where is Machu Picchu?',
        'Canberra is the capital of?', 'Country with a red circle on its flag?', 'Where is Disney World?', 'Ottawa is the capital of?', 'Country famous for tulips?',
        'Where is the Nile River?', 'Brasilia is the capital of?', 'Where is the Acropolis?', 'New Delhi is the capital of?', 'Country famous for sushi?',
        'Where is the Grand Canyon?', 'Lisbon is the capital of?', 'Where is the Louvre museum?', 'Country home to Kiwi birds?', 'Where is Mount Fuji?',
        'Rome is the capital of?', 'Country with the Loch Ness Monster?', 'Where is the Parthenon?', 'Amsterdam is the capital of?', 'Country famous for baguettes?'
      ]
    }
  ],
  Bethanie: [
    {
      category: 'Animals',
      items: [],
      questions: [
        'What says Moo?', 'King of the Jungle?', 'Animal with a long trunk?', 'What says Woof?', 'Animal that gives us wool?',
        'Tallest animal?', 'What says Meow?', 'Animal with black and white stripes?', 'What says Quack?', 'Animal that hops and eats carrots?',
        'Huge animal that swims in the ocean?', 'What says Oink?', 'Fastest land animal?', 'What lays eggs for breakfast?', 'What says Roar?',
        'Animal with a very long neck?', 'What says Baa?', 'What flies in the sky and chirps?', 'Animal with 8 legs?', 'What says Neigh?',
        'Animal that carries its house on its back?', 'Animal that eats bananas?', 'What says Ribbit?', 'Animal with a horn on its nose?', 'What says Cluck Cluck?',
        'Animal that sleeps upside down?', 'What says Hiss?', 'Man\'s best friend?', 'What says Buzz?', 'Insect that makes honey?',
        'What is a baby cat called?', 'What says Squeak?', 'Animal with a pouch for its baby?', 'What says Tweet?', 'Animal with a mane?',
        'What says Hee-Haw?', 'Animal with big floppy ears?', 'What says Gobble Gobble?', 'Bird that cannot fly and lives in the snow?', 'Fish that looks like a star?',
        'Animal that changes color?', 'What says Owoooo (howls)?', 'Animal with humps?', 'Bird that repeats what you say?', 'Animal that spins a web?',
        'What says Cock-a-doodle-doo?', 'What animal is Peppa?', 'What says Honk?', 'Big spotted cat?', 'What animal is Winnie the Pooh?'
      ]
    }
  ],
  Varchie: [
    {
      category: 'Fruits and Vegetables',
      items: [],
      questions: [
        'Yellow curved fruit?', 'Red crunchy fruit?', 'Orange vegetable rabbits love?', 'Green tree-like vegetable?', 'Sweet red fruit used for jam?',
        'Big green fruit with red inside?', 'Fruit that makes orange juice?', 'Vegetable that makes you cry?', 'Yellow kernels on a cob?', 'Vegetable for Halloween lantern?',
        'Green vegetable in a pod?', 'Sour yellow fruit?', 'Purple round fruit in bunches?', 'Red fruit for ketchup?', 'White vegetable for mash?',
        'Green long vegetable?', 'Fruit with a big seed inside?', 'Monkeys love this fruit?', 'Vegetable that makes french fries?', 'Fruit named after a bird?',
        'Red fruit paired with cream?', 'Fruit that looks like a lightbulb?', 'Spiky fruit yellow inside?', 'Berry that is blue?', 'Long green vegetable (Courgette)?',
        'Brown hairy fruit?', 'Vegetable white and fluffy like a cloud?', 'Red fruit with a stone?', 'Green salad leaf?', 'Very sour green fruit?',
        'Vegetable that gives you night vision?', 'Fruit that keeps the doctor away?', 'Fruit that is orange inside and out?', 'Vegetable that smells strong (Onion)?', 'Fruit dried to make raisins?',
        'Long purple vegetable?', 'Fruit that grows on palm trees?', 'Red fruit often in pie?', 'Green vegetable used for pickles?', 'Fruit that is a color?',
        'Small green round vegetable?', 'Vegetable rabbits love?', 'Fruit with water inside?', 'Vegetable with eyes?', 'Fruit meant for a teacher?',
        'Green fruit, white inside?', 'Crunchy stick vegetable?', 'Hot red vegetable?', 'Fruit that splits into segments?', 'Fruit used for cider?'
      ]
    }
  ]
};

// Round 2 Categories (Lists) - Single Category per child
export const ROUND_2_CATEGORIES: Record<string, QuestionCategory[]> = {
  Stephanie: [
    { category: 'Words that end with letter K', items: [] }
  ],
  Bethanie: [
    { category: 'French Words', items: [] }
  ],
  Varchie: [
    { category: 'Colors', items: [] }
  ]
};

// Round 3 Questions (Specific to each child)
export const ROUND_3_QUESTIONS: Record<string, Round3Item[]> = {
  Varchie: [
    {
      header: "Guess the Tower",
      leftLabel: "CN Tower", rightLabel: "Eiffel Tower",
      leftImage: "Images/CN Tower.jpg",
      rightImage: "Images/Eiffel Tower.jpg"
    },
    {
      header: "Guess the Sport",
      leftLabel: "Basketball", rightLabel: "Soccer",
      leftImage: "Images/Basketball.jpg",
      rightImage: "Images/Soccer.jpg"
    },
    {
      header: "Guess the Logo",
      leftLabel: "McDonalds", rightLabel: "Tim Hortons",
      leftImage: "Images/McDonalds.jpg",
      rightImage: "Images/Tim Hortons.jpg"
    },
    {
      header: "Guess the Home Item",
      leftLabel: "Lamp", rightLabel: "Carpet",
      leftImage: "Images/Lamp.jpg",
      rightImage: "Images/Carpet.jpg"
    }
  ],
  Bethanie: [
    {
      header: "Guess the Piece",
      leftLabel: "Chess Knight", rightLabel: "Chess Bishop",
      leftImage: "Images/Knight.png",
      rightImage: "Images/Bishop.jpg"
    },
    {
      header: "Guess the Sport",
      leftLabel: "Hockey", rightLabel: "Baseball",
      leftImage: "Images/Hockey.jpg",
      rightImage: "Images/Baseball.jpg"
    },
    {
      header: "Guess the Logo",
      leftLabel: "Scotiabank", rightLabel: "TD Bank",
      leftImage: "Images/Scotiabank.png",
      rightImage: "Images/TD Bank.png"
    },
    {
      header: "Guess the Cloth",
      leftLabel: "Tie", rightLabel: "Bowtie",
      leftImage: "Images/Tie.jpg",
      rightImage: "Images/Bowtie.jpg"
    }
  ],
  Stephanie: [
    {
      header: "Guess the Character",
      leftLabel: "Goofy", rightLabel: "Moana",
      leftImage: "Images/Goofy.jpg",
      rightImage: "Images/Moana.jpg"
    },
    {
      header: "Guess the Sport",
      leftLabel: "American Football", rightLabel: "Tennis",
      leftImage: "Images/American Football.jpg",
      rightImage: "Images/Tennis.jpg"
    },
    {
      header: "Guess the Logo",
      leftLabel: "Toyota", rightLabel: "Honda",
      leftImage: "Images/Toyota.png",
      rightImage: "Images/Honda.jpg"
    },
    {
      header: "Guess the Appliance",
      leftLabel: "Humidifier", rightLabel: "Food Processor",
      leftImage: "Images/Humidifier.jpg",
      rightImage: "Images/Food Processor.jpg"
    }
  ]
};

// Final Round Data
export const FINAL_ROUND_CATEGORY = "Danny Go Songs";
export const FINAL_ROUND_ITEMS: FinalRoundItem[] = [
  { text: 'The Floor is Lava', isCorrect: true },
  { text: 'Baby Shark', isCorrect: false },
  { text: 'Wheels on the Bus', isCorrect: false },
  { text: 'I Got That Rhythm', isCorrect: true },
  { text: 'Let It Go', isCorrect: false },
  { text: 'Wiggle It', isCorrect: true },
  { text: 'Hot Potato', isCorrect: false },
  { text: 'Gorilla Smash', isCorrect: true },
  { text: 'Fruit Salad', isCorrect: false },
  { text: 'Happy Song', isCorrect: false },
  { text: 'The Creepy Crawl', isCorrect: true },
  { text: 'Bath Song', isCorrect: false },
];