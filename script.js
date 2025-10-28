// Animación de entrada para las tarjetas de juegos
document.addEventListener('DOMContentLoaded', function() {
    const gameCards = document.querySelectorAll('.game-card');
    const infoCards = document.querySelectorAll('.info-card');
    
    // Animación escalonada para las tarjetas de juegos
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Animación para las tarjetas de información
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });

    // Efecto de partículas en el fondo
    createParticles();
    
    // Comprobar si el usuario está logueado
    checkUserStatus();
});

// Función para verificar el estado del usuario
function checkUserStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('userData');
    
    if (isLoggedIn === 'true' && userData) {
        const user = JSON.parse(userData);
        updateHeaderForLoggedUser(user);
    }
}

// Actualizar el header si el usuario está logueado
function updateHeaderForLoggedUser(user) {
    const nav = document.querySelector('nav');
    if (nav) {
        nav.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="color: #667eea; font-weight: 600;">¡Hola, ${user.name || user.email.split('@')[0]}!</span>
                <button class="btn-secondary" onclick="logout()">Cerrar Sesión</button>
            </div>
        `;
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    location.reload();
}

// Función para crear partículas decorativas
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '0';
    particlesContainer.style.overflow = 'hidden';
    document.body.insertBefore(particlesContainer, document.body.firstChild);

    // Crear múltiples partículas
    for (let i = 0; i < 30; i++) {
        createParticle(particlesContainer);
    }
}

// Crear una partícula individual
function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const startX = Math.random() * 100;
    const duration = Math.random() * 15 + 15;
    const delay = Math.random() * 5;
    
    particle.style.position = 'absolute';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = 'rgba(255, 255, 255, 0.4)';
    particle.style.borderRadius = '50%';
    particle.style.left = startX + '%';
    particle.style.bottom = '-20px';
    particle.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;
    particle.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
    
    container.appendChild(particle);
}

// Añadir las animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
            opacity: 0;
        }
    }
    
    /* Efectos hover mejorados */
    .game-card {
        position: relative;
        overflow: hidden;
    }
    
    .game-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(102, 126, 234, 0.1), transparent);
        transform: rotate(45deg);
        transition: all 0.5s ease;
        opacity: 0;
    }
    
    .game-card:hover::before {
        opacity: 1;
        animation: shine 1.5s ease-in-out;
    }
    
    @keyframes shine {
        0% {
            left: -50%;
        }
        100% {
            left: 150%;
        }
    }
    
    /* Animación de pulso para los iconos */
    .game-icon {
        animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    /* Efecto de resplandor en hover */
    .btn-play:hover {
        animation: glow 1s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from {
            box-shadow: 0 5px 20px rgba(245, 87, 108, 0.4);
        }
        to {
            box-shadow: 0 5px 30px rgba(245, 87, 108, 0.8), 0 0 20px rgba(245, 87, 108, 0.4);
        }
    }
`;
document.head.appendChild(style);

// Hacer disponible la función logout globalmente
window.logout = logout;