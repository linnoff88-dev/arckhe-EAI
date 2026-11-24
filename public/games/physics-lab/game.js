/**
 * Physics Lab - Simulador de Física
 * Aprenda física através de experimentos e desafios interativos
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ==================== DADOS DO JOGO ====================
const GameData = {
  labs: [
    { id: 'mechanics', name: 'Mecânica', icon: '⚙️', color: '#4CAF50', levels: 50, unlockLevel: 0,
      topics: ['Movimento', 'Força', 'Energia', 'Momentum', 'Gravidade'] },
    { id: 'kARCKHÉtics', name: 'Cinemática', icon: '🚀', color: '#2196F3', levels: 50, unlockLevel: 10,
      topics: ['MRU', 'MRUV', 'Queda Livre', 'Lançamento'] },
    { id: 'dynamics', name: 'Dinâmica', icon: '💪', color: '#FF9800', levels: 50, unlockLevel: 20,
      topics: ['Leis de Newton', 'Atrito', 'Força Resultante'] },
    { id: 'energy', name: 'Energia', icon: '⚡', color: '#FFEB3B', levels: 50, unlockLevel: 35,
      topics: ['Cinética', 'Potencial', 'Conservação', 'Trabalho'] },
    { id: 'waves', name: 'Ondas', icon: '🌊', color: '#00BCD4', levels: 50, unlockLevel: 50,
      topics: ['Frequência', 'Comprimento', 'Som', 'Luz'] },
    { id: 'thermo', name: 'Termodinâmica', icon: '🔥', color: '#f44336', levels: 50, unlockLevel: 65,
      topics: ['Temperatura', 'Calor', 'Leis da Termo', 'Gases'] },
    { id: 'electro', name: 'Eletricidade', icon: '💡', color: '#9C27B0', levels: 50, unlockLevel: 80,
      topics: ['Corrente', 'Tensão', 'Resistência', 'Circuitos'] },
    { id: 'magnetism', name: 'Magnetismo', icon: '🧲', color: '#E91E63', levels: 50, unlockLevel: 95,
      topics: ['Campo Magnético', 'Indução', 'Eletromagnetismo'] },
    { id: 'optics', name: 'Óptica', icon: '🔦', color: '#673AB7', levels: 50, unlockLevel: 110,
      topics: ['Reflexão', 'Refração', 'Lentes', 'Espelhos'] },
    { id: 'modern', name: 'Física Moderna', icon: '🔬', color: '#3F51B5', levels: 50, unlockLevel: 130,
      topics: ['Relatividade', 'Quântica', 'Átomo', 'Nuclear'] }
  ],

  formulas: [
    { name: 'Velocidade Média', formula: 'v = Δs/Δt', unit: 'm/s' },
    { name: 'Aceleração', formula: 'a = Δv/Δt', unit: 'm/s²' },
    { name: 'Força', formula: 'F = m × a', unit: 'N' },
    { name: 'Peso', formula: 'P = m × g', unit: 'N' },
    { name: 'Energia Cinética', formula: 'Ec = mv²/2', unit: 'J' },
    { name: 'Energia Potencial', formula: 'Ep = mgh', unit: 'J' },
    { name: 'Trabalho', formula: 'W = F × d', unit: 'J' },
    { name: 'Potência', formula: 'P = W/t', unit: 'W' },
    { name: 'Momentum', formula: 'p = m × v', unit: 'kg·m/s' },
    { name: 'Lei de Ohm', formula: 'V = R × I', unit: 'V' }
  ],

  constants: [
    { name: 'Gravidade', symbol: 'g', value: 10, unit: 'm/s²' },
    { name: 'Velocidade da Luz', symbol: 'c', value: 3e8, unit: 'm/s' },
    { name: 'Constante de Planck', symbol: 'h', value: 6.63e-34, unit: 'J·s' }
  ],

  equipment: [
    { id: 'ruler', name: 'Régua', icon: '📏', price: 0 },
    { id: 'stopwatch', name: 'Cronômetro', icon: '⏱️', price: 100 },
    { id: 'scale', name: 'Balança', icon: '⚖️', price: 200 },
    { id: 'thermometer', name: 'Termômetro', icon: '🌡️', price: 300 },
    { id: 'oscilloscope', name: 'Osciloscópio', icon: '📊', price: 1000 },
    { id: 'laser', name: 'Laser', icon: '🔴', price: 2000 }
  ],

  achievements: [
    { id: 'first_exp', name: 'Primeiro Experimento', desc: 'Complete seu primeiro experimento', icon: '⚡', reward: 50 },
    { id: 'newton_fan', name: 'Fã de Newton', desc: 'Complete 20 problemas de mecânica', icon: '🍎', reward: 200 },
    { id: 'einstein', name: 'Mini Einstein', desc: 'Alcance nível 50', icon: '🧠', reward: 500 },
    { id: 'formula_master', name: 'Mestre das Fórmulas', desc: 'Aprenda 10 fórmulas', icon: '📐', reward: 300 },
    { id: 'perfect_10', name: 'Precisão', desc: '10 respostas certas seguidas', icon: '🎯', reward: 250 }
  ]
};

// ==================== GERADOR DE PROBLEMAS ====================
const PhysicsProblems = {
  generate(labId, level) {
    const diff = Math.min(10, Math.floor(level / 5) + 1);
    switch(labId) {
      case 'mechanics': return this.mechanics(diff);
      case 'kARCKHÉtics': return this.kARCKHÉtics(diff);
      case 'dynamics': return this.dynamics(diff);
      case 'energy': return this.energy(diff);
      case 'waves': return this.waves(diff);
      case 'thermo': return this.thermo(diff);
      case 'electro': return this.electro(diff);
      case 'magnetism': return this.magnetism(diff);
      case 'optics': return this.optics(diff);
      case 'modern': return this.modern(diff);
      default: return this.mechanics(diff);
    }
  },

  mechanics(diff) {
    const types = ['velocity', 'force', 'momentum'];
    const type = types[Math.floor(Math.random() * types.length)];
    let question, answer, options;

    switch(type) {
      case 'velocity':
        const s = (Math.floor(Math.random() * 10) + 1) * 10;
        const t = Math.floor(Math.random() * 5) + 1;
        const v = s / t;
        question = `Um carro percorre ${s}m em ${t}s.\nQual sua velocidade média?`;
        answer = v + ' m/s';
        options = [v + ' m/s', (v*2) + ' m/s', (v/2) + ' m/s', (v+5) + ' m/s'];
        break;
      case 'force':
        const m = Math.floor(Math.random() * 10) + 1;
        const a = Math.floor(Math.random() * 5) + 1;
        const f = m * a;
        question = `Qual a força para acelerar ${m}kg a ${a}m/s²?\n(F = m × a)`;
        answer = f + ' N';
        options = [f + ' N', (f*2) + ' N', (f-2) + ' N', (f+5) + ' N'];
        break;
      case 'momentum':
        const mass = Math.floor(Math.random() * 5) + 1;
        const vel = Math.floor(Math.random() * 10) + 2;
        const p = mass * vel;
        question = `Momentum de um objeto de ${mass}kg a ${vel}m/s?\n(p = m × v)`;
        answer = p + ' kg·m/s';
        options = [p + ' kg·m/s', (p*2) + ' kg·m/s', (p-5) + ' kg·m/s', (p+10) + ' kg·m/s'];
        break;
    }
    options = [...new Set(options)].slice(0, 4);
    while (options.length < 4) options.push((Math.random()*100).toFixed(0) + ' N');
    options.sort(() => Math.random() - 0.5);
    return { question, options, correctIndex: options.indexOf(answer), answer };
  },

  kARCKHÉtics(diff) {
    const types = ['mru', 'mruv', 'freefall'];
    const type = types[Math.floor(Math.random() * types.length)];
    let question, answer, options;

    switch(type) {
      case 'mru':
        const v1 = Math.floor(Math.random() * 20) + 5;
        const t1 = Math.floor(Math.random() * 5) + 1;
        const s1 = v1 * t1;
        question = `MRU: v = ${v1}m/s, t = ${t1}s\nQual a distância percorrida?`;
        answer = s1 + ' m';
        options = [s1 + ' m', (s1*2) + ' m', (s1/2) + ' m', (s1+10) + ' m'];
        break;
      case 'mruv':
        const v0 = 0;
        const a2 = Math.floor(Math.random() * 5) + 2;
        const t2 = Math.floor(Math.random() * 4) + 2;
        const vf = v0 + a2 * t2;
        question = `MRUV: v₀ = 0, a = ${a2}m/s², t = ${t2}s\nVelocidade final?`;
        answer = vf + ' m/s';
        options = [vf + ' m/s', (vf+5) + ' m/s', (vf-3) + ' m/s', (vf*2) + ' m/s'];
        break;
      case 'freefall':
        const g = 10;
        const t3 = Math.floor(Math.random() * 4) + 1;
        const h = (g * t3 * t3) / 2;
        question = `Queda livre: g = 10m/s², t = ${t3}s\nAltura percorrida? (h = gt²/2)`;
        answer = h + ' m';
        options = [h + ' m', (h*2) + ' m', (h+10) + ' m', (h-5) + ' m'];
        break;
    }
    options.sort(() => Math.random() - 0.5);
    return { question, options, correctIndex: options.indexOf(answer), answer };
  },

  dynamics(diff) {
    const laws = [
      { q: 'Um corpo em repouso tende a:', a: 'Permanecer em repouso', opts: ['Permanecer em repouso', 'Acelerar', 'Desacelerar', 'Oscilar'] },
      { q: 'A 2ª Lei de Newton afirma:', a: 'F = m × a', opts: ['F = m × a', 'F = m × v', 'F = m / a', 'F = a / m'] },
      { q: 'Ação e reação atuam em:', a: 'Corpos diferentes', opts: ['Corpos diferentes', 'O mesmo corpo', 'O vácuo', 'Líquidos apenas'] },
      { q: 'A força de atrito sempre:', a: 'Opõe-se ao movimento', opts: ['Opõe-se ao movimento', 'Favorece o movimento', 'É nula', 'É vertical'] }
    ];
    const law = laws[Math.floor(Math.random() * laws.length)];
    const options = [...law.opts].sort(() => Math.random() - 0.5);
    return { question: law.q, options, correctIndex: options.indexOf(law.a), answer: law.a };
  },

  energy(diff) {
    const types = ['kinetic', 'potential', 'work'];
    const type = types[Math.floor(Math.random() * types.length)];
    let question, answer, options;

    switch(type) {
      case 'kinetic':
        const m1 = Math.floor(Math.random() * 4) + 2;
        const v1 = Math.floor(Math.random() * 6) + 2;
        const ec = (m1 * v1 * v1) / 2;
        question = `Energia cinética: m = ${m1}kg, v = ${v1}m/s\n(Ec = mv²/2)`;
        answer = ec + ' J';
        options = [ec + ' J', (ec*2) + ' J', (ec+10) + ' J', (ec-5) + ' J'];
        break;
      case 'potential':
        const m2 = Math.floor(Math.random() * 5) + 1;
        const h = Math.floor(Math.random() * 10) + 2;
        const ep = m2 * 10 * h;
        question = `Energia potencial: m = ${m2}kg, h = ${h}m, g = 10\n(Ep = mgh)`;
        answer = ep + ' J';
        options = [ep + ' J', (ep*2) + ' J', (ep+20) + ' J', (ep/2) + ' J'];
        break;
      case 'work':
        const f = Math.floor(Math.random() * 10) + 5;
        const d = Math.floor(Math.random() * 8) + 2;
        const w = f * d;
        question = `Trabalho: F = ${f}N, d = ${d}m\n(W = F × d)`;
        answer = w + ' J';
        options = [w + ' J', (w*2) + ' J', (w+15) + ' J', (w-10) + ' J'];
        break;
    }
    options.sort(() => Math.random() - 0.5);
    return { question, options, correctIndex: options.indexOf(answer), answer };
  },

  waves(diff) {
    const concepts = [
      { q: 'A frequência é medida em:', a: 'Hertz (Hz)', opts: ['Hertz (Hz)', 'Metros (m)', 'Segundos (s)', 'Watts (W)'] },
      { q: 'Ondas sonoras são:', a: 'Mecânicas longitudinais', opts: ['Mecânicas longitudinais', 'Eletromagnéticas', 'Transversais', 'Estacionárias'] },
      { q: 'A luz se propaga no vácuo a:', a: '300.000 km/s', opts: ['300.000 km/s', '340 m/s', '1.000 km/s', '3.000 m/s'] },
      { q: 'Comprimento de onda é:', a: 'Distância entre duas cristas', opts: ['Distância entre duas cristas', 'Altura da onda', 'Velocidade da onda', 'Frequência'] }
    ];
    const c = concepts[Math.floor(Math.random() * concepts.length)];
    const options = [...c.opts].sort(() => Math.random() - 0.5);
    return { question: c.q, options, correctIndex: options.indexOf(c.a), answer: c.a };
  },

  thermo(diff) {
    const concepts = [
      { q: 'A temperatura absoluta zero é:', a: '-273°C (0 K)', opts: ['-273°C (0 K)', '0°C', '100°C', '-100°C'] },
      { q: 'Calor sempre flui do corpo:', a: 'Mais quente para o mais frio', opts: ['Mais quente para o mais frio', 'Mais frio para o mais quente', 'Maior para o menor', 'Menor para o maior'] },
      { q: 'Em uma expansão isotérmica:', a: 'Temperatura constante', opts: ['Temperatura constante', 'Pressão constante', 'Volume constante', 'Entropia constante'] },
      { q: 'A 1ª Lei da Termodinâmica trata de:', a: 'Conservação de energia', opts: ['Conservação de energia', 'Entropia', 'Temperatura', 'Pressão'] }
    ];
    const c = concepts[Math.floor(Math.random() * concepts.length)];
    const options = [...c.opts].sort(() => Math.random() - 0.5);
    return { question: c.q, options, correctIndex: options.indexOf(c.a), answer: c.a };
  },

  electro(diff) {
    const types = ['ohm', 'concept'];
    const type = types[Math.floor(Math.random() * types.length)];
    let question, answer, options;

    if (type === 'ohm') {
      const v = Math.floor(Math.random() * 12) + 1;
      const i = Math.floor(Math.random() * 5) + 1;
      const r = v / i;
      question = `Lei de Ohm: V = ${v}V, I = ${i}A\nQual a resistência?`;
      answer = r + ' Ω';
      options = [r + ' Ω', (r*2) + ' Ω', (r+2) + ' Ω', (r-1) + ' Ω'];
    } else {
      const concepts = [
        { q: 'A unidade de corrente elétrica é:', a: 'Ampère (A)', opts: ['Ampère (A)', 'Volt (V)', 'Ohm (Ω)', 'Watt (W)'] },
        { q: 'Resistores em série têm:', a: 'Mesma corrente', opts: ['Mesma corrente', 'Mesma tensão', 'Mesma potência', 'Nenhuma relação'] },
        { q: 'A potência elétrica é:', a: 'P = V × I', opts: ['P = V × I', 'P = V / I', 'P = I / V', 'P = V + I'] }
      ];
      const c = concepts[Math.floor(Math.random() * concepts.length)];
      question = c.q;
      answer = c.a;
      options = c.opts;
    }
    options.sort(() => Math.random() - 0.5);
    return { question, options, correctIndex: options.indexOf(answer), answer };
  },

  magnetism(diff) {
    const concepts = [
      { q: 'Polos magnéticos iguais:', a: 'Se repelem', opts: ['Se repelem', 'Se atraem', 'Não interagem', 'Anulam-se'] },
      { q: 'O campo magnético da Terra:', a: 'Protege dos ventos solares', opts: ['Protege dos ventos solares', 'Causa terremotos', 'Aquece o planeta', 'É constante'] },
      { q: 'A indução eletromagnética foi descoberta por:', a: 'Faraday', opts: ['Faraday', 'Newton', 'Einstein', 'Ohm'] },
      { q: 'Ímãs naturais são feitos de:', a: 'Magnetita', opts: ['Magnetita', 'Ouro', 'Prata', 'Cobre'] }
    ];
    const c = concepts[Math.floor(Math.random() * concepts.length)];
    const options = [...c.opts].sort(() => Math.random() - 0.5);
    return { question: c.q, options, correctIndex: options.indexOf(c.a), answer: c.a };
  },

  optics(diff) {
    const concepts = [
      { q: 'A reflexão ocorre quando a luz:', a: 'Retorna ao meio original', opts: ['Retorna ao meio original', 'Muda de meio', 'Desaparece', 'Acelera'] },
      { q: 'Lentes convergentes formam imagens:', a: 'Reais ou virtuais', opts: ['Reais ou virtuais', 'Apenas reais', 'Apenas virtuais', 'Nenhuma imagem'] },
      { q: 'O arco-íris é causado por:', a: 'Dispersão da luz', opts: ['Dispersão da luz', 'Reflexão total', 'Difração', 'Absorção'] },
      { q: 'Espelhos planos formam imagens:', a: 'Virtuais e simétricas', opts: ['Virtuais e simétricas', 'Reais e invertidas', 'Aumentadas', 'Diminuídas'] }
    ];
    const c = concepts[Math.floor(Math.random() * concepts.length)];
    const options = [...c.opts].sort(() => Math.random() - 0.5);
    return { question: c.q, options, correctIndex: options.indexOf(c.a), answer: c.a };
  },

  modern(diff) {
    const concepts = [
      { q: 'E = mc² foi proposta por:', a: 'Einstein', opts: ['Einstein', 'Newton', 'Bohr', 'Planck'] },
      { q: 'O princípio da incerteza é de:', a: 'Heisenberg', opts: ['Heisenberg', 'Schrödinger', 'Dirac', 'Feynman'] },
      { q: 'Fótons são partículas de:', a: 'Luz', opts: ['Luz', 'Elétrons', 'Prótons', 'Nêutrons'] },
      { q: 'A dualidade onda-partícula significa:', a: 'Matéria tem comportamento dual', opts: ['Matéria tem comportamento dual', 'Ondas são partículas', 'Partículas são ondas', 'Não há diferença'] }
    ];
    const c = concepts[Math.floor(Math.random() * concepts.length)];
    const options = [...c.opts].sort(() => Math.random() - 0.5);
    return { question: c.q, options, correctIndex: options.indexOf(c.a), answer: c.a };
  }
};

// ==================== ESTADO DO JOGO ====================
let gameState = {
  screen: 'title',
  player: null,
  currentLab: null,
  currentLevel: 1,
  experiment: null,
  particles: [],
  clickAreas: []
};

function loadPlayer() {
  const saved = localStorage.getItem('physicslab_player');
  return saved ? JSON.parse(saved) : null;
}

function savePlayer() {
  localStorage.setItem('physicslab_player', JSON.stringify(gameState.player));
}

function createPlayer(name) {
  return {
    name,
    level: 1,
    xp: 0,
    xpToNext: 100,
    coins: 50,
    gems: 5,
    stats: { experiments: 0, perfect: 0, streak: 0, bestStreak: 0, formulasLearned: [] },
    progress: {},
    equipment: ['ruler'],
    achievements: []
  };
}

// ==================== RENDERIZAÇÃO ====================
function render() {
  ctx.fillStyle = '#0d1b2a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  switch(gameState.screen) {
    case 'title': renderTitle(); break;
    case 'menu': renderMenu(); break;
    case 'labs': renderLabs(); break;
    case 'levels': renderLevels(); break;
    case 'experiment': renderExperiment(); break;
    case 'formulas': renderFormulas(); break;
    case 'shop': renderShop(); break;
  }

  renderParticles();
}

function renderTitle() {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 400);
  grad.addColorStop(0, '#1b3a4b');
  grad.addColorStop(1, '#0d1b2a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Partículas decorativas
  if (Math.random() < 0.05) {
    gameState.particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 3 - 1,
      life: 1,
      color: '#00d4ff',
      size: Math.random() * 4 + 2
    });
  }

  const swing = Math.sin(Date.now() / 300) * 20;
  ctx.font = '80px Arial';
  ctx.textAlign = 'center';
  ctx.save();
  ctx.translate(cx, cy - 100);
  ctx.rotate(swing * Math.PI / 180);
  ctx.fillText('⚡', 0, 0);
  ctx.restore();

  ctx.font = 'bold 40px Arial Black';
  ctx.fillStyle = '#00d4ff';
  ctx.shadowColor = '#00d4ff';
  ctx.shadowBlur = 20;
  ctx.fillText('PHYSICS LAB', cx, cy);
  ctx.shadowBlur = 0;

  ctx.font = '14px Arial';
  ctx.fillStyle = '#aaa';
  ctx.fillText('Experimentos de física interativos', cx, cy + 35);

  const hasPlayer = loadPlayer() !== null;
  drawButton(cx, cy + 100, 200, 50, hasPlayer ? 'CONTINUAR' : 'NOVO JOGO', '#00d4ff', () => {
    if (hasPlayer) {
      gameState.player = loadPlayer();
    } else {
      gameState.player = createPlayer('Físico');
      savePlayer();
    }
    gameState.screen = 'menu';
  });

  if (hasPlayer) {
    drawButton(cx, cy + 160, 150, 35, 'Novo Jogo', '#ff6b6b', () => {
      if (confirm('Apagar progresso?')) {
        localStorage.removeItem('physicslab_player');
        gameState.player = createPlayer('Físico');
        savePlayer();
        gameState.screen = 'menu';
      }
    });
  }
}

function renderMenu() {
  const cx = canvas.width / 2;
  const player = gameState.player;

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#1b3a4b');
  grad.addColorStop(1, '#0d1b2a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Header
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(0, 0, canvas.width, 90);

  ctx.font = '40px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('👨‍🔬', 20, 55);

  ctx.font = 'bold 20px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText(player.name, 75, 40);

  ctx.font = '14px Arial';
  ctx.fillStyle = '#00d4ff';
  ctx.fillText(`Nível ${player.level}`, 75, 60);

  ctx.fillStyle = '#333';
  roundRect(75, 68, 100, 8, 4);
  ctx.fill();
  ctx.fillStyle = '#00d4ff';
  roundRect(75, 68, 100 * (player.xp / player.xpToNext), 8, 4);
  ctx.fill();

  ctx.textAlign = 'right';
  ctx.font = '16px Arial';
  ctx.fillStyle = '#ffd700';
  ctx.fillText(`💰 ${player.coins}`, canvas.width - 20, 45);
  ctx.fillStyle = '#00ffcc';
  ctx.fillText(`💎 ${player.gems}`, canvas.width - 20, 70);

  // Menu
  const menuItems = [
    { icon: '⚡', label: 'LABORATÓRIOS', color: '#00d4ff', action: () => gameState.screen = 'labs' },
    { icon: '📐', label: 'FÓRMULAS', color: '#ffd700', action: () => gameState.screen = 'formulas' },
    { icon: '🛒', label: 'LOJA', color: '#FF9800', action: () => gameState.screen = 'shop' }
  ];

  menuItems.forEach((item, i) => {
    const y = 130 + i * 100;

    ctx.fillStyle = item.color + '30';
    roundRect(20, y, canvas.width - 40, 80, 15);
    ctx.fill();

    ctx.strokeStyle = item.color;
    ctx.lineWidth = 2;
    roundRect(20, y, canvas.width - 40, 80, 15);
    ctx.stroke();

    ctx.font = '40px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(item.icon, 40, y + 50);

    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(item.label, 100, y + 45);

    ctx.font = '12px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Toque para entrar', 100, y + 65);

    gameState.clickAreas.push({ x: 20, y, w: canvas.width - 40, h: 80, action: item.action });
  });
}

function renderLabs() {
  const cx = canvas.width / 2;
  const player = gameState.player;

  ctx.fillStyle = '#0d1b2a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, canvas.width, 60);

  drawButton(50, 30, 80, 35, '← Menu', '#666', () => gameState.screen = 'menu');

  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.fillText('⚡ LABORATÓRIOS', cx, 40);

  const startY = 80;
  GameData.labs.forEach((lab, i) => {
    const y = startY + i * 75 - (gameState.labScroll || 0);
    if (y < 50 || y > canvas.height) return;

    const unlocked = player.level >= lab.unlockLevel;
    const progress = player.progress[lab.id] || { completed: 0 };

    ctx.fillStyle = unlocked ? lab.color + '30' : '#1a1a2e';
    roundRect(20, y, canvas.width - 40, 65, 12);
    ctx.fill();

    if (unlocked) {
      ctx.strokeStyle = lab.color;
      ctx.lineWidth = 2;
      roundRect(20, y, canvas.width - 40, 65, 12);
      ctx.stroke();
    }

    ctx.font = '30px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = unlocked ? '#fff' : '#555';
    ctx.fillText(lab.icon, 35, y + 42);

    ctx.font = 'bold 15px Arial';
    ctx.fillStyle = unlocked ? '#fff' : '#666';
    ctx.fillText(lab.name, 80, y + 28);

    ctx.font = '11px Arial';
    ctx.fillStyle = unlocked ? '#aaa' : '#555';
    ctx.fillText(lab.topics.slice(0, 3).join(' • '), 80, y + 45);

    if (unlocked) {
      ctx.fillStyle = '#333';
      roundRect(80, y + 50, 80, 6, 3);
      ctx.fill();
      ctx.fillStyle = lab.color;
      roundRect(80, y + 50, 80 * (progress.completed / lab.levels), 6, 3);
      ctx.fill();

      gameState.clickAreas.push({
        x: 20, y, w: canvas.width - 40, h: 65,
        action: () => { gameState.currentLab = lab; gameState.screen = 'levels'; }
      });
    } else {
      ctx.font = '10px Arial';
      ctx.fillStyle = '#ff6b6b';
      ctx.fillText(`🔒 Nível ${lab.unlockLevel}`, 80, y + 55);
    }
  });
}

function renderLevels() {
  const cx = canvas.width / 2;
  const lab = gameState.currentLab;
  const player = gameState.player;
  const progress = player.progress[lab.id] || { completed: 0, stars: {} };

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, lab.color + '40');
  grad.addColorStop(1, '#0d1b2a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, canvas.width, 65);

  drawButton(50, 32, 80, 30, '← Voltar', '#666', () => gameState.screen = 'labs');

  ctx.font = '28px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(lab.icon, cx, 30);
  ctx.font = 'bold 14px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText(lab.name, cx, 52);

  const cols = 5;
  const cellSize = Math.min((canvas.width - 50) / cols, 60);
  const startX = (canvas.width - cols * cellSize) / 2;
  const startY = 85;

  for (let i = 0; i < lab.levels; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * cellSize + cellSize / 2;
    const y = startY + row * cellSize - (gameState.levelScroll || 0);

    if (y < 60 || y > canvas.height) continue;

    const levelNum = i + 1;
    const unlocked = levelNum <= progress.completed + 1;
    const completed = levelNum <= progress.completed;

    ctx.beginPath();
    ctx.arc(x, y, cellSize / 2 - 5, 0, Math.PI * 2);
    ctx.fillStyle = completed ? lab.color : unlocked ? lab.color + '60' : '#2a2a4e';
    ctx.fill();

    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = unlocked ? '#fff' : '#555';
    ctx.fillText(levelNum, x, y + 5);

    if (unlocked) {
      gameState.clickAreas.push({
        x: x - cellSize/2, y: y - cellSize/2, w: cellSize, h: cellSize,
        action: () => startExperiment(levelNum)
      });
    }
  }
}

function startExperiment(level) {
  gameState.experiment = {
    level,
    problem: PhysicsProblems.generate(gameState.currentLab.id, level),
    selectedOption: null,
    result: null,
    startTime: Date.now()
  };
  gameState.currentLevel = level;
  gameState.screen = 'experiment';
}

function renderExperiment() {
  const cx = canvas.width / 2;
  const exp = gameState.experiment;
  const lab = gameState.currentLab;

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#1b3a4b');
  grad.addColorStop(1, '#0d1b2a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Decoração de laboratório
  ctx.fillStyle = '#2a3a4a';
  ctx.fillRect(0, canvas.height - 150, canvas.width, 150);

  ctx.font = '50px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('📏', cx - 80, canvas.height - 80);
  ctx.fillText('⚖️', cx, canvas.height - 70);
  ctx.fillText('⏱️', cx + 80, canvas.height - 80);

  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, canvas.width, 50);

  ctx.font = 'bold 16px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText(`${lab.name} - Nível ${exp.level}`, cx, 32);

  if (exp.result === null) {
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    roundRect(20, 70, canvas.width - 40, 180, 15);
    ctx.fill();

    ctx.strokeStyle = lab.color;
    ctx.lineWidth = 2;
    roundRect(20, 70, canvas.width - 40, 180, 15);
    ctx.stroke();

    ctx.font = '15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';

    const lines = exp.problem.question.split('\n');
    lines.forEach((line, i) => {
      ctx.fillText(line, cx, 105 + i * 22);
    });

    const optY = 170;
    exp.problem.options.forEach((opt, i) => {
      const x = cx - 75 + (i % 2) * 150;
      const y = optY + Math.floor(i / 2) * 40;

      const selected = exp.selectedOption === i;
      ctx.fillStyle = selected ? lab.color : '#2a2a5e';
      roundRect(x - 70, y - 14, 140, 32, 8);
      ctx.fill();

      ctx.font = '13px Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText(String(opt), x, y + 4);

      gameState.clickAreas.push({
        x: x - 70, y: y - 14, w: 140, h: 32,
        action: () => selectAnswer(i)
      });
    });
  } else {
    ctx.fillStyle = exp.result === 'correct' ? 'rgba(0, 212, 255, 0.9)' : 'rgba(255, 107, 107, 0.9)';
    roundRect(20, 70, canvas.width - 40, 180, 15);
    ctx.fill();

    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(exp.result === 'correct' ? '✅' : '❌', cx, 140);

    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(exp.result === 'correct' ? 'CORRETO!' : 'ERRADO!', cx, 190);

    if (exp.result === 'wrong') {
      ctx.font = '13px Arial';
      ctx.fillText(`Resposta: ${exp.problem.answer}`, cx, 220);
    }
  }
}

function selectAnswer(index) {
  const exp = gameState.experiment;
  if (exp.result !== null) return;

  exp.selectedOption = index;
  const correct = index === exp.problem.correctIndex;

  if (correct) {
    exp.result = 'correct';
    createParticles(canvas.width / 2, 130, '#00d4ff', 15);

    const player = gameState.player;
    player.xp += 20 + gameState.currentLevel * 2;
    player.coins += 5 + Math.floor(gameState.currentLevel / 5);
    player.stats.experiments++;

    while (player.xp >= player.xpToNext) {
      player.xp -= player.xpToNext;
      player.level++;
      player.xpToNext = Math.floor(player.xpToNext * 1.15);
    }

    const lab = gameState.currentLab;
    if (!player.progress[lab.id]) player.progress[lab.id] = { completed: 0 };
    if (gameState.currentLevel > player.progress[lab.id].completed) {
      player.progress[lab.id].completed = gameState.currentLevel;
    }

    savePlayer();

    setTimeout(() => {
      if (gameState.currentLevel < gameState.currentLab.levels) {
        startExperiment(gameState.currentLevel + 1);
      } else {
        gameState.screen = 'labs';
      }
    }, 1500);
  } else {
    exp.result = 'wrong';
    createParticles(canvas.width / 2, 130, '#ff6b6b', 10);

    setTimeout(() => {
      exp.result = null;
      exp.selectedOption = null;
      exp.problem = PhysicsProblems.generate(gameState.currentLab.id, gameState.currentLevel);
    }, 2000);
  }
}

function renderFormulas() {
  const cx = canvas.width / 2;

  ctx.fillStyle = '#0d1b2a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, canvas.width, 60);

  drawButton(50, 30, 80, 35, '← Menu', '#666', () => gameState.screen = 'menu');

  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.fillText('📐 FÓRMULAS', cx, 40);

  const startY = 80;
  GameData.formulas.forEach((f, i) => {
    const y = startY + i * 60 - (gameState.formulaScroll || 0);
    if (y < 50 || y > canvas.height) return;

    ctx.fillStyle = '#1a2a3a';
    roundRect(20, y, canvas.width - 40, 50, 10);
    ctx.fill();

    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#00d4ff';
    ctx.fillText(f.name, 35, y + 22);

    ctx.font = '16px Arial';
    ctx.fillStyle = '#ffd700';
    ctx.fillText(f.formula, 35, y + 42);

    ctx.textAlign = 'right';
    ctx.font = '12px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText(f.unit, canvas.width - 35, y + 32);
  });
}

function renderShop() {
  const cx = canvas.width / 2;
  const player = gameState.player;

  ctx.fillStyle = '#0d1b2a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, canvas.width, 60);

  drawButton(50, 30, 80, 35, '← Menu', '#666', () => gameState.screen = 'menu');

  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.fillText('🛒 LOJA', cx, 40);

  ctx.textAlign = 'right';
  ctx.font = '16px Arial';
  ctx.fillStyle = '#ffd700';
  ctx.fillText(`💰 ${player.coins}`, canvas.width - 20, 40);

  GameData.equipment.forEach((item, i) => {
    const y = 80 + i * 60;
    const owned = player.equipment.includes(item.id);

    ctx.fillStyle = owned ? '#00d4ff30' : '#1a2a3a';
    roundRect(20, y, canvas.width - 40, 50, 10);
    ctx.fill();

    ctx.font = '28px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(item.icon, 35, y + 35);

    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(item.name, 80, y + 32);

    ctx.textAlign = 'right';
    if (owned) {
      ctx.fillStyle = '#00d4ff';
      ctx.font = 'bold 12px Arial';
      ctx.fillText('ADQUIRIDO', canvas.width - 35, y + 32);
    } else if (item.price > 0) {
      drawButton(canvas.width - 65, y + 25, 60, 25, `💰${item.price}`,
        player.coins >= item.price ? '#FF9800' : '#666',
        () => {
          if (player.coins >= item.price) {
            player.coins -= item.price;
            player.equipment.push(item.id);
            savePlayer();
          }
        });
    }
  });
}

// ==================== FUNÇÕES AUXILIARES ====================
function drawButton(x, y, w, h, text, color, action) {
  ctx.fillStyle = color;
  roundRect(x - w/2, y - h/2, w, h, h/4);
  ctx.fill();

  ctx.font = `bold ${Math.min(h * 0.45, 14)}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.fillText(text, x, y + 4);

  gameState.clickAreas.push({ x: x - w/2, y: y - h/2, w, h, action });
}

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function createParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    gameState.particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      life: 1,
      color,
      size: Math.random() * 5 + 2
    });
  }
}

function renderParticles() {
  gameState.particles = gameState.particles.filter(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15;
    p.life -= 0.025;

    if (p.life <= 0) return false;

    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    return true;
  });
}

// ==================== INPUT ====================
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (const area of gameState.clickAreas) {
    if (x >= area.x && x <= area.x + area.w && y >= area.y && y <= area.y + area.h) {
      area.action();
      break;
    }
  }
});

canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  for (const area of gameState.clickAreas) {
    if (x >= area.x && x <= area.x + area.w && y >= area.y && y <= area.y + area.h) {
      area.action();
      break;
    }
  }
});

canvas.addEventListener('wheel', (e) => {
  if (gameState.screen === 'labs') gameState.labScroll = Math.max(0, (gameState.labScroll || 0) + e.deltaY);
  else if (gameState.screen === 'levels') gameState.levelScroll = Math.max(0, (gameState.levelScroll || 0) + e.deltaY);
  else if (gameState.screen === 'formulas') gameState.formulaScroll = Math.max(0, (gameState.formulaScroll || 0) + e.deltaY);
});

// ==================== GAME LOOP ====================
function gameLoop() {
  gameState.clickAreas = [];
  render();
  requestAnimationFrame(gameLoop);
}

setTimeout(() => {
  document.getElementById('loading').classList.add('hidden');
  gameLoop();
}, 1500);
