// Progress bar
let progress = document.getElementById('progressbar');
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function() {
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + "%";
};

// Fireworks homepage
//Set the animations / colors for the firework
var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");
var cwidth, cheight;
var shells = [];
var pass = [];
var colors = ['#ff5252', '#ff4081', '#e040fb', '#7c4dff', '#53d7ff', '#40cdff', '#18ffff', '#64ffda', '#69f0ae', '#b2ff59'];

// Resize canvas and reset fireworks on window resize
window.onresize = function() { reset(); };
reset();

function reset() {
    cwidth = window.innerWidth;
    cheight = window.innerHeight;
    c.width = cwidth;
    c.height = cheight;
}

// Create a new shell (firework)
function newShell() {
    var shell = {};
    shell.x = 0.1 + Math.random() * 0.8; // Center the fireworks
    shell.y = 1; 
    shell.xoff = (0.005 + Math.random() * 0.0025) * (Math.random() > 0.5 ? 1 : -1); // Horizontal speed 
    shell.yoff = 0.01 + Math.random() * 0.005; // Vertical speed offset
    shell.size = Math.random() * 4 + 2; // Size firework
    shell.color = colors[Math.floor(Math.random() * colors.length)];
    shells.push(shell);
}

// Create particles from a shell explosion
function newPass(shell) {
    var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI); // Number of paricles
    for (let i = 0; i < pasCount; i++) {
        var pas = {};
        pas.x = shell.x * cwidth;
        pas.y = shell.y * cheight; 
        var a = Math.random() * 4; // Angle
        var s = Math.random() * 10; // Speed
        pas.xoff = s * Math.sin((5 - a) * (Math.PI / 2)); // Horizontal speed
        pas.yoff = s * Math.sin(a * (Math.PI / 2)); // Verical speed
        pas.color = shell.color;
        pas.size = Math.sqrt(shell.size);
        if (pass.length < 1000) { pass.push(pas); } // Add particle to the array 
    }
}

// Time of the last run
var lastRun = 0;
Run();

// Main animation loop
function Run() {
    var dt = 1; 
    if (lastRun != 0) { dt = Math.min(50, (performance.now() - lastRun)); }
    lastRun = performance.now();
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, cwidth, cheight); // Clear home page
    if ((shells.length < 10) && (Math.random() > 0.96)) { newShell(); } // Add new shell
    for (let ix in shells) {
        var shell = shells[ix];
        ctx.beginPath();
        ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI); // Draw shell
        ctx.fillStyle = shell.color;
        ctx.fill();

        // Update shell position
        shell.x -= shell.xoff;
        shell.y -= shell.yoff;
        shell.xoff -= (shell.xoff * dt * 0.001);
        shell.yoff -= ((shell.yoff + 0.2) * dt * 0.00005);
        if (shell.yoff < -0.005) {
            newPass(shell);
            shells.splice(ix, 1);
        }
    }

    for (let ix in pass) {
        var pas = pass[ix];
        ctx.beginPath();
        ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI); // Draw paricle
        ctx.fillStyle = pas.color;
        ctx.fill();

        // Update particle position
        pas.x -= pas.xoff;
        pas.y -= pas.yoff;
        pas.xoff -= (pas.xoff * dt * 0.001);
        pas.yoff -= ((pas.yoff + 5) * dt * 0.00005);
        pas.size -= (dt * 0.002 * Math.random());
        if ((pas.y > cheight) || (pas.y < -50) || (pas.size <= 0)) {
            pass.splice(ix, 1);
        }
    }
    requestAnimationFrame(Run);
}

// Rectangle loop for the start page
// Generates the grid and gives each tile an id and a class
const grid = document.getElementById('rectangle');
const numTiles = 1000; // Number of tiles
const tiles = [
    { name: 'tile0', destroyed: false },
    { name: 'tile1', destroyed: false },
    { name: 'tile2', destroyed: false },
    { name: 'tile3', destroyed: false },
    { name: 'tile4', destroyed: false },
    { name: 'tile5', destroyed: false },
    { name: 'tile6', destroyed: false },
    { name: 'tile7', destroyed: false },
    { name: 'tile8', destroyed: false },
    { name: 'tile9', destroyed: false },
    { name: 'tile10', destroyed: false},
    { name: 'tile11', destroyed: false },
    { name: 'tile12', destroyed: false },
    { name: 'tile13', destroyed: false },
    { name: 'tile14', destroyed: false },
    { name: 'tile15', destroyed: false },
    { name: 'tile16', destroyed: false }
]; // Tiles array

for (let i = 17; i < numTiles; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    grid.appendChild(tile);
    tile.setAttribute('id', 'tile' + i);
    tile.setAttribute('onClick', 'activateClear()');
    tiles[i] = { name: tile.id, destroyed: false };
}

// No spam clicking allowed
var clickAmount = 0;

function activateClear() {
    clickAmount++;
    if (clickAmount <= 1) {
        clearGrid();
    }
}

// Get random tile id
function getRandomTile() {
    const availableTiles = tiles.filter(tile => !tile.destroyed);
    const randomIndex = Math.floor(Math.random() * availableTiles.length);
    const tile = availableTiles[randomIndex];
    tile.destroyed = true;
    return tile.name;
}

function clearGrid() {
    let j = numTiles - 3;

    function clearTile() {
        if (j >= 0) {
            setTimeout(function () {
                const tile = document.getElementById(getRandomTile());
                tile.classList.remove('tile');
                tile.classList.add('tileAfterClick');
                j--;
                clearTile();
            }, 1); // 0.001s
        } else {
            // After grid is cleared, wait 1 second, then remove the divs
            setTimeout(function () {
                while (grid.firstChild) {
                    grid.removeChild(grid.firstChild);
                }
                // Body will be scrollable again and cursor changed
                const body = document.body;
                body.style.overflowY = 'auto';
                body.classList.add('context-menu-cursor');
                grid.parentNode.removeChild(grid);
            }, 2000); // 2s
        }
    }

    clearTile();
}

// Get Id for the text for navigation bar to be white.
document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.getElementById('home-link');
    const projectLink = document.getElementById('project-link');
    const aboutLink = document.getElementById('about-link');

    const sections = [homeLink, projectLink, aboutLink];
    const sectionElements = [
        { link: homeLink, element: document.querySelector('section.home') },
        { link: projectLink, element: document.querySelector('section#project') },
        { link: aboutLink, element: document.querySelector('section#about') }
    ];

    // Click function
    const handleLinkClick = (link) => {
        sections.forEach(section => section.classList.remove('active-section'));
        link.classList.add('active-section');
    };

    sections.forEach(link => {
        link.addEventListener('click', () => handleLinkClick(link));
    });

    // Scroll function
    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let activeLink = homeLink; 

        sectionElements.forEach(({ link, element }) => {
            const sectionTop = element.offsetTop;
            const sectionHeight = element.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeLink = link;
            }
        });

        handleLinkClick(activeLink);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();
});

// Fixing the problem for the scroll function of the moddels 
document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');

    // Event listener 
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', () => {
            document.body.style.overflow = 'hidden'; 
        });

        modal.addEventListener('hidden.bs.modal', () => {
            document.body.style.overflow = 'auto'; // Reset overflow 
            // Re-activate scroll functionality
            window.addEventListener('scroll', handleScroll);
        });
    });

    // Scroll function for handling active sections (existing code)
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-link'); // Your navbar links

    function handleScroll() {
        let scrollPosition = window.scrollY + window.innerHeight / 2;
        sections.forEach((section, i) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                links.forEach(link => link.classList.remove('active-section'));
                links[i].classList.add('active-section');
            }
        });
    }

    // Activate scroll event listener
    window.addEventListener('scroll', handleScroll);
});
