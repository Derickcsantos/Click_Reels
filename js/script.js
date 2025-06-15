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

// Função para rolar suavemente para seções e destacar menu ativo
function rolarParaSecao(event) {
    if (this.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Atualizar URL sem recarregar a página
            history.pushState(null, null, targetId);
            
            // Atualizar menu ativo
            atualizarMenuAtivo(targetId);
            
            // Fechar menu mobile se estiver aberto
            const menuMobile = document.getElementById('mobileMenu');
            if (!menuMobile.classList.contains('hidden')) {
                menuMobile.classList.add('hidden');
            }
        }
    }
}

// Função para atualizar o menu ativo baseado na seção visível
function atualizarMenuAtivo(targetId = null) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Se um targetId foi fornecido, usar ele
    if (targetId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
        return;
    }
    
    // Caso contrário, determinar a seção visível
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = `#${section.getAttribute('id')}`;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Função para mostrar/ocultar menu mobile
function toggleMenuMobile() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
    document.body.style.overflow = menu.classList.contains('hidden') ? '' : 'hidden';
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
    
    // Atualizar menu ativo
    atualizarMenuAtivo('#inicio');
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
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMenuMobile);
    }
    
    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', toggleMenuMobile);
    }
    
    // Botão scroll up
    const scrollUpButton = document.getElementById('scrollUp');
    if (scrollUpButton) {
        scrollUpButton.addEventListener('click', rolarParaTopo);
        window.addEventListener('scroll', toggleScrollUpButton);
        toggleScrollUpButton(); // Verificar estado inicial
    }
    
    // Animar elementos ao rolar
    window.addEventListener('scroll', animarAoRolar);
    animarAoRolar(); // Executar uma vez ao carregar
    
    // Lidar com menu ativo
    window.addEventListener('scroll', atualizarMenuAtivo);
    atualizarMenuAtivo(); // Executar uma vez ao carregar
    
    // Se houver hash na URL, rolar para a seção correspondente
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                atualizarMenuAtivo(window.location.hash);
            }, 100);
        }
    }
    
    // FAQ
    lidarComFAQ();
    
    // Formulário de contato
    const formularioContato = document.getElementById('contactForm');
    if (formularioContato) {
        formularioContato.addEventListener('submit', enviarFormularioContato);
    }
}

// Método alternativo

// Esperar o DOM carregar
document.addEventListener('DOMContentLoaded', inicializar);