/* Sokomo Kudiome — dados do personagem (Bardo 3 / Paladino 1). O motor está em ../../shared/sheet.js.
   Chaves entre {chaves} viram números calculados: {dc}, {spellAtk}, {prof}, {level},
   {cha}/{chaS} (modificador), {sk_persuasao} (perícia), {atk_dag}/{dmg_dag} (ataque
   com id "dag"), {ac}, {ini} e as de extraVars abaixo. */
window.CHAR = {
  id:'sokomo',
  name:'Sokomo Kudiome',
  subtitle:'Humano · Bardo 3 (Colégio do Conhecimento) / Paladino 1 · Nível {level} · Nobre · 25 anos',
  level:4, speed:'9m', hitDie:8, hpMax:23,
  scores:{str:8,dex:15,con:13,int:15,wis:13,cha:17},
  scoresNote:'Humano: +1 em todos os atributos (já aplicados).',
  saves:['dex','cha'],
  savesNote:'Bardo é proficiente em Destreza e Carisma. Rola-se 1d20 + modificador contra a CD do efeito. Versatilidade não vale para testes de resistência. Multiclasse em Paladino não concede as proficiências de resistência do Paladino.',
  skills:{'Arcanismo':'prof','Atuação':'prof','Enganação':'prof','História':'prof','Percepção':'prof','Persuasão':'expert','Prestidigitação':'expert','Religião':'prof'},
  jackOfAllTrades:true,
  skillsNote:'Origem: Bardo (3 à escolha) · Nobre (História, Persuasão) · Colégio do Conhecimento (3 bônus). Dois pontos = Aptidão (proficiência dobrada): Persuasão e Prestidigitação. Versatilidade: +{half} em toda perícia sem proficiência (já somado acima). Multiclasse em Paladino não dá perícias novas.',
  proficiencies:[
    ['Armaduras','Leves, médias e escudos (Paladino, por multiclasse)'],
    ['Armas','Simples e marciais; bestas de mão, espadas longas, rapieiras, espadas curtas (Bardo)'],
    ['Ferramentas','Três instrumentos musicais (à escolha) · um tipo de jogo (Nobre)'],
    ['Idiomas','Comum, Élfico, Halfling'],
  ],
  proficienciesNote:'Sem proficiência na armadura vestida, não se conjura magias. Com o nível de Paladino você passa a ter proficiência em armaduras médias e escudos, então pode conjurar usando-os. Versatilidade dá +{half} em ferramentas e instrumentos sem proficiência.',
  armorDefault:'leather',
  armorOptions:['none','padded','leather','studded'],
  coins:{gp:'57',sp:'10'},
  items:'Adaga, armadura de couro, instrumento musical, roupas finas, anel de sinete, pergaminho de linhagem, mochila.',
  personality:'',
  hpNote:'Dano consome PV temporários primeiro. Dados de vida: 3d8 de Bardo e 1d10 de Paladino. O 1º nível de Paladino (multiclasse) rola 1d10 + Con (média 6 + 1 = 7): 16 + 7 = 23. Se você rolou o dado, ajuste o máximo. A ficha de papel do nível 3 anota 1d8 + 6 + 2 = 16; somando o +1 de Constituição de cada nível daria 19 — confirmar com o mestre.',
  shortRestMsg:'Descanso curto concluído. Canção do Descanso: quem gastar dados de vida cura +1d6. Você tem dados de vida d8 (Bardo) e d10 (Paladino).',

  spellcasting:{
    title:'Conjuração — Bardo', ability:'cha', slots:[4,2], slotRecharge:'long',
    note:'Truques conhecidos: 2 · Magias conhecidas: 6 (pode trocar 1 ao subir de nível). Espaços voltam só no descanso longo. Magia de 1º nível pode ser conjurada com espaço de 2º (Sussurros Dissonantes vira 4d6, Onda Trovejante 3d8). Nenhuma das suas magias é ritual. Foco: um instrumento musical. O 1º nível de Paladino não dá Conjuração (ela começa no 2º nível de Paladino), então os espaços continuam sendo só os do Bardo 3.'
  },
  resources:[
    {id:'insp', name:'Inspiração de Bardo', sub:'d6 · ação bônus · {inspUses} usos · descanso longo', total:c=>Math.max(1,c.cha), recharge:'long'},
    {id:'sense', name:'Sentido Divino', sub:'ação · {senseUses} usos · descanso longo', total:c=>Math.max(1,1+c.cha), recharge:'long'},
    {id:'loh', name:'Mãos Consagradas', sub:'reserva de {lohPool} PV (1 pip = 1 PV) · ação · descanso longo', total:5, recharge:'long'},
  ],
  extraVars: c => ({ half: Math.floor(c.prof/2), inspUses: Math.max(1, c.cha), senseUses: Math.max(1, 1 + c.cha), lohPool: 5, inspDie:'d6', restDie:'d6' }),

  attacks:[
    {id:'dag', name:'Adaga', ability:'dex', dice:'1d4', type:'perfurante', range:'1,5 m · arremesso 6/18 m'},
    {id:'zv',  name:'Zombaria Viciosa', save:'Sab', dice:'1d4', useMod:false, type:'psíquico', range:'18 m'},
    {id:'dw',  name:'Sussurros Dissonantes', save:'Sab', dice:'3d6', useMod:false, type:'psíquico', range:'18 m'},
    {id:'ot',  name:'Onda Trovejante', save:'Con', dice:'2d8', useMod:false, type:'trovejante', range:'cubo de 4,5 m'},
  ],
  attackNote:'Zombaria Viciosa, Sussurros Dissonantes e Onda Trovejante não são ataques: o alvo faz teste de resistência contra a sua CD <b>{dc}</b> (Sabedoria, Sabedoria e Constituição) e sofre metade do dano (Zombaria não tem metade) se passar.',
  attackCards:[
    { title:'Adaga', sub:'Arma simples corpo a corpo · Acuidade, Leve, Arremesso (6/18 m) · 1d4 perfurante · 0,5 kg', body:`
      <p><b>Jogada de ataque:</b> 1d20 + {prof} (proficiência) + {dex} (Destreza, por Acuidade) = <b>1d20 {atk_dag}</b> contra a CA do alvo. Vale corpo a corpo ou arremessada.</p>
      <p><b>Dano:</b> 1d4 + {dex} = <b>{dmg_dag}</b> perfurante. Crítico (20 natural): 2d4 {dexS}.</p>
      <p><b>Arremesso:</b> até 6 m sem penalidade; de 6 a 18 m com desvantagem. Arremessar contra um inimigo a 1,5 m de você também tem desvantagem (ataque à distância em corpo a corpo).</p>
      <p><b>Leve:</b> com uma segunda arma leve na outra mão, pode usar a ação bônus para atacar com ela, sem somar o modificador ao dano.</p>
      <p><b>Ataque de oportunidade:</b> quando uma criatura hostil que você vê sai do seu alcance, pode usar a reação para um ataque com a adaga. Se usar a reação em Palavras de Interrupção, não sobra reação para isso.</p>` },
    { title:'Zombaria Viciosa', sub:'Truque · TR de Sabedoria · 1d4 psíquico · 18 m', body:`
      <p><b>Como funciona:</b> você escolhe uma criatura a até 18 m que possa ouvi-lo; ela faz teste de resistência de Sabedoria contra <b>CD {dc}</b>. Falhou: <b>1d4</b> psíquico e desvantagem na próxima jogada de ataque dela antes do fim do próximo turno dela. Passou: nada acontece (não há metade do dano).</p>
      <p><b>Truque de mesa:</b> não gasta espaço de magia. Use no inimigo que está atacando um aliado. O dano sobe para 2d4 no 5º nível.</p>` },
    { title:'Sussurros Dissonantes', sub:'Magia de 1º nível · TR de Sabedoria · 3d6 psíquico · 18 m', body:`
      <p><b>Como funciona:</b> você escolhe uma criatura a até 18 m; ela faz teste de resistência de Sabedoria contra <b>CD {dc}</b>. Falhou: <b>3d6</b> psíquico e usa a reação dela para fugir de você o máximo que puder. Passou: metade do dano e não foge.</p>
      <p><b>Truque de mesa:</b> se o alvo estiver ao lado de um aliado seu, a fuga provoca <b>ataque de oportunidade</b> do aliado. Criatura surda passa automaticamente.</p>
      <p><b>Com espaço de 2º nível:</b> 4d6. Texto completo na aba Magias.</p>` },
    { title:'Onda Trovejante', sub:'Magia de 1º nível · TR de Constituição · 2d8 trovejante · cubo de 4,5 m', body:`
      <p><b>Como funciona:</b> um cubo de 4,5 m com origem em você. Cada criatura dentro faz teste de resistência de Constituição contra <b>CD {dc}</b>. Falhou: <b>2d8</b> trovejante e é empurrada 3 m para longe. Passou: metade do dano e sem empurrão.</p>
      <p><b>Atenção:</b> faz um estrondo audível a até 90 m, então não é discreta. Não distingue aliados de inimigos: posicione-se antes. Com espaço de 2º nível: 3d8.</p>` },
  ],

  turnCards:[
    { title:'Ação', sub:'Uma por turno', body:`<ul>
      <li><b>Atacar</b> — adaga ({atk_dag}, {dmg_dag}), corpo a corpo ou arremessada.</li>
      <li><b>Conjurar</b> — Sussurros Dissonantes (CD {dc}, 3d6), Onda Trovejante (CD {dc}, 2d8), Enfeitiçar Pessoa, Perdição, Detectar Pensamentos, Coroa da Loucura; truques Zombaria Viciosa (1d4) e Mensagem.</li>
      <li><b>Mãos Consagradas</b> — toca uma criatura e devolve PV da reserva de {lohPool} (ou gasta 5 para curar doença ou veneno).</li>
      <li><b>Sentido Divino</b> — até o fim do seu próximo turno, sente celestiais, corruptores e mortos-vivos a até 18 m ({senseUses} usos).</li>
      <li><b>Gerais</b> — Disparada (dobra o movimento), Desengajar (sem ataques de oportunidade), Esquivar (ataques contra você com desvantagem; TR de Des com vantagem), Ajudar, Esconder (Furtividade {sk_furtividade}), Procurar (Percepção {sk_percepcao}), Usar um objeto.</li></ul>` },
    { title:'Ação bônus', sub:'Uma por turno, só se algo conceder', body:`<ul>
      <li><b>Inspiração de Bardo</b> — um aliado a até 18 m que possa ouvi-lo ganha um {inspDie} para somar a um ataque, teste ou resistência nos próximos 10 minutos. {inspUses} usos por descanso longo.</li>
      <li><b>Regra:</b> se conjurar uma magia como ação bônus (nenhuma das suas é), só pode conjurar mais um truque de 1 ação no turno. Inspiração não é magia, então pode inspirar e conjurar no mesmo turno.</li></ul>` },
    { title:'Reação', sub:'Uma por rodada, recupera no início do seu turno', body:`<ul>
      <li><b>Palavras de Interrupção</b> — quando um inimigo a até 18 m que possa ouvi-lo faz um ataque, teste de atributo ou jogada de dano: gasta 1 Inspiração e subtrai {inspDie} do resultado. Pode esperar o número sair, mas decide antes de o mestre dizer se acertou.</li>
      <li><b>Ataque de oportunidade</b> — adaga contra quem sair do seu alcance.</li></ul>` },
    { title:'Regras rápidas', sub:'Movimento, concentração, críticos, 0 PV', body:`<ul>
      <li><b>Movimento:</b> 9 m, pode dividir antes e depois da ação. Levantar-se gasta metade. Terreno difícil custa o dobro.</li>
      <li><b>Concentração:</b> Perdição, Detectar Pensamentos e Coroa da Loucura exigem concentração — <b>só uma delas por vez</b>; conjurar outra encerra a anterior. Ao sofrer dano, teste de resistência de Constituição ({conS}) CD 10 ou metade do dano, o que for maior.</li>
      <li><b>Vantagem/Desvantagem:</b> rola 2d20 e usa o maior/menor; não acumulam, e se houver as duas, cancelam.</li>
      <li><b>Crítico:</b> 20 natural acerta sempre e dobra todos os dados de dano. 1 natural erra sempre. Magias com teste de resistência não têm crítico.</li>
      <li><b>Cobertura:</b> meia +2 CA e TR de Des; três quartos +5; total não pode ser alvo.</li>
      <li><b>Escuridão / invisível:</b> ataques contra o que não vê têm desvantagem; ataques de quem não é visto têm vantagem. Humano não tem visão no escuro.</li>
      <li><b>0 PV:</b> cai inconsciente. No início de cada turno seu, rola d20: 10+ sucesso, 9− falha; 3 sucessos estabiliza, 3 falhas morre. 1 natural = 2 falhas; 20 natural = volta com 1 PV. Sofrer dano a 0 PV = 1 falha (2 se crítico). Alguém pode estabilizá-lo com Sabedoria (Medicina) CD 10.</li>
      <li><b>Morte instantânea:</b> dano que leve a 0 PV com sobra igual ou maior que o PV máximo mata na hora.</li>
      <li><b>Descanso curto</b> (1 h): gaste dados de vida (d8 do Bardo ou d10 do Paladino, + {conS} cada) e, se você tocar, cada um que gastar dados cura +{restDie} (Canção do Descanso). Espaços de Bardo <b>não</b> voltam. <b>Descanso longo</b> (8 h): todos os PV, espaços, Inspirações, usos de Sentido Divino, a reserva de Mãos Consagradas e metade dos dados de vida (mínimo 1).</li></ul>` },
  ],

  spellSections:[
    {id:'c', title:'Truques'},
    {id:'l1', title:'1º nível', note:'4 espaços de 1º nível. Também podem ser conjuradas com um espaço de 2º.'},
    {id:'l2', title:'2º nível', note:'2 espaços de 2º nível.'},
  ],
  spells:[
    { list:'c', name:'Mensagem', sub:'Truque · Transmutação', time:'1 ação', range:'36 m', comp:'V, S, M (um pequeno pedaço de fio de cobre)', dur:'1 rodada',
      desc:[
        'Você aponta o dedo para uma criatura dentro do alcance e sussurra uma mensagem. O alvo (e somente ele) ouve a mensagem e pode responder num sussurro que só você pode ouvir.',
        'Você pode conjurar esta magia através de objetos sólidos se conhecer o alvo e souber que ele está além da barreira. Silêncio mágico, 30 cm de pedra, 2,5 cm de metal comum, uma fina lâmina de chumbo ou 1 m de madeira bloqueiam a magia. A magia não precisa seguir uma linha reta e pode contornar cantos ou passar por aberturas.'
      ],
      mine:'<b>Sokomo:</b> comunicação discreta a até 36 m, sem que mais ninguém ouça — combine planos com o grupo durante uma negociação ou infiltração. Só funciona com um alvo por vez e a resposta dele também é sussurrada.' },
    { list:'c', name:'Zombaria Viciosa', sub:'Truque · Encantamento', time:'1 ação', range:'18 m', comp:'V', dur:'Instantânea',
      desc:[
        'Você lança uma sequência de insultos misturados com encantamentos sutis contra uma criatura à sua escolha dentro do alcance. Se o alvo puder ouvi-lo (embora não precise entendê-lo), ele deve ser bem-sucedido num teste de resistência de Sabedoria ou sofre 1d4 de dano psíquico e tem desvantagem na próxima jogada de ataque que fizer antes do fim do próximo turno dele.',
        'O dano da magia aumenta em 1d4 quando você atinge o 5º nível (2d4), o 11º nível (3d4) e o 17º nível (4d4).'
      ],
      mine:'<b>Sokomo:</b> TR de Sabedoria CD <b>{dc}</b>, <b>1d4</b> psíquico. Sem gastar espaço, dá desvantagem no próximo ataque do alvo — ideal para proteger um aliado ou você mesmo. Criatura surda não é afetada. Se passar no teste, nada acontece.' },
    { list:'l1', name:'Onda Trovejante', sub:'1º nível · Evocação', time:'1 ação', range:'Pessoal (cubo de 4,5 m)', comp:'V, S', dur:'Instantânea',
      desc:[
        'Uma onda de força trovejante varre você. Cada criatura num cubo de 4,5 m originado de você deve fazer um teste de resistência de Constituição. Se falhar, a criatura sofre 2d8 de dano trovejante e é empurrada 3 m para longe de você. Se passar, sofre metade do dano e não é empurrada.',
        'Além disso, objetos soltos que estejam inteiramente dentro da área são empurrados 3 m para longe de você, e a magia emite um estrondo trovejante audível a até 90 m.',
        'Em níveis superiores: ao conjurar com um espaço de 2º nível ou superior, o dano aumenta em 1d8 para cada nível de espaço acima do 1º.'
      ],
      mine:'<b>Sokomo:</b> TR de Constituição CD <b>{dc}</b>, <b>2d8</b> trovejante (3d8 com espaço de 2º). Afasta inimigos corpo a corpo, mas afeta aliados também, e o estrondo alerta quem estiver por perto — não use se precisar de discrição.' },
    { list:'l1', name:'Sussurros Dissonantes', sub:'1º nível · Encantamento', time:'1 ação', range:'18 m', comp:'V', dur:'Instantânea',
      desc:[
        'Você sussurra uma melodia dissonante que só uma criatura à sua escolha dentro do alcance pode ouvir, atormentando-a com uma dor terrível. O alvo deve fazer um teste de resistência de Sabedoria. Se falhar, sofre 3d6 de dano psíquico e deve usar imediatamente sua reação, se disponível, para se mover o máximo que seu deslocamento permitir para longe de você. A criatura não se move para terreno obviamente perigoso, como fogo ou um fosso. Se passar, sofre metade do dano e não precisa se afastar. Uma criatura surda passa automaticamente.',
        'Em níveis superiores: ao conjurar com um espaço de 2º nível ou superior, o dano aumenta em 1d6 para cada nível de espaço acima do 1º.'
      ],
      mine:'<b>Sokomo:</b> TR de Sabedoria CD <b>{dc}</b>, <b>3d6</b> psíquico (4d6 com espaço de 2º). Sem concentração e só componente verbal. A fuga forçada provoca ataques de oportunidade dos seus aliados. Seu melhor dano por espaço.' },
    { list:'l1', name:'Perdição', sub:'1º nível · Encantamento · Concentração', time:'1 ação', range:'9 m', comp:'V, S, M (uma gota de sangue)', dur:'Concentração, até 1 minuto',
      desc:[
        'Até três criaturas à sua escolha que você possa ver dentro do alcance devem fazer um teste de resistência de Carisma. Sempre que um alvo que falhou no teste fizer uma jogada de ataque ou um teste de resistência antes de a magia terminar, deve rolar 1d4 e subtrair o resultado da jogada.',
        'Em níveis superiores: ao conjurar com um espaço de 2º nível ou superior, você pode afetar uma criatura adicional para cada nível de espaço acima do 1º.'
      ],
      mine:'<b>Sokomo:</b> TR de Carisma CD <b>{dc}</b>, até 3 alvos (4 com espaço de 2º). Subtrai 1d4 dos ataques <b>e dos testes de resistência</b> deles — inclusive os contra suas próprias magias (Sussurros, Coroa da Loucura, Enfeitiçar Pessoa). Exige concentração, então não combina com Detectar Pensamentos nem Coroa da Loucura ao mesmo tempo.' },
    { list:'l1', name:'Enfeitiçar Pessoa', sub:'1º nível · Encantamento', time:'1 ação', range:'9 m', comp:'V, S', dur:'1 hora',
      desc:[
        'Você tenta enfeitiçar um humanoide que possa ver dentro do alcance. Ele deve fazer um teste de resistência de Sabedoria, e o faz com vantagem se você ou seus companheiros estiverem lutando contra ele. Se falhar, ele fica enfeitiçado por você até a magia acabar ou até você ou seus companheiros fazerem algo prejudicial a ele. A criatura enfeitiçada o considera um conhecido amigável. Quando a magia termina, a criatura sabe que foi enfeitiçada por você.',
        'Em níveis superiores: ao conjurar com um espaço de 2º nível ou superior, você pode afetar uma criatura adicional para cada nível de espaço acima do 1º. As criaturas devem estar a até 9 m umas das outras quando você as escolhe.'
      ],
      mine:'<b>Sokomo:</b> TR de Sabedoria CD <b>{dc}</b>. Só humanoides. "Enfeitiçado" = não pode atacá-lo e você tem vantagem em testes sociais contra ele; não é controle mental. Sem concentração e dura 1 hora. Ao fim, ele sabe que foi enfeitiçado e provavelmente ficará hostil — tenha uma saída pronta. Com espaço de 2º: 2 alvos.' },
    { list:'l2', name:'Detectar Pensamentos', sub:'2º nível · Adivinhação · Concentração', time:'1 ação', range:'Pessoal', comp:'V, S, M (uma moeda de cobre)', dur:'Concentração, até 1 minuto',
      desc:[
        'Pela duração, você pode ler os pensamentos de certas criaturas. Ao conjurar a magia e como ação em cada turno até o fim dela, você pode focar sua mente em qualquer criatura que possa ver a até 9 m de você. Se a criatura escolhida tiver Inteligência 3 ou menos ou não falar nenhum idioma, ela não é afetada.',
        'Inicialmente você determina os pensamentos superficiais da criatura: o que está passando pela mente dela naquele momento. Como ação, você pode mudar seu foco para os pensamentos de outra criatura ou tentar sondar mais fundo os da mesma criatura. Se sondar mais fundo, o alvo deve fazer um teste de resistência de Sabedoria. Se falhar, você descobre as motivações dela, o estado emocional e algo que a preocupa, ama ou odeia. Se passar, a magia termina. Perguntas feitas em voz alta orientam os pensamentos da criatura, então a magia é especialmente eficaz num interrogatório.',
        'Você também pode usar a magia para detectar a presença de criaturas pensantes que não possa ver. Ao conjurar e como ação em cada turno, você pode procurar pensamentos a até 9 m de você. A magia atravessa barreiras, mas é bloqueada por 60 cm de pedra, 5 cm de qualquer metal exceto chumbo ou uma fina lâmina de chumbo. Não detecta criaturas com Inteligência 3 ou menos nem as que não falam nenhum idioma. Depois de detectar uma criatura assim, você pode ler os pensamentos dela pelo restante da duração, mesmo sem vê-la, contanto que ela ainda esteja dentro do alcance.'
      ],
      mine:'<b>Sokomo:</b> pensamentos superficiais não têm teste; sondar mais fundo exige TR de Sabedoria CD <b>{dc}</b> do alvo, e se ele passar a magia termina. Ótima para interrogatório e infiltração. Exige concentração e uma ação por turno para trocar o foco.' },
    { list:'l2', name:'Coroa da Loucura', sub:'2º nível · Encantamento · Concentração', time:'1 ação', range:'36 m', comp:'V, S', dur:'Concentração, até 1 minuto',
      desc:[
        'Um humanoide à sua escolha que você possa ver dentro do alcance deve ser bem-sucedido num teste de resistência de Sabedoria ou ficar enfeitiçado por você pela duração. Enquanto enfeitiçado dessa forma, uma coroa de ferro retorcida aparece na cabeça do alvo e uma loucura brilha nos olhos dele.',
        'O alvo enfeitiçado deve usar sua ação antes de se mover, em cada um dos turnos dele, para fazer um ataque corpo a corpo contra uma criatura, que não seja ele mesmo, que você escolher mentalmente. O alvo pode agir normalmente no turno dele se você não escolher nenhuma criatura ou se nenhuma criatura estiver ao alcance dele.',
        'Nos seus turnos seguintes, você deve usar sua ação para manter o controle sobre o alvo, ou a magia termina. Além disso, o alvo pode fazer um teste de resistência de Sabedoria no fim de cada turno dele. Se passar, a magia termina.'
      ],
      mine:'<b>Sokomo:</b> TR de Sabedoria CD <b>{dc}</b>; alcance de 36 m. Vire um brutamontes inimigo contra os aliados dele, mas custa a <b>sua ação</b> todo turno para manter o controle e ele repete o teste no fim de cada turno dele. Se você perder o alvo de vista ou ele sair do alcance, o efeito falha. Perdição no mesmo alvo ajuda a fazê-lo falhar, mas as duas exigem concentração, então só uma por vez.' },
  ],

  features:[
    { group:'Raça — Humano', src:"Player's Handbook", items:[
      { name:'Aumento de atributo', use:'passive', sub:'Passivo', desc:['Todos os seus valores de atributo aumentam em 1.'], mine:'<b>Já aplicado</b> nos valores da aba Atributos.' },
      { name:'Idade, tamanho, deslocamento e idiomas', use:'passive', sub:'Passivo', desc:['Humanos atingem a maturidade no fim da adolescência e vivem menos de um século. São Médios, com 1,5 m a mais de 1,8 m de altura. Deslocamento base de 9 m. Falam, leem e escrevem Comum e um idioma extra à escolha.'], mine:'<b>Idioma extra:</b> Élfico. Sem visão no escuro.' },
    ]},
    { group:'Classe — Bardo 3', src:"Player's Handbook · Bardo nível 3", items:[
      { name:'Conjuração', use:'passive', sub:'Nível 1', desc:[
        'Você aprendeu a desembaraçar e remodelar o tecido da realidade em harmonia com seus desejos e sua música. Suas magias fazem parte do seu vasto repertório, uma magia que você pode ajustar a diferentes situações.',
        'Truques: você conhece dois truques da lista do Bardo (mais um no 4º e no 10º nível). Espaços de magia: a tabela do Bardo mostra quantos espaços você tem para conjurar magias de 1º nível ou superior. Você recupera todos os espaços gastos ao terminar um descanso longo.',
        'Magias conhecidas: você conhece magias da lista do Bardo de nível igual ou inferior aos seus espaços (6 no 3º nível). Ao subir de nível, pode trocar uma magia conhecida por outra. Carisma é seu atributo de conjuração. Conjuração em ritual: você pode conjurar qualquer magia conhecida que tenha a marca ritual como ritual. Foco: um instrumento musical.'
      ], mine:'<b>Sokomo:</b> CD <b>{dc}</b> · ataque <b>{spellAtk}</b> · 4 espaços de 1º e 2 de 2º · 2 truques · 6 magias. Testes de resistência que você força: Sabedoria (Zombaria, Sussurros, Enfeitiçar Pessoa, Coroa da Loucura, Detectar Pensamentos), Carisma (Perdição) e Constituição (Onda Trovejante).' },
      { name:'Inspiração de Bardo', use:'bonus', sub:'Nível 1 · ação bônus · {inspDie}', desc:[
        'Você pode inspirar os outros com palavras ou música. Para isso, use uma ação bônus no seu turno para escolher uma criatura que não seja você a até 18 m e que possa ouvi-lo. Essa criatura ganha um dado de Inspiração de Bardo, um d6.',
        'Uma vez nos próximos 10 minutos, a criatura pode rolar o dado e somar o resultado a um teste de atributo, jogada de ataque ou teste de resistência que fizer. Ela pode esperar até depois de rolar o d20 para decidir usar o dado, mas deve decidir antes de o mestre dizer se a jogada teve sucesso ou falha. Depois de rolado, o dado é perdido. Uma criatura só pode ter um dado de Inspiração de Bardo de cada vez.',
        'Você pode usar esta característica um número de vezes igual ao seu modificador de Carisma (mínimo 1). Recupera os usos ao terminar um descanso longo. O dado muda quando você atinge certos níveis: d8 no 5º, d10 no 10º, d12 no 15º.'
      ], mine:'<b>Sokomo:</b> <b>{inspUses}</b> usos por descanso longo, marcados na aba Combate. Dê no início do combate a quem vai fazer a jogada mais importante; o dado vale 10 minutos, então pode ser dado antes de uma negociação também.' },
      { name:'Versatilidade', use:'passive', sub:'Nível 2 · passivo', desc:['Você pode somar metade do seu bônus de proficiência, arredondada para baixo, a qualquer teste de atributo que faça que ainda não inclua seu bônus de proficiência.'],
        mine:'<b>Sokomo:</b> +{half} em toda perícia sem proficiência (já somado na lista), em <b>Iniciativa</b> ({ini}) e em ferramentas sem proficiência. Não vale para ataques nem testes de resistência.' },
      { name:'Canção do Descanso', use:'rest', sub:'Nível 2 · {restDie}', desc:['Você pode usar música ou oratória tranquilizadora para ajudar seus aliados feridos a se recuperarem durante um descanso curto. Se você ou qualquer criatura amigável que possa ouvir sua apresentação recuperar pontos de vida ao gastar dados de vida no fim do descanso curto, cada uma dessas criaturas recupera 1d6 pontos de vida extras. O dado muda para d8 no 9º nível, d10 no 13º e d12 no 17º.'],
        mine:'<b>Sokomo:</b> só quem <b>gastar</b> pelo menos um dado de vida ganha o extra, e é uma vez por descanso, não por dado.' },
      { name:'Aptidão', use:'passive', sub:'Nível 3 · passivo', desc:['Escolha duas das suas perícias com proficiência. Seu bônus de proficiência é dobrado em qualquer teste de atributo que use uma dessas perícias. No 10º nível, você escolhe mais duas.'],
        mine:'<b>Sokomo:</b> Persuasão <b>{sk_persuasao}</b> e Prestidigitação <b>{sk_prestidigitacao}</b> (Destreza + 2 × proficiência).' },
      { name:'Colégio do Conhecimento: Proficiências Bônus', use:'passive', sub:'Nível 3', desc:['Ao entrar no Colégio do Conhecimento no 3º nível, você ganha proficiência em três perícias à sua escolha.'],
        mine:'<b>Sokomo:</b> as três que faltavam entre as oito da ficha (provavelmente Arcanismo, Percepção e Religião — a divisão exata não muda nenhum número).' },
      { name:'Colégio do Conhecimento: Palavras de Interrupção', use:'reaction', sub:'Nível 3 · reação', desc:[
        'Você aprende a usar sua sagacidade para distrair, confundir e minar a confiança e a competência dos outros. Quando uma criatura que você possa ver a até 18 m de você faz uma jogada de ataque, um teste de atributo ou uma jogada de dano, você pode usar sua reação para gastar um dos seus usos de Inspiração de Bardo, rolando o dado e subtraindo o resultado da jogada da criatura.',
        'Você pode escolher usar esta característica depois que a criatura rolar, mas antes de o mestre determinar se a jogada de ataque ou o teste de atributo teve sucesso ou falha, ou antes de a criatura causar o dano. A criatura é imune se não puder ouvi-lo ou se for imune a ser enfeitiçada.'
      ], mine:'<b>Sokomo:</b> −{inspDie} num ataque que acertou por pouco um aliado, ou no dano de um crítico. Usa os mesmos {inspUses} usos da Inspiração — decida se prefere inspirar ou interromper. Gasta a reação, então nada de ataque de oportunidade na mesma rodada.' },
    ]},
    { group:'Classe — Paladino 1', src:"Player's Handbook · Paladino nível 1 (multiclasse)", items:[
      { name:'Multiclasse: Paladino', use:'passive', sub:'Pré-requisito e proficiências', desc:[
        'Para entrar no Paladino por multiclasse, é preciso ter Força 13 e Carisma 13 (e também Carisma 13 na classe atual, o Bardo). Ao ganhar o primeiro nível de Paladino, você ganha proficiência em armaduras leves, armaduras médias, escudos, armas simples e armas marciais. Você não ganha as perícias nem os testes de resistência do Paladino.',
        'Os níveis de Paladino só entram na conta dos espaços de magia a partir do 2º nível de Paladino, que soma metade dos seus níveis de Paladino ao nível de conjurador.'
      ], mine:'<b>Sokomo:</b> Força 8 <b>não cumpre</b> o pré-requisito de Força 13; este multiclasse precisa da aprovação do mestre (regra opcional das mesas). Carisma 17 cumpre o outro. Dados de vida: d10 no nível de Paladino.' },
      { name:'Sentido Divino', use:'action', sub:'Nível 1 · ação · {senseUses} usos', desc:[
        'A presença de mal poderoso se registra nos seus sentidos como um odor nocivo, e o bem poderoso soa como música celestial. Como ação, você pode abrir sua consciência para detectar essas forças. Até o fim do seu próximo turno, você sabe a localização de qualquer celestial, corruptor ou morto-vivo a até 18 m de você que não esteja com cobertura total. Você sabe o tipo (celestial, corruptor ou morto-vivo) de qualquer ser cuja presença sentir, mas não sua identidade. Dentro do mesmo raio, você também detecta a presença de qualquer lugar ou objeto que tenha sido consagrado ou profanado, como pela magia santificar.',
        'Você pode usar esta característica um número de vezes igual a 1 + seu modificador de Carisma. Ao terminar um descanso longo, você recupera todos os usos gastos.'
      ], mine:'<b>Sokomo:</b> <b>{senseUses}</b> usos por descanso longo (1 + Carisma), marcados na aba Combate. Não diz quem é a criatura nem se é hostil, só a posição e o tipo.' },
      { name:'Mãos Consagradas', use:'action', sub:'Nível 1 · ação · reserva de {lohPool} PV', desc:[
        'Seu toque abençoado pode curar ferimentos. Você tem uma reserva de poder de cura que se reabastece quando você termina um descanso longo. Com essa reserva, você pode restaurar um número total de pontos de vida igual ao seu nível de Paladino × 5.',
        'Como ação, você pode tocar uma criatura e sacar poder da reserva para restaurar pontos de vida a ela, até o máximo restante na reserva. Alternativamente, você pode gastar 5 pontos de vida da reserva para curar o alvo de uma doença ou neutralizar um veneno que o afete. Você pode curar várias doenças e neutralizar vários venenos com um único uso, gastando pontos de vida separadamente para cada um. Esta característica não tem efeito em mortos-vivos e constructos.'
      ], mine:'<b>Sokomo:</b> reserva de <b>{lohPool}</b> PV (5 × 1 nível de Paladino), cada pip marca 1 PV gasto. Precisa tocar o alvo, então é curta distância. Útil para levantar um aliado que caiu a 0 PV.' },
    ]},
    { group:'Antecedente — Nobre', src:"Player's Handbook", items:[
      { name:'Posição de Privilégio', use:'social', sub:'Característica de antecedente', desc:['Graças ao seu nascimento nobre, as pessoas tendem a pensar o melhor de você. Você é bem-vindo na alta sociedade, e as pessoas presumem que você tem o direito de estar onde está. O povo comum faz todo o esforço para acomodá-lo e evitar seu desagrado, e outras pessoas de nascimento nobre o tratam como membro da mesma esfera social. Você pode conseguir uma audiência com um nobre local, se precisar.'],
        mine:'<b>Sokomo:</b> anel de sinete e pergaminho de linhagem são a prova. Combine com Persuasão {sk_persuasao} e Enfeitiçar Pessoa para abrir portas sem sacar a adaga.' },
      { name:'Proficiências e equipamento', use:'passive', sub:'Antecedente', desc:['Perícias: História, Persuasão. Ferramentas: um tipo de jogo. Idiomas: um à sua escolha. Equipamento inicial: roupas finas, um anel de sinete, um pergaminho de linhagem e uma bolsa com 25 po.'],
        mine:'<b>Sokomo:</b> idioma extra Halfling. Registre na aba Mais qual jogo e quais três instrumentos.' },
    ]},
  ],
};
