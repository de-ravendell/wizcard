const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const fullset = [
    "Fumos","Fumos","Fumos",
    "Expelliarmus","Expelliarmus",
    "Stupify","Stupify",
    "Confringo","Confringo",
    "Sectumsumpra","Sectumsumpra","Sectumsumpra",
    "Avis","Avis",
    "Essence of Dittany","Essence of Dittany","Essence of Dittany",
    "Niffler","Niffler","Niffler","Niffler",
    "Troll","Troll","Troll","Troll",
    "Incendio","Incendio","Incendio",
    "Aguamenti","Aguamenti","Aguamenti",
    "Fulmen","Fulmen","Fulmen",
    "Phoenix",
    "Thestral","Thestral",
    "Spectrespecs",
    "Protego","Protego","Protego",
    "Gringotts Keys","Gringotts Keys",
    "Protego Diabolica","Protego Diabolica",
    "Thunderstorm","Thunderstorm",
    "Tidal Wave","Tidal Wave",
    "Elemental Spellbook","Elemental Spellbook","Elemental Spellbook",
    "Ventus","Ventus","Ventus",
    "Centaur Archer","Centaur Archer",
    "Piertotum Locomotor","Piertotum Locomotor",
    "Runic Armor","Runic Armor","Runic Armor","Runic Armor",
    "Fantastic Beasts Suitcase","Fantastic Beasts Suitcase",
    "Obscurus Curse","Obscurus Curse",
    "Repello Inimicum","Repello Inimicum",
    "Portkey","Portkey","Portkey",
    "Protego Totalum","Protego Totalum","Protego Totalum",
    "Chess Pawn","Chess Pawn","Chess Pawn"
];
const dict = {
    //cardName: [mana,type,target/creatureHp,desc]
    "Fumos": [2,0,1,"Creates fog, allies take 1 less damage for 1 turn and heal each ally by 1 HP."],
    "Expelliarmus": [3,1,0,"Disarms front enemy, deals 2 damage and prevents next attack."],
    "Stupify": [2,1,0,"Stuns front enemy, deals 2 damage and partially prevents mana acquisition."],
    "Confringo": [4,0,0,"Deals 3 damage to enemy wizard and 1 damage to their creatures."],
    "Sectumsumpra": [3,2,0,"Deals 3 damage and causes bleeding."],
    "Avis": [4,0,0,"Summons birds, deals total 5 damage to random enemies."],
    "Essence of Dittany": [3,2,1,"Heals 3 HP to target ally and applies healing."],
    "Niffler": [2,3,3,"Summons Niffler (3 HP). Each turn gives 2 mana but loses 1 HP. Does not attack."],
    "Troll": [4,3,6,"Summons Troll (6 HP, 1 ATK)."],
    "Incendio": [2,2,0,"Deals 2 damage and applies BURNT."],
    "Aguamenti": [2,2,0,"Deals 2 damage and applies SOAKED."],
    "Fulmen": [2,2,0,"Deals 2 damage and applies SHOCKED."],
    "Phoenix": [4,3,8,"Summons Phoenix (8 HP). Heals all ally creatures by 1 HP each turn but loses 2 HP. Does not attack."],
    "Thestral": [4,3,5,"Summons Thestral (5 HP, 1 ATK) that affects all enemies and gain 2 mana. Attack improves by 0.25 for each spell cast, up to 4 ATK. Only summonable if a creature has died this turn."],
    "Spectrespecs": [0,4,1,"Wear Luna's glasses to see Thestrals for 2 turns. Gain 4 mana on use."],
    "Protego": [1,5,1,"When you take damage, negate it and deal 1 damage back."],
    "Gringotts Keys": [0,4,1,"Discard all your cards and draw the same amount."],
    "Protego Diabolica": [6,0,1,"Halve damage allies take for 3 turns and conjure fire dragons that apply BURNT to attack."],
    "Thunderstorm": [6,0,0,"Attack enemies with lightning bolts that apply SHOCKED for 3 turns. Each 2 spells cast gives an extra bolt."],
    "Tidal Wave": [6,0,0,"Deal damage to front enemies with decreasing damages and apply SOAKED."],
    "Elemental Spellbook": [6,4,2,"Casts every elemental spell in your hand."],
    "Ventus": [1,0,0,"Spread elemental statuses to all enemies and deal 1 damage for each spread."],
    "Centaur Archer": [3,3,3,"Shoots a straight line, deals 2 damage to all enemies in the same row, damage decreases after each hit. If no enemies, attacks wizard's row."],
    "Piertotum Locomotor": [4,3,4,"Summons Stone Guardian (4 HP, 2 ATK). When damaged, reduces damage by 1 and deals less damage next turn."],
    "Runic Armor": [1,3,2,"Summons Runic Armor (2 HP, 1 ATK). Gains damage immunity for 1 turn on summon."],
    "Fantastic Beasts Suitcase": [3,3,6,"Summons Suitcase (6 HP). Records beasts you play while in hand and summons one random beast each turn while losing 1 HP."],
    "Obscurus Curse": [4,0,1,"Curse yourself with Obscurial for 4 turns. When you attack, transform into Obscurus."],
    "Repello Inimicum": [4,0,0,"Deal 2 damage to each enemy."],
    "Portkey": [0,5,1,"When an ally creature dies, generate a token card to your hand."],
    "Acolyte": [4,3,6,"Summons Acolyte (6 HP, 1 ATK). When you cast a spell, an Acolyte can spend HP equal to the spell's original cost to cast it again."],
    "Protego Totalum": [4,0,1,"Conjures a barrier to prevent damage. Halves damages taken by allies and spells cannot name you as the target."],
    "Chess Pawn": [3,3,4,"Summon a Chess Pawn (4 HP, 1 ATK) that can only attack enemies on its diagonal sides. On summon, gain 2 Moves if summoned in front column and no enemy is right in front of you. Each turn gain 1 move automatically and gain 1 Move if summoned in front column and no enemy is right in front of you. Each time it attacks an enemy, gain 1 Move. When it have 6 Moves, it turns to a Chess Queen."]
};
const characters = [
    { id: "harry", name: "Harry Potter", desc: "Auror's Instincts: Spells of cost 3 or less are cast twice." },
    { id: "hermione", name: "Hermione Granger", desc: "Genius Caster: After casting a spell, reduce cost of a random spell in hand by 25%." },
    { id: "ron", name: "Ron Weasley", desc: "Wizard's Chess Pieces: When summoning a creature, grants a permanent buff: Rook (+1 ATK), Knight (25% double attack), or Bishop (+2 HP)." },
    { id: "albus", name: "Albus Dumbledore", desc: "The Greatest Wizard: You gain a token copy that halves mana cost of every fourth spell you cast. You have 5% chance to summon a phoenix when using a spell." },
    { id: "gellert", name: "Gellert Grindelwald", desc: "Dark Revelations: Every 6 cards, summon an Acolyte. Your spells cost 1 less mana but cost 1 HP. Acolytes repeat spells using HP equal to original cost. Ally deaths trigger Protego Diabolica." },
    { id: "vinda", name: "Vinda Rosier", desc: "Vindicta's Grace: Damaging the enemy Wizard has 25% chance to intill FEAR in enemy wizard. Slaying an enemy grants 2 mana and VINDICTIVENESS. After dealing 20 damage to enemies, summon an Acolyte." },
    { id: "luna", name: "Luna Lovegood", desc: "Friend of Fantastic Beasts: Every 5 mana spent, summon a random creature. On every tenth summon, summon an additional Thestral. You always can see Thestrals." },
    { id: "newt", name: "Newt Scamander", desc: "The Magizoologist: When you summon a non-token creature, gain a free Niffler token in hand." },
    { id: "minerva", name: "Minerva McGonagall", desc: "Transfiguration Master: When you cast a spell, 40% chance to transfigure a random enemy creature into a Teacup (1 HP, 0 ATK). If there are no enemy creatures, cast Piertotum Locomotor instead." }
];
let selectedPlayerCharacter = null;
let selectedEnemyCharacter = null;
let game = null;
let selectedHandCard = null;
function getRandomThreeCharacters() {
    let shuffled = [...characters];
    for (let i = shuffled.length-1; i>0; i--) {
        let j = Math.floor(Math.random()*(i+1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0,3);
}
function buildCharacterSelection() {
    const container = document.getElementById('characterChoices');
    if (!container) return;
    const three = getRandomThreeCharacters();
    container.innerHTML = '';
    three.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `<div class="char-name">${char.name}</div><div class="char-desc">${char.desc}</div>`;
        card.onclick = () => startGameWithCharacters(char);
        container.appendChild(card);
    });
}
function startGameWithCharacters(playerChar) {
    const enemyChar = characters[Math.floor(Math.random() * characters.length)];
    document.getElementById('characterSelectOverlay').style.display = 'none';
    if (game) game.gameOver = true;
    for (let i=1;i<=18;i++) {
        if (i!==5 && i!==14) {
            const tile = document.getElementById(`t${i}`);
            if (tile) tile.innerHTML = "Empty";
        }
    }
    for (let i=1;i<=7;i++) {
        const handCard = document.getElementById(`hand-card-${i}`);
        if (handCard) handCard.innerHTML = "Empty";
    }
    if (selectedHandCard !== null) {
        let cur = document.getElementById(`hand-card-${selectedHandCard+1}`);
        if (cur) cur.classList.remove('selected');
        selectedHandCard = null;
    }
    hideAllFlags();
    clearLog();
    addLog('Welcome to WIZCARD. Choose your champion.', 'info');
    game = new CardGame(playerChar, enemyChar);
    window.game = game;
    game.initialise();
    game.updateWizardStatus();
    game.startTurn();
}
class Creature {
    constructor(name, side, tileId, hp, attack = 0, token = false) {
        this.name = name;
        this.side = side;
        this.tileId = tileId;
        this.hp = hp;
        this.maxHp = hp;
        this.attack = attack;
        this.token = token;
        this.status = [];
    }
}
class Card {
    constructor(name, mana, token = false) {
        this.name = name;
        this.mana = mana;
        this.token = token;
        this.status = [];
        this.index = -1;
    }
}
function addLog(msg, type = 'info') {
    const logDiv = document.getElementById('log-content');
    if (!logDiv) return;
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const time = new Date().toLocaleTimeString();
    entry.innerHTML = `[${time}] ${msg}`;
    logDiv.appendChild(entry);
    entry.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function clearLog() {
    const logDiv = document.getElementById('log-content');
    if (logDiv) logDiv.innerHTML = '';
    addLog('Log cleared.', 'info');
}
class CardGame {
    constructor(playerChar, enemyChar) {
        this.playerCharacter = playerChar;
        this.enemyCharacter = enemyChar;
        this.deck = [];
        this.discard = [];
        this.hand = [null, new Array(7).fill(null), new Array(7).fill(null)];
        this.creatures = [null, [], []];
        this.hp = [null, 50, 50];
        this.maxHp = [null, 50, 50];
        this.mana = [null, 6, 6];
        this.maxMana = [null, 12, 12];
        this.status = [null, [], []];
        this.atk = [null, 1, 1];
        this.spellCnt = [null, 0, 0];
        this.manaCnt = [null, 0, 0];
        this.manaSCnt = [null, 0, 0];
        this.cardCnt = [null, 0, 0];
        this.dmgCnt = [null, 0, 0];
        this.turn = 1;
        this.gameOver = false;
        this.winner = null;
        this.gainedTokenThisAction = false;
    }
    log(msg, type) { addLog(msg, type); }
    initialise() {
        this.deck = [...fullset];
        for (let i=1;i<=18;i++) {
            if (i!==5 && i!==14) document.getElementById(`t${i}`).classList.add('empty-card');
        }
        this.shuffleDeck();
        this.draw(1, 7);
        this.draw(2, 7);
        this.updateWizardStatus();
        this.updateHandDisplay();
        this.updateCreatureDisplay();
        this.log(`You are playing as ${this.playerCharacter.name}.`, 'warning');
        this.log(`Enemy wizard is ${this.enemyCharacter.name}.`, 'warning');
        if (this.playerCharacter.id === "luna" && !this.hasStatus(1, 'spectrespecs')) this.addStatus(1, 'spectrespecs');
        if (this.enemyCharacter.id === "luna" && !this.hasStatus(2, 'spectrespecs')) this.addStatus(2, 'spectrespecs');
        document.getElementById('turn-indicator').innerHTML = `${this.playerCharacter.name}(You)'s Turn`;
    }
    handCount(side) { return this.hand[side].filter(c => c !== null).length; }
    findFreeIndex(side) {
        for (let i=0;i<7;i++) if (this.hand[side][i] === null) return i;
        return -1;
    }
    shuffleDeck() {
        for (let i=this.deck.length-1;i>0;i--) {
            let j = Math.floor(Math.random()*(i+1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    draw(side, num=1) {
        let drawn = [];
        for (let c=0;c<num;c++) {
            if (this.deck.length === 0) {
                this.deck = [...this.discard];
                this.discard = [];
                this.shuffleDeck();
            }
            if (this.deck.length>0 && this.handCount(side)<7) {
                let cardName = this.deck.pop();
                let idx = this.findFreeIndex(side);
                if (idx === -1) break;
                let drawCard = new Card(cardName, dict[cardName][0]);
                if ((side === 1 && this.playerCharacter.id === 'gellert') ||
                    (side === 2 && this.enemyCharacter.id === 'gellert')) {
                    if (dict[cardName][1] <= 2) {
                        drawCard.mana = Math.max(0, drawCard.mana - 1);
                    }
                }
                drawCard.index = idx;
                if (!this.hasStatus(side, 'spectrespecs') && cardName === "Thestral") drawCard.status.push({ type: 'unseen', duration: null });
                if (cardName === "Fantastic Beasts Suitcase") drawCard.status.push({ type: [], duration: null });
                this.hand[side][idx] = drawCard;
                drawn.push(cardName);
            }
        }
        return drawn;
    }
    updateWizardStatus() {
        const pName = this.playerCharacter.name;
        const eName = this.enemyCharacter.name;
        const leftHpFill = document.getElementById('left-hp-fill');
        const leftManaFill = document.getElementById('left-mana-fill');
        const leftHpText = document.getElementById('left-hp-text');
        const leftManaText = document.getElementById('left-mana-text');
        const rightHpFill = document.getElementById('right-hp-fill');
        const rightManaFill = document.getElementById('right-mana-fill');
        const rightHpText = document.getElementById('right-hp-text');
        const rightManaText = document.getElementById('right-mana-text');
        const mainHpFill = document.getElementById('main-hp-fill');
        const mainManaFill = document.getElementById('main-mana-fill');
        const mainHpText = document.getElementById('main-hp-text');
        const mainManaText = document.getElementById('main-mana-text');
        if (leftHpFill) leftHpFill.style.width = `${(this.hp[1]/this.maxHp[1])*100}%`;
        if (leftManaFill) leftManaFill.style.width = `${(this.mana[1]/this.maxMana[1])*100}%`;
        if (leftHpText) leftHpText.innerHTML = `${this.hp[1]}/${this.maxHp[1]}`;
        if (leftManaText) leftManaText.innerHTML = `${this.mana[1]}/${this.maxMana[1]}`;
        if (rightHpFill) rightHpFill.style.width = `${(this.hp[2]/this.maxHp[2])*100}%`;
        if (rightManaFill) rightManaFill.style.width = `${(this.mana[2]/this.maxMana[2])*100}%`;
        if (rightHpText) rightHpText.innerHTML = `${this.hp[2]}/${this.maxHp[2]}`;
        if (rightManaText) rightManaText.innerHTML = `${this.mana[2]}/${this.maxMana[2]}`;
        if (mainHpFill) mainHpFill.style.width = `${(this.hp[1]/this.maxHp[1])*100}%`;
        if (mainManaFill) mainManaFill.style.width = `${(this.mana[1]/this.maxMana[1])*100}%`;
        if (mainHpText) mainHpText.innerHTML = `${this.hp[1]}/${this.maxHp[1]}`;
        if (mainManaText) mainManaText.innerHTML = `${this.mana[1]}/${this.maxMana[1]}`;
        let s1 = this.getStatusText(1), s2 = this.getStatusText(2);
        const status1El = document.getElementById('status-1');
        const status2El = document.getElementById('status-2');
        if (status1El) status1El.textContent = s1;
        if (status2El) status2El.textContent = s2;
        const wizardTile1 = document.getElementById('t5');
        const wizardTile2 = document.getElementById('t14');
        if (wizardTile1) {
            const nameDiv = wizardTile1.querySelector('.wizard-info > div:first-child');
            if (nameDiv) nameDiv.textContent = pName;
        }
        if (wizardTile2) {
            const nameDiv = wizardTile2.querySelector('.wizard-info > div:first-child');
            if (nameDiv) nameDiv.textContent = eName;
        }
        const tooltip1 = document.getElementById('tile-tooltip-5');
        const tooltip2 = document.getElementById('tile-tooltip-14');
        if (tooltip1) tooltip1.innerHTML = `${pName}<br>HP: ${this.hp[1]}/${this.maxHp[1]}<br>Mana: ${this.mana[1]}/${this.maxMana[1]}<br>${pName==="Albus Dumbledore"?'Spell count: '+this.spellCnt[1]%4+'/4<br>':''}${pName==="Luna Lovegood"?'Mana count: '+this.manaCnt[1]+'/5('+this.manaSCnt[1]+'/50)<br>':''}${pName==="Gellert Grindelwald"?'Card Count: '+this.cardCnt[1]+'/6<br>':''}${pName==="Vinda Rosier"?'Damage Count: '+this.dmgCnt[1]+'/20<br>':''}Status: ${s1}<br><br><strong>Special Ability:</strong><br>${this.playerCharacter.desc}`;
        if (tooltip2) tooltip2.innerHTML = `${eName}<br>HP: ${this.hp[2]}/${this.maxHp[2]}<br>Mana: ${this.mana[2]}/${this.maxMana[2]}<br>${eName==="Albus Dumbledore"?'Spell count: '+this.spellCnt[2]%4+'/4<br>':''}${eName==="Luna Lovegood"?'Mana count: '+this.manaCnt[2]+'/5('+this.manaSCnt[2]+'/50)<br>':''}${eName==="Gellert Grindelwald"?'Card Count: '+this.cardCnt[2]+'/6<br>':''}${eName==="Vinda Rosier"?'Damage Count: '+this.dmgCnt[2]+'/20<br>':''}Status: ${s2}<br><br><strong>Special Ability:</strong><br>${this.enemyCharacter.desc}`;
    }
    getStatusText(side) {
        if (!this.status[side].length) return "";
        let text = "";
        this.status[side].forEach(s => { text += `${s.type}${s.duration ? `(${s.duration})` : ''}${s.type==="thunderstorm"?`:${s.bolts ?? 0}`:''} `; });
        return text;
    }
    getCreatureStatusText(c) {
        if (!c.status.length) return "";
        let text = "<br>Status: ";
        c.status.forEach(s => {
            text += `${s.type}${s.duration ? `(${s.duration})` : ''}${s.type==="thunderstorm" ? `: ${s.bolts ?? 0}` : s.type==="pawn" ? `: ${s.moves}` : ''} `;
        });
        return text;
    }
    updateCreatureDisplay() {
        for (let i=1;i<=18;i++) {
            if (i!==5 && i!==14) {
                let tile = document.getElementById(`t${i}`);
                if (tile && !this.getCreatureAt(i)) {
                    tile.innerHTML = "Empty";
                    tile.classList.add('empty-card');
                    tile.classList.remove('cr-token');
                    let emptyTooltip = document.getElementById(`tile-tooltip-${i}`);
                    if (emptyTooltip) emptyTooltip.innerHTML = "Empty slot";
                }
            }
        }
        [...this.creatures[1], ...this.creatures[2]].forEach(c => {
            let tile = document.getElementById(`t${c.tileId}`);
            let tooltip = document.getElementById(`tile-tooltip-${c.tileId}`);
            c.token ? tile.classList.add('cr-token') : tile.classList.remove('cr-token');
            if (tile) {
                let statusHtml = c.status.length ? `<div class="status-effect">${c.status.map(s=>s.type).join(", ")}</div>` : "";
                let retreatBtn = (c.side===1 && this.turn===1 && !this.gameOver) ? `<button class="retreat-btn" onclick="event.stopPropagation(); game.retreatCreature(${c.tileId})">Retreat (+1 mana)</button>` : "";
                tile.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:5px;"><div>${this.hasCreatureStatus(c,'teacup')?'Teacup':c.name==="Piertotum Locomotor"?"Stone Guardian":(c.name==="Chess Pawn"&&this.hasCreatureStatus(c,'queen'))?"Chess Queen":c.name}</div><div class="creature-hp">❤️ ${c.hp}/${c.maxHp}</div>${c.attack>0?`<div class="creature-attack">⚔️ ${Math.floor(c.attack)}${c.attack!==Math.floor(c.attack)?`(${c.attack-Math.floor(c.attack)})`:''}</div>`:''}${statusHtml}</div>`;
                if (tooltip) {
                    tooltip.innerHTML = `<div style="font-weight:bold;">${this.hasCreatureStatus(c,'teacup')?'Teacup':c.name==="Piertotum Locomotor"?"Stone Guardian":(c.name==="Chess Pawn"&&this.hasCreatureStatus(c,'queen'))?"Chess Queen":c.name}</div>${c.token?'<div>TOKEN</div>':''}<div>HP: ${c.hp}/${c.maxHp}</div><div>Attack: ${c.attack}</div><div>${dict[c.name]?this.hasCreatureStatus(c,'teacup')?"An ordinary teacup.":dict[c.name][3]:""}</div>${this.getCreatureStatusText(c)}${retreatBtn}`;
                }
                tile.classList.remove('empty-card');
            }
        });
    }
    getCreatureAt(tileId) { return this.creatures[1].find(c=>c.tileId===tileId) || this.creatures[2].find(c=>c.tileId===tileId); }
    hasEnoughMana(cost, side) { return this.mana[side] >= cost; }
    retreatCreature(tileId) {
        if (this.turn !== 1 || this.gameOver) return;
        let c = this.getCreatureAt(tileId);
        if (c && c.side===1) {
            let idx = this.creatures[1].findIndex(cr=>cr===c);
            if (idx !== -1) {
                this.creatures[1].splice(idx,1);
                let tile = document.getElementById(`t${c.tileId}`);
                if (tile) { tile.innerHTML = "Empty"; tile.classList.add('empty-card'); }
                this.discard.push(c.name);
                this.mana[1] = Math.min(this.maxMana[1], this.mana[1]+1);
                this.updateWizardStatus();
                this.updateHandDisplay();
                this.updateCreatureDisplay();
                this.visualEffect(`t${tileId}`,'heal');
                this.log(`Player retreated ${c.name} and gained 1 mana.`,'info');
            }
        }
        this.updateCreatureDisplay();
    }
    getFrontTileId(rowIndex, targetEnemy) {
        if (targetEnemy) {
            const rowConfig = { 4:{tiles:[10,11,12],wizard:null}, 5:{tiles:[13,14,15],wizard:14}, 6:{tiles:[16,17,18],wizard:null} };
            const config = rowConfig[rowIndex];
            if (!config) return null;
            for (let tileId of config.tiles) if (this.getCreatureAt(tileId) || tileId===14) return tileId;
            return null;
        } else {
            const rowConfig = { 1:{tiles:[3,2,1],wizard:null}, 2:{tiles:[6,5,4],wizard:5}, 3:{tiles:[9,8,7],wizard:null} };
            const config = rowConfig[rowIndex];
            if (!config) return null;
            for (let tileId of config.tiles) if (this.getCreatureAt(tileId) || tileId===5) return tileId;
            return null;
        }
    }
    async addStatus(side, type, duration=null) {
        const existing = this.status[side].find(s=>s.type===type);
        if (existing) { if (existing.duration) existing.duration += duration; }
        else { if (type==="thunderstorm") this.status[side].push({type,duration,bolts:0.5}); else this.status[side].push({type,duration}); }
        if (['burnt', 'soaked', 'shocked'].includes(type)) await this.checkElements(side);
        this.updateWizardStatus();
    }
    async addCreatureStatus(creature, type, duration=null, extra=null) {
        const existing = creature.status.find(s=>s.type===type);
        if (existing) {
            if (existing.duration) existing.duration += duration;
        } else {
            let newStatus = {type, duration};
            creature.status.push(newStatus);
        }
        if (['burnt', 'soaked', 'shocked'].includes(type)) await this.checkElements(creature);
        this.updateCreatureDisplay();
        this.updateHandDisplay();
    }
    async checkElements(target) {
        let ss;
        if (target===1 || target===2) {
            ss = this.status[target];
            if (ss.find(s=>s.type==='burnt') && ss.find(s=>s.type==='soaked')) {
                this.removeStatus(target,'burnt'); this.removeStatus(target,'soaked');
                this.visualEffect(target===1?'t5':'t14','damage');
                if (target===1) await this.dealDamageToPlayer(4);
                else await this.dealDamageToEnemy(4);
            } else if (ss.find(s=>s.type==='soaked') && ss.find(s=>s.type==='shocked')) {
                this.removeStatus(target,'soaked'); this.removeStatus(target,'shocked');
                this.visualEffect(target===1?'t5':'t14','damage');
                if (target===1) await this.dealDamageToPlayer(2);
                else await this.dealDamageToEnemy(2);
                this.addStatus(target,'stun');
            } else if (ss.find(s=>s.type==='shocked') && ss.find(s=>s.type==='burnt')) {
                this.removeStatus(target,'shocked'); this.removeStatus(target,'burnt');
                for (let i=(target===1?1:10); i<=(target===1?9:18); i++) this.visualEffect('t'+i,'damage');
                if (target===1) await this.dealDamageToPlayer(2);
                else await this.dealDamageToEnemy(2);
                const crs = target===1?this.creatures[1]:this.creatures[2];
                crs.forEach(c=>this.dealDamageToCreature(c,1));
            }
        } else {
            ss = target.status;
            if (ss.find(s=>s.type==='burnt') && ss.find(s=>s.type==='soaked')) {
                this.removeCreatureStatus(target,'burnt'); this.removeCreatureStatus(target,'soaked');
                this.visualEffect(target.tileId,'damage');
                await this.dealDamageToCreature(target,4);
            } else if (ss.find(s=>s.type==='soaked') && ss.find(s=>s.type==='shocked')) {
                this.removeCreatureStatus(target,'soaked'); this.removeCreatureStatus(target,'shocked');
                this.visualEffect(target.tileId,'damage');
                await this.dealDamageToCreature(target,2);
                this.addCreatureStatus(target,'stun');
            } else if (ss.find(s=>s.type==='shocked') && ss.find(s=>s.type==='burnt')) {
                this.removeCreatureStatus(target,'shocked'); this.removeCreatureStatus(target,'burnt');
                this.visualEffect(target.tileId,'damage');
                await this.dealDamageToCreature(target,2);
                if (target.side===1) this.dealDamageToPlayer(1);
                else this.dealDamageToEnemy(1);
                const crs = target.side===1?this.creatures[1]:this.creatures[2];
                for (let c of crs) if (c!==target) this.dealDamageToCreature(c,1);
                for (let i=(target.side===1?1:10); i<=(target.side===1?9:18); i++) this.visualEffect('t'+i,'damage');
            }
        }
    }
    hasStatus(side, type) { return this.status[side].some(s=>s.type===type && (s.duration>0 || s.duration===null)); }
    hasCreatureStatus(creature, type) { return creature.status.some(s=>s.type===type && (s.duration===null || s.duration>0)); }
    removeStatus(side, type) { const idx = this.status[side].findIndex(s=>s.type===type); if (idx!==-1) { this.status[side].splice(idx,1); this.log(`${side===1?"Player":"Enemy"} lost ${type}.`,'info'); this.updateWizardStatus(); } }
    removeCreatureStatus(creature, type) { const idx = creature.status.findIndex(s=>s.type===type); if (idx!==-1) { creature.status.splice(idx,1); this.updateCreatureDisplay(); this.updateHandDisplay(); } }
    async dealDamageToEnemy(dmg) {
        let protegoIdx = -1;
        for (let i=0;i<7;i++) if (this.hand[2][i] && this.hand[2][i].name==="Protego") { protegoIdx=i; break; }
        if (protegoIdx!==-1 && this.mana[2]>0) {
            this.mana[2]--; this.manaCnt[2]++; this.manaSCnt[2]++;
            const protegoCard = this.hand[2][protegoIdx];
            this.hand[2][protegoIdx] = null;
            this.discard.push(protegoCard.name);
            await this.applySecretEffect("Protego",2);
            this.draw(2,1);
            await this.checkLunaSummon(2);
            this.updateWizardStatus();
            this.updateHandDisplay();
            return false;
        }
        let actual = dmg;
        if (this.hasStatus(1,"vindictiveneww")) { this.log("Vinda Rosier deals an extra damage to her enemy from her vindictiveness.","warning"); actual++; let vin = this.status[1].find(s => s.type === 'vindictiveness'); vin.duration--; if (vin.duration<=0) this.removeStatus(1,"vindictiveness"); }
        if (this.hasStatus(2,"obscurial")) { this.log('Your enemy takes more damage as an Obscurial.','warning'); actual = Math.floor(actual*2); }
        if (this.hasStatus(2,"damage_reduction")) { this.log('Fumos protects your enemy.','heal'); actual -= 1; }
        if (this.hasStatus(2,"protego_diabolica")) { this.log('Protego Diabolica protects your enemy.','heal'); actual = Math.ceil(actual/2); }
        if (this.hasStatus(2,"protego_totalum")) { this.log('Protego Totalum protects your enemy.','heal'); actual = Math.ceil(actual/2); }
        if (this.hasStatus(2,"obscurus")) return false;
        if (actual<0) actual=0;
        this.hp[2] = Math.max(0, this.hp[2]-actual);
        this.updateWizardStatus();
        this.log(`Enemy wizard took ${actual} damage.`,'damage');
        if (this.playerCharacter.id === 'vinda' && Math.random() < 0.25) {
            this.log(`Vinda Rosier instills fear in the enemy wizard!`, 'warning');
            await this.addStatus(2, 'fear', 2);
        }
        this.dmgCnt[1] += actual;
        this.checkVindaDmg(1);
        this.checkGameOver();
        return true;
    }
    async dealDamageToPlayer(dmg) {
        let protegoIdx = -1;
        for (let i=0;i<7;i++) if (this.hand[1][i] && this.hand[1][i].name==="Protego") { protegoIdx=i; break; }
        if (protegoIdx!==-1 && this.mana[1]>0) {
            this.mana[1]--; this.manaCnt[1]++; this.manaSCnt[1]++;
            const protegoCard = this.hand[1][protegoIdx];
            this.hand[1][protegoIdx] = null;
            this.discard.push(protegoCard.name);
            await this.applySecretEffect("Protego",1);
            this.draw(1,1);
            await this.checkLunaSummon(1);
            this.updateWizardStatus();
            this.updateHandDisplay();
            return false;
        }
        let actual = dmg;
        if (this.hasStatus(2,"vindictiveness")) { this.log("Enemy Vinda deals an extra damage from her vindictiveness.","warning"); actual++; let vin = this.status[2].find(s => s.type === 'vindictiveness'); vin.duration--; if (vin.duration<=0) this.removeStatus(2,'vindictiveness'); }
        if (this.hasStatus(1,"obscurial")) { this.log('You take more damage as an Obscurial.','warning'); actual = Math.floor(actual*2); }
        if (this.hasStatus(1,"damage_reduction")) { this.log('Fumos protects you.','heal'); actual -= 1; }
        if (this.hasStatus(1,"protego_diabolica")) { this.log('Protego Diabolica protects you.','heal'); actual = Math.ceil(actual/2); }
        if (this.hasStatus(1,"protego_totalum")) { this.log('Protego Totalum protects you.','heal'); actual = Math.ceil(actual/2); }
        if (this.hasStatus(1,"obscurus")) return false;
        if (actual<0) actual=0;
        this.hp[1] = Math.max(0, this.hp[1]-actual);
        this.updateWizardStatus();
        this.log(`You took ${actual} damage.`,'damage');
        if (this.enemyCharacter.id === 'vinda' && Math.random() < 0.25) {
            this.log(`Enemy Vinda instills fear in the you!`, 'warning');
            await this.addStatus(1, 'fear', 2);
        }
        this.dmgCnt[2] += actual;
        this.checkVindaDmg(2);
        this.checkGameOver();
        return true;
    }
    async dealDamageToCreature(cr, dmg) {
        let actual = dmg;
        if (this.hasCreatureStatus(cr,"runic_ward")) { this.log(`${cr.name}'s Runic Ward absorbed all damage!`,"heal"); return true; }
        if (cr.name==="Piertotum Locomotor"&&!this.hasCreatureStatus(cr,'teacup')) { this.log('Stone Guardian takes 1 less damage and is weakened','heal'); actual-=1; this.addCreatureStatus(cr,'weak',2); }
        if (this.hasCreatureStatus(cr,"damage_reduction")) { this.log('Fumos protects '+cr.name+'.','heal'); actual-=1; }
        if (this.hasStatus(cr.side,"protego_diabolica")) { this.log('Protego Diabolica protects '+cr.name+'.','heal'); actual = Math.ceil(actual/2); }
        if (this.hasStatus(cr.side,"protego_totalum")) { this.log('Protego Totalum protects '+cr.name+'.','heal'); actual = Math.ceil(actual/2); }
        if (actual<0) actual=0;
        cr.hp = Math.max(0, cr.hp-actual);
        this.log(`${cr.name}(${cr.hp+actual}→${cr.hp}) took ${actual} damage.`,'damage');
        let side = cr.side;
        this.dmgCnt[3-side]+=actual;
        if (cr.hp<=0) await this.removeCreature(cr);
        else this.updateCreatureDisplay();
        await this.checkVindaDmg(3-side);
        return true;
    }
    healAllyWizard(amt) { this.hp[1] = Math.min(this.maxHp[1], this.hp[1]+amt); this.updateWizardStatus(); this.log(`You healed ${amt} HP.`,'heal'); }
    healEnemyWizard(amt) { this.hp[2] = Math.min(this.maxHp[2], this.hp[2]+amt); this.updateWizardStatus(); this.log(`Enemy healed ${amt} HP.`,'heal'); }
    healCreature(cr, amt) { cr.hp = Math.min(cr.maxHp, cr.hp+amt); this.updateCreatureDisplay(); this.log(`${cr.name} healed ${amt} HP.`,'heal'); }
    async removeCreature(cr) {
        let creatures = cr.side===1?this.creatures[1]:this.creatures[2];
        let idx = creatures.findIndex(c=>c===cr);
        if (idx!==-1) {
            if (cr.hp<=0) {
                const charId = cr.side===1?this.playerCharacter.id:this.enemyCharacter.id;
                const eId = cr.side===2?this.playerCharacter.id:this.enemyCharacter.id;
                if (charId==="gellert") await this.applySpellEffect("Protego Diabolica", cr.side);
                if (eId==="vinda") { this.log(`${cr.side===1?'Enemy Vinda':'Vinda Rosier'} gains 2 mana and vindictiveness from an enemy creature's death.`, 'info'); this.mana[3-cr.side]=Math.min(this.maxMana[3-cr.side], this.mana[3-cr.side]+2); this.addStatus(3-cr.side, 'vindictiveness', 1); }
                for (let i=0;i<7;i++) { if (this.hand[1][i] && this.hand[1][i].name==="Thestral") this.removeCreatureStatus(this.hand[1][i],'unseen'); }
                for (let i=0;i<7;i++) { if (this.hand[2][i] && this.hand[2][i].name==="Thestral") this.removeCreatureStatus(this.hand[2][i],'unseen'); }
                this.log("Now you can see Thestrals.",'warning');
                let hand = cr.side===1?this.hand[1]:this.hand[2];
                for (let i=0;i<7;i++) {
                    if (hand[i] && hand[i].name==="Portkey") {
                        let re = await this.applySecretEffect("Portkey",cr.side);
                        if (re) {
                            this.discard.push(hand[i].name);
                            hand[i] = null;
                            let tok = new Card(cr.name, dict[cr.name === "Stone Guardian" ? "Piertotum Locomotor" : cr.name][0], true);
                            let freeIdx = this.findFreeIndex(cr.side);
                            if (freeIdx!==-1) { tok.index=freeIdx; hand[freeIdx]=tok; }
                        }
                        break;
                    }
                }
            }
            creatures.splice(idx,1);
            let tile = document.getElementById(`t${cr.tileId}`);
            if (tile) { tile.innerHTML = "Empty"; tile.classList.add('empty-card'); }
            if (!cr.token) this.discard.push(cr.name);
            this.updateHandDisplay();
            this.updateCreatureDisplay();
            this.log(`${cr.name} died.`,'damage');
        }
    }
    placeCreature(cardName, side, tileId, val=null, token=false) {
        const [manaCost, effectType, hp] = dict[cardName];
        const attackMap = { "Troll":1, "Thestral":1, "Centaur Archer":2, "Piertotum Locomotor":2, "Runic Armor":1, "Acolyte":1, "Chess Pawn":1 };
        let attack = attackMap[cardName] || 0;
        let name = cardName;
        let cr = new Creature(name, side, tileId, hp, attack, token);
        if (side===1) { if (this.creatures[1].some(c=>c.tileId===tileId) || tileId===5) return false; this.creatures[1].push(cr); }
        else { if (this.creatures[2].some(c=>c.tileId===tileId) || tileId===14) return false; this.creatures[2].push(cr); }
        if (name==="Thestral") this.mana[side] = Math.min(this.maxMana[side], this.mana[side]+2);
        if (name==="Runic Armor") this.addCreatureStatus(cr,"runic_ward",1);
        if (name==="Fantastic Beasts Suitcase") this.addCreatureStatus(cr, val ? val.type : []);
        if (name==="Chess Pawn") {
            const pawnMap = {3:10,6:13,9:16,10:3,13:6,16:9};
            const pawnFront = pawnMap[tileId] || null;
            if (pawnFront && !(this.creatures[3-side].some(c=>c.tileId===pawnFront)))
                cr.status.push({ type: "pawn", duration: null, moves: 2 });
            else cr.status.push({ type: "pawn", duration: null, moves: 0 });
        }
        this.applyRonCreatureBuff(cr, side);
        this.updateCreatureDisplay();
        this.log(`${side===1?"Player":"Enemy"} summoned ${name} at tile ${tileId}.`,'info');
        let handArr = side===1 ? this.hand[1] : this.hand[2];
        for (let i=0;i<7;i++) { if (handArr[i] && handArr[i].name==="Fantastic Beasts Suitcase") this.addToSuitcase(handArr[i], cardName); }
        return true;
    }
    addToSuitcase(suitcase, cr) {
        let side = suitcase.side;
        let rec = suitcase.status.find(s=>Array.isArray(s.type));
        if (!rec) { this.addCreatureStatus(suitcase, []); rec = suitcase.status.find(s=>Array.isArray(s.type)); }
        if (rec.type.length>=4) { this.log('Your suitcase is full.','warning'); return false; }
        const v = ["Thestral","Phoenix","Fantastic Beasts Suitcase","Acolyte"];
        if (!v.includes(cr)) { rec.type.push(cr); if (side === 1) this.log(`Your suitcase has recorded ${cr}.`,'info'); return true; }
        else { if (side === 1) this.log(`Suitcase can't record ${cr}.`,'info'); return false; }
    }
    async hermioneReduceCost(side, usedCardIndex) {
        const hand = this.hand[side];
        const eligible = [];
        for (let i=0;i<7;i++) {
            const c = hand[i];
            if (c && i!==usedCardIndex && dict[c.name] && dict[c.name][1]<=2) eligible.push(c);
        }
        if (eligible.length===0) return;
        const randomSpell = eligible[Math.floor(Math.random()*eligible.length)];
        if (randomSpell.mana>0) {
            randomSpell.mana = Math.floor(randomSpell.mana*0.75);
            this.log(side===1?`Hermione reduces ${randomSpell.name} mana cost by 25% (now ${randomSpell.mana}).`:"Enemy Hermione reduces a handcard mana cost by 25%.",'info');
            this.updateHandDisplay();
        }
    }
    applyRonCreatureBuff(creature, side) {
        const character = side===1?this.playerCharacter:this.enemyCharacter;
        if (character.id!=='ron') return;
        const buffs = ['rook','knight','bishop'];
        const chosen = buffs[Math.floor(Math.random()*3)];
        if (chosen==='rook') { creature.attack+=1; creature.status.push({type:'rook',duration:null,effect:'atk+1'}); this.log(`${creature.name} gains Rook buff, ATK +1.`,'heal'); }
        else if (chosen==='knight') { creature.status.push({type:'knight',duration:null,effect:'double_20'}); this.log(`${creature.name} gains Knight buff, 25% chance to attack twice.`,'heal'); }
        else if (chosen==='bishop') { creature.hp+=2; creature.maxHp+=2; creature.status.push({type:'bishop',duration:null,effect:'hp+2'}); this.log(`${creature.name} gains Bishop buff, HP +2.`,'heal'); }
        this.updateCreatureDisplay();
    }
    async knightExtraAttack(creature, attackFunc) {
        if (!creature.status.some(s=>s.type==='knight')) return false;
        if (Math.random()<0.25) { this.log(`${creature.name} Knight's blessing triggers a second attack!`,'warning'); await attackFunc(); return true; }
        return false;
    }
    async checkLunaSummon(side) {
        let charId = side===1?this.playerCharacter.id:this.enemyCharacter.id;
        if (charId!=='luna') return false;
        let cnt = side===1?this.manaCnt[1]:this.manaCnt[2];
        if (cnt<5) return false;
        cnt-=5;
        if (side===1) this.manaCnt[1]=cnt; else this.manaCnt[2]=cnt;
        const sc = ["Thestral","Phoenix","Fantastic Beasts Suitcase","Acolyte"];
        let crset = Object.entries(dict).filter(([k,v])=>v[1]===3 && !sc.includes(k) && k!=="Acolyte");
        let index = Math.floor(Math.random()*crset.length);
        let name = crset[index][0];
        let t = this.getPreferredTileForCreature(name, side);
        if (!t) { this.log(`No empty tiles! 2 mana compensation.`,'warning'); this.mana[side] = Math.min(this.maxMana[side], this.mana[side]+2); return false; }
        this.placeCreature(name, side, t, null, true);
        let scnt = side===1?this.manaSCnt[1]:this.manaSCnt[2];
        if (scnt>=50) {
            scnt-=50;
            if (side===1) this.manaSCnt[1]=scnt; else this.manaSCnt[2]=scnt;
            this.log(`${side===1?'You have':'Enemy has'} a chance to summon a Thestral.`,'info');
            let tt = this.getPreferredTileForCreature("Thestral", side);
            if (!tt) { this.log(`No empty tiles! 4 mana compensation.`,'warning'); this.mana[side] = Math.min(this.maxMana[side], this.mana[side]+4); return false; }
            this.placeCreature("Thestral", side, tt, null, true);
        }
        this.updateCreatureDisplay();
        return true;
    }
    async checkGrindelwaldAcolyte(side) {
        let charId = side===1?this.playerCharacter.id:this.enemyCharacter.id;
        if (charId !== 'gellert') return false;
        this.cardCnt[side]++;
        if (this.cardCnt[side] >= 6) {
            this.cardCnt[side] -= 6;
            let tile = this.getPreferredTileForCreature("Acolyte", side);
            if (tile !== null) {
                this.placeCreature("Acolyte", side, tile, null, true);
                this.updateCreatureDisplay();
                this.log(`${side===1?"You":"Enemy"} summoned an Acolyte from Dark Revelations.`,'info');
            } else {
                this.log(`No empty tiles for Acolyte! 2 mana compensation.`,'warning');
                this.mana[side] = Math.min(this.maxMana[side], this.mana[side] + 2);
            }
        }
        return true;
    }
    async checkVindaDmg(side) {
        let charId = side===1?this.playerCharacter.id:this.enemyCharacter.id;
        if (charId !== 'vinda') return false;
        if (this.dmgCnt[side] >= 20) {
            this.dmgCnt[side] -= 20;
            let tile = this.getPreferredTileForCreature("Acolyte", side);
            if (tile !== null) {
                this.placeCreature("Acolyte", side, tile, null, true);
                this.updateCreatureDisplay();
                this.log(`${side===1?"You":"Enemy"} summoned an Acolyte from Vindicta's Grace.`,'info');
            } else {
                this.log(`No empty tiles for Acolyte! 2 mana compensation.`,'warning');
                this.mana[side] = Math.min(this.maxMana[side], this.mana[side] + 2);
            }
        }
        return true;
    }
    async applySpellEffect(cardName, caster, targetTileId=null, rowIndex=null, cardIndex=null, fromSacrifice=false) {
        const [manaCost, effectType, value] = dict[cardName];
        const isPlayer = (caster===1);
        switch (cardName) {
            case "Confringo":
                this.log(`${isPlayer?"Player":"Enemy"} cast Confringo!`,'info');
                if (isPlayer) {
                    this.visualEffect(`t14`,'damage');
                    await this.dealDamageToEnemy(3);
                    for (let i=10;i<=18;i++) { this.visualEffect('t'+i,'damage'); }
                    let crc = this.creatures[2];
                    for (let cr of crc) await this.dealDamageToCreature(cr,1);
                } else {
                    this.visualEffect('t5','damage');
                    await this.dealDamageToPlayer(3);
                    for (let i=1;i<=9;i++) { this.visualEffect('t'+i,'damage'); }
                    let crc = this.creatures[1];
                    for (let cr of crc) await this.dealDamageToCreature(cr,1);
                }
                break;
            case "Repello Inimicum":
                this.log(`${isPlayer?"Player":"Enemy"} cast Repello Inimicum!`,'info');
                if (isPlayer) {
                    for (let i=10;i<=18;i++) this.visualEffect('t'+i,'damage');
                    await this.dealDamageToEnemy(2);
                    let crc = this.creatures[2];
                    for (let cr of crc) await this.dealDamageToCreature(cr,2);
                } else {
                    for (let i=1;i<=9;i++) this.visualEffect('t'+i,'damage');
                    await this.dealDamageToPlayer(2);
                    let crc = this.creatures[1];
                    for (let cr of crc) await this.dealDamageToCreature(cr,2);
                }
                break;
            case "Essence of Dittany":
                this.log(`${isPlayer?"Player":"Enemy"} cast Essence of Dittany!`,'info');
                if (targetTileId) {
                    if (targetTileId===5) { this.visualEffect('t5','heal'); this.healAllyWizard(3); this.addStatus(1,'heal',2); }
                    else if (targetTileId===14) { this.visualEffect('t14','heal'); this.healEnemyWizard(3); this.addStatus(2,'heal',2); }
                    else { let cr=this.getCreatureAt(targetTileId); if(cr) { this.visualEffect(`t${targetTileId}`,'heal'); this.healCreature(cr,3); this.addCreatureStatus(cr,'heal',2); } }
                }
                break;
            case "Expelliarmus":
                this.log(`${isPlayer?"Player":"Enemy"} cast Expelliarmus!`,'info');
                if (rowIndex!==null) {
                    if (isPlayer) {
                        let frontTile = this.getFrontTileId(rowIndex, true);
                        if (frontTile) {
                            if (frontTile===14) { this.visualEffect('t14','damage'); await this.dealDamageToEnemy(2); this.addStatus(2,"disarm"); this.log("Enemy wizard is disarmed!","warning"); }                            else { let cr=this.getCreatureAt(frontTile); if(cr) { this.visualEffect(`t${frontTile}`,'damage'); await this.dealDamageToCreature(cr,2); this.addCreatureStatus(cr,"disarm"); this.log(`${cr.name} is disarmed!`,"warning"); } }
                        }
                    } else {
                        let frontTile = this.getFrontTileId(rowIndex, false);
                        if (frontTile) {
                            if (frontTile===5) { this.visualEffect('t5','damage'); await this.dealDamageToPlayer(2); this.addStatus(1,"disarm"); this.log("You are disarmed!","warning"); }
                            else { let cr=this.getCreatureAt(frontTile); if(cr) { await this.dealDamageToCreature(cr,2); this.addCreatureStatus(cr,"disarm"); this.visualEffect(`t${frontTile}`,'damage'); this.log(`${cr.name} is disarmed!`,"warning"); } }
                        }
                    }
                }
                break;
            case "Stupify":
                this.log(`${isPlayer?"Player":"Enemy"} cast Stupify!`,'info');
                if (rowIndex!==null) {
                    if (isPlayer) {
                        let frontTile = this.getFrontTileId(rowIndex, true);
                        if (frontTile) {
                            if (frontTile===14) { this.visualEffect('t14','damage'); await this.dealDamageToEnemy(2); this.addStatus(2,"stun"); this.log("Enemy wizard is stunned!","warning"); }
                            else { let cr=this.getCreatureAt(frontTile); if(cr) { this.visualEffect(`t${frontTile}`,'damage'); await this.dealDamageToCreature(cr,2); this.addCreatureStatus(cr,"stun"); this.log(`${cr.name} is stunned!`,"warning"); } }
                        }
                    } else {
                        let frontTile = this.getFrontTileId(rowIndex, false);
                        if (frontTile) {
                            if (frontTile===5) { this.visualEffect('t5','damage'); await this.dealDamageToPlayer(2); this.addStatus(1,"stun"); this.log("You are stunned!","warning"); }
                            else { let cr=this.getCreatureAt(frontTile); if(cr) { this.visualEffect(`t${frontTile}`,'damage'); await this.dealDamageToCreature(cr,2); this.addCreatureStatus(cr,"stun"); this.log(`${cr.name} is stunned!`,"warning"); } }
                        }
                    }
                }
                break;
            case "Fumos":
                this.log(`${isPlayer?"Player":"Enemy"} cast Fumos!`,'info');
                if (isPlayer) {
                    for (let i=1;i<=9;i++) this.visualEffect(`t${i}`,'heal');
                    await this.addStatus(1,"damage_reduction",1);
                    this.healAllyWizard(1);
                    for (let creature of this.creatures[1]) { await this.addCreatureStatus(creature,"damage_reduction",1); this.healCreature(creature,1); }
                    this.log("Fog surrounds your side!","info");
                } else {
                    this.visualEffect('t14','heal');
                    for (let i=10;i<=18;i++) this.visualEffect(`t${i}`,'heal');
                    await this.addStatus(2,"damage_reduction",1);
                    this.healEnemyWizard(1);
                    for (let creature of this.creatures[2]) { await this.addCreatureStatus(creature,"damage_reduction",1); this.healCreature(creature,1); }
                    this.log("Fog surrounds enemy side!","info");
                }
                break;
            case "Sectumsumpra":
                this.log(`${isPlayer?"Player":"Enemy"} cast Sectumsumpra!`,'info');
                if (targetTileId) {
                    if (targetTileId===14 && isPlayer) { this.visualEffect('t14','damage'); await this.dealDamageToEnemy(3); await this.addStatus(2,"bleed",2); }
                    else if (targetTileId===5 && !isPlayer) { this.visualEffect('t5','damage'); await this.dealDamageToPlayer(3); await this.addStatus(1,"bleed",2); }
                    else { let cr=this.getCreatureAt(targetTileId); if(cr && ((isPlayer && cr.side===2) || (!isPlayer && cr.side===1))) { this.visualEffect(`t${targetTileId}`,'damage'); await this.dealDamageToCreature(cr,3); await this.addCreatureStatus(cr,"bleed",2); } }
                }
                break;
            case "Avis":
                this.log(`${isPlayer?"Player":"Enemy"} cast Avis!`,'info');
                if (isPlayer) {
                    let enemies = []; if (this.hp[2]>0) enemies.push({type:"wizard",tileId:14}); this.creatures[2].forEach(c=>enemies.push({type:"creature",creature:c,tileId:c.tileId}));
                    if (enemies.length) {
                        let totalDamage=0;
                        for (let i=1;i<=5;i++) {
                            enemies = [];
                            if (this.hp[2]>0) enemies.push({type:"wizard",tileId:14}); this.creatures[2].forEach(c=>enemies.push({type:"creature",creature:c,tileId:c.tileId}));
                            if (enemies.length===0) break;
                            let target = enemies[Math.floor(Math.random()*enemies.length)];
                            if (target.type==="wizard") { this.visualEffect(`t14`,'damage'); if (await this.dealDamageToEnemy(1)) totalDamage++; }
                            else { this.visualEffect(`t${target.creature.tileId}`,'damage'); if (await this.dealDamageToCreature(target.creature,1)) totalDamage++; if (target.creature.hp<=0) enemies=enemies.filter(e=>e.creature!==target.creature); }
                            await sleep(200);
                        }
                        this.log(`Avis dealt total ${totalDamage} damage to random enemies.`,"damage");
                    }
                } else {
                    let enemies = []; if (this.hp[1]>0) enemies.push({type:"wizard",tileId:5}); this.creatures[1].forEach(c=>enemies.push({type:"creature",creature:c,tileId:c.tileId}));
                    if (enemies.length) {
                        let totalDamage=0;
                        for (let i=1;i<=5;i++) {
                            enemies = [];
                            if (this.hp[1]>0) enemies.push({type:"wizard",tileId:5}); this.creatures[1].forEach(c=>enemies.push({type:"creature",creature:c,tileId:c.tileId}));
                            if (enemies.length===0) break;
                            let target = enemies[Math.floor(Math.random()*enemies.length)];
                            if (target.type==="wizard") { this.visualEffect(`t5`,'damage'); if (await this.dealDamageToPlayer(1)) totalDamage++; }
                            else { this.visualEffect(`t${target.creature.tileId}`,'damage'); if (await this.dealDamageToCreature(target.creature,1)) totalDamage++; if (target.creature.hp<=0) enemies=enemies.filter(e=>e.creature!==target.creature); }
                            await sleep(200);
                        }
                        this.log(`Avis dealt total ${totalDamage} damage to your side.`,"damage");
                    }
                }
                break;
            case "Incendio":
                this.log(`${isPlayer?"Player":"Enemy"} cast Incendio!`,'info');
                if (targetTileId) {
                    if (targetTileId===14 && isPlayer) { this.visualEffect('t14','damage'); await this.dealDamageToEnemy(2); await this.addStatus(2,"burnt",2); }
                    else if (targetTileId===5 && !isPlayer) { this.visualEffect('t5','damage'); await this.dealDamageToPlayer(2); await this.addStatus(1,"burnt",2); }
                    else { let cr=this.getCreatureAt(targetTileId); if(cr) { this.visualEffect(`t${targetTileId}`,'damage'); await this.dealDamageToCreature(cr,2); await this.addCreatureStatus(cr,"burnt",2); } }
                }
                break;
            case "Aguamenti":
                this.log(`${isPlayer?"Player":"Enemy"} cast Aguamenti!`,'info');
                if (targetTileId) {
                    if (targetTileId===14 && isPlayer) { this.visualEffect('t14','damage'); await this.dealDamageToEnemy(2); await this.addStatus(2,"soaked",2); }
                    else if (targetTileId===5 && !isPlayer) { this.visualEffect('t5','damage'); await this.dealDamageToPlayer(2); await this.addStatus(1,"soaked",2); }
                    else { let cr=this.getCreatureAt(targetTileId); if(cr) { this.visualEffect(`t${targetTileId}`,'damage'); await this.dealDamageToCreature(cr,2); await this.addCreatureStatus(cr,"soaked",2); } }
                }
                break;
            case "Fulmen":
                this.log(`${isPlayer?"Player":"Enemy"} cast Fulmen!`,'info');
                if (targetTileId) {
                    if (targetTileId===14 && isPlayer) { this.visualEffect('t14','damage'); await this.dealDamageToEnemy(2); await this.addStatus(2,"shocked",2); }
                    else if (targetTileId===5 && !isPlayer) { this.visualEffect('t5','damage'); await this.dealDamageToPlayer(2); await this.addStatus(1,"shocked",2); }
                    else { let cr=this.getCreatureAt(targetTileId); if(cr) { this.visualEffect(`t${targetTileId}`,'damage'); await this.dealDamageToCreature(cr,2); await this.addCreatureStatus(cr,"shocked",2); } }
                }
                break;
            case "Protego Diabolica":
                this.log(`${isPlayer?"Player":"Enemy"} cast Protego Diabolica!`,'info');
                this.addStatus(caster,'protego_diabolica',3);
                let pmin = isPlayer?1:10, pmax = isPlayer?9:18;
                for (let i=pmin;i<=pmax;i++) this.visualEffect(`t${i}`,'heal');
                break;
            case "Thunderstorm":
                this.log(`${isPlayer?"Player":"Enemy"} cast Thunderstorm!`,'info');
                this.addStatus(3-caster,'thunderstorm',3);
                isPlayer?this.visualEffect('t14','damage'):this.visualEffect('t5','damage');
                break;
            case "Tidal Wave":
                this.log(`${isPlayer?"Player":"Enemy"} cast Tidal Wave!`,'info');
                const tideMap = isPlayer ? {1:[10,11,12],2:[13,14,15],3:[16,17,18]} : {1:[3,2,1],2:[6,5,4],3:[9,8,7]};
                let tcnt=0, tcr;
                for (let row=1;row<=3;row++) {
                    tcnt=0;
                    for (let t of tideMap[row]) {
                        tcr = [...this.creatures[1],...this.creatures[2]].find(c=>c.tileId===t);
                        if (tcr) { this.visualEffect('t'+t,'damage'); await this.dealDamageToCreature(tcr,4-tcnt); this.addCreatureStatus(tcr,'soaked',2); tcnt++; }
                        else if (t===5) { this.visualEffect('t5','damage'); await this.dealDamageToPlayer(4-tcnt); this.addStatus(1,'soaked',2); tcnt++; }
                        else if (t===14) { this.visualEffect('t14','damage'); await this.dealDamageToEnemy(4-tcnt); this.addStatus(2,'soaked',2); tcnt++; }
                    }
                }
                break;
            case "Ventus":
                this.log(`${isPlayer?"Player":"Enemy"} cast Ventus!`,'info');
                const targetSide = isPlayer?2:1;
                const targetWizardTile = isPlayer?14:5;
                let allElementalStatuses = [];
                const enemyWizardStatuses = this.status[targetSide].filter(s=> s.type==="burnt"||s.type==="shocked"||s.type==="soaked");
                enemyWizardStatuses.forEach(status=>{ allElementalStatuses.push({type:status.type,source:"wizard"}); });
                const enemyCreatures = this.creatures[targetSide];
                for (let creature of enemyCreatures) {
                    const creatureStatuses = creature.status.filter(s=> s.type==="burnt"||s.type==="shocked"||s.type==="soaked");
                    creatureStatuses.forEach(status=>{ allElementalStatuses.push({type:status.type,source:`creature:${creature.tileId}`}); });
                }
                if (allElementalStatuses.length===0) { this.log("No elemental statuses to spread among enemies!",'warning'); break; }
                this.log(`Collected ${allElementalStatuses.length} elemental statuses from enemies: ${allElementalStatuses.map(s=>s.type).join(", ")}`,'info');
                for (let i=allElementalStatuses.length-1;i>0;i--) { let j=Math.floor(Math.random()*(i+1)); [allElementalStatuses[i],allElementalStatuses[j]]=[allElementalStatuses[j],allElementalStatuses[i]]; }
                const targetEnemies = [];
                targetEnemies.push({type:"wizard",tileId:targetWizardTile,side:targetSide});
                for (let creature of enemyCreatures) targetEnemies.push({type:"creature",creature:creature,tileId:creature.tileId,side:targetSide});
                for (let statusInfo of allElementalStatuses) {
                    const statusType = statusInfo.type;
                    for (let enemy of targetEnemies) {
                        this.visualEffect(`t${enemy.tileId}`,'damage');
                        if (enemy.type==="wizard") {
                            if (isPlayer) { await this.dealDamageToEnemy(1); this.addStatus(2,statusType,2); }
                            else { await this.dealDamageToPlayer(1); this.addStatus(1,statusType,2); }
                            this.log(`Ventus spreads ${statusType} to enemy wizard with 1 damage!`,'warning');
                        } else {
                            await this.dealDamageToCreature(enemy.creature,1);
                            this.addCreatureStatus(enemy.creature,statusType,2);
                            this.log(`Ventus spreads ${statusType} to ${enemy.creature.name} with 1 damage!`,'warning');
                        }
                    }
                }
                break;
            case "Obscurus Curse":
                this.log(`${isPlayer?"Player":"Enemy"} cursed themselves to be an Obscurial for 4 turns!`,'info');
                isPlayer?this.visualEffect('t5','damage'):this.visualEffect('t14','damage');
                this.addStatus(caster,'obscurial',4);
                break;
            case "Protego Totalum":
                this.log(`${isPlayer?"Player":"Enemy"} cast Protego Totalum!`,'info');
                if (isPlayer) { for (let i=1;i<=9;i++) this.visualEffect('t'+i,'heal'); }
                else { for (let i=10;i<=18;i++) this.visualEffect('t'+i,'heal'); }
                this.addStatus(caster,'protego_totalum',3);
                break;
            default: this.log(`Card ${cardName} effect not implemented!`,"warning"); return false;
        }
        let tcrs = isPlayer?this.creatures[1]:this.creatures[2];
        tcrs.forEach(c=>{ if(c.name==="Thestral" && c.attack<4) { c.attack+=0.25; if(Math.floor(c.attack)-c.attack===0) { this.log(`${isPlayer?'Your':"Enemy's"} Thestral(${c.attack-1}→${c.attack}) has learnt more and has given ${isPlayer?'you':'your enemy'} 2 mana.`,'info'); this.mana[caster] = Math.min(this.maxMana[caster], this.mana[caster]+2); } } });
        if (this.hasStatus(3-caster,"thunderstorm")) {
            let th = isPlayer?this.status[2].find(s=>s.type==="thunderstorm"):this.status[1].find(s=>s.type==="thunderstorm");
            if (th) { if (th.bolts<3) this.log(`The Thunderstorm(${th.bolts}→${Math.min(3,th.bolts+0.5)}) appears to grow heavier.`,'info'); th.bolts=Math.min(3,th.bolts+0.5); }
        }
        const isHermione = (caster===1 && this.playerCharacter.id==='hermione') || (caster===2 && this.enemyCharacter.id==='hermione');
        if (isHermione) await this.hermioneReduceCost(caster, cardIndex);
        if (isPlayer) this.spellCnt[1]++; else this.spellCnt[2]++;
        this.updateCreatureDisplay();
        return true;
    }
    async applyEquimentEffect(cardName, caster, tileId=null) {
        const [manaCost, effectType, value] = dict[cardName];
        const isPlayer = (caster===1);
        switch (cardName) {
            case "Spectrespecs":
                this.addStatus(caster,"spectrespecs",2);
                this.mana[caster] = Math.min(this.maxMana[caster], this.mana[caster]+4);
                this.log(`${caster===1?'You':'Enemy wizard'} put on Spectrespecs! ${caster===1?'You':'Enemy wizard'} can now see Thestrals for 2 turns.`,"info");
                this.visualEffect(caster===1?'t5':'t14','heal');
                let targetHand = caster===1?this.hand[1]:this.hand[2];
                for (let i=0;i<7;i++) if (targetHand[i] && targetHand[i].name==="Thestral") this.removeCreatureStatus(targetHand[i],'unseen');
                this.updateHandDisplay();
                break;
            case "Gringotts Keys":
                this.log(`${caster===1?'You':'Enemy wizard'} went to Gingotts and found some new cards.`,"info");
                let handArr = caster===1?this.hand[1]:this.hand[2];
                for (let i=0;i<7;i++) { if (handArr[i]) { if (!handArr[i].token) this.discard.push(handArr[i].name); handArr[i]=null; } }
                this.draw(caster,7);
                this.updateHandDisplay();
                break;
            case "Elemental Spellbook":
                this.log(`${isPlayer?"Player":"Enemy"} opens the Elemental Spellbook!`,'info');
                this.visualEffect(isPlayer?'t5':'t14','heal');
                const elementalSpells = ["Incendio","Aguamenti","Fulmen","Protego Diabolica","Thunderstorm","Tidal Wave"];
                const hand = caster===1?this.hand[1]:this.hand[2];
                const spellsToCast = [];
                for (let i=0;i<7;i++) { if (hand[i] && elementalSpells.includes(hand[i].name)) { this.discard.push(hand[i].name); spellsToCast.push(hand[i].name); hand[i]=null; } }
                this.draw(caster, spellsToCast.length);
                if (spellsToCast.length===0) { this.log("No elemental spells in hand! The spellbook is empty.",'warning'); return true; }
                for (let spell of spellsToCast) { await this.applySpellEffect(spell, caster, tileId, null); await sleep(500); }
                this.updateHandDisplay();
                break;
            default: this.log(`Card ${cardName} effect not implemented!`,"warning"); return false;
        }
        return true;
    }
    async applySecretEffect(cardName, caster) {
        const isPlayer = (caster===1);
        switch (cardName) {
            case "Protego":
                this.log(`${caster===1?'You':'Enemy wizard'} cast Protego! ${caster===1?'You deal':'Enemy wizard deals'} 1 damage back.`,"info");
                this.visualEffect(caster===1?'t5':'t14','heal');
                this.visualEffect(caster===1?'t14':'t5','damage');
                await (caster===1?this.dealDamageToEnemy(1):this.dealDamageToPlayer(1));
                break;
            case "Portkey":
                this.log(`${caster===1?'You':'Enemy wizard'} used Portkey! ${caster===1?'You generate':'Enemy wizard generates'} a token card.`,"info");
                break;
            default: return false;
        }
        return true;
    }
    async useCard(side, cardIndex, targetTileId=null, rowIndex=null) {
        const hand = this.hand[side];
        const card = hand[cardIndex];
        if (!card) return false;
        const cardName = card.name;
        const [manaC, effectType, value] = dict[cardName];
        const manaCost = card.mana;
        if ((side===1?(targetTileId===14):(targetTileId===5)) && this.hasStatus(3-side,'protego_totalum')) return false;
        if (!this.hasEnoughMana(manaCost, side)) return false;
        if (this.hasCreatureStatus(card, 'unseen') && !this.hasStatus(side, 'spectrespecs')) return false;
        this.mana[side] -= manaCost;
        let success = false;
        let removedCard = null;
        this.gainedTokenThisAction = false;
        if (effectType === 4) {
            if (targetTileId) success = await this.applyEquimentEffect(cardName, side, targetTileId);
            else success = await this.applyEquimentEffect(cardName, side);
            if (success) { removedCard = hand[cardIndex]; hand[cardIndex] = null; this.updateWizardStatus(); }
            else this.mana[side] += manaCost;
        } else if (effectType === 3) {
            success = this.placeCreature(cardName, side, targetTileId, cardName==="Fantastic Beasts Suitcase"?card.status.find(s=>Array.isArray(s.type)):null, card.token);
            if (success) {
                removedCard = hand[cardIndex]; hand[cardIndex] = null;
                if (((side === 1 && this.playerCharacter.id === 'newt') || (side === 2 && this.enemyCharacter.id === 'newt')) && !removedCard.token) {
            		let freeI = this.findFreeIndex(side);
    				if (freeI !== -1) {
     		   			let tok = new Card("Niffler", 0, true);
        				tok.index = freeI;
        				this.hand[side][freeI] = tok;
        				this.gainedTokenThisAction = true;
        				this.updateHandDisplay();
        				this.log(`${side === 1 ? 'Newt Scamander' : 'Enemy Newt'} gained a free Niffler token!`, "info");
    				}
        		}
            }
            else this.mana[side] += manaCost;
        } else {
            success = await this.applySpellEffect(cardName, side, targetTileId, rowIndex, cardIndex);
            if (success) {
                const isHarry = (side===1 && this.playerCharacter.id==='harry') || (side===2 && this.enemyCharacter.id==='harry');
                if (isHarry && effectType<=2 && manaC<=3) {
                    this.log(`${side===1?"Harry Potter":"Enemy Harry"} casts the spell again!`,'heal');
                    await this.applySpellEffect(cardName, side, targetTileId, rowIndex);
                }
                if ((side===1 && this.playerCharacter.id==='gellert') || (side===2 && this.enemyCharacter.id==='gellert')) {
                    this.hp[side] -= 1;
                    this.updateWizardStatus();
                    this.log(`${side===1?"You lose 1 HP for the greater good.":"Enemy loses 1 HP for the greater good."}`,'damage');
                    await this.checkGameOver();
                }
                if (((side===1 && this.playerCharacter.id==='minerva') || (side===2 && this.enemyCharacter.id==='minerva')) && Math.random()<0.4) {
                    let cs = this.creatures[3-side].filter(c => !this.hasCreatureStatus(c,"teacup"));
                    if (cs.length) {
                        let im = Math.floor(Math.random()*cs.length);
                        let tc = cs[im];
                        tc.status = []; await this.addCreatureStatus(tc, 'teacup'); tc.maxHp = 1; tc.hp = 1; tc.attack = 0; 
                        this.log(`${tc.name} was turned into a teacup.`, 'warning');
                        this.updateCreatureDisplay();
                    } else {
                        let pt = this.getPreferredTileForCreature('Piertotum Locomotor', side);
        				if (!pt) { this.log(`No empty tiles! 2 mana compensation.`,'warning'); this.mana[side] = Math.min(this.maxMana[side], this.mana[side]+2); }
        				else this.placeCreature('Piertotum Locomotor', side, pt, null, true);
                    }
                }
                const acolytes = this.creatures[side].filter(c => c.name === "Acolyte");
                for (let acolyte of acolytes) {
                    this.log(`${side===1?"Your":"Enemy's"} Acolyte(${acolyte.hp}) repeats the spell by paying ${manaC} HP!`,'warning');
                    await this.applySpellEffect(cardName, side, targetTileId, rowIndex, null, true);
                    acolyte.hp -= manaC;
                    if (acolyte.hp <= 0) {
                        await this.removeCreature(acolyte);
                    } else {
                        this.updateCreatureDisplay();
                    }
                }
                if (cardName !== "Gringotts Keys") { removedCard = hand[cardIndex]; hand[cardIndex] = null; }
            } else this.mana[side] += manaCost;
        }
        if (success) {
            if (side===1) {
                if (removedCard && !removedCard.token && effectType!==3) this.discard.push(cardName);
                await this.checkGrindelwaldAcolyte(1);
                if (this.playerCharacter.id==='albus' && effectType<=2 && this.spellCnt[1]%4===0) {
                    let tok = new Card(cardName, Math.ceil(dict[cardName][0]/2), true);
                    let freeIdx = this.findFreeIndex(1);
                    if (freeIdx!==-1) { tok.index=freeIdx; this.hand[1][freeIdx]=tok; this.log(`Albus Dumbledore has gained a ${cardName} token.`,'info'); }
                    this.updateHandDisplay();
                    this.gainedTokenThisAction = true;
                    let pt = this.getPreferredTileForCreature('Phoenix',1);
                    if (Math.random()<0.05 && pt) {
                        this.log('Albus Dumbledore summoned a phoenix!','warning');
                        this.placeCreature('Phoenix',1,pt,null,true);
                    }
                }
                if (!this.gainedTokenThisAction) {
                    this.draw(1,1);
                }
                this.manaCnt[1] += manaCost;
                this.manaSCnt[1] += manaCost;
                await this.checkLunaSummon(1);
            } else {
                if (removedCard && !removedCard.token && effectType!==3) this.discard.push(cardName);
                await this.checkGrindelwaldAcolyte(2);
                if (this.enemyCharacter.id==='albus' && effectType<=2 && this.spellCnt[2]%4===0) {
                    let tok = new Card(cardName, Math.ceil(dict[cardName][0]/2), true);
                    let freeIdx = this.findFreeIndex(2);
                    if (freeIdx!==-1) { tok.index=freeIdx; this.hand[2][freeIdx]=tok; this.log(`Enemy Albus has gained a ${cardName} token.`,'info'); }
                    this.updateHandDisplay();
                    this.gainedTokenThisAction = true;
                    let pt = this.getPreferredTileForCreature('Phoenix',2);
                    if (Math.random()<0.05 && pt) {
                        this.log('Enemy Albus summoned a phoenix!','warning');
                        this.placeCreature('Phoenix',2,pt,null,true);
                    }
                }
                if (!this.gainedTokenThisAction) {
                    this.draw(2,1);
                }
                this.manaCnt[2] += manaCost;
                this.manaSCnt[2] += manaCost;
                await this.checkLunaSummon(2);
            }
        }
        this.updateHandDisplay();
        this.updateWizardStatus();
        return success;
    }
    updateHandDisplay() {
        for (let i=0;i<7;i++) {
            const card = this.hand[1][i];
            const el = document.getElementById(`hand-card-${i+1}`);
            const tooltip = document.getElementById(`hand-tooltip-${i+1}`);
            if (card !== null) {
                el.classList.remove('empty-card');
                let [mcost, type, val, desc] = dict[card.name];
                let cost = card.mana;
                el.classList.remove('spell-card', 'creature-card', 'equip-card', 'secret-card');
                if (type === 0 || type === 1 || type === 2) el.classList.add('spell-card');
                else if (type === 3) el.classList.add('creature-card');
                else if (type === 4) el.classList.add('equip-card');
                else if (type === 5) el.classList.add('secret-card');
                if (card.token) el.classList.add('token-card');
                else el.classList.remove('token-card');
                el.innerHTML = `<div class="card-name">${card.name}(${cost})</div>`;
                if (this.hasCreatureStatus(card,'unseen') && !this.hasStatus(1,'spectrespecs')) el.classList.add('unavailable');
                else el.classList.remove('unavailable');
                if (type===4) el.classList.add('equip'); else el.classList.remove('equip');
                if (type===5) el.classList.add('secret'); else el.classList.remove('secret');
                if (!this.hasEnoughMana(cost,1)) el.classList.add('insufficient-mana'); else el.classList.remove('insufficient-mana');
                tooltip.innerHTML = `<div><b>${card.name}</b></div>${card.token?'<div>TOKEN</div>':''}<div>Mana: ${cost}</div>${!this.hasEnoughMana(cost,1)?'<div style="color:#e74c3c">Insufficient mana!</div>':''}${this.hasCreatureStatus(card,'unseen')&&!this.hasStatus(1,'spectrespecs')?'<div style="color:#e67e22">Card Unavailable!</div>':''}<div>${desc}</div>${this.getCreatureStatusText(card)}`;
            } else {
                el.innerHTML = "Empty";
                el.classList.add('empty-card');
                el.classList.remove('token-card','insufficient-mana','unavailable','equip','secret','spell-card','creature-card','equip-card','secret-card','token-card');
                tooltip.innerHTML = "Empty slot";
            }
        }
    }
    visualEffect(id, type) {
        let el = document.getElementById(id);
        if (el) { el.classList.add(type==='damage'?'damage-effect':'heal-effect'); setTimeout(()=>el.classList.remove('damage-effect','heal-effect'), 300); }
    }
    getFrontCreature(side, row) {
        const creatures = side===1?this.creatures[1]:this.creatures[2];
        const rowMap = side===1?{1:[3,2,1],2:[6,5,4],3:[9,8,7]}:{1:[10,11,12],2:[13,14,15],3:[16,17,18]};
        let tileId;
        for (let i=0;i<=3;i++) { tileId=rowMap[row][i]; if (tileId===15||tileId===4) continue; let c=creatures.find(cr=>cr.tileId===tileId); if(c) return c; }
        return null;
    }
    async creatureAttack() {
        if (this.turn===1) {
            for (let creature of this.creatures[1]) {
                if (creature.attack>0 && !this.hasCreatureStatus(creature,"disarm") && !this.hasCreatureStatus(creature,"stun") && !this.hasCreatureStatus(creature,"teacup")) {
                    let atk = Math.floor(creature.attack);
                    if (this.hasCreatureStatus(creature,'weak')) { this.log(creature.name+" is weakened and deals less damage.","warning"); this.removeCreatureStatus(creature,"weak"); atk = Math.floor(atk/2); }
                    let targetCreature = null;
                    let row = Math.ceil(creature.tileId/3);
                    let enemyTileIds = row===1?[10,11,12]:row===2?[13,14,15]:[16,17,18];
                    for (let tid of enemyTileIds) { let cr=this.creatures[2].find(c=>c.tileId===tid); if(cr) { targetCreature=cr; break; } }
                    const performAttack = async () => {
                        if (creature.name==="Thestral") {
                            this.log(`${creature.name} attacked all enemies for ${atk} damage!`,'warning');
                            let crc = this.creatures[2];
                            for (let i=1;i<=9;i++) this.visualEffect(`t${i+9}`,'damage');
                            for (let c of crc) await this.dealDamageToCreature(c,atk);
                            await this.dealDamageToEnemy(atk);
                        } else if (creature.name==="Centaur Archer") { await this.centaurArcherAttack(creature,atk); }
                        else if (creature.name==="Chess Pawn") {
                            if (this.hasCreatureStatus(creature,'pawn')) {
                                await this.pawnAttack(creature,atk);
                            } else {
                                await this.queenAttack(creature,atk);
                            }
                        } else if (targetCreature) { this.log(`${creature.name}(${atk}) attacked ${targetCreature.name}(${targetCreature.hp}).`,'warning'); await this.dealDamageToCreature(targetCreature,atk); this.visualEffect(`t${targetCreature.tileId}`,'damage'); }
                        else { this.log(`${creature.name}(${atk}) attacked enemy wizard(${this.hp[2]}).`,'warning'); await this.dealDamageToEnemy(atk); this.visualEffect('t14','damage'); }
                    };
                    await performAttack();
                    await this.knightExtraAttack(creature,performAttack);
                } else if (creature.attack>0 && this.hasCreatureStatus(creature,"disarm")) { this.log(`${creature.name} is disarmed and cannot attack!`,'warning'); this.removeCreatureStatus(creature,"disarm"); }
                else if (creature.attack>0 && this.hasCreatureStatus(creature,"stun")) { this.log(`${creature.name} is stunned and cannot attack!`,'warning'); this.removeCreatureStatus(creature,"stun"); }
            }
        } else if (this.turn===2) {
            for (let creature of this.creatures[2]) {
                if (creature.attack>0 && !this.hasCreatureStatus(creature,"disarm") && !this.hasCreatureStatus(creature,"stun") && !this.hasCreatureStatus(creature,"teacup")) {
                    let atk = Math.floor(creature.attack);
                    if (this.hasCreatureStatus(creature,'weak')) { this.log(creature.name+" is weakened and deals less damage.","warning"); this.removeCreatureStatus(creature,"weak"); atk = Math.floor(atk/2); }
                    let targetCreature = null;
                    let row = Math.ceil(creature.tileId/3);
                    let playerTileIds = row===1?[1,2,3]:row===2?[4,5,6]:[7,8,9];
                    for (let tid of playerTileIds) { let cr=this.creatures[1].find(c=>c.tileId===tid); if(cr) { targetCreature=cr; break; } }
                    const performAttack = async () => {
                        if (creature.name==="Thestral") {
                            this.log(`${creature.name} attacked all your creatures for ${atk} damage!`,'warning');
                            let crc = this.creatures[1];
                            for (let i=1;i<=9;i++) this.visualEffect(`t${i}`,'damage');
                            for (let c of crc) await this.dealDamageToCreature(c,atk);
                            await this.dealDamageToPlayer(atk);
                        } else if (creature.name==="Centaur Archer") { await this.centaurArcherAttack(creature,atk); }
                        else if (this.creature.name==="Chess Pawn") {
                            if (hasCreatureStatus(creature,'pawn')) {
                                await this.pawnAttack(creature,atk);
                            } else {
                                await this.queenAttack(creature,atk);
                            }
                        } else if (targetCreature) { this.log(`${creature.name}(${atk}) attacked ${targetCreature.name}(${targetCreature.hp}).`,'warning'); await this.dealDamageToCreature(targetCreature,atk); this.visualEffect(`t${targetCreature.tileId}`,'damage'); }
                        else { this.log(`${creature.name}(${atk}) attacked you(${this.hp[1]}).`,'warning'); await this.dealDamageToPlayer(atk); this.visualEffect('t5','damage'); }
                    };
                    await performAttack();
                    await sleep(300);
                    await this.knightExtraAttack(creature,performAttack);
                } else if (creature.attack>0 && this.hasCreatureStatus(creature,"disarm")) { this.log(`${creature.name} is disarmed and cannot attack!`,'warning'); this.removeCreatureStatus(creature,"disarm"); }
                else if (creature.attack>0 && this.hasCreatureStatus(creature,"stun")) { this.log(`${creature.name} is stunned and cannot attack!`,'warning'); this.removeCreatureStatus(creature,"stun"); }
            }
        }
    }
    async updateStatuses() {
        const isPlayerTurn = (this.turn===1);
        const side = isPlayerTurn?1:2;
        const wizardTile = isPlayerTurn?5:14;
        let sts = this.status[side];
        for (let i=sts.length-1;i>=0;i--) {
            if (!sts[i].type) continue;
            if (sts[i].type==="bleed") {
                if (isPlayerTurn) { this.log("You are bleeding.",'warning'); await this.dealDamageToPlayer(Math.min(2,sts[i].duration)); }
                else { this.log("Enemy is bleeding.",'warning'); await this.dealDamageToEnemy(Math.min(2,sts[i].duration)); }
                this.visualEffect(`t${wizardTile}`,'damage');
            } else if (sts[i].type==="heal") {
                if (isPlayerTurn) { this.log("You are healing.",'warning'); this.healAllyWizard(Math.min(2,sts[i].duration)); }
                else { this.log("Enemy is healing.",'warning'); this.healEnemyWizard(Math.min(2,sts[i].duration)); }
                this.visualEffect(`t${wizardTile}`,'heal');
            } else if (sts[i].type==='protego_diabolica') {
                this.log('Protego Diabolica attacks!','warning');
                isPlayerTurn?this.visualEffect('t14','damage'):this.visualEffect('t5','damage');
                isPlayerTurn?await this.dealDamageToEnemy(2):await this.dealDamageToPlayer(2);
                this.addStatus(3-side,'burnt',2);
                let idx;
                let crs = [];
                let tid;
                for (let k=0;k<2;k++) {
                    crs = this.creatures[3-side];
                    if (crs.length) {
                        idx = Math.floor(Math.random()*crs.length);
                        tid = crs[idx].tileId;
                        this.visualEffect('t'+tid,'damage');
                        this.dealDamageToCreature(crs[idx],1);
                        this.addCreatureStatus(crs[idx],'burnt',2);
                    } else {
                       isPlayerTurn?this.visualEffect('t14','damage'):this.visualEffect('t5','damage');
                        isPlayerTurn?await this.dealDamageToEnemy(2):await this.dealDamageToPlayer(2);
                        this.addStatus(3-side,'burnt',2);
                    }
                }
            } else if (sts[i].type==='thunderstorm') {
                this.log('Thunderstorm attacks!','warning');
                let bo = Math.floor(sts[i].bolts) ?? 0;
                for (let k=1;k<=bo;k++) {
                    isPlayerTurn?this.visualEffect('t5','damage'):this.visualEffect('t14','damage');
                    isPlayerTurn?await this.dealDamageToPlayer(2):await this.dealDamageToEnemy(2);
                    this.addStatus(side,'shocked',2);
                    await sleep(500);
                }
            } else if (sts[i].type==='fear') {
                this.log((isPlayerTurn?'You are':'Enemy is')+' in fear and a handcard increases by 1 mana.', 'warning');
                this.hand[this.turn][Math.floor(Math.random()*7)].mana++;
            }
        }
        for (let i=this.status[side].length-1;i>=0;i--) {
            if (!this.status[side][i].duration) continue;
            this.status[side][i].duration--;
            if (this.status[side][i].duration<=0) { this.log(`${isPlayerTurn?"Player":"Enemy"} lost ${this.status[side][i].type}.`,'info'); this.status[side].splice(i,1); }
        }
        const creatures = isPlayerTurn?this.creatures[1]:this.creatures[2];
        for (let cr of creatures) {
            for (let i=cr.status.length-1;i>=0;i--) {
                let s = cr.status[i];
                if (s.type==="bleed") { this.visualEffect(`t${cr.tileId}`,'damage'); await this.dealDamageToCreature(cr,1); }
                if (!creatures.includes(cr)) break;
                if (s.type==="heal") { this.visualEffect(`t${cr.tileId}`,'heal'); await this.healCreature(cr,1); }
                if (!s.duration) continue;
                s.duration--;
                if (s.duration<=0) { this.log(`${cr.name} lost ${s.type}.`,'info'); cr.status.splice(i,1); }
            }
        }
        this.updateWizardStatus();
        this.updateCreatureDisplay();
    }
    async applyNifflerEffect(side) {
        const nifflers = this.creatures[side].filter(c=>c.name==="Niffler");
        for (let n of nifflers) {
            if (this.hasCreatureStatus(n,"stun")||this.hasCreatureStatus(n,"disarm")||this.hasCreatureStatus(n,"teacup")) continue;
            this.mana[side] = Math.min(this.maxMana[side], this.mana[side]+2);
            n.hp -= 1;
            this.visualEffect(`t${n.tileId}`,'damage');
            this.log(`${side===1?"Your":"Enemy's"} Niffler gave 2 mana but lost 1 HP.`,'info');
            if (n.hp<=0) await this.removeCreature(n);
            else this.updateCreatureDisplay();
        }
        this.updateWizardStatus();
    }
    async applyPhoenixEffect(side) {
        const phs = this.creatures[side].filter(c=>c.name==="Phoenix");
        for (let p of phs) {
            if (this.hasCreatureStatus(p,"stun")||this.hasCreatureStatus(p,"disarm")||this.hasCreatureStatus(p,"teacup")) continue;
            if (side===1) { this.healAllyWizard(1); this.creatures[1].forEach(c=>this.healCreature(c,1)); }
            else { this.healEnemyWizard(1); this.creatures[2].forEach(c=>this.healCreature(c,1)); }
            p.hp -= 2;
            this.visualEffect(`t${p.tileId}`,'damage');
            this.log(`${side===1?"Your":"Enemy's"} Phoenix healed all ally creatures by 1 HP but lost 2 HP.`,'info');
            if (p.hp<=0) await this.removeCreature(p);
            else this.updateCreatureDisplay();
        }
        this.updateWizardStatus();
    }
    async applySuitcaseEffect(side) {
        const sus = this.creatures[side].filter(c=>c.name==="Fantastic Beasts Suitcase");
        let index, list, card;
        for (let s of sus) {
            if (this.hasCreatureStatus(s,"stun")||this.hasCreatureStatus(s,"disarm")||this.hasCreatureStatus(s,"teacup")) continue;
            list = s.status.find(st=>Array.isArray(st.type)).type;
            if (list.length===0) { s.hp=0; this.log("The suitcase now has an empty list of creatures to summon.",'info'); await this.removeCreature(s); continue; }
            index = Math.floor(Math.random()*list.length);
            card = list[index];
            let tile = this.getPreferredTileForCreature(card, side);
            if (!tile) { this.log('No empty tiles for Fantastic Beasts Suitcase to summon creatures', 'warning'); continue; }
            this.placeCreature(card, side, tile, null, true);
            list.splice(index,1);
            s.hp -= 1;
            this.visualEffect(`t${s.tileId}`,'damage');
            this.log(`${side===1?"Your":"Enemy's"} Fantastic Beasts Suitcase summoned a random creature but lost 1 HP.`,'info');
            if (list.length===0) { s.hp=0; this.log("The suitcase now has an empty list of creatures to summon.",'warning'); }
            if (s.hp<=0) await this.removeCreature(s);
            else this.updateCreatureDisplay();
        }
        this.updateWizardStatus();
    }
    async centaurArcherAttack(creature, dmg) {
        const side = creature.side;
        const row = Math.ceil(creature.tileId/3);
        let targetTileIds = [], wizardTileId = null, targetCreatures = [];
        if (side===1) {
            const rowMapping = {1:[10,11,12],2:[13,14,15],3:[16,17,18]};
            targetTileIds = rowMapping[row] || [];
            wizardTileId = 14;
        } else {
            const rowMapping = {4:[3,2,1],5:[6,5,4],6:[9,8,7]};
            targetTileIds = rowMapping[row] || [];
            wizardTileId = 5;
        }
        for (let tid of targetTileIds) {
            if (tid===wizardTileId) targetCreatures.push(3-side);
            let enemy = null;
            if (side===1) enemy = this.creatures[2].find(c=>c.tileId===tid);
            else enemy = this.creatures[1].find(c=>c.tileId===tid);
            if (enemy) targetCreatures.push(enemy);
        }
        if (targetCreatures.length>0) {
            this.log(`${side===1?"Your":"Enemy"} Centaur Archer shoots along the row!`,'warning');
            for (let enemy of targetCreatures) {
                if (enemy===1) { this.log(`Centaur Archer hits you(${this.hp[1]}) for ${dmg} damage!`,'warning'); this.visualEffect('t5','damage'); await this.dealDamageToPlayer(dmg); dmg=Math.max(1,dmg-1); await sleep(500); continue; }
                if (enemy===2) { this.log(`Centaur Archer hits your enemy(${this.hp[2]}) for ${dmg} damage!`,'warning'); this.visualEffect('t14','damage'); await this.dealDamageToEnemy(dmg); dmg=Math.max(1,dmg-1); await sleep(500); continue; }
                this.log(`Centaur Archer hits ${enemy.name}(${enemy.hp}) for ${dmg} damage!`,'warning'); this.visualEffect(`t${enemy.tileId}`,'damage'); await this.dealDamageToCreature(enemy,dmg); dmg=Math.max(1,dmg-1); await sleep(500);
            }
        } else {
            this.log(`${side===1?"Your":"Enemy"} Centaur Archer sees no enemies in line, aims for the wizard's row!`,'warning');
            let wizardRowTileIds = side===1?[13,14,15]:[6,5,4];
            for (let tid of wizardRowTileIds) {
                if (tid===wizardTileId) { this.log(`Centaur Archer shoots the wizard for ${dmg} damage!`,'warning'); this.visualEffect(`t${tid}`,'damage'); side===1?await this.dealDamageToEnemy(dmg):await this.dealDamageToPlayer(dmg); await sleep(500); }
                else {
                    let enemy = side===1?this.creatures[2].find(c=>c.tileId===tid):this.creatures[1].find(c=>c.tileId===tid);
                    if (enemy) { this.log(`Centaur Archer hits ${enemy.name} for ${dmg} damage!`,'damage'); this.visualEffect(`t${tid}`,'damage'); await this.dealDamageToCreature(enemy,dmg); await sleep(500); }
                }
                dmg = Math.max(1,dmg-1);
            }
        }
    }
    async pawnAttack(p,atk) {
        this.log('Chess Pawn gains 1 Move', 'warning');
        let s = p.status.find(st=>st.type==="pawn");
        if (!s) {
            p.status.push({ type: "pawn", duration: null, moves: 0 });
            s = p.status.find(st=>st.type==="pawn");
        }
        s.moves++;
        const pawnFront = { 3:10,6:13,9:16,10:3,13:6,16:9 };
        const front = pawnFront[p.tileId] || null;
        if (front && !this.creatures[3-side].find(c=>c.tileId===front)) {
            this.log('Chess Pawn gains 1 Move from a clear front', 'warning');
            s.moves++;
        }
        const side = p.side;
        const pawnMap = { 3:[13],6:[10,16],9:[13],10:[6],13:[3,9],16:[6] };
        const targets = pawnMap[p.tileId] || [];
        for (let t of targets) {
            let tc = this.creatures[3-side].find(c=>c.tileId===t);
            if (!tc) continue;
            this.log('Chess Pawn hits '+tc.name+' for '+atk+' damage and gains 1 Move!', 'warning');
            this.visualEffect('t'+t, 'damage');
            await this.dealDamageToCreature(tc,atk);
            if (s) s.moves++;
        }
        if (s.moves >= 6) {
            this.removeCreatureStatus(p,'pawn');
            await this.addCreatureStatus(p,'queen');
            p.maxHp += 4;
            p.hp = p.maxHp;
            p.attack++;
            this.log('Chess Pawn was promoted to a Queen!', 'warning');
        }
    }
    async queenAttack(q,atk) {
        this.log('Chess Queen attacks all enemies!', 'warning');
        let crc = this.creatures[3-q.side];
        if (q.side===1) for (let i=1;i<=9;i++) this.visualEffect(`t${i+9}`,'damage');
        else for (let i=1;i<=9;i++) this.visualEffect(`t${i}`,'damage');
        for (let c of crc) await this.dealDamageToCreature(c,atk);
        q.side===1 ? await this.dealDamageToEnemy(atk) : await this.dealDamageToPlayer(atk);
    }
    async startTurn() {
        if (this.gameOver) return;
        await this.updateStatuses();
        for (let i=0;i<7;i++) { if (this.hand[1][i]) { if (!this.hand[1][i].status) this.hand[1][i].status=[]; if (this.hand[1][i].name==="Thestral" && !this.hasStatus(1,'spectrespecs')) this.addCreatureStatus(this.hand[1][i],'unseen',null); } }
        for (let i=0;i<7;i++) { if (this.hand[2][i]) { if (!this.hand[2][i].status) this.hand[2][i].status=[]; if (this.hand[2][i].name==="Thestral" && !this.hasStatus(2,'spectrespecs')) this.addCreatureStatus(this.hand[2][i],'unseen',null); } }
        if (this.turn===1) {
            document.getElementById('turn-indicator').innerHTML = `${this.playerCharacter.name}(You)'s Turn`;
            if (this.hasStatus(1,"stun")) { this.mana[1] = Math.min(this.maxMana[1], this.mana[1]+3); this.log("You are stunned and can only gain 3 mana this turn!","warning"); this.removeStatus(1,"stun"); }
            else { this.mana[1] = Math.min(this.maxMana[1], this.mana[1]+6); this.log("Your turn. Mana +6.",'info'); }
            await this.applyNifflerEffect(1);
            await this.applyPhoenixEffect(1);
            await this.applySuitcaseEffect(1);
            this.updateWizardStatus();
            this.updateHandDisplay();
            this.updateCreatureDisplay();
            if (this.hasStatus(1,"disarm")) { this.log("You are disarmed and cannot act this turn!","warning"); this.endTurn(); }
        } else {
            document.getElementById('turn-indicator').innerHTML = `${this.enemyCharacter.name}(Enemy)'s Turn`;
            if (this.hasStatus(2,"stun")) { this.mana[2] = Math.min(this.maxMana[2], this.mana[2]+3); this.log("Enemy is stunned and can only gain 3 mana this turn!","warning"); this.removeStatus(2,"stun"); }
            else { this.mana[2] = Math.min(this.maxMana[2], this.mana[2]+6); this.log("Enemy turn. Mana +6.",'info'); }
            await this.applyNifflerEffect(2);
            await this.applyPhoenixEffect(2);
            await this.applySuitcaseEffect(2);
            this.updateWizardStatus();
            if (this.hasStatus(2,"disarm")) { this.log("Enemy is disarmed and cannot act this turn!","warning"); await this.creatureAttack(); this.removeStatus(2,"disarm"); this.turn=1; this.startTurn(); }
            else this.enemyTurn();
        }
    }
    async endTurn() {
        if (this.turn!==1 || this.gameOver) return;
        if (!this.hasStatus(1,"disarm")){
            if (this.hasStatus(1,"obscurial")) {
                this.log("You turns to an Obscurus to attack!",'warning');
                let l = this.status[1].find(s=>s.type==="obscurial").duration;
                this.removeStatus(1,"obscurial");
                this.addStatus(1,"obscurus");
                let atk = Math.floor(this.atk[1])*2;
                let ts = [2, ...this.creatures[2]];
                let t;
                for (let i=0;i<3;i++) {
                    ts = [2, ...this.creatures[2]];
                    t = ts[Math.floor(Math.random()*ts.length)];
                    if (t===2) { this.visualEffect('t14','damage'); await this.dealDamageToEnemy(atk); }
                    else { this.visualEffect('t'+t.tileId,'damage'); await this.dealDamageToCreature(t,atk); }
                    await sleep(300);
                }
                for (let i=10;i<=18;i++) this.visualEffect('t'+i,'damage');
                for (let a of ts) { if (a===2) await this.dealDamageToEnemy(atk); else await this.dealDamageToCreature(a,atk); }
                await sleep(500);
                this.removeStatus(1,"obscurus");
                this.addStatus(1,"obscurial",l);
            } else {
                this.log("You attack!",'warning');
                let atk = Math.floor(this.atk[1]);
                let a = this.creatures[2].find(c=>c.tileId===13);
                const performWizardAttack = async () => { this.visualEffect(a?'t13':'t14','damage'); if(a) await this.dealDamageToCreature(a,atk); else await this.dealDamageToEnemy(atk); };
                await performWizardAttack();
                await this.knightExtraAttack({status:[],name:"Wizard"},performWizardAttack);
            }
        }
        this.removeStatus(1,"disarm");
        await this.creatureAttack();
        this.turn=2;
        this.startTurn();
    }
    
    getEmptyEnemyTiles() {
        let empty=[];
        for (let row=1;row<=3;row++) for (let col=1;col<=3;col++) { let tid=(row-1)*3+col+9; if (!this.getCreatureAt(tid) && tid!==14) empty.push(tid); }
        return empty;
    }
    
    getEmptyAllyTiles() {
        let empty=[];
        for (let row=1;row<=3;row++) for (let col=1;col<=3;col++) { let tid=(row-1)*3+col; if (!this.getCreatureAt(tid) && tid!==5) empty.push(tid); }
        return empty;
    }
    
    getPreferredTileForCreature(cardName, side=2) {
        let empty = side===1?this.getEmptyAllyTiles():this.getEmptyEnemyTiles();
        if (empty.length===0) return null;
        const front = ["Troll","Piertotum Locomotor","Runic Armor","Chess Pawn"];
        let order;
        if (side===2) order = (front.includes(cardName))?[13,10,16,11,17,12,18,15]:[15,12,18,11,17,10,16,13];
        else order = (front.includes(cardName))?[6,3,9,2,8,1,7,4]:[4,1,7,2,8,3,9,6];
        for (let tid of order) if (empty.includes(tid)) return tid;
        return empty[0];
    }
    
    getTotalSecretManaReserve() {
        let reserve = 0;
        for (let i = 0; i < 7; i++) {
            const card = this.hand[2][i];
            if (card && dict[card.name][1] === 5) {
                const cost = dict[card.name][0];
                reserve += cost;
            }
        }
        return reserve;
    }
    
    evaluateCard(card, side) {
        if (!card) return -1;
        const cardName = card.name;
        const [cost, type, val] = dict[cardName];
        if (type === 5) return -1;
        let score = 0;
        if (type === 3) {
            if (cardName === "Niffler") score = 18;
            else if (cardName === "Troll") score = 14;
            else if (cardName === "Phoenix") score = 20;
            else if (cardName === "Thestral") {
                let canSee = this.hasStatus(side, 'spectrespecs') || !this.hand[side].some(c => c && c.name === "Thestral" && this.hasCreatureStatus(c, 'unseen'));
                score = canSee ? 21 : -1;
            }
            else if (cardName === "Centaur Archer") score = 14;
            else if (cardName === "Stone Guardian") score = 13;
            else if (cardName === "Runic Armor") score = 12;
            else if (cardName === "Fantastic Beasts Suitcase") {
                score = -1;
                card.status.forEach(s => {
                    if (Array.isArray(s.type) && s.type.length > 0) {
                        score += s.type.length * 8;
                    }
                });
            }
            else if (cardName === "Acolyte") score = 15;
            else if (cardName === "Chess Pawn") score = 14;
            else score = 10;
        }
        else if (type === 0 || type === 1 || type === 2) {
            if (cardName === "Confringo") score = 16;
            else if (cardName === "Repello Inimicum") score = 14;
            else if (cardName === "Essence of Dittany") {
                score = 12;
                if (this.hp[2] < this.maxHp[2] * 0.4) score += 25;
                else if (this.creatures[2].some(c => c.hp < c.maxHp)) score += 12;
            }
            else if (cardName === "Expelliarmus") score = 11;
            else if (cardName === "Stupify") score = 11;
            else if (cardName === "Sectumsumpra") score = 12;
            else if (cardName === "Avis") score = 14;
            else if (cardName === "Incendio") score = 10;
            else if (cardName === "Aguamenti") score = 10;
            else if (cardName === "Fulmen") score = 10;
            else if (cardName === "Protego Diabolica") score = 20;
            else if (cardName === "Thunderstorm") score = 18;
            else if (cardName === "Tidal Wave") score = 17;
            else if (cardName === "Ventus") score = 12;
            else if (cardName === "Obscurus Curse") score = 14;
            else if (cardName === "Protego Totalum") score = 15;
            else score = 5;
            if ((cardName === "Confringo" || cardName === "Repello Inimicum" || cardName === "Tidal Wave") && this.creatures[1].length >= 2) {
                score += 12;
            }
        }
        else if (type === 4) {
            if (cardName === "Spectrespecs") {
                if (this.hasStatus(2, 'spectrespecs')) score = 14;
                else score = -1;
                for (let i = 0; i < 7; ++i) {
                    if (this.hand[2][i]) score += 15;
                }
            }
            else if (cardName === "Gringotts Keys") score = 11;
            else if (cardName === "Elemental Spellbook") {
                score = -1
                for (let i = 0; i < 7; i++) {
                    const c = this.hand[2][i];
                    if (c && ["Incendio","Aguamenti","Fulmen","Protego Diabolica","Thunderstorm","Tidal Wave"].includes(c.name)) {
                        score += 9;
                    }
                }
            }
            else score = 6;
        }
        if (!this.hasEnoughMana(card.mana, 2)) score = -1;
        return score;
    }
    
    getBestTargetForSpell(cardName, side) {
        const isEnemy = (side === 2);
        const targetWizardTile = isEnemy ? 5 : 14;
        if (cardName === "Essence of Dittany") {
            if (this.hp[2] < this.maxHp[2] * 0.6) return 14;
            let mostInjured = null;
            for (let cr of this.creatures[2]) {
                if (cr.hp < cr.maxHp && (!mostInjured || (cr.maxHp - cr.hp) > (mostInjured.maxHp - mostInjured.hp))) {
                    mostInjured = cr;
                }
            }
            return mostInjured ? mostInjured.tileId : (this.hp[2] < this.maxHp[2] ? 14 : null);
        }
        else if (cardName === "Sectumsumpra" || cardName === "Incendio" || cardName === "Aguamenti" || cardName === "Fulmen") {
            let strongest = null;
            for (let cr of this.creatures[1]) {
                if (!strongest || (cr.hp + cr.attack) > (strongest.hp + strongest.attack)) {
                    strongest = cr;
                }
            }
            return strongest ? strongest.tileId : 5;
        }
        else if (cardName === "Expelliarmus" || cardName === "Stupify") {
            for (let row = 1; row <= 3; row++) {
                let front = this.getFrontTileId(row, true);
                if (front) return front;
            }
            return null;
        }
        else if (cardName === "Elemental Spellbook") {
            let strongest = null;
            for (let cr of this.creatures[1]) {
                if (!strongest || (cr.hp + cr.attack) > (strongest.hp + strongest.attack)) {
                    strongest = cr;
                }
            }
            return strongest ? strongest.tileId : 5;
        }
        else if (cardName === "Runic Armor") {
            return 14;
        }
        else {
            return targetWizardTile;
        }
    }
    getBestRowForRowSpell(cardName, side) {
        let bestRow = 1;
        let maxThreat = -1;
        for (let row = 1; row <= 3; row++) {
            let threat = 0;
            const rowTiles = row === 1 ? [1,2,3] : row === 2 ? [4,5,6] : [7,8,9];
            for (let tid of rowTiles) {
                let cr = this.creatures[1].find(c => c.tileId === tid);
                if (cr) threat += cr.hp + cr.attack;
                else if (tid === 5 && this.hp[1] > 0) threat += 3;
            }
            if (threat > maxThreat) {
                maxThreat = threat;
                bestRow = row;
            }
        }
        return bestRow;
    }
    async enemyTurn() {
        if (this.turn !== 2 || this.gameOver) return;
        this.log("Enemy is thinking...", "info");
        
        let attempts = 0;
        while (attempts < 20) {
            let secretReserve = this.getTotalSecretManaReserve();
            let cardsWithScore = [];
            for (let i = 0; i < 7; i++) {
                const card = this.hand[2][i];
                if (card) {
                    let score = this.evaluateCard(card, 2);
                    if (score >= 0) cardsWithScore.push({ idx: i, card, score });
                }
            }
            cardsWithScore.sort((a, b) => b.score - a.score);
            
            let usedCard = false;
            for (let item of cardsWithScore) {
                const i = item.idx;
                const card = this.hand[2][i];
                if (!card) continue;
                const [cost, type] = dict[card.name];
                if (this.mana[2] - card.mana < secretReserve) continue;
                
                let success = false;
                if (type === 3) {
                    let tile = this.getPreferredTileForCreature(card.name);
                    if (tile) success = await this.useCard(2, i, tile);
                } else if (type === 0) {
                    success = await this.useCard(2, i);
                } else if (type === 1) {
                    let row = this.getBestRowForRowSpell(card.name, 2);
                    success = await this.useCard(2, i, null, row);
                } else if (type === 2) {
                    let target = this.getBestTargetForSpell(card.name, 2);
                    if (target) success = await this.useCard(2, i, target);
                } else if (type === 4) {
                    if (card.name === "Runic Armor") {
                        success = await this.useCard(2, i, 14);
                    } else {
                        let target = (card.name === "Elemental Spellbook") ? this.getBestTargetForSpell(card.name, 2) : null;
                        success = await this.useCard(2, i, target);
                    }
                }
                
                if (success) {
                    usedCard = true;
                    break;
                }
            }
            
            if (!usedCard) break;
            attempts++;
            await sleep(300);
        }
        
        if (!this.hasStatus(2, "disarm")) {
            if (this.hasStatus(2, "obscurial")) {
                this.log("Your enemy turns to an Obscurus to attack!", 'warning');
                let l = this.status[2].find(s => s.type === "obscurial").duration;
                this.removeStatus(2, "obscurial");
                this.addStatus(2, "obscurus");
                let atk = Math.floor(this.atk[2]) * 2;
                let targets = [1, ...this.creatures[1]];
                for (let i = 0; i < 3; i++) {
                    targets = [1, ...this.creatures[1]];
                    let t = targets[Math.floor(Math.random() * targets.length)];
                    this.visualEffect(t === 1 ? 't5' : 't' + t.tileId, 'damage');
                    if (t === 1) await this.dealDamageToPlayer(atk);
                    else await this.dealDamageToCreature(t, atk);
                    await sleep(200);
                }
                for (let i = 1; i <= 9; i++) this.visualEffect('t' + i, 'damage');
                for (let a of targets) {
                    if (a === 1) await this.dealDamageToPlayer(atk);
                    else await this.dealDamageToCreature(a, atk);
                }
                await sleep(500);
                this.removeStatus(2, "obscurus");
                this.addStatus(2, "obscurial", l);
            } else {
                this.log("Your enemy attacks!", 'warning');
                let atk = Math.floor(this.atk[1]);
                let frontCreature = this.creatures[1].find(c => c.tileId === 6);
                const performAttack = async () => {
                    this.visualEffect(frontCreature ? 't6' : 't5', 'damage');
                    if (frontCreature) await this.dealDamageToCreature(frontCreature, atk);
                    else await this.dealDamageToPlayer(atk);
                };
                await performAttack();
                await this.knightExtraAttack({ status: [], name: "Enemy Wizard" }, performAttack);
            }
        }
        
        this.removeStatus(2, "disarm");
        await this.creatureAttack();
        this.turn = 1;
        this.startTurn();
    }
    async checkGameOver() {
        if (this.gameOver) return;
        if (this.hp[1]<=0) { this.gameOver=true; await sleep(1000); this.winner="Enemy"; this.showGameOver("Enemy Wins!"); this.log("Enemy wins!","gameover"); }
        else if (this.hp[2]<=0) { this.gameOver=true; await sleep(1000); this.winner="Player"; this.showGameOver("You Win!"); this.log("You win!","gameover"); }
    }
    showGameOver(msg) { document.getElementById('game-over-text').innerHTML = msg; document.getElementById('game-over-overlay').style.display = 'flex'; }
    restart() {
        document.getElementById('turn-indicator').innerHTML = `${this.playerCharacter.name}(You)'s Turn`;
        this.deck = [];
        this.hand = [null, new Array(7).fill(null), new Array(7).fill(null)];
        this.creatures = [null, [], []];
        this.hp = [null, 50, 50];
        this.maxHp = [null, 50, 50];
        this.mana = [null, 6, 6];
        this.maxMana = [null, 12, 12];
        this.status = [null, [], []];
        this.atk = [null, 1, 1];
        this.spellCnt = [null, 0, 0];
        this.manaCnt = [null, 0, 0];
        this.manaSCnt = [null, 0, 0];
        this.cardCnt = [null, 0, 0];
        this.dmgCnt = [null, 0, 0];
        this.turn = 1;
        this.gameOver = false;
        this.winner = null;
        for (let i=1;i<=18;i++) if (i!==5 && i!==14) { let tile=document.getElementById(`t${i}`); if(tile) { tile.innerHTML="Empty"; tile.classList.add('empty-card'); } }
        document.getElementById('game-over-overlay').style.display = 'none';
        this.initialise();
        this.startTurn();
    }
}
function hideAllFlags() {
    document.querySelectorAll('.flag-overlay').forEach(f=>f.style.display='none');
    document.querySelectorAll('.rowf').forEach(f=>f.style.display='none');
}
function showTargetFlags() {
    if (selectedHandCard===null || game.turn!==1 || game.gameOver) return;
    let idx = selectedHandCard;
    let card = game.hand[1][idx];
    if (!card) return;
    let [mcost, type, val] = dict[card.name];
    let cost = card.mana;
    if (!game.hasEnoughMana(cost,1)) return;
    if (type===3) {
        document.querySelectorAll('.left-tile-flag').forEach(flag=>{
            let row = parseInt(flag.id.charAt(2)), col = parseInt(flag.id.charAt(3));
            let tid = (row-1)*3+col;
            let tile = document.getElementById(`t${tid}`);
            if (tile && tile.classList.contains('empty-card') && tid!==5 && !game.getCreatureAt(tid)) flag.style.display='flex';
        });
    } else if (type===0) {
        if (val===1) document.querySelectorAll('.left-tile-flag').forEach(flag=>{ let tid=(parseInt(flag.id.charAt(2))-1)*3+parseInt(flag.id.charAt(3)); if(tid===5) flag.style.display='flex'; });
        else document.querySelectorAll('.right-tile-flag').forEach(flag=>{ let tid=(parseInt(flag.id.charAt(2))-1)*3+parseInt(flag.id.charAt(3))+6; if(tid===14) flag.style.display='flex'; });
    } else if (type===1) {
        if (val===0) document.querySelectorAll('.right-row-flag').forEach(f=>f.style.display='flex');
        else document.querySelectorAll('.left-row-flag').forEach(f=>f.style.display='flex');
    } else if (type===2) {
        if (val===0) {
            document.querySelectorAll('.right-tile-flag').forEach(flag=>{
                let row = parseInt(flag.id.charAt(2)), col = parseInt(flag.id.charAt(3));
                let tid = (row-1)*3+col+6;
                let tile = document.getElementById(`t${tid}`);
                if (tid===14 && game.hasStatus(2,'protego_totalum')) return;
                if (tile && (!tile.classList.contains('empty-card') || tid===14)) flag.style.display='flex';
            });
        } else {
            document.querySelectorAll('.left-tile-flag').forEach(flag=>{
                let row = parseInt(flag.id.charAt(2)), col = parseInt(flag.id.charAt(3));
                let tid = (row-1)*3+col;
                let tile = document.getElementById(`t${tid}`);
                if (tile && (!tile.classList.contains('empty-card') || tid===5)) flag.style.display='flex';
            });
        }
    } else if (type===4) {
        if (val===1) document.querySelectorAll('.left-tile-flag').forEach(flag=>{ let tid=(parseInt(flag.id.charAt(2))-1)*3+parseInt(flag.id.charAt(3)); if(tid===5) flag.style.display='flex'; });
        else if (val===2) {
            document.querySelectorAll('.right-tile-flag').forEach(flag=>{
                let row = parseInt(flag.id.charAt(2)), col = parseInt(flag.id.charAt(3));
                let tid = (row-1)*3+col+6;
                let tile = document.getElementById(`t${tid}`);
                if (tid===14 && game.hasStatus(2,'protego_totalum')) return;
                if (tile && (!tile.classList.contains('empty-card') || tid===14)) flag.style.display='flex';
            });
        }
    }
}
function t(tileId) {
    if (game.turn!==1 || game.gameOver) return;
    if (selectedHandCard!==null) {
        let idx = selectedHandCard;
        let card = game.hand[1][idx];
        if (!card) return;
        let [cos, type, val] = dict[card.name];
        let cost = card.mana;
        if (!game.hasEnoughMana(cost,1)) return;
        let valid=false, param=null;
        if (type===3) {
            let tile = document.getElementById(`t${tileId}`);
            if (tile && tile.classList.contains('empty-card') && tileId<=9 && tileId!==5 && !game.getCreatureAt(tileId)) { valid=true; param=tileId; }
        } else if (type===0) {
            if (tileId===5 || tileId===14) { valid=true; param=null; }
        } else if (type===2) {
            if (val===0) { if (tileId>=10 && (game.getCreatureAt(tileId) || (tileId===14 && !game.hasStatus(2,'protego_totalum')))) { valid=true; param=tileId; } }
            else { if (tileId<=9 && (game.getCreatureAt(tileId) || tileId===5)) { valid=true; param=tileId; } }
        } else if (type===1) return;
        else if (type===4) { valid=true; if (tileId===5) param=null; else param=tileId; }
        if (valid) {
            game.useCard(1, idx, param);
            hideAllFlags();
            let cur = document.getElementById(`hand-card-${selectedHandCard+1}`);
            if (cur) cur.classList.remove('selected');
            selectedHandCard = null;
            game.updateHandDisplay();
        }
    }
}
function flag1(row,col) { let tid = (row-1)*3+col; t(tid); if(window.event) window.event.stopPropagation(); }
function flag2(row,col) { let tid = (row-1)*3+col+6; t(tid); if(window.event) window.event.stopPropagation(); }
function rowf1(rowIdx) { if (game.turn!==1 || game.gameOver || selectedHandCard===null) return; let idx=selectedHandCard; let card=game.hand[1][idx]; if(!card) return; let [ocost,type,val]=dict[card.name]; let cost = card.mana; if(type!==1 || val===0) return; if(!game.hasEnoughMana(cost,1)) return; game.useCard(1, idx, null, rowIdx); hideAllFlags(); let cur=document.getElementById(`hand-card-${selectedHandCard+1}`); if(cur) cur.classList.remove('selected'); selectedHandCard=null; game.updateHandDisplay(); }
function rowf2(rowIdx) { if (game.turn!==1 || game.gameOver || selectedHandCard===null) return; let idx=selectedHandCard; let card=game.hand[1][idx]; if(!card) return; let [ocost,type,val]=dict[card.name]; let cost = card.mana; if(type!==1 || val===1) return; if(!game.hasEnoughMana(cost,1)) return; game.useCard(1, idx, null, rowIdx+3); hideAllFlags(); let cur=document.getElementById(`hand-card-${selectedHandCard+1}`); if(cur) cur.classList.remove('selected'); selectedHandCard=null; game.updateHandDisplay(); }
function handCardClick(idx1based) { const zeroIdx = idx1based-1; if (game.turn!==1 || game.gameOver || !game.hand[1][zeroIdx]) return; let el=document.getElementById(`hand-card-${idx1based}`); if (selectedHandCard===zeroIdx) { el.classList.remove('selected'); selectedHandCard=null; hideAllFlags(); } else { if (selectedHandCard!==null) { let prev=document.getElementById(`hand-card-${selectedHandCard+1}`); if(prev) prev.classList.remove('selected'); } el.classList.add('selected'); selectedHandCard=zeroIdx; hideAllFlags(); showTargetFlags(); } }
function endTurn() { game.endTurn(); }
function restartGame() {
    document.getElementById('game-over-overlay').style.display='none';
    if (selectedHandCard!==null) { let cur=document.getElementById(`hand-card-${selectedHandCard+1}`); if(cur) cur.classList.remove('selected'); selectedHandCard=null; }
    hideAllFlags();
    const charOverlay=document.getElementById('characterSelectOverlay');
    if(charOverlay) { buildCharacterSelection(); charOverlay.style.display='flex'; }
    if(game) { game.gameOver=true; game=null; }
}
document.addEventListener('click', function(e) {
    let isHand = e.target.closest('.hand-card') || e.target.closest('.hand-card-tooltip-container');
    let isTile = e.target.closest('.tile') || e.target.closest('.tile-container') || e.target.closest('.tile-tooltip-container');
    let isFlag = e.target.closest('.flag-overlay') || e.target.closest('.rowf');
    let isRet = e.target.closest('.retreat-btn');
    if (!isHand && !isTile && !isFlag && !isRet && selectedHandCard!==null && game && game.turn===1) {
        let cur = document.getElementById(`hand-card-${selectedHandCard+1}`);
        if (cur) cur.classList.remove('selected');
        selectedHandCard = null;
        hideAllFlags();
    }
});
function openInfoOverlay() {
    var overlay = document.getElementById('infoOverlay');
    if (overlay) overlay.style.display = 'flex';
}
function closeInfoOverlay() {
    var overlay = document.getElementById('infoOverlay');
    if (overlay) overlay.style.display = 'none';
}
document.addEventListener('click', function(e) {
    var overlay = document.getElementById('infoOverlay');
    if (overlay && overlay.style.display === 'flex') {
        if (e.target === overlay) {
            closeInfoOverlay();
        }
    }
});
window.addEventListener('DOMContentLoaded', () => { buildCharacterSelection(); });
