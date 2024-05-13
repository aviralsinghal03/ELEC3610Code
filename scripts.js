// Startup data sample
const startups = [
    { id: 1, photo: "startup/techinnovation.jpg", title: "Tech Innovate", description: "Revolutionizing tech.", category: "Technology", endDate: "2023-12-31", pledgeGoal: 50000, pledged: 25000 },
    { id: 2, photo: "startup/healthplus.jpg", title: "Health Plus", description: "Advancing healthcare.", category: "Healthcare", endDate: "2023-11-30", pledgeGoal: 40000, pledged: 40000 },
    { id: 3, photo: "startup/fintechrevolution.jpg", title: "FinTech Revolution", description: "Innovating financial technology.", category: "Finance", endDate: "2024-01-15", pledgeGoal: 30000, pledged: 15000 },
    { id: 4, photo: "startup/ecoliving.jpg", title: "Eco Living", description: "Sustainable living solutions.", category: "Lifestyle", endDate: "2023-10-22", pledgeGoal: 45000, pledged: 45000 },
    { id: 5, photo: "startup/gamechangers.jpg", title: "Game Changers", description: "Next-gen gaming platform.", category: "Gaming", endDate: "2024-03-05", pledgeGoal: 60000, pledged: 30000 },
    { id: 6, photo: "startup/ailabs.jpg", title: "Artificial Intelligence Lab", description: "AI for everyday life.", category: "Technology", endDate: "2023-12-20", pledgeGoal: 75000, pledged: 37500 },
    { id: 7, photo: "startup/smarttech.jpg", title: "Smart Home Tech", description: "Integrating homes with technology.", category: "Technology", endDate: "2024-05-15", pledgeGoal: 85000, pledged: 42500 },
    { id: 8, photo: "startup/fitnessfirst.jpg", title: "Fitness First", description: "Revolutionizing personal fitness.", category: "Health", endDate: "2024-02-28", pledgeGoal: 20000, pledged: 10000 },
    { id: 9, photo: "startup/organicfoods.jpg", title: "Organic Foods Co.", description: "Delivering fresh organic foods.", category: "Food", endDate: "2023-11-12", pledgeGoal: 30000, pledged: 30000 },
    { id: 10, photo: "startup/fastfashion.jpg", title: "Fast Fashion Forward", description: "Sustainable fashion solutions.", category: "Fashion", endDate: "2024-06-30", pledgeGoal: 50000, pledged: 25000 },
    { id: 11, photo: "startup/argames.jpg", title: "Mobile AR Games", description: "Augmented reality on your phone.", category: "Gaming", endDate: "2023-12-15", pledgeGoal: 50000, pledged: 25000 },
    { id: 12, photo: "startup/biotechlife.jpg", title: "BioTech Life", description: "Biotechnology for better health.", category: "Healthcare", endDate: "2024-01-20", pledgeGoal: 65000, pledged: 32500 },
    { id: 13, photo: "startup/blockchain.jpg", title: "Blockchain Basics", description: "Blockchain made simple.", category: "Finance", endDate: "2024-04-18", pledgeGoal: 55000, pledged: 27500 },
    { id: 14, photo: "startup/solarpanel.jpg", title: "Solar Solutions", description: "Affordable solar energy panels.", category: "Energy", endDate: "2023-09-09", pledgeGoal: 90000, pledged: 45000 },
    { id: 15, photo: "startup/onlinelearning.jpg", title: "Online Learning Platform", description: "Education accessible to everyone.", category: "Education", endDate: "2023-08-30", pledgeGoal: 40000, pledged: 20000 },
];

// Retrieve preferences from localStorage or default to an empty array if none are stored
let preferences = JSON.parse(localStorage.getItem('preferences')) || [];

document.addEventListener('DOMContentLoaded', function () {
    const page = window.location.pathname.split("/").pop();
    if (page === 'main_feed.html') {
        renderFeed('mainFeed');
    } else if (page === 'customized_feed.html') {
        renderFeed('customFeed');
    }
});

function renderFeed(feedType) {
    const container = (feedType === 'mainFeed') ? document.getElementById('feed') : document.getElementById('customFeedContent');
    container.innerHTML = '';
    let filteredStartups = startups;

    if (feedType === 'customFeed') {
        filteredStartups = startups.filter(s => preferences.includes(s.category));
    }

    filteredStartups.forEach(s => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `<img src="${s.photo}" alt="${s.title}">
                          <h3>${s.title}</h3>
                          <p>${s.description}</p>
                          <p>Category: ${s.category}</p>
                          <p>End Date: ${s.endDate}</p>
                          <p>Pledged: $${s.pledged} / $${s.pledgeGoal}</p>`;
        container.appendChild(card);
    });
}

function applyFilter() {
    const minPledge = document.getElementById('minPledge') ? parseInt(document.getElementById('minPledge').value, 10) : 0;
    const pledgeEndDate = document.getElementById('pledgeEndDate') ? document.getElementById('pledgeEndDate').value : '';
    const feed = document.getElementById('feed');

    const filteredStartups = startups.filter(s => {
        return s.pledgeGoal >= minPledge && (!pledgeEndDate || new Date(s.endDate) >= new Date(pledgeEndDate));
    });

    feed.innerHTML = ''; // Clear existing entries
    filteredStartups.forEach(s => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `<img src="${s.photo}" alt="${s.title}">
                          <h3>${s.title}</h3>
                          <p>${s.description}</p>
                          <p>Category: ${s.category}</p>
                          <p>End Date: ${s.endDate}</p>
                          <p>Pledged: $${s.pledged} / $${s.pledgeGoal}</p>`;
        feed.appendChild(card);
    });
}

function savePreferences() {
    const checkboxes = document.querySelectorAll('#preferencesForm input[type="checkbox"]:checked');
    preferences = Array.from(checkboxes).map(checkbox => checkbox.value);
    localStorage.setItem('preferences', JSON.stringify(preferences));
    alert('Preferences saved! Redirecting to Customized Feed.');
    window.location.href = 'customized_feed.html';
}
