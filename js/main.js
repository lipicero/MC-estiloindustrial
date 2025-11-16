document.addEventListener('DOMContentLoaded', function () {
  // Espera a que todo el DOM esté cargado antes de ejecutar el script

<<<<<<< HEAD
  // 1. Toggle de menú
  var btn = document.querySelector('.nav-toggle');          // Selecciona el botón que abre/cierra el menú
  var menu = document.querySelector('.nav-menu');           // Selecciona el contenedor del menú
  if (btn && menu) {                                        // Solo continúa si ambos elementos existen
    btn.setAttribute('aria-expanded', 'false');             // Inicializa atributo ARIA como "cerrado"

    function toggleMenu(e) {                                // Función para alternar el estado del menú
      e.preventDefault();                                   // Evita comportamiento por defecto del enlace
      var abierto = btn.getAttribute('aria-expanded') === 'true'; // Comprueba si el menú está abierto
      btn.setAttribute('aria-expanded', String(!abierto));  // Cambia el estado ARIA
      menu.classList.toggle('nav-menu--visible');           // Muestra u oculta el menú
      btn.classList.toggle('open');                         // Cambia clase para el icono de "X"
      btn.blur();                                           // Quita el foco del botón
    }
    btn.addEventListener('click', toggleMenu);              // Asocia toggleMenu al evento click
    btn.addEventListener('touchend', toggleMenu);           // Asocia toggleMenu al evento touchend

    function cerrarSiFuera(e) {                             // Función para cerrar el menú al hacer clic fuera
      if (!btn.classList.contains('open')) return;          // Si ya está cerrado, no hace nada
      if (btn.contains(e.target) || menu.contains(e.target)) return; // Si clic es dentro del menú, no cierra
      btn.setAttribute('aria-expanded', 'false');           // Marca ARIA como cerrado
      menu.classList.remove('nav-menu--visible');           // Oculta el menú
      btn.classList.remove('open');                         // Vuelve el icono a estado inicial
    }
    document.addEventListener('click', cerrarSiFuera);      // Detecta clic global para cerrar menú
    document.addEventListener('touchend', cerrarSiFuera);   // Detecta touch fuera para cerrar menú
=======
  // === Theme toggle: Light / Dark ===
  var themeBtn = document.querySelector('.theme-toggle');
  var themeThumb = themeBtn ? themeBtn.querySelector('.toggle-thumb') : null;

  function getSavedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function getPreferredTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') document.documentElement.classList.add('dark-theme');
    else document.documentElement.classList.remove('dark-theme');

    if (themeBtn) {
      themeBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      themeBtn.setAttribute('title', theme === 'dark' ? 'Modo claro' : 'Modo oscuro');
    }

    if (themeThumb) {
      themeThumb.classList.remove('light', 'dark');
      themeThumb.classList.add(theme);
      themeThumb.textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
  }

  function initTheme() {
    var saved = getSavedTheme();
    var theme = saved || getPreferredTheme();
    applyTheme(theme);
  }

  function toggleTheme() {
    var isDark = document.documentElement.classList.contains('dark-theme');
    applyTheme(isDark ? 'light' : 'dark');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      toggleTheme();
    });
    themeBtn.addEventListener('keyup', function (e) {
      if (e.key === 'Enter' || e.key === ' ') toggleTheme();
    });
  }

  // Inicializar tema al cargar
  initTheme();


  // 1. Toggle de menú (si existe)
  const btn = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  if (btn && menu) {
    btn.setAttribute('aria-expanded', 'false');

    // backdrop/overlay
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      document.body.appendChild(backdrop);
    }

    const actualizarMenuDesktop = () => {
      if (window.innerWidth >= 769) {
        menu.classList.add('nav-menu--visible');
        backdrop.classList.remove('nav-backdrop--visible');
      } else {
        menu.classList.remove('nav-menu--visible');
        backdrop.classList.remove('nav-backdrop--visible');
      }
    };

    actualizarMenuDesktop();
    window.addEventListener('resize', actualizarMenuDesktop);

    const toggleMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const abierto = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!abierto));
      menu.classList.toggle('nav-menu--visible');
      btn.classList.toggle('open');
      backdrop.classList.toggle('nav-backdrop--visible');
      document.body.classList.toggle('nav-menu-open');
      btn.blur();
    };
    const cerrarMenu = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('nav-menu--visible');
      btn.classList.remove('open');
      backdrop.classList.remove('nav-backdrop--visible');
      document.body.classList.remove('nav-menu-open');
    };
    const cerrarSiFuera = (e) => {
      if (!btn.classList.contains('open')) return;
      if (btn.contains(e.target) || menu.contains(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('nav-menu--visible');
      btn.classList.remove('open');
      backdrop.classList.remove('nav-backdrop--visible');
      document.body.classList.remove('nav-menu-open');
    };

    const enlaces = menu ? menu.querySelectorAll('a') : [];
    enlaces.forEach(enlace => {
      enlace.addEventListener('click', () => {
        // Solo cerrar si el menú está visible (modo móvil)
        if (window.innerWidth < 769) {
          cerrarMenu();
        }
      });
    });
    // Usar solo click para evitar duplicación de eventos en móvil
    btn.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', cerrarMenu, true);
    document.addEventListener('click', cerrarSiFuera, true);
>>>>>>> 9942fca (Initial commit: project files)
  }

  // 2. Fade-in al hacer scroll
  var elementos = document.querySelectorAll('.fade-in');    // Selecciona todos los elementos con clase fade-in
  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry, i) {                    // Recorre cada intersección detectada
      if (entry.isIntersecting) {                           // Si el elemento está en vista
        var retraso = entry.target.dataset.delay             // Comprueba si tiene retraso personalizado
          ? entry.target.dataset.delay + 's'
          : (i * 0.15) + 's';                                // Si no, calcula retraso escalonado
        entry.target.style.transitionDelay = retraso;       // Aplica el retraso al estilo
        entry.target.classList.add('visible');              // Añade clase para iniciar la animación
        obs.unobserve(entry.target);                        // Deja de observar este elemento
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px',                         // Ajusta margen de disparo antes de 100% de altura
    threshold: 0.1                                          // Umbral del 10% para considerar visible
  });
  elementos.forEach(function (el) {                          // Observa cada elemento fade-in
    observer.observe(el);
  });

<<<<<<< HEAD
  // 4. Formulario con Formspree
  var form = document.getElementById('contact-form');       // Selecciona el formulario de contacto
  var spinner = document.getElementById('form-spinner');    // Selecciona el spinner de carga
  var feedback = document.getElementById('form-feedback');  // Selecciona el área de mensajes
  if (form && spinner && feedback) {
    form.addEventListener('submit', function (e) {           // Al enviar el formulario
      e.preventDefault();                                   // Evita recarga de página
      feedback.textContent = '';                            // Limpia mensajes previos
      feedback.className = 'form-feedback';                 // Resetea clases CSS

      if (!form.checkValidity()) {                          // Si faltan campos obligatorios
        feedback.textContent = 'Completa todos los campos obligatorios.'; // Mensaje de error
        feedback.classList.add('error');
        return;
      }

      spinner.hidden = false;                               // Muestra el spinner
      form.querySelector('button[type=submit]').disabled = true; // Deshabilita el botón

      fetch(form.action, {                                  // Envía datos con fetch
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (res) {
          if (!res.ok) {                                      // Si no es respuesta 200
            return res.json().then(function (json) {
              throw new Error(json.error || 'Error al enviar'); // Lanza error
            });
          }
          feedback.textContent = '¡Mensaje enviado con éxito!'; // Mensaje de éxito
          feedback.classList.add('success');
          form.reset();                                       // Limpia el formulario
        })
        .catch(function () {
          feedback.textContent = 'Hubo un problema. Intenta más tarde.'; // Mensaje de fallo
          feedback.classList.add('error');
        })
        .finally(function () {
          spinner.hidden = true;                              // Oculta el spinner
          form.querySelector('button[type=submit]').disabled = false; // Reactiva botón
        });
    });
=======
  const form = document.getElementById("contact-form");
  const spinner = document.getElementById("form-spinner");
  const feedback = document.getElementById("form-feedback");
  let listenerAdded = false; // guard para evitar doble listener

  // Solo inicializar la parte del formulario si todos los elementos existen (contacto.html)
  if (form && spinner && feedback && !listenerAdded) {

    // ======= CONFIG: Resend API (⚠️ Esto expone la API key si se publica en el cliente) ========
    // El usuario pidió evitar un backend; esto funciona desde el cliente, PERO expone la API KEY.
    // Si es posible, usar una función serverless / backend para ocultar la clave.
    // API Key y email provistos por el usuario (colócalos aquí solo si entiendes el riesgo):
    const RESEND_API_KEY = 're_S7mCzDkS_BU7LmJbUzviEW4jLm38WCtY3';
    const RESEND_FROM = 'onboarding@resend.dev';
    const RESEND_TO = 'matiascerolenii@gmail.com';
    // ======================================================================================

    let isSubmitting = false;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isSubmitting) return;
      isSubmitting = true;

      const submitBtn = form.querySelector("button[type=submit]");
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');

      feedback.textContent = "";
      feedback.className = "form-feedback";

      if (!form.checkValidity()) {
        feedback.textContent = "Completa todos los campos obligatorios.";
        feedback.className = "form-feedback error show";
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        isSubmitting = false;
        return;
      }

      // Construir payload HTML para el correo
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();

      const safeHtml = (text) => {
        // Escapa caracteres especiales simples para evitar HTML injection
        const esc = String(text)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
        return esc.replace(/\n/g, '<br>');
      };

      const emailHtml = `
        <p>Tienes un nuevo mensaje desde el sitio web de <strong>MC Estilo Industrial</strong>:</p>
        <ul>
          <li><strong>Nombre:</strong> ${safeHtml(name)}</li>
          <li><strong>Email:</strong> ${safeHtml(email)}</li>
          <li><strong>Teléfono:</strong> ${safeHtml(phone)}</li>
        </ul>
        <hr>
        <p><strong>Mensaje:</strong></p>
        <p>${safeHtml(message)}</p>
      `;

      const payload = {
        from: RESEND_FROM,
        to: RESEND_TO,
        subject: `Nuevo mensaje desde web - ${name || email}`,
        html: emailHtml,
      };

      // Intento de envío directo a Resend
      // Nota: Expondrá la API KEY en el cliente; ver SECURITY.md para alternativas
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 429) {
              throw new Error('Ya enviaste un mensaje recientemente. Espera unos segundos.');
            }
            return res.json().then((json) => {
              if (json.errors) {
                throw new Error(json.errors.map(err => err.msg).join(', '));
              }
              throw new Error(json.message || "Error al enviar");
            });
          }
          feedback.textContent = "¡Mensaje enviado con éxito!";
          feedback.className = "form-feedback success show";
          form.reset();
          // Ocultar mensaje de éxito después de 3 segundos
          setTimeout(() => {
            feedback.textContent = "";
            feedback.className = "form-feedback";
          }, 3000);

          // Habilitar botón inmediatamente
          const submitBtn = form.querySelector("button[type=submit]");
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
        })
        .catch((error) => {
          // Detectar errores por CORS/Network y ofrecer fallback a mailto
          let message = error.message || "Hubo un problema. Intenta más tarde.";
          const failedToFetch = message.toLowerCase().includes('failed to fetch') || message.toLowerCase().includes('networkrequestfailed') || message.toLowerCase().includes('network error');
          if (failedToFetch) {
            const mailto = `mailto:${RESEND_TO}?subject=${encodeURIComponent('Contacto desde web - ' + (name || email))}&body=${encodeURIComponent('Nombre: ' + name + '\nEmail: ' + email + '\nTeléfono: ' + phone + '\n\nMensaje:\n' + message)}`;
            feedback.innerHTML = `No se pudo enviar desde el navegador (probable bloqueo por CORS). Puedes <a href="${mailto}">enviar con tu cliente de correo</a> o configurar un backend/serverless para enviar desde el servidor.`;
          } else {
            feedback.textContent = message;
          }
          feedback.className = "form-feedback error show";
        })
        .finally(() => {
          const submitBtn = form.querySelector("button[type=submit]");
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
          isSubmitting = false;
        });
    };

    form.addEventListener("submit", handleSubmit);
    listenerAdded = true;
>>>>>>> 9942fca (Initial commit: project files)
  }

  // 5. Botón “volver arriba”
  var btnTop = document.getElementById('scroll-top');       // Selecciona el botón scroll-top
  if (btnTop) {
    window.addEventListener('scroll', function () {          // Al hacer scroll
      if (window.scrollY > 100)                             // Si se baja más de 100px
        btnTop.classList.add('show');                       // Muestra el botón
      else
        btnTop.classList.remove('show');                    // Oculta el botón
    });
    btnTop.addEventListener('click', function () {            // Al hacer clic en el botón
      window.scrollTo({ top: 0, behavior: 'smooth' });       // Hace scroll suave hasta arriba
    });
  }

<<<<<<< HEAD
  // 6. Mostrar menú en desktop
  function actualizarMenuDesktop() {                        // Ajusta visibilidad según ancho
    if (!menu) return;                                      // Si no hay menú, sale
    if (window.innerWidth >= 769)                           // Si es desktop (>=769px)
      menu.classList.add('nav-menu--visible');              // Muestra el menú
    else
      menu.classList.remove('nav-menu--visible');           // Oculta el menú en móvil
  }
  actualizarMenuDesktop();                                  // Llama al cargar
  window.addEventListener('resize', actualizarMenuDesktop); // Repite al cambiar tamaño

=======
>>>>>>> 9942fca (Initial commit: project files)
  // 7. Modal de galería
  var gal = document.querySelector('.galeria');             // Selecciona el contenedor de imágenes
  if (gal) {
    var modal = document.querySelector('.modal-img');       // Intenta obtener modal existente
    if (!modal) {                                           // Si no existe, lo crea
      modal = document.createElement('div');
      modal.className = 'modal-img';
      modal.innerHTML = '\
        <span class="modal-close" title="Cerrar">&times;</span>\
        <img src="" alt="Imagen ampliada">';
      document.body.appendChild(modal);                     // Lo añade al body
    }
    var imgModal = modal.querySelector('img');              // Imagen dentro del modal
    var cerrarBtn = modal.querySelector('.modal-close');    // Botón de cerrar modal

    gal.addEventListener('click', function (e) {             // Al hacer clic en la galería
      if (e.target.tagName !== 'IMG') return;               // Solo imágenes abren modal
      imgModal.src = e.target.src;                          // Copia la URL de la imagen
      modal.style.display = 'flex';                         // Muestra el modal
      setTimeout(function () { modal.classList.add('open'); }, 10); // Añade clase de animación
    });

    function closeModal(e) {                                // Función para cerrar modal
      if (e.target === modal || e.target === cerrarBtn) {
        modal.classList.remove('open');                     // Quita la clase de animación
        setTimeout(function () { modal.style.display = 'none'; }, 200); // Oculta tras animar
      }
    }
    modal.addEventListener('click', closeModal);            // Clic en fondo cierra modal
    cerrarBtn.addEventListener('click', closeModal);        // Clic en "×" cierra modal
    document.addEventListener('keydown', function (e) {      // Esc cierra modal
<<<<<<< HEAD
      if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(e);
=======
      if (e.key === 'Escape' && modal.style.display === 'flex') closeModal({ target: modal });
>>>>>>> 9942fca (Initial commit: project files)
    });
  }

  // 8. Slider de galería
  var slider = document.getElementById('galeria-slider');   // Selecciona el slider
  if (slider) {
    var track = slider.querySelector('.slider-track');      // Pista donde van las imágenes
    var imgs = slider.querySelectorAll('img');              // Todas las imágenes
    var prev = slider.querySelector('.slider-btn.prev');    // Botón anterior
    var next = slider.querySelector('.slider-btn.next');    // Botón siguiente
    var dots = document.getElementById('slider-dots');      // Contenedor de puntos
    var index = 0;                                          // Índice de imagen actual

    imgs.forEach(function (_, i) {                           // Crea un punto por imagen
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Imagen ' + (i + 1));    // Label accesible
      dot.addEventListener('click', function () { irA(i); });
      dots.appendChild(dot);
    });
    var dotButtons = dots.querySelectorAll('button');       // Botones de puntos

    function actualizarSlider() {                           // Actualiza vista del slider
      track.style.transform = 'translateX(' + (-index * 100) + '%)'; // Mueve pista
      dotButtons.forEach(function (d, i) {
        d.classList.toggle('active', i === index);          // Activa punto actual
      });
<<<<<<< HEAD
      prev.disabled = index === 0;                          // Deshabilita prev en inicio
      next.disabled = index === imgs.length - 1;            // Deshabilita next al final
    }
    function irA(i) {                                       // Función para ir a índice i
      index = Math.max(0, Math.min(i, imgs.length - 1));    // Limita rango válido
      actualizarSlider();                                   // Refresca vista
    }
    prev.addEventListener('click', function () { irA(index - 1); }); // Prev
    next.addEventListener('click', function () { irA(index + 1); }); // Next
=======
    }
    const irA = (i) => {
      // Carrusel infinito: si llega al final, vuelve al inicio y viceversa
      if (i < 0) {
        index = imgs.length - 1;
      } else if (i >= imgs.length) {
        index = 0;
      } else {
        index = i;
      }
      actualizarSlider();
    };

    prev.addEventListener('click', () => irA(index - 1)); // Prev
    next.addEventListener('click', () => irA(index + 1)); // Next
>>>>>>> 9942fca (Initial commit: project files)

    // Swipe en móviles
    var startX = 0;
    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;                        // Guarda posición inicial
    });
    track.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;        // Calcula desplazamiento
      if (dx > 40) irA(index - 1);                          // Swipe derecha
      if (dx < -40) irA(index + 1);                         // Swipe izquierda
    });

    actualizarSlider();                                     // Inicializa el slider
  }

  // 9. Animación “tap” en botones (solo móvil)
  var sliderBtns = document.querySelectorAll('.slider-btn'); // Selecciona todos los botones del slider
  sliderBtns.forEach(function (b) {
    b.addEventListener('pointerdown', function () {           // Al tocar el botón
      if (window.matchMedia('(max-width:650px)').matches) {  // Solo en pantallas pequeñas
        b.classList.remove('animate-tap');                   // Limpia clase si existe
        void b.offsetWidth;                                  // Forza reflow para reiniciar animación
        b.classList.add('animate-tap');                      // Añade clase para animar
      }
    });
    b.addEventListener('animationend', function () {
      b.classList.remove('animate-tap');                     // Quita clase al terminar animación
    });
    b.addEventListener('mouseup', function () {                // En PC, quita foco al soltar
      if (window.innerWidth >= 769) b.blur();
    });
  });
<<<<<<< HEAD
});
// ——— Hover aleatorio para galería ———
document.querySelectorAll('.galeria img').forEach(img => {
  img.addEventListener('mouseenter', () => {
    // Genera un ángulo aleatorio entre 1° y 2°
    const rnd = Math.random() * 2 + 1;
    // Decide si es positivo o negativo
    const angle = (Math.random() < 0.5 ? -1 : 1) * rnd;
    // Asigna la variable CSS para el rotate
    img.style.setProperty('--rotate-angle', `${angle}deg`);
  });
  // Opcional: al salir, dejamos la variable en 0 para “deshacer” cualquier resto
  img.addEventListener('mouseleave', () => {
    img.style.setProperty('--rotate-angle', `0deg`);
  });
});
=======
  // ——— Hover aleatorio para galería ———
  var galImgs = document.querySelectorAll('.galeria img');
  galImgs.forEach(img => {
    img.addEventListener('mouseenter', () => {
      // Genera un ángulo aleatorio entre 1° y 2°
      const rnd = Math.random() * 2 + 1;
      // Decide si es positivo o negativo
      const angle = (Math.random() < 0.5 ? -1 : 1) * rnd;
      // Asigna la variable CSS para el rotate
      img.style.setProperty('--rotate-angle', `${angle}deg`);
    });
    // Opcional: al salir, dejamos la variable en 0 para “deshacer” cualquier resto
    img.addEventListener('mouseleave', () => {
      img.style.setProperty('--rotate-angle', `0deg`);
    });
  });

  // === Filtrado de galería ===
  var filtroBtns = document.querySelectorAll('.filtro-btn');
  var galItems = document.querySelectorAll('.galeria-item');
  var loadingMsg = document.querySelector('.loading');
  var errorMsg = document.querySelector('.error');
  var filtroActivo = 'todos';

  function actualizarFiltro(filter) {
    filtroActivo = filter;
    // actualizar botones
    filtroBtns.forEach(function (b) {
      var f = b.getAttribute('data-filter');
      var isActive = f === filter;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    // mostrar/ocultar elementos
    galItems.forEach(function (item) {
      var cat = item.getAttribute('data-categoria') || 'todos';
      var mostrar = filter === 'todos' || cat === filter;
      item.style.display = mostrar ? '' : 'none';
      // para animaciones: añadir/retirar clase
      item.classList.toggle('visible', mostrar);
    });
  }

  // funciones y eventos para botones
  filtroBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      actualizarFiltro(f);
    });
    b.addEventListener('keyup', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var f = b.getAttribute('data-filter');
        actualizarFiltro(f);
      }
    });
  });

  // Inicializar filtro por defecto
  actualizarFiltro('todos');

  // Limpieza al desmontar
  return () => {
    if (typeof actualizarMenuDesktop === 'function') window.removeEventListener('resize', actualizarMenuDesktop);
    if (btn) btn.removeEventListener('click', toggleMenu);
    if (typeof backdrop !== 'undefined' && backdrop) backdrop.removeEventListener('click', cerrarMenu, true);
    if (typeof cerrarSiFuera === 'function') document.removeEventListener('click', cerrarSiFuera, true);
    if (enlaces && enlaces.length) enlaces.forEach(enlace => {
      try { enlace.removeEventListener('click', cerrarMenu); } catch (e) { /* ignore */ }
    });
  };
});
>>>>>>> 9942fca (Initial commit: project files)
