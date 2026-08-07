// Église MEDAS — scripts communs (vanilla JS, aucune dépendance externe)
document.addEventListener('DOMContentLoaded', function () {
  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
  // Copier un numéro de don (Wave / Orange Money)
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-copy');
      if (!value) return;
      var reset = function () {
        btn.textContent = btn.getAttribute('data-label') || 'Copier le numéro';
        btn.removeAttribute('data-copied');
      };
      var showCopied = function () {
        btn.setAttribute('data-copied', 'true');
        btn.textContent = 'Copié ✓';
        setTimeout(reset, 1800);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(showCopied).catch(function () {
          window.prompt('Copiez ce numéro :', value);
        });
      } else {
        window.prompt('Copiez ce numéro :', value);
      }
    });
  });
  // Menu déroulant "Église"
  document.querySelectorAll('.nav-dropdown-toggle').forEach(function (btn) {
    var parent = btn.closest('.nav-dropdown');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = parent.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
      d.classList.remove('open');
      var b = d.querySelector('.nav-dropdown-toggle');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  var verseCombo = document.getElementById('verseCombo');
  if (!verseCombo) return; // section absente sur cette page, on arrête ici

  // 33 versets — FR (Louis Segond), EN (King James, domaine public), ES (Reina Valera)
  // ⚠️ Traductions ES fournies au mieux ; à faire relire si possible avant publication.
  var verses = [
    { ref:"Jean 8:36", text:"Si donc le Fils vous affranchit, vous serez réellement libres.",
      refEn:"John 8:36", textEn:"If the Son therefore shall make you free, ye shall be free indeed.",
      refEs:"Juan 8:36", textEs:"Así que, si el Hijo os libertare, seréis verdaderamente libres.",
      refDe:"Johannes 8:36", textDe:"So euch nun der Sohn frei macht, so seid ihr recht frei." },
    { ref:"Ésaïe 61:1", text:"L'Esprit de l'Éternel est sur moi, car l'Éternel m'a oint pour proclamer aux captifs la liberté, et aux prisonniers la délivrance.",
      refEn:"Isaiah 61:1", textEn:"The Spirit of the Lord GOD is upon me, to proclaim liberty to the captives, and the opening of the prison to them that are bound.",
      refEs:"Isaías 61:1", textEs:"El Espíritu de Jehová está sobre mí, porque me ungió Jehová para publicar libertad a los cautivos, y a los presos apertura de la cárcel.",
      refDe:"Jesaja 61:1", textDe:"Der Geist des Herrn HERRN ist über mir, weil mich der HERR gesalbt hat, den Gefangenen Freiheit zu verkündigen und den Gebundenen Befreiung." },
    { ref:"Psaume 91:16", text:"Je le rassasierai de longs jours, et je lui ferai voir mon salut.",
      refEn:"Psalm 91:16", textEn:"With long life will I satisfy him, and shew him my salvation.",
      refEs:"Salmo 91:16", textEs:"Lo saciaré de larga vida, Y le mostraré mi salvación.",
      refDe:"Psalm 91:16", textDe:"Ich will ihn sättigen mit langem Leben und will ihm zeigen mein Heil." },
    { ref:"Jean 3:16", text:"Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      refEn:"John 3:16", textEn:"For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      refEs:"Juan 3:16", textEs:"Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
      refDe:"Johannes 3:16", textDe:"Also hat Gott die Welt geliebt, dass er seinen eingeborenen Sohn gab, auf dass alle, die an ihn glauben, nicht verloren werden, sondern das ewige Leben haben." },
    { ref:"Philippiens 4:13", text:"Je puis tout par celui qui me fortifie.",
      refEn:"Philippians 4:13", textEn:"I can do all things through Christ which strengtheneth me.",
      refEs:"Filipenses 4:13", textEs:"Todo lo puedo en Cristo que me fortalece.",
      refDe:"Philipper 4:13", textDe:"Ich vermag alles durch den, der mich mächtig macht, Christus." },
    { ref:"Romains 10:9", text:"Si tu confesses de ta bouche le Seigneur Jésus, et si tu crois dans ton cœur que Dieu l'a ressuscité des morts, tu seras sauvé.",
      refEn:"Romans 10:9", textEn:"That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.",
      refEs:"Romanos 10:9", textEs:"Que si confesares con tu boca al Señor Jesús, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo.",
      refDe:"Römer 10:9", textDe:"Denn so du mit deinem Munde bekennst Jesum, dass er der HERR sei, und glaubst in deinem Herzen, dass ihn Gott von den Toten auferweckt hat, so wirst du selig." },
    { ref:"Psaume 23:1", text:"L'Éternel est mon berger : je ne manquerai de rien.",
      refEn:"Psalm 23:1", textEn:"The LORD is my shepherd; I shall not want.",
      refEs:"Salmo 23:1", textEs:"Jehová es mi pastor; nada me faltará.",
      refDe:"Psalm 23:1", textDe:"Der HERR ist mein Hirte, mir wird nichts mangeln." },
    { ref:"Proverbes 3:5-6", text:"Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse ; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.",
      refEn:"Proverbs 3:5-6", textEn:"Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
      refEs:"Proverbios 3:5-6", textEs:"Fíate de Jehová de todo tu corazón, y no estribes en tu prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
      refDe:"Sprüche 3:5-6", textDe:"Verlass dich auf den HERRN von ganzem Herzen und verlass dich nicht auf deinen Verstand, sondern gedenke an ihn in allen deinen Wegen, so wird er dich recht führen." },
    { ref:"Matthieu 11:28", text:"Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
      refEn:"Matthew 11:28", textEn:"Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      refEs:"Mateo 11:28", textEs:"Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
      refDe:"Matthäus 11:28", textDe:"Kommet her zu mir alle, die ihr mühselig und beladen seid; ich will euch erquicken." },
    { ref:"Jérémie 29:11", text:"Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
      refEn:"Jeremiah 29:11", textEn:"For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
      refEs:"Jeremías 29:11", textEs:"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
      refDe:"Jeremia 29:11", textDe:"Denn ich weiß wohl, was ich für Gedanken über euch habe, spricht der HERR: Gedanken des Friedens und nicht des Leides, dass ich euch gebe das Ende, des ihr wartet." },
    { ref:"Psaume 46:1", text:"Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.",
      refEn:"Psalm 46:1", textEn:"God is our refuge and strength, a very present help in trouble.",
      refEs:"Salmo 46:1", textEs:"Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones.",
      refDe:"Psalm 46:2", textDe:"Gott ist unsre Zuversicht und Stärke, eine Hilfe in den großen Nöten, die uns getroffen haben." },
    { ref:"Romains 8:28", text:"Nous savons que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.",
      refEn:"Romans 8:28", textEn:"And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      refEs:"Romanos 8:28", textEs:"Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.",
      refDe:"Römer 8:28", textDe:"Wir wissen aber, dass denen, die Gott lieben, alle Dinge zum Besten dienen, denen, die nach dem Vorsatz berufen sind." },
    { ref:"Psaume 27:1", text:"L'Éternel est ma lumière et mon salut : de qui aurais-je crainte ? L'Éternel est le soutien de ma vie : de qui aurais-je peur ?",
      refEn:"Psalm 27:1", textEn:"The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?",
      refEs:"Salmo 27:1", textEs:"Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?",
      refDe:"Psalm 27:1", textDe:"Der HERR ist mein Licht und mein Heil; vor wem sollte ich mich fürchten? Der HERR ist meines Lebens Kraft; vor wem sollte mir grauen?" },
    { ref:"Ésaïe 41:10", text:"Ne crains rien, car je suis avec toi ; ne prends pas d'inquiétude, car je suis ton Dieu ; je te fortifie, je viens à ton secours.",
      refEn:"Isaiah 41:10", textEn:"Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.",
      refEs:"Isaías 41:10", textEs:"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré.",
      refDe:"Jesaja 41:10", textDe:"So fürchte dich nicht, denn ich bin mit dir; weiche nicht, denn ich bin dein Gott. Ich stärke dich, ich helfe dir auch." },
    { ref:"Matthieu 6:33", text:"Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.",
      refEn:"Matthew 6:33", textEn:"But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
      refEs:"Mateo 6:33", textEs:"Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.",
      refDe:"Matthäus 6:33", textDe:"Trachtet am ersten nach dem Reich Gottes und nach seiner Gerechtigkeit, so wird euch solches alles zufallen." },
    { ref:"Josué 1:9", text:"Fortifie-toi et prends courage ; ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.",
      refEn:"Joshua 1:9", textEn:"Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
      refEs:"Josué 1:9", textEs:"Esfuérzate y sé valiente; no temas ni desmayes, porque Jehová tu Dios será contigo en dondequiera que vayas.",
      refDe:"Josua 1:9", textDe:"Sei getrost und unverzagt; denn der HERR, dein Gott, ist mit dir in allem, was du tun wirst." },
    { ref:"Psaume 34:18", text:"L'Éternel est près de ceux qui ont le cœur brisé, et il sauve ceux qui ont l'esprit dans l'abattement.",
      refEn:"Psalm 34:18", textEn:"The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
      refEs:"Salmo 34:18", textEs:"Cercano está Jehová a los quebrantados de corazón; Y salva a los contritos de espíritu.",
      refDe:"Psalm 34:19", textDe:"Der HERR ist nahe bei denen, die zerbrochenen Herzens sind, und hilft denen, die ein zerschlagenes Gemüt haben." },
    { ref:"2 Corinthiens 5:17", text:"Si quelqu'un est en Christ, il est une nouvelle création. Les choses anciennes sont passées ; voici, toutes choses sont devenues nouvelles.",
      refEn:"2 Corinthians 5:17", textEn:"Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",
      refEs:"2 Corintios 5:17", textEs:"De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.",
      refDe:"2. Korinther 5:17", textDe:"Darum, ist jemand in Christus, so ist er eine neue Kreatur; das Alte ist vergangen, siehe, es ist alles neu geworden." },
    { ref:"Galates 5:22-23", text:"Le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité.",
      refEn:"Galatians 5:22-23", textEn:"But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith.",
      refEs:"Gálatas 5:22-23", textEs:"Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe.",
      refDe:"Galater 5:22-23", textDe:"Die Frucht aber des Geistes ist Liebe, Freude, Friede, Geduld, Freundlichkeit, Gütigkeit, Glaube." },
    { ref:"Éphésiens 2:8", text:"C'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu.",
      refEn:"Ephesians 2:8", textEn:"For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.",
      refEs:"Efesios 2:8", textEs:"Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.",
      refDe:"Epheser 2:8", textDe:"Denn aus Gnade seid ihr selig geworden durch den Glauben, und das nicht aus euch: Gottes Gabe ist es." },
    { ref:"Psaume 121:1-2", text:"Je lève mes yeux vers les montagnes... D'où me viendra le secours ? Le secours me vient de l'Éternel, qui a fait les cieux et la terre.",
      refEn:"Psalm 121:1-2", textEn:"I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.",
      refEs:"Salmo 121:1-2", textEs:"Alzaré mis ojos a los montes; ¿De dónde vendrá mi socorro? Mi socorro viene de Jehová, Que hizo los cielos y la tierra.",
      refDe:"Psalm 121:1-2", textDe:"Ich hebe meine Augen auf zu den Bergen. Woher kommt mir Hilfe? Meine Hilfe kommt vom HERRN, der Himmel und Erde gemacht hat." },
    { ref:"Romains 12:2", text:"Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence.",
      refEn:"Romans 12:2", textEn:"And be not conformed to this world: but be ye transformed by the renewing of your mind.",
      refEs:"Romanos 12:2", textEs:"No os conforméis a este siglo; mas transformaos por medio de la renovación de vuestro entendimiento.",
      refDe:"Römer 12:2", textDe:"Und stellt euch nicht dieser Welt gleich, sondern verändert euch durch die Erneuerung eures Sinnes." },
    { ref:"Psaume 34:8", text:"Sentez et voyez combien l'Éternel est bon ! Heureux l'homme qui cherche en lui son refuge !",
      refEn:"Psalm 34:8", textEn:"O taste and see that the LORD is good: blessed is the man that trusteth in him.",
      refEs:"Salmo 34:8", textEs:"Gustad, y ved que es bueno Jehová; Bienaventurado el hombre que confía en él.",
      refDe:"Psalm 34:9", textDe:"Schmecket und sehet, wie freundlich der HERR ist. Wohl dem, der auf ihn traut!" },
    { ref:"Jean 14:6", text:"Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.",
      refEn:"John 14:6", textEn:"I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
      refEs:"Juan 14:6", textEs:"Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.",
      refDe:"Johannes 14:6", textDe:"Ich bin der Weg und die Wahrheit und das Leben; niemand kommt zum Vater denn durch mich." },
    { ref:"Actes 16:31", text:"Crois au Seigneur Jésus, et tu seras sauvé, toi et ta famille.",
      refEn:"Acts 16:31", textEn:"Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house.",
      refEs:"Hechos 16:31", textEs:"Cree en el Señor Jesucristo, y serás salvo, tú y tu casa.",
      refDe:"Apostelgeschichte 16:31", textDe:"Glaube an den Herrn Jesus Christus, so wirst du und dein Haus selig!" },
    { ref:"1 Jean 1:9", text:"Si nous confessons nos péchés, il est fidèle et juste pour nous les pardonner, et pour nous purifier de toute iniquité.",
      refEn:"1 John 1:9", textEn:"If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
      refEs:"1 Juan 1:9", textEs:"Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.",
      refDe:"1. Johannes 1:9", textDe:"So wir aber unsre Sünden bekennen, so ist er treu und gerecht, dass er uns die Sünden vergibt und reinigt uns von aller Untugend." },
    { ref:"Psaume 103:2-3", text:"Mon âme, bénis l'Éternel, et n'oublie aucun de ses bienfaits ! C'est lui qui pardonne toutes tes iniquités, qui guérit toutes tes maladies.",
      refEn:"Psalm 103:2-3", textEn:"Bless the LORD, O my soul, and forget not all his benefits: who forgiveth all thine iniquities; who healeth all thy diseases.",
      refEs:"Salmo 103:2-3", textEs:"Bendice, alma mía, a Jehová, Y no olvides ninguno de sus beneficios. Él es quien perdona todas tus iniquidades, El que sana todas tus dolencias.",
      refDe:"Psalm 103:2-3", textDe:"Lobe den HERRN, meine Seele, und vergiss nicht, was er dir Gutes getan hat: der dir alle deine Sünde vergibt und heilet alle deine Gebrechen." },
    { ref:"Hébreux 11:1", text:"La foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas.",
      refEn:"Hebrews 11:1", textEn:"Now faith is the substance of things hoped for, the evidence of things not seen.",
      refEs:"Hebreos 11:1", textEs:"Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.",
      refDe:"Hebräer 11:1", textDe:"Es ist aber der Glaube eine gewisse Zuversicht des, das man hofft, und ein Nichtzweifeln an dem, das man nicht sieht." },
    { ref:"Psaume 121:8", text:"L'Éternel gardera ton départ et ton arrivée, dès maintenant et à jamais.",
      refEn:"Psalm 121:8", textEn:"The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore.",
      refEs:"Salmo 121:8", textEs:"Jehová guardará tu salida y tu entrada Desde ahora y para siempre.",
      refDe:"Psalm 121:8", textDe:"Der HERR behüte deinen Ausgang und Eingang von nun an bis in Ewigkeit!" },
    { ref:"Nombres 6:24-26", text:"Que l'Éternel te bénisse, et qu'il te garde ! Que l'Éternel fasse luire sa face sur toi, et qu'il t'accorde sa grâce ! Que l'Éternel te donne la paix !",
      refEn:"Numbers 6:24-26", textEn:"The LORD bless thee, and keep thee: the LORD make his face shine upon thee, and be gracious unto thee, and give thee peace.",
      refEs:"Números 6:24-26", textEs:"Jehová te bendiga, y te guarde; Jehová haga resplandecer su rostro sobre ti, y tenga de ti misericordia; Jehová alce sobre ti su rostro, y ponga en ti paz.",
      refDe:"4. Mose 6:24-26", textDe:"Der HERR segne dich und behüte dich; der HERR lasse sein Angesicht leuchten über dir und sei dir gnädig; der HERR erhebe sein Angesicht auf dich und gebe dir Frieden." },
    { ref:"Psaume 37:4", text:"Fais de l'Éternel tes délices, et il te donnera ce que ton cœur désire.",
      refEn:"Psalm 37:4", textEn:"Delight thyself also in the LORD; and he shall give thee the desires of thine heart.",
      refEs:"Salmo 37:4", textEs:"Deléitate asimismo en Jehová, Y él te concederá las peticiones de tu corazón.",
      refDe:"Psalm 37:4", textDe:"Habe deine Lust am HERRN; der wird dir geben, was dein Herz wünschet." },
    { ref:"Ésaïe 40:31", text:"Ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles ; ils courent, et ne se lassent point.",
      refEn:"Isaiah 40:31", textEn:"But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary.",
      refEs:"Isaías 40:31", textEs:"Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán.",
      refDe:"Jesaja 40:31", textDe:"Aber die auf den HERRN harren, kriegen neue Kraft, dass sie auffahren mit Flügeln wie Adler, dass sie laufen und nicht matt werden, dass sie wandeln und nicht müde werden." },
    { ref:"Matthieu 7:7", text:"Demandez, et l'on vous donnera ; cherchez, et vous trouverez ; frappez, et l'on vous ouvrira.",
      refEn:"Matthew 7:7", textEn:"Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.",
      refEs:"Mateo 7:7", textEs:"Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá.",
      refDe:"Matthäus 7:7", textDe:"Bittet, so wird euch gegeben; suchet, so werdet ihr finden; klopfet an, so wird euch aufgetan." }
  ];

  var current = 0;
  var isPlaying = false; // true pendant toute la lecture en continu (tous les versets à la suite)
  var autoTimer = null;
  var verseLang = 'fr'; // synchronisé avec le sélecteur de langue général

  var verseCounter = document.getElementById('verseCounter');
  var verseDots = document.getElementById('verseDots');
  var playBtn = document.getElementById('playBtn');
  var playIcon = document.getElementById('playIcon');
  var playLabel = document.getElementById('playLabel');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');

  var SPEECH_LOCALES = { fr: 'fr-FR', en: 'en-US', es: 'es-ES', de: 'de-DE' };
  var IDLE_LABELS = { fr: 'Écouter FR', en: 'Listen EN', es: 'Escuchar ES', de: 'Anhören DE' };

  function buildDots() {
    verseDots.innerHTML = '';
    verses.forEach(function (_, i) {
      var d = document.createElement('button');
      d.className = 'dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', 'Aller au verset ' + (i + 1));
      d.onclick = function () { stopPlaying(); goTo(i); };
      verseDots.appendChild(d);
    });
  }

  function currentRef() {
    var v = verses[current];
    if (verseLang === 'en') return v.refEn;
    if (verseLang === 'es') return v.refEs;
    if (verseLang === 'de') return v.refDe;
    return v.ref;
  }
  function currentText() {
    var v = verses[current];
    if (verseLang === 'en') return v.textEn;
    if (verseLang === 'es') return v.textEs;
    if (verseLang === 'de') return v.textDe;
    return v.text;
  }

  // Met à jour uniquement l'affichage (texte, référence, compteur, points) — ne touche pas à l'audio
  function renderDisplay() {
    verseCombo.innerHTML = '<span class="verse-ref-inline">' + currentRef() + '</span> — ' + currentText();
    verseCounter.textContent = (current + 1) + ' / ' + verses.length;
    Array.prototype.forEach.call(verseDots.children, function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  function updatePlayButton() {
    if (isPlaying) {
      playIcon.textContent = '⏸';
      playLabel.textContent = 'Pause';
      playBtn.classList.add('is-playing');
    } else {
      playIcon.textContent = '▶';
      playLabel.textContent = IDLE_LABELS[verseLang] || IDLE_LABELS.fr;
      playBtn.classList.remove('is-playing');
    }
  }

  // Navigation manuelle (flèches, points) : change de verset sans lancer la lecture
  function goTo(i) {
    current = (i + verses.length) % verses.length;
    renderDisplay();
    resetAutoTimer();
  }

  // Lit le verset courant, puis enchaîne automatiquement sur le suivant, en boucle,
  // tant que isPlaying reste vrai (lecture "en continu" de tous les versets)
  function speakCurrentThenAdvance() {
    if (!('speechSynthesis' in window)) {
      alert("La lecture audio n'est pas prise en charge par ce navigateur.");
      isPlaying = false;
      updatePlayButton();
      return;
    }
    window.speechSynthesis.cancel();
    var utter = new SpeechSynthesisUtterance(currentText());
    utter.lang = SPEECH_LOCALES[verseLang] || SPEECH_LOCALES.fr;
    utter.rate = 0.95;
    utter.onend = function () {
      if (!isPlaying) return; // l'utilisateur a appuyé sur pause entre-temps
      current = (current + 1) % verses.length;
      renderDisplay();
      speakCurrentThenAdvance();
    };
    window.speechSynthesis.speak(utter);
  }

  function startPlaying() {
    isPlaying = true;
    updatePlayButton();
    clearInterval(autoTimer); // on arrête le défilement automatique pendant la lecture audio
    speakCurrentThenAdvance();
  }

  function stopPlaying() {
    isPlaying = false;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    updatePlayButton();
    resetAutoTimer(); // le défilement automatique reprend quand la lecture est arrêtée
  }

  function resetAutoTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(function () { goTo(current + 1); }, 10000);
  }

  playBtn.onclick = function () { isPlaying ? stopPlaying() : startPlaying(); };
  prevBtn.onclick = function () { stopPlaying(); goTo(current - 1); };
  nextBtn.onclick = function () { stopPlaying(); goTo(current + 1); };

  buildDots();
  renderDisplay();
  resetAutoTimer();

  // Pont utilisé par le sélecteur de langue général (voir bloc plus bas)
  window.medasUpdateVerseLanguage = function (lang) {
    verseLang = lang;
    stopPlaying();
    renderDisplay();
    updatePlayButton();
  };
});

// Formulaire de contact (page contact) — envoi automatique par e-mail via Web3Forms
// (service gratuit qui reçoit le formulaire et le transfère par e-mail — voir LISEZ-MOI.md
// pour la clé à configurer). Si la clé n'est pas configurée, on retombe sur mailto: en secours.
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var formNote = document.getElementById('formNote');
  var submitBtn = form.querySelector('.form-submit');

  function fallbackToMailto() {
    var nom = form.nom.value.trim();
    var prenom = form.prenom.value.trim();
    var tel = form.telephone.value.trim();
    var email = form.email.value.trim();
    var sujet = form.sujet.value.trim() || 'Message depuis le site MEDAS';
    var message = form.message.value.trim();

    var bodyLines = [
      'Nom : ' + nom + ' ' + prenom,
      tel ? 'Téléphone : ' + tel : '',
      email ? 'Email : ' + email : '',
      '',
      message
    ].filter(Boolean);

    var mailto = 'mailto:eglisemedasyamoussoukro@gmail.com'
      + '?subject=' + encodeURIComponent(sujet)
      + '&body=' + encodeURIComponent(bodyLines.join('\n'));

    window.location.href = mailto;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var accessKey = form.access_key.value.trim();
    if (!accessKey || accessKey === 'COLLEZ_VOTRE_CLE_WEB3FORMS_ICI') {
      // La clé n'a pas encore été configurée : on utilise mailto en secours.
      fallbackToMailto();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: form.subject.value,
        name: form.nom.value.trim() + ' ' + form.prenom.value.trim(),
        telephone: form.telephone.value.trim(),
        email: form.email.value.trim(),
        sujet: form.sujet.value.trim(),
        message: form.message.value.trim()
      })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          form.reset();
          formNote.textContent = '✅ Message envoyé ! Nous vous répondrons dès que possible.';
          formNote.style.color = 'var(--blue-900)';
          formNote.style.fontWeight = '700';
        } else {
          formNote.textContent = "⚠️ L'envoi a échoué. Réessayez, ou contactez-nous par téléphone/WhatsApp.";
        }
      })
      .catch(function () {
        formNote.textContent = "⚠️ Connexion impossible. Vérifiez votre connexion internet, ou contactez-nous par téléphone/WhatsApp.";
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer le message';
      });
  });
});

// Sélecteur de langue FR / EN / ES — fonctionne sur toutes les pages qui ont des
// éléments avec des attributs data-fr / data-en / data-es (nav, hero, bandeau de versets…)
document.addEventListener('DOMContentLoaded', function () {
  var langSelect = document.getElementById('langSelect');
  if (!langSelect) return; // pas de sélecteur sur cette page

  function applyStaticTranslations(lang) {
    document.querySelectorAll('[data-fr]').forEach(function (el) {
      var value = el.getAttribute('data-' + lang);
      if (value !== null) el.textContent = value;
    });
  }

  function setLanguage(lang) {
    applyStaticTranslations(lang);
    if (typeof window.medasUpdateVerseLanguage === 'function') {
      window.medasUpdateVerseLanguage(lang);
    }
  }

  langSelect.addEventListener('change', function () {
    setLanguage(langSelect.value);
  });
});
