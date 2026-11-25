# Plano de Açêo: 5 Jogos Arcade Avançados

> **Projeto:** EAI Games - Jogos Arcade para Adolescentes (10-16 anos)
> **Data:** 30/12/2024
> **Status:** Planejamento

---

## Visêo Geral

### Jogos a Desenvolver

| # | Jogo | Tipo | Complexidade | Prioridade |
|---|------|------|--------------|------------|
| 1 | **Rhythm Battle** | Ritmo/Musical | Alta | 🔴 Crítica |
| 2 | **Slither EAI** | Arcade .io | Média | 🔴 Crítica |
| 3 | **Tower Defense EAI** | Estratégia | Alta | 🟡 Alta |
| 4 | **HexRacer 3D** | Corrida/WebGL | Muito Alta | 🟡 Alta |
| 5 | **Battle Royale 2D** | Açêo/Sobrevivência | Alta | 🟢 Média |

### Padrões para Todos os Jogos

- ✅ Responsivo (desktop + mobile)
- ✅ Controles teclado + touch
- ✅ Sistema de pontuaçêo com highscore
- ✅ Integraçêo com sistema EAI (XP, moedas, conquistas)
- ✅ Tela de pause e game over
- ✅ Efeitos sonoros e música
- ✅ Tutorial/instruções
- ✅ Compartilhamento de score

---

## JOGO 1: Rhythm Battle 🎵

### Descriçêo
Jogo de ritmo estilo Friday Night Funkin'/DDR onde o jogador deve pressionar as setas no tempo certo conforme a música toca.

### Funcionalidades

#### Core
- [ ] Sistema de setas (↑ ↓ ← →) sincronizadas com BPM
- [ ] Detecçêo de timing (Perfect, Good, Miss)
- [ ] Barra de vida/combo
- [ ] Sistema de pontuaçêo com multiplicador
- [ ] Pelo menos 3 músicas com diferentes dificuldades

#### Visual
- [ ] Personagem animado do jogador
- [ ] Personagem oponente (CPU ou vs)
- [ ] Efeitos visuais nas notas (brilho, partículas)
- [ ] Background animado por fase
- [ ] Indicadores de Perfect/Good/Miss

#### Áudio
- [ ] 3 músicas originais ou royalty-free
- [ ] Efeitos sonoros para cada nota
- [ ] Som de combo/multiplicador

#### Modos de Jogo
- [ ] Modo História (fases progressivas)
- [ ] Modo Livre (escolher música)
- [ ] 3 dificuldades: Fácil, Normal, Difícil

### Checklist de Desenvolvimento

```
[ ] 1. Estrutura base do jogo
    [ ] Canvas e loop de jogo
    [ ] Sistema de input (teclado + touch)
    [ ] Gerenciador de estados (menu, jogo, pause, gameover)

[ ] 2. Mecânica de ritmo
    [ ] Parser de beatmap (JSON com timing das notas)
    [ ] Spawn de setas sincronizado
    [ ] Detecçêo de colisêo seta/zona de hit
    [ ] Cálculo de timing (±50ms Perfect, ±100ms Good)

[ ] 3. Sistema de pontuaçêo
    [ ] Pontos por nota (Perfect=100, Good=50, Miss=0)
    [ ] Multiplicador de combo
    [ ] Barra de vida (Miss reduz, combo recupera)

[ ] 4. Arte e animações
    [ ] Sprites das setas (4 direções + estados)
    [ ] Personagem principal (idle, hit, miss)
    [ ] Backgrounds para cada música
    [ ] Efeitos de partículas

[ ] 5. Áudio
    [ ] Integrar Web Audio API
    [ ] Sincronizaçêo música/gameplay
    [ ] Efeitos sonoros

[ ] 6. UI/UX
    [ ] Menu principal
    [ ] Seleçêo de música/dificuldade
    [ ] HUD (score, combo, vida)
    [ ] Tela de resultados

[ ] 7. Integraçêo EAI
    [ ] Recompensas por fase (XP, moedas)
    [ ] Conquistas específicas
    [ ] Salvar highscores
```

### Critérios de Revisêo
- [ ] Timing das notas está preciso?
- [ ] Controles responsivos no mobile?
- [ ] Áudio sincronizado sem delay?
- [ ] Performance estável (60fps)?
- [ ] Dificuldades balanceadas?

---

## JOGO 2: Slither EAI 🐍

### Descriçêo
Jogo estilo Slither.io onde o jogador controla uma cobra que cresce ao comer orbes, competindo com outras cobras (IA).

### Funcionalidades

#### Core
- [ ] Cobra controlável que segue o mouse/touch
- [ ] Orbes coloridos espalhados pelo mapa
- [ ] Crescimento ao comer orbes
- [ ] Colisêo com outras cobras (game over)
- [ ] Boost de velocidade (gasta tamanho)

#### Visual
- [ ] Cobra com segmentos suaves
- [ ] Skins diferentes para a cobra
- [ ] Mapa grande com grid de fundo
- [ ] Orbes brilhantes com cores variadas
- [ ] Efeito de morte (explosêo em orbes)

#### IA
- [ ] 10-20 cobras controladas por IA
- [ ] Comportamentos: caçar, fugir, cercar
- [ ] IA com diferentes níveis de agressividade

#### Modos
- [ ] Modo Infinito (quanto tempo sobrevive)
- [ ] Modo Objetivo (alcançar tamanho X)
- [ ] Leaderboard local

### Checklist de Desenvolvimento

```
[ ] 1. Estrutura base
    [ ] Canvas fullscreen
    [ ] Câmera que segue o jogador
    [ ] Mapa maior que a tela (scrolling)

[ ] 2. Mecânica da cobra
    [ ] Movimento suave seguindo cursor/touch
    [ ] Sistema de segmentos (array de posições)
    [ ] Crescimento gradual
    [ ] Boost (acelerar + encolher)

[ ] 3. Sistema de orbes
    [ ] Spawn aleatório de orbes
    [ ] Diferentes tamanhos/valores
    [ ] Colisêo cobra-orbe
    [ ] Respawn contínuo

[ ] 4. Sistema de colisêo
    [ ] Colisêo cabeça-corpo (própria e outras)
    [ ] Morte e explosêo em orbes
    [ ] Bordas do mapa

[ ] 5. Inteligência Artificial
    [ ] Pathfinding básico para IA
    [ ] Estados: vagando, caçando, fugindo
    [ ] Spawn/respawn de cobras IA

[ ] 6. Skins e personalizaçêo
    [ ] 5+ skins diferentes
    [ ] Desbloqueio com moedas EAI
    [ ] Preview na seleçêo

[ ] 7. UI/UX
    [ ] Minimap
    [ ] Leaderboard em tempo real
    [ ] Tamanho atual
    [ ] Controles touch (joystick virtual)

[ ] 8. Integraçêo EAI
    [ ] XP baseado no tamanho máximo
    [ ] Moedas por orbes coletados
    [ ] Conquistas (maior cobra, sobreviver X min)
```

### Critérios de Revisêo
- [ ] Movimento da cobra é suave?
- [ ] IA oferece desafio justo?
- [ ] Performance com muitas cobras?
- [ ] Controles touch funcionais?
- [ ] Mapa tem tamanho adequado?

---

## JOGO 3: Tower Defense EAI 🏰

### Descriçêo
Jogo de defesa de torre onde o jogador posiciona torres estrategicamente para impedir que inimigos cheguem ao objetivo.

### Funcionalidades

#### Core
- [ ] Grid para posicionar torres
- [ ] 5+ tipos de torres com habilidades únicas
- [ ] Waves de inimigos progressivas
- [ ] Sistema de upgrade de torres
- [ ] Recursos para comprar/melhorar torres

#### Torres
| Torre | Dano | Alcance | Especial |
|-------|------|---------|----------|
| Arqueiro | Baixo | Médio | Rápido |
| Canhêo | Alto | Curto | Área |
| Mago | Médio | Longo | Slow |
| Tesla | Médio | Médio | Chain |
| Bomba | Muito Alto | - | Explosêo única |

#### Inimigos
| Inimigo | Vida | Velocidade | Especial |
|---------|------|------------|----------|
| Goblin | Baixa | Rápido | - |
| Orc | Alta | Lento | - |
| Mago | Média | Médio | Escudo |
| Boss | Muito Alta | Lento | Spawn minions |

#### Mapas
- [ ] 3 mapas com caminhos diferentes
- [ ] Dificuldade progressiva
- [ ] Elementos de cenário

### Checklist de Desenvolvimento

```
[ ] 1. Sistema de grid e mapa
    [ ] Grid clicável para torres
    [ ] Caminho dos inimigos (pathfinding)
    [ ] Múltiplos mapas
    [ ] Zonas bloqueadas

[ ] 2. Sistema de torres
    [ ] Base class Torre
    [ ] 5 tipos de torres
    [ ] Targeting (mais perto, mais forte, primeiro)
    [ ] Animaçêo de ataque
    [ ] Sistema de upgrade (3 níveis)

[ ] 3. Sistema de inimigos
    [ ] Base class Inimigo
    [ ] 4+ tipos de inimigos
    [ ] Movimento pelo caminho
    [ ] Barra de vida
    [ ] Drops (moedas do jogo)

[ ] 4. Sistema de waves
    [ ] Configuraçêo de waves por JSON
    [ ] Progressêo de dificuldade
    [ ] Wave boss a cada 5 rounds
    [ ] Intervalo entre waves

[ ] 5. Economia do jogo
    [ ] Moedas por kills
    [ ] Custo de torres/upgrades
    [ ] Bônus por wave perfeita

[ ] 6. UI/UX
    [ ] Menu de torres (sidebar)
    [ ] Info de torre selecionada
    [ ] Indicador de wave atual
    [ ] Vidas restantes
    [ ] Botêo de acelerar/pausar

[ ] 7. Efeitos e polish
    [ ] Projéteis animados
    [ ] Explosões e partículas
    [ ] Sons de ataque/morte
    [ ] Música de fundo

[ ] 8. Integraçêo EAI
    [ ] XP por wave completada
    [ ] Moedas EAI por vitória
    [ ] Conquistas (sem perder vida, etc)
    [ ] Desbloquear torres com moedas
```

### Critérios de Revisêo
- [ ] Balanceamento está divertido?
- [ ] Torres sêo distintas e úteis?
- [ ] Waves têm progressêo justa?
- [ ] Performance com muitos inimigos?
- [ ] UI é intuitiva?

---

## JOGO 4: HexRacer 3D 🚀

### Descriçêo
Jogo de corrida futurista 3D estilo F-Zero/Wipeout com naves em pistas neon.

### Funcionalidades

#### Core
- [ ] Nave 3D controlável
- [ ] Pista procedural ou fixa
- [ ] Obstáculos para desviar
- [ ] Boost/turbo
- [ ] Sistema de voltas/checkpoints

#### Visual (WebGL/Three.js)
- [ ] Modelos 3D low-poly
- [ ] Iluminaçêo neon/cyberpunk
- [ ] Efeitos de velocidade (motion blur, trails)
- [ ] Skybox futurista

#### Gameplay
- [ ] 3 pistas diferentes
- [ ] Contra o tempo (time trial)
- [ ] Fantasma do melhor tempo
- [ ] Power-ups na pista

### Checklist de Desenvolvimento

```
[ ] 1. Setup Three.js
    [ ] Cena, câmera, renderer
    [ ] Iluminaçêo básica
    [ ] Controles orbitais (dev)

[ ] 2. Nave do jogador
    [ ] Modelo 3D da nave
    [ ] Física de movimento
    [ ] Controles (WASD + setas)
    [ ] Inclinaçêo visual nas curvas

[ ] 3. Pista
    [ ] Geometria da pista
    [ ] Bordas/barreiras
    [ ] Checkpoints
    [ ] Linha de chegada

[ ] 4. Física e colisêo
    [ ] Colisêo nave-parede
    [ ] Detecçêo de saída da pista
    [ ] Respawn em checkpoint

[ ] 5. Gameplay
    [ ] Contador de voltas
    [ ] Cronômetro
    [ ] Melhor tempo (localStorage)
    [ ] Fantasma do recorde

[ ] 6. Power-ups
    [ ] Boost (velocidade extra)
    [ ] Escudo (1 colisêo grátis)
    [ ] Slow-mo (tempo lento)

[ ] 7. Visual polish
    [ ] Efeitos de partículas
    [ ] Trail da nave
    [ ] Post-processing (bloom, etc)
    [ ] Música eletrônica

[ ] 8. Integraçêo EAI
    [ ] XP por corrida completada
    [ ] Moedas por posiçêo/tempo
    [ ] Conquistas (recorde, sem bater)
    [ ] Skins de nave desbloqueáveis
```

### Critérios de Revisêo
- [ ] Performance 60fps estável?
- [ ] Controles precisos e divertidos?
- [ ] Visual impressionante?
- [ ] Funciona em mobile? (pode ser só desktop)
- [ ] Pistas sêo interessantes?

---

## JOGO 5: Battle Royale 2D ⚔️

### Descriçêo
Jogo battle royale 2D top-down onde jogadores coletam armas e lutam para ser o último sobrevivente.

### Funcionalidades

#### Core
- [ ] Mapa grande que encolhe (zona segura)
- [ ] Spawn de armas e itens
- [ ] Sistema de tiro
- [ ] Último jogador vivo vence
- [ ] IA como oponentes

#### Armas e Itens
| Item | Tipo | Dano | Alcance |
|------|------|------|---------|
| Pistola | Arma | Baixo | Médio |
| Shotgun | Arma | Alto | Curto |
| Rifle | Arma | Médio | Longo |
| Medkit | Item | Cura 50 | - |
| Escudo | Item | +50 Armor | - |
| Boost | Item | Velocidade | 10s |

#### Gameplay
- [ ] 20 jogadores (1 player + 19 IA)
- [ ] Partidas de 3-5 minutos
- [ ] Zona que fecha a cada 30s
- [ ] Loot em construções

### Checklist de Desenvolvimento

```
[ ] 1. Mapa e movimento
    [ ] Mapa grande com tiles
    [ ] Movimento WASD
    [ ] Câmera que segue jogador
    [ ] Obstáculos e construções

[ ] 2. Sistema de zona
    [ ] Círculo que encolhe
    [ ] Dano fora da zona
    [ ] Indicador de próxima zona
    [ ] Timer até fechar

[ ] 3. Sistema de loot
    [ ] Spawn de itens no mapa
    [ ] Pickup de itens
    [ ] Inventário simples
    [ ] Drop ao morrer

[ ] 4. Sistema de combate
    [ ] Mira com mouse
    [ ] Diferentes armas
    [ ] Projéteis com física
    [ ] Dano e morte

[ ] 5. Inteligência Artificial
    [ ] IA que se move pelo mapa
    [ ] IA que coleta loot
    [ ] IA que atira no jogador
    [ ] IA que foge da zona

[ ] 6. UI/UX
    [ ] Minimap com zona
    [ ] Inventário/hotbar
    [ ] Vida e escudo
    [ ] Kill feed
    [ ] Contador de vivos

[ ] 7. Efeitos
    [ ] Partículas de tiro
    [ ] Som de armas
    [ ] Indicador de dano
    [ ] Música tensa

[ ] 8. Integraçêo EAI
    [ ] XP por kill e placement
    [ ] Moedas por vitória
    [ ] Conquistas (win, kills)
    [ ] Skins de personagem
```

### Critérios de Revisêo
- [ ] IA oferece desafio justo?
- [ ] Armas sêo balanceadas?
- [ ] Zona fecha em ritmo bom?
- [ ] Partidas têm duraçêo ideal?
- [ ] Performance com 20 entidades?

---

## Cronograma Sugerido

### Ordem de Desenvolvimento

| Fase | Jogo | Motivo |
|------|------|--------|
| 1 | Slither EAI | Mais simples, valida mecânicas |
| 2 | Tower Defense | Estratégia, público diferente |
| 3 | Rhythm Battle | Complexo mas muito popular |
| 4 | Battle Royale 2D | Combina aprendizados anteriores |
| 5 | HexRacer 3D | Mais complexo (WebGL) |

### Processo por Jogo

```
┌─────────────────────────────────────────────────────────┐
│ FASE 1: Desenvolvimento                                 │
│ - Criar estrutura base                                  │
│ - Implementar mecânicas core                            │
│ - Adicionar arte placeholder                            │
│ - Testar gameplay básico                                │
├─────────────────────────────────────────────────────────┤
│ FASE 2: Polish                                          │
│ - Arte final e animações                                │
│ - Efeitos sonoros e música                              │
│ - UI/UX refinada                                        │
│ - Balanceamento                                         │
├─────────────────────────────────────────────────────────┤
│ FASE 3: Integraçêo                                      │
│ - Conectar sistema EAI (XP, moedas)                     │
│ - Adicionar conquistas                                  │
│ - Salvar progresso                                      │
│ - Testar integraçêo                                     │
├─────────────────────────────────────────────────────────┤
│ FASE 4: Revisêo                                         │
│ - Testes em diferentes dispositivos                     │
│ - Correçêo de bugs                                      │
│ - Otimizaçêo de performance                             │
│ - Validaçêo com usuários                                │
├─────────────────────────────────────────────────────────┤
│ FASE 5: Deploy                                          │
│ - Build de produçêo                                     │
│ - Adicionar à página /arcade                            │
│ - Criar thumbnail e descriçêo                           │
│ - Commit e deploy                                       │
└─────────────────────────────────────────────────────────┘
```

---

## Checklist Geral de Revisêo

### Para Cada Jogo Completado

#### Funcionalidade
- [ ] Todas as features implementadas
- [ ] Sem bugs críticos
- [ ] Salva progresso corretamente
- [ ] Integraçêo EAI funcionando

#### Performance
- [ ] 60fps no desktop
- [ ] 30fps+ no mobile
- [ ] Sem memory leaks
- [ ] Carregamento rápido (<3s)

#### UX
- [ ] Controles intuitivos
- [ ] Tutorial claro
- [ ] Feedback visual adequado
- [ ] Acessível (cores, tamanhos)

#### Compatibilidade
- [ ] Chrome, Firefox, Safari, Edge
- [ ] Desktop e mobile
- [ ] Diferentes resoluções
- [ ] Touch e teclado/mouse

#### Qualidade
- [ ] Arte consistente com EAI
- [ ] Sons e música adequados
- [ ] Textos em português
- [ ] Sem conteúdo inapropriado

---

## Próximos Passos Imediatos

1. **Aprovar este plano**
2. **Começar pelo Jogo 1 (Slither EAI)**
   - Criar estrutura de arquivos
   - Implementar movimento da cobra
   - Adicionar orbes e crescimento
3. **Revisar e iterar**
4. **Passar para o próximo jogo**

---

*Plano criado em 30/12/2024 para o projeto EAI Games*
