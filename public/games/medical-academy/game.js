// Medical Academy - Academia de Medicina
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuraçêo do canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Estado do jogo
let coins = 100;
let gems = 5;
let xp = 0;
let level = 1;
let currentScreen = 'menu';
let selectedSpecialty = null;
let selectedCase = null;
let currentQuestion = null;
let selectedAnswer = null;
let showingResult = false;
let resultCorrect = false;
let scrollOffset = 0;
let maxScroll = 0;

// Animações
let particles = [];
let heartbeats = [];
let pulsePhase = 0;

// Dados do jogador
let playerData = {
    unlockedSpecialties: [0],
    specialtyProgress: {},
    diagnoses: 0,
    patients: [],
    reputation: 0
};

// Especialidades Médicas (10 mundos)
const SPECIALTIES = [
    { id: 0, name: 'Anatomia', color: '#E74C3C', icon: '🫀', unlockLevel: 1, cases: 50 },
    { id: 1, name: 'Fisiologia', color: '#3498DB', icon: '🔬', unlockLevel: 5, cases: 50 },
    { id: 2, name: 'Cardiologia', color: '#C0392B', icon: '❤️', unlockLevel: 10, cases: 50 },
    { id: 3, name: 'Neurologia', color: '#9B59B6', icon: '🧠', unlockLevel: 15, cases: 50 },
    { id: 4, name: 'Ortopedia', color: '#F39C12', icon: '🦴', unlockLevel: 20, cases: 50 },
    { id: 5, name: 'Pediatria', color: '#1ABC9C', icon: '👶', unlockLevel: 25, cases: 50 },
    { id: 6, name: 'Farmacologia', color: '#27AE60', icon: '💊', unlockLevel: 30, cases: 50 },
    { id: 7, name: 'Imunologia', color: '#E67E22', icon: '🛡️', unlockLevel: 35, cases: 50 },
    { id: 8, name: 'Emergência', color: '#E91E63', icon: '🚑', unlockLevel: 40, cases: 50 },
    { id: 9, name: 'Cirurgia', color: '#00BCD4', icon: '🔪', unlockLevel: 45, cases: 50 }
];

// Banco de questões por especialidade
const QUESTIONS = {
    0: [ // Anatomia
        { q: 'Qual é o maior osso do corpo humano?', a: ['Fêmur', 'Tíbia', 'Úmero', 'Rádio'], correct: 0 },
        { q: 'Quantos ossos tem o corpo humano adulto?', a: ['206', '300', '150', '250'], correct: 0 },
        { q: 'Qual órgêo produz bile?', a: ['Fígado', 'Pâncreas', 'Estômago', 'Intestino'], correct: 0 },
        { q: 'Onde fica o pâncreas?', a: ['Abdômen', 'Tórax', 'Cabeça', 'Pescoço'], correct: 0 },
        { q: 'Qual é o maior órgêo do corpo?', a: ['Pele', 'Fígado', 'Pulmêo', 'Coraçêo'], correct: 0 },
        { q: 'Quantas vértebras tem a coluna cervical?', a: ['7', '12', '5', '4'], correct: 0 },
        { q: 'Qual músculo é responsável pela respiraçêo?', a: ['Diafragma', 'Bíceps', 'Tríceps', 'Deltóide'], correct: 0 },
        { q: 'Onde fica a artéria aorta?', a: ['Saindo do coraçêo', 'No braço', 'Na perna', 'No pescoço'], correct: 0 },
        { q: 'Quantos lobos tem o pulmêo direito?', a: ['3', '2', '4', '5'], correct: 0 },
        { q: 'Qual osso protege o cérebro?', a: ['Crânio', 'Costela', 'Vértebra', 'Esterno'], correct: 0 }
    ],
    1: [ // Fisiologia
        { q: 'Qual é a funçêo dos glóbulos vermelhos?', a: ['Transportar oxigênio', 'Combater infecções', 'Coagular sangue', 'Produzir hormônios'], correct: 0 },
        { q: 'Qual hormônio regula a glicose?', a: ['Insulina', 'Adrenalina', 'Cortisol', 'Melatonina'], correct: 0 },
        { q: 'Onde ocorre a troca gasosa?', a: ['Alvéolos', 'Brônquios', 'Traqueia', 'Faringe'], correct: 0 },
        { q: 'Qual é a pressêo arterial normal?', a: ['120/80 mmHg', '150/100 mmHg', '90/60 mmHg', '180/120 mmHg'], correct: 0 },
        { q: 'Qual órgêo filtra o sangue?', a: ['Rim', 'Fígado', 'Baço', 'Pâncreas'], correct: 0 },
        { q: 'Quantos litros de sangue tem um adulto?', a: ['5 litros', '10 litros', '2 litros', '8 litros'], correct: 0 },
        { q: 'Qual é a frequência cardíaca normal em repouso?', a: ['60-100 bpm', '30-50 bpm', '120-150 bpm', '150-200 bpm'], correct: 0 },
        { q: 'Onde é produzida a insulina?', a: ['Pâncreas', 'Fígado', 'Rim', 'Tireoide'], correct: 0 },
        { q: 'Qual é o pH normal do sangue?', a: ['7.35-7.45', '6.0-6.5', '8.0-8.5', '5.0-5.5'], correct: 0 },
        { q: 'Qual sistema regula os hormônios?', a: ['Endócrino', 'Nervoso', 'Digestivo', 'Respiratório'], correct: 0 }
    ],
    2: [ // Cardiologia
        { q: 'Quantas câmaras tem o coraçêo?', a: ['4', '2', '3', '6'], correct: 0 },
        { q: 'O que é infarto?', a: ['Morte de tecido cardíaco', 'Aumento do coraçêo', 'Inflamaçêo', 'Infecçêo'], correct: 0 },
        { q: 'Qual exame mede a atividade elétrica do coraçêo?', a: ['ECG', 'Raio-X', 'Ultrassom', 'Tomografia'], correct: 0 },
        { q: 'O que é arritmia?', a: ['Ritmo cardíaco irregular', 'Dor no peito', 'Pressêo alta', 'Falta de ar'], correct: 0 },
        { q: 'Qual artéria leva sangue para o coraçêo?', a: ['Coronária', 'Aorta', 'Pulmonar', 'Carótida'], correct: 0 },
        { q: 'O que é hipertensêo?', a: ['Pressêo alta', 'Pressêo baixa', 'Ritmo irregular', 'Sopro'], correct: 0 },
        { q: 'Qual válvula fica entre átrio e ventrículo esquerdo?', a: ['Mitral', 'Tricúspide', 'Aórtica', 'Pulmonar'], correct: 0 },
        { q: 'O que é insuficiência cardíaca?', a: ['Coraçêo nêo bombeia bem', 'Coraçêo para', 'Infarto', 'Arritmia'], correct: 0 },
        { q: 'Qual é o marcapasso natural do coraçêo?', a: ['Nó sinoatrial', 'Nó AV', 'Feixe de His', 'Fibras de Purkinje'], correct: 0 },
        { q: 'O que é angina?', a: ['Dor no peito por falta de oxigênio', 'Infarto', 'Arritmia', 'Sopro'], correct: 0 }
    ],
    3: [ // Neurologia
        { q: 'Quantos nervos cranianos existem?', a: ['12 pares', '10 pares', '8 pares', '14 pares'], correct: 0 },
        { q: 'O que é AVC?', a: ['Acidente vascular cerebral', 'Infarto', 'Arritmia', 'Infecçêo'], correct: 0 },
        { q: 'Qual parte do cérebro controla o equilíbrio?', a: ['Cerebelo', 'Córtex', 'Tronco', 'Hipotálamo'], correct: 0 },
        { q: 'O que é epilepsia?', a: ['Distúrbio com convulsões', 'Dor de cabeça', 'Tontura', 'Amnésia'], correct: 0 },
        { q: 'Qual neurotransmissor está baixo no Parkinson?', a: ['Dopamina', 'Serotonina', 'Acetilcolina', 'GABA'], correct: 0 },
        { q: 'O que protege o sistema nervoso central?', a: ['Meninges', 'Ossos apenas', 'Músculos', 'Pele'], correct: 0 },
        { q: 'O que é esclerose múltipla?', a: ['Doença autoimune da mielina', 'Infecçêo', 'Tumor', 'Trauma'], correct: 0 },
        { q: 'Qual exame visualiza o cérebro?', a: ['Ressonância magnética', 'Raio-X', 'ECG', 'Endoscopia'], correct: 0 },
        { q: 'O que é meningite?', a: ['Inflamaçêo das meninges', 'Tumor', 'AVC', 'Epilepsia'], correct: 0 },
        { q: 'Qual lobo processa a visêo?', a: ['Occipital', 'Frontal', 'Temporal', 'Parietal'], correct: 0 }
    ],
    4: [ // Ortopedia
        { q: 'O que é fratura?', a: ['Quebra do osso', 'Luxaçêo', 'Entorse', 'Contusêo'], correct: 0 },
        { q: 'O que é luxaçêo?', a: ['Deslocamento da articulaçêo', 'Fratura', 'Entorse', 'Inflamaçêo'], correct: 0 },
        { q: 'O que é osteoporose?', a: ['Perda de massa óssea', 'Fratura', 'Infecçêo', 'Tumor'], correct: 0 },
        { q: 'Qual é o tratamento de fratura simples?', a: ['Imobilizaçêo', 'Cirurgia sempre', 'Fisioterapia apenas', 'Medicamentos apenas'], correct: 0 },
        { q: 'O que é artrose?', a: ['Desgaste da cartilagem', 'Infecçêo', 'Fratura', 'Luxaçêo'], correct: 0 },
        { q: 'O que é escoliose?', a: ['Curvatura lateral da coluna', 'Fratura', 'Luxaçêo', 'Infecçêo'], correct: 0 },
        { q: 'Qual exame mostra ossos?', a: ['Raio-X', 'ECG', 'Ultrassom', 'EEG'], correct: 0 },
        { q: 'O que é hérnia de disco?', a: ['Deslocamento do disco vertebral', 'Fratura', 'Tumor', 'Infecçêo'], correct: 0 },
        { q: 'O que é tendinite?', a: ['Inflamaçêo do tendêo', 'Fratura', 'Luxaçêo', 'Entorse'], correct: 0 },
        { q: 'Qual articulaçêo mais sofre lesões?', a: ['Joelho', 'Cotovelo', 'Quadril', 'Tornozelo'], correct: 0 }
    ],
    5: [ // Pediatria
        { q: 'Qual vacina é dada ao nascer?', a: ['BCG e Hepatite B', 'Tríplice viral', 'Polio', 'Gripe'], correct: 0 },
        { q: 'Quando iniciar alimentaçêo complementar?', a: ['6 meses', '3 meses', '1 ano', '2 meses'], correct: 0 },
        { q: 'O que é icterícia neonatal?', a: ['Pele amarelada por bilirrubina', 'Febre', 'Infecçêo', 'Alergia'], correct: 0 },
        { q: 'Qual é o peso normal ao nascer?', a: ['2.5-4 kg', '1-2 kg', '5-6 kg', '4-5 kg'], correct: 0 },
        { q: 'Até quando amamentar exclusivamente?', a: ['6 meses', '3 meses', '1 ano', '2 anos'], correct: 0 },
        { q: 'O que é fontanela?', a: ['Moleira do bebê', 'Osso', 'Músculo', 'Órgêo'], correct: 0 },
        { q: 'Quando a criança deve andar?', a: ['12-18 meses', '6 meses', '24 meses', '3 meses'], correct: 0 },
        { q: 'O que é APGAR?', a: ['Escala de avaliaçêo do recém-nascido', 'Vacina', 'Exame', 'Medicamento'], correct: 0 },
        { q: 'Qual doença a vacina tríplice previne?', a: ['Sarampo, caxumba, rubéola', 'Polio', 'Hepatite', 'Gripe'], correct: 0 },
        { q: 'O que é cólica do bebê?', a: ['Dor abdominal com choro', 'Febre', 'Infecçêo', 'Alergia'], correct: 0 }
    ],
    6: [ // Farmacologia
        { q: 'O que significa via oral?', a: ['Pela boca', 'Pela veia', 'Pela pele', 'Pelo músculo'], correct: 0 },
        { q: 'O que é efeito colateral?', a: ['Reaçêo indesejada', 'Efeito principal', 'Cura', 'Dose'], correct: 0 },
        { q: 'O que é antibiótico?', a: ['Combate bactérias', 'Combate vírus', 'Combate dor', 'Combate febre'], correct: 0 },
        { q: 'O que é analgésico?', a: ['Alivia a dor', 'Combate infecçêo', 'Reduz febre', 'Combate inflamaçêo'], correct: 0 },
        { q: 'O que é anti-inflamatório?', a: ['Reduz inflamaçêo', 'Combate infecçêo', 'Alivia dor apenas', 'Reduz febre apenas'], correct: 0 },
        { q: 'O que é meia-vida do medicamento?', a: ['Tempo para reduzir metade da concentraçêo', 'Validade', 'Dose', 'Efeito'], correct: 0 },
        { q: 'O que é interaçêo medicamentosa?', a: ['Efeito de um sobre outro', 'Dose correta', 'Via de administraçêo', 'Validade'], correct: 0 },
        { q: 'O que significa IV?', a: ['Intravenoso', 'Intramuscular', 'Via oral', 'Subcutâneo'], correct: 0 },
        { q: 'O que é antitérmico?', a: ['Reduz febre', 'Reduz dor', 'Combate infecçêo', 'Reduz inflamaçêo'], correct: 0 },
        { q: 'O que é vacina?', a: ['Previne doenças por imunizaçêo', 'Cura doenças', 'Alivia dor', 'Combate infecçêo'], correct: 0 }
    ],
    7: [ // Imunologia
        { q: 'O que sêo anticorpos?', a: ['Proteínas de defesa', 'Vírus', 'Bactérias', 'Células de ataque'], correct: 0 },
        { q: 'O que é alergia?', a: ['Reaçêo exagerada do sistema imune', 'Infecçêo', 'Inflamaçêo', 'Tumor'], correct: 0 },
        { q: 'O que sêo linfócitos?', a: ['Células de defesa', 'Glóbulos vermelhos', 'Plaquetas', 'Bactérias'], correct: 0 },
        { q: 'O que é doença autoimune?', a: ['Imunidade ataca o próprio corpo', 'Infecçêo', 'Alergia', 'Câncer'], correct: 0 },
        { q: 'Qual órgêo produz linfócitos T?', a: ['Timo', 'Baço', 'Fígado', 'Rim'], correct: 0 },
        { q: 'O que é HIV?', a: ['Vírus que ataca o sistema imune', 'Bactéria', 'Fungo', 'Parasita'], correct: 0 },
        { q: 'O que é imunoglobulina?', a: ['Tipo de anticorpo', 'Célula', 'Vírus', 'Bactéria'], correct: 0 },
        { q: 'O que é anafilaxia?', a: ['Reaçêo alérgica grave', 'Alergia leve', 'Infecçêo', 'Inflamaçêo'], correct: 0 },
        { q: 'Onde ficam os gânglios linfáticos?', a: ['Em todo o corpo', 'Só no pescoço', 'Só nas axilas', 'Só na virilha'], correct: 0 },
        { q: 'O que é imunidade passiva?', a: ['Receber anticorpos prontos', 'Produzir anticorpos', 'Vacina', 'Infecçêo'], correct: 0 }
    ],
    8: [ // Emergência
        { q: 'O que fazer em parada cardíaca?', a: ['RCP - ressuscitaçêo', 'Esperar', 'Dar água', 'Elevar pernas'], correct: 0 },
        { q: 'Qual é o número de emergência no Brasil?', a: ['192 (SAMU)', '190', '193', '191'], correct: 0 },
        { q: 'O que é engasgo?', a: ['Obstruçêo das vias aéreas', 'Falta de ar', 'Tosse', 'Dor no peito'], correct: 0 },
        { q: 'O que fazer em queimadura?', a: ['Água fria corrente', 'Gelo', 'Manteiga', 'Pasta de dente'], correct: 0 },
        { q: 'O que é choque?', a: ['Falha circulatória grave', 'Susto', 'Dor', 'Febre'], correct: 0 },
        { q: 'O que fazer em convulsêo?', a: ['Proteger a cabeça, nêo conter', 'Segurar a língua', 'Dar água', 'Sacudir'], correct: 0 },
        { q: 'O que é triagem?', a: ['Classificaçêo de urgência', 'Tratamento', 'Diagnóstico', 'Exame'], correct: 0 },
        { q: 'O que fazer em hemorragia?', a: ['Comprimir o local', 'Lavar com água', 'Nêo tocar', 'Elevar sempre'], correct: 0 },
        { q: 'O que é intoxicaçêo?', a: ['Envenenamento', 'Infecçêo', 'Alergia', 'Trauma'], correct: 0 },
        { q: 'Qual é a sequência do BLS?', a: ['CAB - Circulaçêo, Via aérea, Respiraçêo', 'ABC', 'CBA', 'ACB'], correct: 0 }
    ],
    9: [ // Cirurgia
        { q: 'O que é anestesia geral?', a: ['Perda total da consciência', 'Anestesia local', 'Sedaçêo leve', 'Sem anestesia'], correct: 0 },
        { q: 'O que é laparoscopia?', a: ['Cirurgia minimamente invasiva', 'Cirurgia aberta', 'Exame', 'Tratamento'], correct: 0 },
        { q: 'O que é assepsia?', a: ['Eliminaçêo de microrganismos', 'Cirurgia', 'Anestesia', 'Sutura'], correct: 0 },
        { q: 'O que é sutura?', a: ['Pontos para fechar ferida', 'Corte', 'Anestesia', 'Exame'], correct: 0 },
        { q: 'O que é biópsia?', a: ['Retirada de tecido para análise', 'Cirurgia grande', 'Anestesia', 'Exame de sangue'], correct: 0 },
        { q: 'O que é hemostasia?', a: ['Controle do sangramento', 'Sutura', 'Corte', 'Anestesia'], correct: 0 },
        { q: 'O que é transplante?', a: ['Substituiçêo de órgêo', 'Cirurgia simples', 'Exame', 'Tratamento'], correct: 0 },
        { q: 'O que é colecistectomia?', a: ['Remoçêo da vesícula', 'Remoçêo do apêndice', 'Remoçêo do rim', 'Remoçêo do baço'], correct: 0 },
        { q: 'O que é pós-operatório?', a: ['Período após cirurgia', 'Antes da cirurgia', 'Durante cirurgia', 'Exame'], correct: 0 },
        { q: 'O que é cirurgia eletiva?', a: ['Programada, nêo urgente', 'Urgente', 'Emergência', 'Imediata'], correct: 0 }
    ]
};

// Loja
const SHOP_ITEMS = [
    { id: 'diagnosis_pack', name: 'Pacote de Diagnósticos', price: 100, currency: 'coins', description: '+50 diagnósticos' },
    { id: 'patient_file', name: 'Arquivo de Paciente', price: 150, currency: 'coins', description: '+1 paciente' },
    { id: 'reputation_boost', name: 'Boost de Reputaçêo', price: 200, currency: 'coins', description: '+100 reputaçêo' },
    { id: 'specialty_unlock', name: 'Desbloquear Especialidade', price: 5, currency: 'gems', description: 'Próxima especialidade' },
    { id: 'double_xp', name: 'XP Dobrado', price: 3, currency: 'gems', description: '2x XP por 10 casos' },
    { id: 'doctor_coat', name: 'Jaleco Premium', price: 10, currency: 'gems', description: 'Visual médico' }
];

// Carregar jogo
function loadGame() {
    const saved = localStorage.getItem('medicalAcademy');
    if (saved) {
        const data = JSON.parse(saved);
        coins = data.coins || 100;
        gems = data.gems || 5;
        xp = data.xp || 0;
        level = data.level || 1;
        playerData = data.playerData || playerData;
    }
}

// Salvar jogo
function saveGame() {
    localStorage.setItem('medicalAcademy', JSON.stringify({
        coins, gems, xp, level, playerData
    }));
}

// Sistema de partículas
function createParticles(x, y, color, count = 15) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 1,
            color,
            size: Math.random() * 6 + 2
        });
    }
}

function updateParticles() {
    particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        p.vy += 0.1;
        return p.life > 0;
    });
}

// Desenhar batimento cardíaco
function drawHeartbeat(x, y, width, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();

    const phase = pulsePhase;
    const segments = 100;

    for (let i = 0; i <= segments; i++) {
        const px = x + (i / segments) * width;
        const t = (i / segments) * Math.PI * 4 + phase;
        let py = y;

        // Simular ECG
        const pos = (i / segments + phase / (Math.PI * 4)) % 1;
        if (pos > 0.4 && pos < 0.45) {
            py = y - 30;
        } else if (pos > 0.45 && pos < 0.5) {
            py = y + 40;
        } else if (pos > 0.5 && pos < 0.55) {
            py = y - 20;
        } else {
            py = y + Math.sin(t * 2) * 5;
        }

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.stroke();
}

// Desenhar fundo médico
function drawMedicalBackground() {
    // Gradiente médico
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Padrêo de cruz médica
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = '#E74C3C';
    for (let x = 0; x < canvas.width; x += 100) {
        for (let y = 0; y < canvas.height; y += 100) {
            ctx.fillRect(x + 35, y + 20, 30, 60);
            ctx.fillRect(x + 20, y + 35, 60, 30);
        }
    }
    ctx.globalAlpha = 1;

    // Linha de ECG
    pulsePhase += 0.05;
    ctx.globalAlpha = 0.3;
    drawHeartbeat(0, canvas.height - 100, canvas.width, '#E74C3C');
    ctx.globalAlpha = 1;
}

// Desenhar HUD
function drawHUD() {
    ctx.fillStyle = 'rgba(26, 26, 46, 0.9)';
    ctx.fillRect(0, 0, canvas.width, 60);

    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`🪙 ${coins}`, 20, 38);

    ctx.fillStyle = '#00CED1';
    ctx.fillText(`💎 ${gems}`, 120, 38);

    ctx.fillStyle = '#E74C3C';
    ctx.fillText(`⭐ XP: ${xp}`, 220, 38);

    ctx.fillStyle = '#2ECC71';
    ctx.fillText(`🩺 Nível ${level}`, 350, 38);

    ctx.fillStyle = '#3498DB';
    ctx.textAlign = 'right';
    ctx.fillText(`📋 Diagnósticos: ${playerData.diagnoses}`, canvas.width - 20, 38);
}

// Desenhar menu principal
function drawMenu() {
    drawMedicalBackground();
    drawHUD();

    // Título
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#E74C3C';
    ctx.lineWidth = 4;
    ctx.font = 'bold 52px Arial';
    ctx.textAlign = 'center';
    ctx.strokeText('🏥 MEDICAL ACADEMY 🩺', canvas.width/2, 140);
    ctx.fillText('🏥 MEDICAL ACADEMY 🩺', canvas.width/2, 140);

    ctx.font = '22px Arial';
    ctx.fillStyle = '#E74C3C';
    ctx.fillText('Academia de Medicina', canvas.width/2, 180);

    // Botões
    const buttons = [
        { text: '🩺 ESPECIALIDADES', y: 260, color: '#E74C3C' },
        { text: '🏪 FARMÁCIA (LOJA)', y: 340, color: '#27AE60' },
        { text: '📋 MEUS PACIENTES', y: 420, color: '#3498DB' },
        { text: '🏆 CONQUISTAS', y: 500, color: '#F39C12' }
    ];

    buttons.forEach(btn => {
        ctx.fillStyle = btn.color;
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 15;
        ctx.fillRect(canvas.width/2 - 180, btn.y, 360, 60);
        ctx.shadowBlur = 0;

        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width/2 - 180, btn.y, 360, 60);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(btn.text, canvas.width/2, btn.y + 40);
    });

    // Estatísticas
    ctx.fillStyle = 'rgba(26, 26, 46, 0.8)';
    ctx.fillRect(canvas.width/2 - 150, 580, 300, 80);
    ctx.fillStyle = '#E74C3C';
    ctx.font = '16px Arial';
    ctx.fillText(`👥 Pacientes: ${playerData.patients.length}`, canvas.width/2, 610);
    ctx.fillText(`⭐ Reputaçêo: ${playerData.reputation}`, canvas.width/2, 640);
}

// Desenhar seleçêo de especialidades
function drawSpecialtySelect() {
    drawMedicalBackground();
    drawHUD();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🩺 ESPECIALIDADES MÉDICAS', canvas.width/2, 100);

    ctx.fillStyle = '#E74C3C';
    ctx.fillRect(20, 80, 100, 40);
    ctx.fillStyle = '#FFF';
    ctx.font = '18px Arial';
    ctx.fillText('← Voltar', 70, 107);

    const startY = 140 - scrollOffset;
    const cardHeight = 90;

    SPECIALTIES.forEach((spec, index) => {
        const y = startY + index * (cardHeight + 15);
        if (y + cardHeight < 130 || y > canvas.height - 20) return;

        const unlocked = level >= spec.unlockLevel || playerData.unlockedSpecialties.includes(spec.id);
        const progress = playerData.specialtyProgress[spec.id] || 0;

        ctx.fillStyle = unlocked ? spec.color : '#333';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 8;
        ctx.fillRect(canvas.width/2 - 200, y, 400, cardHeight);
        ctx.shadowBlur = 0;

        if (unlocked) {
            ctx.strokeStyle = '#FFF';
            ctx.lineWidth = 2;
            ctx.strokeRect(canvas.width/2 - 200, y, 400, cardHeight);
        }

        ctx.font = '36px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(spec.icon, canvas.width/2 - 180, y + 50);

        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(spec.name, canvas.width/2 - 120, y + 35);

        if (unlocked) {
            ctx.font = '16px Arial';
            ctx.fillText(`Progresso: ${progress}/${spec.cases} casos`, canvas.width/2 - 120, y + 58);
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.fillRect(canvas.width/2 - 120, y + 66, 200, 10);
            ctx.fillStyle = '#2ECC71';
            ctx.fillRect(canvas.width/2 - 120, y + 66, (progress/spec.cases) * 200, 10);
        } else {
            ctx.fillStyle = '#888';
            ctx.font = '16px Arial';
            ctx.fillText(`🔒 Nível ${spec.unlockLevel}`, canvas.width/2 - 120, y + 58);
        }
    });

    maxScroll = Math.max(0, SPECIALTIES.length * (cardHeight + 15) - (canvas.height - 180));
}

// Desenhar seleçêo de caso
function drawCaseSelect() {
    const spec = SPECIALTIES[selectedSpecialty];
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, spec.color);
    gradient.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawHUD();

    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${spec.icon} ${spec.name}`, canvas.width/2, 100);

    ctx.fillStyle = '#E74C3C';
    ctx.fillRect(20, 80, 100, 40);
    ctx.fillStyle = '#FFF';
    ctx.font = '18px Arial';
    ctx.fillText('← Voltar', 70, 107);

    const progress = playerData.specialtyProgress[selectedSpecialty] || 0;
    const cols = 5;
    const size = 70;
    const spacing = 15;
    const startX = (canvas.width - (cols * (size + spacing))) / 2;
    const startY = 150 - scrollOffset;

    for (let i = 0; i < spec.cases; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * (size + spacing);
        const y = startY + row * (size + spacing);
        if (y + size < 130 || y > canvas.height - 20) continue;

        const unlocked = i <= progress;
        const completed = i < progress;

        ctx.fillStyle = completed ? '#2ECC71' : (unlocked ? spec.color : '#333');
        ctx.fillRect(x, y, size, size);

        if (unlocked && !completed) {
            ctx.strokeStyle = '#FFF';
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, size, size);
        }

        ctx.fillStyle = unlocked ? '#FFF' : '#666';
        ctx.font = completed ? '24px Arial' : 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(completed ? '✅' : (unlocked ? (i + 1) : '🔒'), x + size/2, y + size/2 + 8);
    }

    maxScroll = Math.max(0, Math.ceil(spec.cases / cols) * (size + spacing) - (canvas.height - 200));
}

// Desenhar questêo
function drawQuestion() {
    const spec = SPECIALTIES[selectedSpecialty];
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, spec.color);
    gradient.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ECG de fundo
    ctx.globalAlpha = 0.2;
    drawHeartbeat(0, canvas.height/2, canvas.width, '#FFF');
    ctx.globalAlpha = 1;

    drawHUD();

    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${spec.icon} ${spec.name} - Caso ${selectedCase + 1}`, canvas.width/2, 100);

    if (!currentQuestion) {
        const questions = QUESTIONS[selectedSpecialty];
        currentQuestion = questions[Math.floor(Math.random() * questions.length)];
        selectedAnswer = null;
        showingResult = false;
    }

    ctx.fillStyle = 'rgba(26, 26, 46, 0.95)';
    ctx.fillRect(canvas.width/2 - 300, 130, 600, 120);
    ctx.strokeStyle = spec.color;
    ctx.lineWidth = 3;
    ctx.strokeRect(canvas.width/2 - 300, 130, 600, 120);

    ctx.fillStyle = '#FFF';
    ctx.font = '20px Arial';
    wrapText(currentQuestion.q, canvas.width/2, 180, 550, 28);

    const shuffledAnswers = currentQuestion.shuffled || shuffleAnswers(currentQuestion);

    shuffledAnswers.forEach((answer, index) => {
        const y = 280 + index * 80;
        let bgColor = spec.color;

        if (showingResult) {
            bgColor = answer.originalIndex === currentQuestion.correct ? '#2ECC71' : (index === selectedAnswer ? '#E74C3C' : spec.color);
        } else if (index === selectedAnswer) {
            bgColor = '#F39C12';
        }

        ctx.fillStyle = bgColor;
        ctx.fillRect(canvas.width/2 - 280, y, 560, 60);
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width/2 - 280, y, 560, 60);

        ctx.fillStyle = '#FFF';
        ctx.font = '18px Arial';
        ctx.fillText(answer.text, canvas.width/2, y + 38);
    });

    if (selectedAnswer !== null && !showingResult) {
        ctx.fillStyle = '#E74C3C';
        ctx.fillRect(canvas.width/2 - 100, 610, 200, 50);
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('DIAGNOSTICAR 🩺', canvas.width/2, 643);
    }

    if (showingResult) {
        ctx.fillStyle = resultCorrect ? '#2ECC71' : '#E74C3C';
        ctx.fillRect(canvas.width/2 - 100, 610, 200, 50);
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(resultCorrect ? '✅ CORRETO!' : '❌ INCORRETO', canvas.width/2, 643);
    }

    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
}

function shuffleAnswers(question) {
    const answers = question.a.map((text, index) => ({ text, originalIndex: index }));
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    question.shuffled = answers;
    return answers;
}

function wrapText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let testY = y;
    for (let word of words) {
        const testLine = line + word + ' ';
        if (ctx.measureText(testLine).width > maxWidth && line !== '') {
            ctx.fillText(line, x, testY);
            line = word + ' ';
            testY += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, testY);
}

function drawShop() {
    drawMedicalBackground();
    drawHUD();
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🏪 FARMÁCIA (LOJA)', canvas.width/2, 100);

    ctx.fillStyle = '#E74C3C';
    ctx.fillRect(20, 80, 100, 40);
    ctx.fillStyle = '#FFF';
    ctx.font = '18px Arial';
    ctx.fillText('← Voltar', 70, 107);

    SHOP_ITEMS.forEach((item, index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const x = col === 0 ? canvas.width/2 - 290 : canvas.width/2 + 10;
        const cardY = 140 + row * 100;

        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(x, cardY, 280, 85);
        ctx.strokeStyle = item.currency === 'gems' ? '#00CED1' : '#FFD700';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, cardY, 280, 85);

        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(item.name, x + 15, cardY + 28);
        ctx.font = '14px Arial';
        ctx.fillStyle = '#E74C3C';
        ctx.fillText(item.description, x + 15, cardY + 50);
        ctx.fillStyle = item.currency === 'gems' ? '#00CED1' : '#FFD700';
        ctx.fillText(`${item.currency === 'gems' ? '💎' : '🪙'} ${item.price}`, x + 15, cardY + 72);

        ctx.fillStyle = '#E74C3C';
        ctx.fillRect(x + 200, cardY + 50, 65, 28);
        ctx.fillStyle = '#FFF';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Comprar', x + 232, cardY + 69);
    });
}

function drawPatients() {
    drawMedicalBackground();
    drawHUD();
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('📋 MEUS PACIENTES', canvas.width/2, 100);

    ctx.fillStyle = '#E74C3C';
    ctx.fillRect(20, 80, 100, 40);
    ctx.fillStyle = '#FFF';
    ctx.font = '18px Arial';
    ctx.fillText('← Voltar', 70, 107);

    ctx.fillStyle = 'rgba(26, 26, 46, 0.9)';
    ctx.fillRect(canvas.width/2 - 200, 150, 400, 200);
    ctx.strokeStyle = '#E74C3C';
    ctx.strokeRect(canvas.width/2 - 200, 150, 400, 200);

    ctx.fillStyle = '#E74C3C';
    ctx.font = '18px Arial';
    const stats = [
        `📋 Diagnósticos: ${playerData.diagnoses}`,
        `👥 Pacientes: ${playerData.patients.length}`,
        `⭐ Reputaçêo: ${playerData.reputation}`,
        `🩺 Especialidades: ${playerData.unlockedSpecialties.length}`,
        `🏥 Nível Médico: ${level}`
    ];
    stats.forEach((stat, i) => ctx.fillText(stat, canvas.width/2, 195 + i * 35));
}

function drawAchievements() {
    drawMedicalBackground();
    drawHUD();
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🏆 CONQUISTAS', canvas.width/2, 100);

    ctx.fillStyle = '#E74C3C';
    ctx.fillRect(20, 80, 100, 40);
    ctx.fillStyle = '#FFF';
    ctx.font = '18px Arial';
    ctx.fillText('← Voltar', 70, 107);

    const achievements = [
        { name: 'Primeiro Diagnóstico', desc: 'Complete seu primeiro caso', icon: '🩺', unlocked: true },
        { name: 'Residente', desc: 'Desbloqueie 3 especialidades', icon: '📚', unlocked: playerData.unlockedSpecialties.length >= 3 },
        { name: 'Médico', desc: 'Alcance nível 10', icon: '🏥', unlocked: level >= 10 },
        { name: 'Especialista', desc: 'Complete 5 especialidades', icon: '🎓', unlocked: Object.values(playerData.specialtyProgress).filter(p => p >= 50).length >= 5 },
        { name: 'Chefe de Medicina', desc: 'Complete todas especialidades', icon: '👑', unlocked: false }
    ];

    achievements.forEach((ach, i) => {
        const y = 140 + i * 75;
        ctx.fillStyle = ach.unlocked ? '#E74C3C' : '#333';
        ctx.fillRect(canvas.width/2 - 200, y, 400, 65);
        if (ach.unlocked) {
            ctx.strokeStyle = '#2ECC71';
            ctx.strokeRect(canvas.width/2 - 200, y, 400, 65);
        }
        ctx.font = '30px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(ach.icon, canvas.width/2 - 180, y + 42);
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(ach.name, canvas.width/2 - 130, y + 28);
        ctx.font = '14px Arial';
        ctx.fillStyle = ach.unlocked ? '#2ECC71' : '#666';
        ctx.fillText(ach.desc, canvas.width/2 - 130, y + 50);
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch(currentScreen) {
        case 'menu': drawMenu(); break;
        case 'specialties': drawSpecialtySelect(); break;
        case 'cases': drawCaseSelect(); break;
        case 'question': drawQuestion(); break;
        case 'shop': drawShop(); break;
        case 'patients': drawPatients(); break;
        case 'achievements': drawAchievements(); break;
    }
}

function gameLoop() {
    updateParticles();
    draw();
    requestAnimationFrame(gameLoop);
}

function processAnswer() {
    const shuffledAnswers = currentQuestion.shuffled;
    resultCorrect = shuffledAnswers[selectedAnswer].originalIndex === currentQuestion.correct;
    showingResult = true;

    if (resultCorrect) {
        coins += 15;
        xp += 25;
        playerData.diagnoses++;
        playerData.reputation += 10;
        createParticles(canvas.width/2, 400, '#2ECC71', 30);

        const progress = playerData.specialtyProgress[selectedSpecialty] || 0;
        if (selectedCase === progress) {
            playerData.specialtyProgress[selectedSpecialty] = progress + 1;
            playerData.patients.push(`Patient_${Date.now()}`);
        }

        if (xp >= level * 100) {
            level++;
            xp -= (level - 1) * 100;
            gems += 2;
            createParticles(canvas.width/2, 300, '#E74C3C', 40);
            SPECIALTIES.forEach(spec => {
                if (level >= spec.unlockLevel && !playerData.unlockedSpecialties.includes(spec.id)) {
                    playerData.unlockedSpecialties.push(spec.id);
                }
            });
        }
    } else {
        createParticles(canvas.width/2, 400, '#E74C3C', 20);
    }

    saveGame();
    setTimeout(() => {
        currentQuestion = null;
        showingResult = false;
        selectedAnswer = null;
        if (resultCorrect) {
            currentScreen = 'cases';
            scrollOffset = 0;
        }
    }, 1500);
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentScreen === 'menu') {
        if (y >= 260 && y <= 320) currentScreen = 'specialties';
        else if (y >= 340 && y <= 400) currentScreen = 'shop';
        else if (y >= 420 && y <= 480) currentScreen = 'patients';
        else if (y >= 500 && y <= 560) currentScreen = 'achievements';
        scrollOffset = 0;
    }
    else if (currentScreen === 'specialties') {
        if (x >= 20 && x <= 120 && y >= 80 && y <= 120) { currentScreen = 'menu'; return; }
        const startY = 140 - scrollOffset;
        SPECIALTIES.forEach((spec, index) => {
            const cardY = startY + index * 105;
            if (y >= cardY && y <= cardY + 90 && x >= canvas.width/2 - 200 && x <= canvas.width/2 + 200) {
                if (level >= spec.unlockLevel || playerData.unlockedSpecialties.includes(spec.id)) {
                    selectedSpecialty = index;
                    currentScreen = 'cases';
                    scrollOffset = 0;
                }
            }
        });
    }
    else if (currentScreen === 'cases') {
        if (x >= 20 && x <= 120 && y >= 80 && y <= 120) { currentScreen = 'specialties'; scrollOffset = 0; return; }
        const spec = SPECIALTIES[selectedSpecialty];
        const progress = playerData.specialtyProgress[selectedSpecialty] || 0;
        const cols = 5, size = 70, spacing = 15;
        const startX = (canvas.width - (cols * (size + spacing))) / 2;
        const startY = 150 - scrollOffset;
        for (let i = 0; i < spec.cases; i++) {
            const caseX = startX + (i % cols) * (size + spacing);
            const caseY = startY + Math.floor(i / cols) * (size + spacing);
            if (x >= caseX && x <= caseX + size && y >= caseY && y <= caseY + size && i <= progress) {
                selectedCase = i;
                currentScreen = 'question';
                currentQuestion = null;
                break;
            }
        }
    }
    else if (currentScreen === 'question') {
        if (showingResult) return;
        for (let i = 0; i < 4; i++) {
            if (y >= 280 + i * 80 && y <= 340 + i * 80 && x >= canvas.width/2 - 280 && x <= canvas.width/2 + 280) {
                selectedAnswer = i;
            }
        }
        if (selectedAnswer !== null && y >= 610 && y <= 660 && x >= canvas.width/2 - 100 && x <= canvas.width/2 + 100) {
            processAnswer();
        }
    }
    else if (currentScreen === 'shop') {
        if (x >= 20 && x <= 120 && y >= 80 && y <= 120) { currentScreen = 'menu'; return; }
        SHOP_ITEMS.forEach((item, index) => {
            const col = index % 2, row = Math.floor(index / 2);
            const itemX = col === 0 ? canvas.width/2 - 290 : canvas.width/2 + 10;
            const itemY = 140 + row * 100;
            if (x >= itemX + 200 && x <= itemX + 265 && y >= itemY + 50 && y <= itemY + 78) {
                const canAfford = item.currency === 'gems' ? gems >= item.price : coins >= item.price;
                if (canAfford) {
                    if (item.currency === 'gems') gems -= item.price; else coins -= item.price;
                    if (item.id === 'diagnosis_pack') playerData.diagnoses += 50;
                    else if (item.id === 'patient_file') playerData.patients.push(`Patient_${Date.now()}`);
                    else if (item.id === 'reputation_boost') playerData.reputation += 100;
                    createParticles(itemX + 140, itemY + 40, '#2ECC71', 20);
                    saveGame();
                }
            }
        });
    }
    else if (['patients', 'achievements'].includes(currentScreen)) {
        if (x >= 20 && x <= 120 && y >= 80 && y <= 120) currentScreen = 'menu';
    }
});

canvas.addEventListener('wheel', (e) => {
    if (['specialties', 'cases'].includes(currentScreen)) {
        scrollOffset = Math.max(0, Math.min(maxScroll, scrollOffset + e.deltaY * 0.5));
        e.preventDefault();
    }
}, { passive: false });

let touchStartY = 0;
canvas.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; });
canvas.addEventListener('touchmove', (e) => {
    if (['specialties', 'cases'].includes(currentScreen)) {
        scrollOffset = Math.max(0, Math.min(maxScroll, scrollOffset + (touchStartY - e.touches[0].clientY) * 0.5));
        touchStartY = e.touches[0].clientY;
        e.preventDefault();
    }
}, { passive: false });

loadGame();
gameLoop();
