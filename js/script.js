// Função para inicializar o tema
function inicializarTema() {
    const temaSalvo = localStorage.getItem('tema') || 'light';
    document.documentElement.classList.toggle('dark', temaSalvo === 'dark');
    
    // Atualizar ícones do tema
    atualizarIconesTema(temaSalvo);
}

// Função para alternar o tema
function alternarTema() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    
    const temaAtual = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('tema', temaAtual);
    
    // Atualizar ícones do tema
    atualizarIconesTema(temaAtual);
}

// Função para atualizar ícones do tema
function atualizarIconesTema(tema) {
    const iconesLua = document.querySelectorAll('.fa-moon');
    const iconesSol = document.querySelectorAll('.fa-sun');
    
    if (tema === 'dark') {
        iconesLua.forEach(icone => icone.classList.add('hidden'));
        iconesSol.forEach(icone => icone.classList.remove('hidden'));
    } else {
        iconesLua.forEach(icone => icone.classList.remove('hidden'));
        iconesSol.forEach(icone => icone.classList.add('hidden'));
    }
}

// Função para rolar suavemente para seções
function rolarParaSecao(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Fechar menu mobile se estiver aberto
        const menuMobile = document.getElementById('mobileMenu');
        if (!menuMobile.classList.contains('hidden')) {
            menuMobile.classList.add('hidden');
        }
    }
}

// Função para mostrar/ocultar menu mobile
function toggleMenuMobile() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Função para mostrar/ocultar botão de scroll up
function toggleScrollUpButton() {
    const scrollUpButton = document.getElementById('scrollUp');
    if (window.scrollY > 300) {
        scrollUpButton.classList.remove('hidden');
    } else {
        scrollUpButton.classList.add('hidden');
    }
}

// Função para rolar para o topo
function rolarParaTopo() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Função para animar elementos ao rolar
function animarAoRolar() {
    const elementos = document.querySelectorAll('.animate-fade-in');
    
    elementos.forEach(elemento => {
        const elementoTopo = elemento.getBoundingClientRect().top;
        const alturaJanela = window.innerHeight;
        
        if (elementoTopo < alturaJanela - 100) {
            elemento.classList.add('visible');
        }
    });
}

// Função para lidar com FAQ
function lidarComFAQ() {
    const perguntas = document.querySelectorAll('.faq-question');
    
    perguntas.forEach(pergunta => {
        pergunta.addEventListener('click', function() {
            this.classList.toggle('active');
            const resposta = this.nextElementSibling;
            resposta.classList.toggle('open');
        });
    });
}

// Função para enviar formulário de contato
function enviarFormularioContato(event) {
    event.preventDefault();
    const formulario = event.target;
    const dadosFormulario = new FormData(formulario);
    
    // Simular envio (em produção, usar fetch ou AJAX)
    console.log('Dados do formulário:', Object.fromEntries(dadosFormulario));
    
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    formulario.reset();
}

// Função principal para inicializar tudo
function inicializar() {
    // Inicializar tema
    inicializarTema();
    
    // Adicionar event listeners para alternar tema
    document.querySelectorAll('#themeToggle, #themeToggleMobile').forEach(botao => {
        botao.addEventListener('click', alternarTema);
    });
    
    // Adicionar smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', rolarParaSecao);
    });
    
    // Menu mobile
    document.getElementById('mobileMenuButton').addEventListener('click', toggleMenuMobile);
    document.getElementById('closeMobileMenu').addEventListener('click', toggleMenuMobile);
    
    // Botão scroll up
    document.getElementById('scrollUp').addEventListener('click', rolarParaTopo);
    window.addEventListener('scroll', toggleScrollUpButton);
    
    // Animar elementos ao rolar
    window.addEventListener('scroll', animarAoRolar);
    animarAoRolar(); // Executar uma vez ao carregar
    
    // FAQ
    lidarComFAQ();
    
    // Formulário de contato
    const formularioContato = document.getElementById('contactForm');
    if (formularioContato) {
        formularioContato.addEventListener('submit', enviarFormularioContato);
    }
}

// Esperar o DOM carregar
document.addEventListener('DOMContentLoaded', inicializar);