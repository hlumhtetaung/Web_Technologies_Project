const facts = [
    { title: "Wombats", text: "Wombat poop is cube-shaped to stop it from rolling.", icon: "💩" },
    { title: "Otters", text: "Sea otters hold hands while sleeping to stay together.", icon: "🦦" },
    { title: "Blue Whales", text: "A blue whale's tongue weighs as much as an elephant.", icon: "🐋" },
    { title: "Mars", text: "Sunsets on Mars appear blue to human eyes.", icon: "🌅" },
    { title: "Space", text: "Space is completely silent; there is no air for sound.", icon: "👩‍🚀" },
    { title: "Diamonds", text: "It rains diamonds on Neptune and Saturn.", icon: "💎" },
    { title: "Octopus", text: "Octopuses have three hearts and blue blood.", icon: "🐙" },
    { title: "Internet", text: "The first webcam was made to monitor a coffee pot.", icon: "☕" },
    { title: "Food", text: "Ketchup was sold as medicine in the 1830s.", icon: "🍅" },
    { title: "Numbers", text: "'Forty' is the only number with letters in alphabetical order.", icon: "🔢" },
    { title: "Bananas", text: "Bananas are herbs, and strawberries aren't berries!", icon: "🍌" },
    { title: "Moon", text: "Footprints on the moon will last millions of years.", icon: "👣" },
    { title: "Venus", text: "A day on Venus is longer than a year on Venus.", icon: "🪐" },
    { title: "Shrimp", text: "A shrimp's heart is located in its head.", icon: "🦐" },
    { title: "Lego", text: "Google's first server rack was made of LEGO bricks.", icon: "🧱" },
    { title: "Honey", text: "Honey never spoils; archaeologists found edible 3,000-year-old honey.", icon: "🍯" },
    { title: "Trees", text: "There are more trees on Earth than stars in the Milky Way.", icon: "🌳" },
    { title: "Sharks", text: "Sharks have been around longer than trees.", icon: "🦈" },
    { title: "Clouds", text: "An average cumulus cloud weighs about 1.1 million pounds.", icon: "☁️" },
    { title: "Cows", text: "Cows have 'best friends' and get stressed when separated.", icon: "🐮" }
];

const grid = document.getElementById('fact-grid');
const modal = document.getElementById('fact-modal');
const modalBody = document.getElementById('modal-body');
const btn = document.getElementById('random-fact-btn');

// Create cards
facts.forEach((fact, index) => {
    const card = document.createElement('div');
    card.className = `fact-card bg-${(index % 5) + 1}`;
    card.innerHTML = `<h3>${fact.title}</h3><p>${fact.text}</p><span style="font-size:2rem">${fact.icon}</span>`;
    grid.appendChild(card);
});

// Random Fact Logic
btn.onclick = () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    modalBody.innerHTML = `<h1>${randomFact.icon}</h1><h2>${randomFact.title}</h2><p style="font-size:1.5rem">${randomFact.text}</p>`;
    modal.style.display = "block";
};

// Close Modal
document.querySelector('.close-modal').onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };