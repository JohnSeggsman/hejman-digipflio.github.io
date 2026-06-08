const pnl      = document.getElementById('pnl');
const pre      = document.getElementById('pre');
const tj       = document.getElementById('tj');
const ts       = document.getElementById('ts');
const cur1     = document.getElementById('cur1');
const cur2     = document.getElementById('cur2');
const cur3     = document.getElementById('cur3');
const lnav     = document.getElementById('lnav');
const cv       = document.getElementById('cv');
const sb       = document.getElementById('sb');
const ca       = document.getElementById('ca');
const backBtn  = document.getElementById('back-btn');
const ovl      = document.getElementById('ovl');
const ovlClose = document.getElementById('ovl-close');
const ob       = document.getElementById('ob');
let busy = false;
const wait = ms => new Promise(r => setTimeout(r, ms));
const mob  = ()  => window.innerWidth <= 700;

function typeStr(el, str, spd) {
    return new Promise(r => {
        let i = 0;
        const t = setInterval(() => {
            el.textContent += str[i++];
            if (i >= str.length) { clearInterval(t); r(); }
        }, spd);
    });
}

function getClip(s) {
    const a = mob() ? '50% 0%' : '0% 50%';
    if (s === 'full')  return `circle(200vmax at ${a})`;
    if (s === 'split') return mob() ? `circle(65vh at ${a})` : `circle(65vw at ${a})`;
    if (s === 'gone')  return `circle(0px at ${a})`;
}

function setPanel(s, instant = false) {
    if (instant) {
        pnl.style.transition = 'none';
        pnl.style.clipPath   = getClip(s);
        void pnl.offsetHeight;
    }
    pnl.style.transition = 'clip-path .85s cubic-bezier(.77,0,.175,1)';
    if (!instant) pnl.style.clipPath = getClip(s);
}

function sbOut() { sb.style.transform = mob() ? 'translateY(-100%)' : 'translateX(-100%)'; }
function caOut() { ca.style.transform  = mob() ? 'translateY(100%)'  : 'translateX(100%)';  }
function inAll() { sb.style.transform  = ca.style.transform = 'translate(0,0)'; }

function noTrans() { [sb, ca, ovl].forEach(el => el.style.transition = 'none'); }
function addTrans() {
    const t = 'transform .65s cubic-bezier(.77,0,.175,1)';
    sb.style.transition  = ca.style.transition = t;
    ovl.style.transition = 'transform .6s cubic-bezier(.77,0,.175,1)';
}

async function intro() {
    setPanel('full', true);
    await wait(500);

    cur1.style.opacity = '1';
    await typeStr(pre, 'MY NAME IS', 80);
    await wait(250);

    cur1.style.opacity = '0';
    cur2.style.opacity = '1';
    await typeStr(tj, 'HEJY', 110);
    await wait(140);

    cur2.style.opacity = '0';
    cur3.style.opacity = '1';
    await typeStr(ts, 'TAN', 110);
    cur3.classList.add('bk');

    await wait(500);
    setPanel('split');
    await wait(950);
    lnav.classList.add('show');
}

async function goTo(id) {
    if (busy) return;
    busy = true;

    lnav.classList.remove('show');
    await wait(300);

    setPanel('gone');
    await wait(850);

    noTrans();
    sbOut(); caOut();
    ovl.style.transform = 'translateY(100%)';
    void cv.offsetHeight;

    document.querySelectorAll('.sec').forEach(s => s.classList.remove('on'));
    document.getElementById(id).classList.add('on');
    ca.scrollTop = 0;

    cv.classList.add('show');
    await wait(30);
    addTrans();
    inAll();

    await wait(680);
    busy = false;
}

async function goBack() {
    if (busy) return;
    busy = true;

    ovl.style.transition = 'none';
    ovl.style.transform  = 'translateY(100%)';
    sbOut(); caOut();
    await wait(650);

    cv.classList.remove('show');
    setPanel('gone', true);
    await wait(30);
    setPanel('split');
    await wait(900);
    lnav.classList.add('show');
    busy = false;
}

const PX = {
    remnants: {
        name: 'Remnants', year: '2025 – 2026', role: 'Solo Developer',
        banner: 'images/Portfolio-Project1-MainImg.png',
        shots: [
            'images/Portfolio-Project1-SubImg1.png',
            'images/Portfolio-Project1-SubImg2.png',
            'images/Portfolio-Project1-SubImg3.png'
        ],
        desc: 'A 3D turn-based RPG set in a dark dystopian world slowly consumed by an irradiating crystal of unknown origin. The player escapes prison, discovers conjuring abilities, and teams up with others to uncover the truth and destroy the crystal at the cost of their powers.',
        summary: 'An end-to-end solo development project spanning all disciplines. Engineered a full JSON save/load architecture, a ring-based ability wheel, a 14-stat character system, equipment across 5 rarity tiers and a turn-based combat engine in C#. Also responsible for all UI design, level design and original audio production composed in FL Studio.',
        tools: 'Unity · C# · FL Studio',
        link: ''
    },
    ahma: {
        name: 'Ah Ma, Remember Me or Not?', year: '2025', role: 'Team Lead · Sound Designer',
        banner: 'images/Portfolio-Project2-MainImg.png',
        shots: [
            'images/Portfolio-Project2-SubImg1.png',
            'images/Portfolio-Project2-SubImg2.png',
            'images/Portfolio-Project2-SubImg3.png'
        ],
        desc: "A narrative puzzle game about a child reliving a grandmother's fading memories. Players explore pictures in a magical book, entering memory worlds to complete missions that restore her recollections.",
        summary: 'Planned and led a 5-person team from concept to delivery in 5 days. Personally implemented scene transition systems, memory management, main menu and UI functionality, then composed and integrated the full sound design in FL Studio. The audio was cited by judges as a key factor in placing 2nd overall.',
        tools: 'Unity · C# · FL Studio',
        link: ''
    },
    pawpaw: {
        name: 'Defend The Gates', year: '2023', role: 'Game Programmer Intern',
        banner: 'images/Portfolio-Project3-MainImg.png',
        shots: [
            'images/Portfolio-Project3-SubImg1.png',
            'images/Portfolio-Project3-SubImg2.png',
            'images/Portfolio-Project3-SubImg3.png'
        ],
        desc: 'A tower defence game developed at Paw Paw Games, South Korea, where players strategically place and upgrade towers to defend against waves of enemies.',
        summary: 'Extended a live production codebase alongside full-time programmers and artists at a South Korean studio. Independently designed and implemented a tower upgrade system, built new mechanics and stages, and overhauled the full animation pipeline and visual presentation including a new animated title screen. Received the highest grade among all three interns.',
        tools: 'Unity · C#',
        link: ''
    },
    sg60: {
        name: "SG60's Nation Builder", year: '2025', role: 'Team Lead · Lead Programmer',
        banner: 'images/Portfolio-Project4-MainImg.png',
        shots: [
            'images/Portfolio-Project4-SubImg1.png',
            'images/Portfolio-Project4-SubImg2.png',
            'images/Portfolio-Project4-SubImg3.png'
        ],
        desc: 'A 2D side-scrolling building simulation set in 1965 Singapore. Build the nation into a flourishing country by managing population, happiness and resources across building categories that unlock as you progress through the years.',
        summary: 'Led a 4-person team as both lead programmer and audio producer. Built the core resource management and building placement systems, building and placement data architecture, and day/time transition system. Also handled title screen, scene transitions and contributed to the random event system. Produced all BGM and SFX in FL Studio.',
        tools: 'Unity · C# · FL Studio',
        link: ''
    },
    carboom: {
        name: 'CARBOOM!', year: '2025', role: 'Solo Developer',
        banner: 'images/Portfolio-Project5-MainImg.png',
        shots: [
            'images/Portfolio-Project5-SubImg1.png',
            'images/Portfolio-Project5-SubImg2.png',
            'images/Portfolio-Project5-SubImg3.png'
        ],
        desc: 'A 2D top-down hyper-casual driving game. Bash enemy cars to earn points and travel as far as you can before running out of fuel. Features an optional vehicle tuning system before each run.',
        summary: 'A fully solo-developed game built as a school assignment, covering all programming disciplines. Engineered custom vehicle physics, enemy behaviour logic, a fuel depletion system and a pre-game vehicle tuning and customisation system. Demonstrates breadth across gameplay programming, UI implementation and game feel.',
        tools: 'Unity · C#',
        link: 'https://grumpyuncle.itch.io/carboom'
    },
    pewomatic: {
        name: 'Pew-O-Matic', year: '2024', role: 'Solo Developer',
        banner: 'images/Portfolio-Project6-MainImg.png',
        shots: [
            'images/Portfolio-Project6-SubImg1.png',
            'images/Portfolio-Project6-SubImg2.png',
            'images/Portfolio-Project6-SubImg3.png'
        ],
        desc: 'A top-down shooter where you eliminate incoming enemies as the combat zone progressively shrinks. Three weapons at your disposal: the Pew-O-Matic, Trip Mine and Death Ray.',
        summary: 'A solo-developed physics-based game demonstrating applied mechanics and game programming. Implemented three distinct weapon systems, collision detection across multiple shape types and pairs, kinematics-based player movement with force interactions and particle effects for visual feedback on impact.',
        tools: 'GDevelop',
        link: ''
    },
    bookbugs: {
        name: 'Bookbugs: A Colour Crisis', year: '2023', role: 'Team Lead · Lead Developer',
        banner: 'images/Portfolio-Project7-MainImg.png',
        shots: [
            'images/Portfolio-Project7-SubImg1.png',
            'images/Portfolio-Project7-SubImg2.png',
            'images/Portfolio-Project7-SubImg3.png'
        ],
        desc: 'An educational 2D game made in collaboration with the National Library Board of Singapore, targeting players aged 7 and up. A character must restore colour to a black-and-white world by defeating the villain who stole it.',
        summary: 'Planned the entire game from concept to mechanics and led a 6-person team as primary developer. Built the core colour mechanic that drives the whole game, a directional navigation system and a gameplay story and dialogue system. Solely responsible for deploying to Unity WebGL with a full mobile layout including custom joystick and touch controls, a technically demanding requirement no other team member could achieve.',
        tools: 'Unity · C#',
        link: ''
    },
    vertigon: {
        name: 'Vertigon', year: '2023', role: 'Solo Developer',
        banner: 'images/Portfolio-Project8-MainImg.png',
        shots: [
            'images/Portfolio-Project8-SubImg1.png',
            'images/Portfolio-Project8-SubImg2.png',
            'images/Portfolio-Project8-SubImg3.png'
        ],
        desc: 'A reflex minigame where you avoid incoming hexagons closing in on you from all directions, inspired by Super Hexagon.',
        summary: 'A solo ITE school assignment demonstrating core game programming fundamentals. Built a procedural spawning system for randomised incoming hexagons, movement and closing logic that progressively tightens the play area, and collision detection with a scoring system.',
        tools: 'Unity · C#',
        link: 'https://grumpyuncle.itch.io/vertigon'
    },
    wacky: {
        name: 'Wacky Richman', year: '2023', role: 'Solo Developer',
        banner: 'images/Portfolio-Project9-MainImg.png',
        shots: [
            'images/Portfolio-Project9-SubImg1.png',
            'images/Portfolio-Project9-SubImg2.png',
            'images/Portfolio-Project9-SubImg3.png'
        ],
        desc: 'A goofy 3D top-down game about John Richman recovering his stolen credit card from greedy goons in a bizarre far-away land.',
        summary: 'A fully solo-developed 3D top-down game built as an ITE school assignment. Implemented all core systems: player movement, enemy AI behaviour, a relic collection and power mechanic, level transition sequences and in-game cutscenes, covering the full breadth of a solo development pipeline.',
        tools: 'Unity · C#',
        link: 'https://grumpyuncle.itch.io/wackyrichman'
    }
};

function openProject(id) {
    if (busy) return;
    const p = PX[id];
    if (!p) return;

    const lBtn = p.link
        ? `<a href="${p.link}" target="_blank" style="display:inline-block;border:1.5px solid #000;padding:9px 22px;font-family:Georgia,serif;font-size:13px;font-weight:700;letter-spacing:.08em;color:#000;text-decoration:none;transition:background .2s,color .2s" onmouseover="this.style.background='#000';this.style.color='#fff'" onmouseout="this.style.background='transparent';this.style.color='#000'">Play the Game ↗</a>`
        : `<span style="display:inline-block;border:1.5px solid #ccc;padding:9px 22px;font-family:Georgia,serif;font-size:13px;font-weight:700;letter-spacing:.08em;color:#ccc;cursor:not-allowed">Game Not Available</span>`;

    ob.innerHTML = `
        <div style="display:flex;justify-content:center;margin-bottom:24px">
            <div style="width:62%;aspect-ratio:16/9;overflow:hidden">
                <img src="${p.banner}" style="width:100%;height:100%;object-fit:cover">
            </div>
        </div>
        <div style="text-align:center;margin-bottom:16px">
            <div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#aaa;margin-bottom:4px">${p.year}</div>
            <div style="font-size:clamp(20px,2.5vw,32px);font-weight:700;color:#000;margin-bottom:6px">${p.name}</div>
            <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#666;margin-bottom:16px">${p.role}</div>
            <div>${lBtn}</div>
        </div>
        <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.8;color:#555;max-width:600px;margin:0 auto 16px;text-align:center">${p.desc}</p>
        <div style="width:100%;max-width:600px;border-top:1px solid #ddd;margin:0 auto 16px"></div>
        <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.8;color:#333;max-width:600px;margin:0 auto 20px;text-align:center">${p.summary}</p>
        <div style="text-align:center;font-family:Arial,sans-serif;font-size:11px;letter-spacing:.1em;color:#888;text-transform:uppercase;padding-top:16px;border-top:1px solid #e0e0e0;max-width:600px;margin:0 auto 32px">${p.tools}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px">
            <div class="mini-ph"><img src="${p.shots[0]}" style="width:100%;height:100%;object-fit:cover"></div>
            <div class="mini-ph"><img src="${p.shots[1]}" style="width:100%;height:100%;object-fit:cover"></div>
            <div class="mini-ph"><img src="${p.shots[2]}" style="width:100%;height:100%;object-fit:cover"></div>
        </div>
    `;

    ovl.scrollTop = 0;
    ovl.style.transition = 'transform .6s cubic-bezier(.77,0,.175,1)';
    ovl.style.transform  = 'translateY(0)';
}

document.querySelectorAll('.nb').forEach(b => b.addEventListener('click', () => goTo(b.dataset.t)));
document.querySelectorAll('.pc').forEach(c => c.addEventListener('click', () => openProject(c.dataset.id)));
backBtn.addEventListener('click', goBack);
ovlClose.addEventListener('click', () => { ovl.style.transform = 'translateY(100%)'; });

intro();