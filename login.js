// Verificar si ya hay sesión activa
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('drinkly_user');
    if (currentUser) {
        window.location.href = 'index.html';
    }
});

// Manejar envío del formulario
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validaciones
    if (!email || !password) {
        showMessage('Por favor completa todos los campos', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Por favor ingresa un email válido', 'error');
        return;
    }
    
    // Mostrar loading
    showLoading(true);
    
    try {
        // Buscar usuario en Supabase
        const { data: usuario, error } = await supabase
            .from('clientes_web')
            .select('*')
            .eq('email', email)
            .single();
        
        if (error || !usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        // Verificar contraseña
        if (usuario.password !== password) {
            throw new Error('Contraseña incorrecta');
        }
        
        // Guardar sesión
        const userData = {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono,
            direccion: usuario.direccion
        };
        
        localStorage.setItem('drinkly_user', JSON.stringify(userData));
        
        if (remember) {
            localStorage.setItem('drinkly_remember', 'true');
        }
        
        showMessage('¡Inicio de sesión exitoso!', 'success');
        
        // Redireccionar después de 1 segundo
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
        
    } catch (error) {
        showLoading(false);
        console.error('Error:', error);
        
        if (error.message === 'Usuario no encontrado') {
            showMessage('No existe una cuenta con este email', 'error');
        } else if (error.message === 'Contraseña incorrecta') {
            showMessage('Contraseña incorrecta. Intenta nuevamente', 'error');
        } else {
            showMessage('Error al iniciar sesión. Intenta nuevamente', 'error');
        }
    }
});

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar mensaje
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message-box ${type} show`;
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 5000);
}

// Mostrar/ocultar loading
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}