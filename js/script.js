// Função para rolar suavemente para seções
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
                document.body.style.overflow = '';
            }
        }
    }
}

// Função para atualizar o menu ativo
function atualizarMenuAtivo(targetId = null) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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

// Função para lidar com FAQ
function lidarComFAQ() {
    const perguntas = document.querySelectorAll('.faq-question');
    
    perguntas.forEach(pergunta => {
        pergunta.addEventListener('click', function() {
            // Fechar todas as outras respostas
            document.querySelectorAll('.faq-answer').forEach(resposta => {
                if (resposta !== this.nextElementSibling) {
                    resposta.classList.add('hidden');
                    resposta.previousElementSibling.querySelector('i').classList.remove('rotate-180');
                }
            });
            
            // Alternar a resposta atual
            this.querySelector('i').classList.toggle('rotate-180');
            this.nextElementSibling.classList.toggle('hidden');
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
    
    // Mostrar mensagem de sucesso
    const mensagemSucesso = document.createElement('div');
    mensagemSucesso.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    mensagemSucesso.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
    document.body.appendChild(mensagemSucesso);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        mensagemSucesso.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => {
            mensagemSucesso.remove();
        }, 300);
    }, 5000);
    
    formulario.reset();
}

// Função principal para inicializar tudo
function inicializar() {
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

// Esperar o DOM carregar
document.addEventListener('DOMContentLoaded', inicializar);