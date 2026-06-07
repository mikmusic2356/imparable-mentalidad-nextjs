"use client";

import { useState, useEffect, useRef } from "react";
import "./servicio.css";

export default function ServiciosIndividuales() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const totalSlides = 3;

  // 1. Load Tailwind and Font Awesome dynamically
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Tailwind CDN
      if (!document.getElementById("tailwind-cdn")) {
        const script = document.createElement("script");
        script.id = "tailwind-cdn";
        script.src = "https://cdn.tailwindcss.com";
        script.onload = () => {
          if (window.tailwind) {
            window.tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: '#e91e63',
                    secondary: '#ffc03b',
                    accent: '#ffa500'
                  },
                  fontFamily: {
                    montserrat: ['Montserrat', 'sans-serif']
                  }
                }
              }
            };
          }
        };
        document.head.appendChild(script);
      }

      // Font Awesome CDN
      if (!document.getElementById("font-awesome-cdn")) {
        const link = document.createElement("link");
        link.id = "font-awesome-cdn";
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
        document.head.appendChild(link);
      }
    }
  }, []);

  // 2. Carousel Autoslide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // 3. Scroll Reveal Animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id !== 'testimonios') {
          const items = entry.target.querySelectorAll('.stagger-item');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, index * 150);
          });
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      if (section.querySelector('.stagger-item')) {
        observer.observe(section);
      }
    });

    // Make hero items visible instantly
    document.querySelectorAll('#hero .stagger-item').forEach(item => {
      item.classList.add('visible');
    });

    return () => observer.disconnect();
  }, []);

  // 4. Parallax Scroll effect for Hero background and opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="servicios-page-root bg-white text-gray-800 min-h-screen">
      {/* Custom styles nested inside page to ensure complete rendering compatibility */}
      <style jsx global>{`
        /* Fuente personalizada */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        
        /* Estilos base */
        .servicios-page-root {
          font-family: 'Montserrat', sans-serif !important;
        }

        /* Animaciones */
        .servicios-page-root .floating {
          animation: floating 4s ease-in-out infinite;
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        .servicios-page-root .floating-reverse {
          animation: floating-reverse 5s ease-in-out infinite;
        }
        
        @keyframes floating-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-10deg); }
        }
        
        .servicios-page-root .pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        /* Animaciones de entrada */
        .servicios-page-root .stagger-item {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        
        .servicios-page-root .stagger-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Secciones */
        .servicios-page-root .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 3rem 1rem;
        }
        
        .servicios-page-root .diferenciador-section {
          background-color: #e91e63;
          color: white;
          padding: 4rem 1rem;
        }
        
        .servicios-page-root .entrenamiento-section {
          background-color: white;
          color: #333;
          padding: 4rem 1rem;
        }
        
        .servicios-page-root .testimonios-section {
          background-color: #e91e63;
          color: #333;
          padding: 4rem 1rem;
        }
        
        .servicios-page-root .cierre-section {
          background-color: white;
          color: #333;
          padding: 4rem 1rem;
          text-align: center;
        }
        
        .servicios-page-root .contacto-section {
          background-color: #e91e63;
          color: white;
          padding: 3rem 1rem;
        }
        
        /* Tarjetas de servicios */
        .servicios-page-root .service-card {
          border-radius: 0.75rem;
          border-width: 1px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
        }
        
        .servicios-page-root .service-card:hover {
          transform: scale(1.02);
        }
        
        .servicios-page-root .service-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .servicios-page-root .service-button-container {
          margin-top: auto;
          padding-top: 1rem;
        }
        
        /* Botones */
        .servicios-page-root .btn-primary {
          background: linear-gradient(to right, #e91e63, #ffa500);
          color: white;
          font-weight: bold;
          border-radius: 9999px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
        }
        
        .servicios-page-root .btn-primary:hover {
          transform: scale(1.05);
          background: linear-gradient(to right, #d81b60, #ff8c00);
        }
        
        .servicios-page-root .btn-secondary {
          background: linear-gradient(to right, #ffc03b, #ffa500);
          color: #333;
          font-weight: bold;
          border-radius: 9999px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
        }
        
        .servicios-page-root .btn-secondary:hover {
          transform: scale(1.05);
          background: linear-gradient(to right, #ffb300, #ff8c00);
        }
        
        /* Testimonios - Carousel */
        .servicios-page-root .carousel-container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          overflow: hidden;
        }
        
        .servicios-page-root .carousel-track {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }
        
        .servicios-page-root .carousel-slide {
          min-width: 100%;
          padding: 0 1rem;
        }
        
        .servicios-page-root .testimonial-card {
          background-color: white;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .servicios-page-root .testimonial-content {
          font-style: italic;
          color: #4b5563;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .servicios-page-root .testimonial-result {
          font-weight: 600;
          color: #e91e63;
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }
        
        .servicios-page-root .testimonial-name {
          font-weight: 700;
          color: #374151;
          font-size: 1.1rem;
        }
        
        .servicios-page-root .carousel-nav {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
          gap: 1rem;
        }
        
        .servicios-page-root .carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #d1d5db;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .servicios-page-root .carousel-dot.active {
          background-color: #e91e63;
          transform: scale(1.2);
        }
        
        .servicios-page-root .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border: 2px solid #e91e63;
          color: #e91e63;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }
        
        .servicios-page-root .carousel-arrow:hover {
          background: #e91e63;
          color: white;
        }
        
        .servicios-page-root .carousel-arrow.left {
          left: -20px;
        }
        
        .servicios-page-root .carousel-arrow.right {
          right: -20px;
        }
        
        @media (max-width: 768px) {
          .servicios-page-root .carousel-arrow {
            display: none;
          }
          
          .servicios-page-root .testimonial-card {
            padding: 1.5rem;
          }
        }
        
        /* Redes sociales */
        .servicios-page-root .social-card {
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 0.75rem;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .servicios-page-root .social-card:hover {
          transform: scale(1.05);
        }
        
        /* Mensaje final */
        .servicios-page-root .final-message {
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1.5rem;
          text-align: center;
          margin-top: 3rem;
        }
      `}</style>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="hero-section bg-white"
        style={{
          backgroundPositionY: `${scrollY * 0.4}px`,
          opacity: 1 - scrollY / 800
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-orange-500/5"></div>
        <div className="relative z-10 max-w-[48rem] mx-auto text-center hero-text">
          <div className="mb-6 flex flex-col items-center">
            {/* Added real profile photo of Duly Hernández */}
            <img 
              src="/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-03-at-17.24.13.webp" 
              alt="Duly Hernández" 
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-orange-500 shadow-lg"
            />
            <h2 className="text-xl font-light mb-1 text-orange-500">ENTRENAMIENTO MENTAL IMPARABLE</h2>
            <p className="text-lg font-medium text-gray-700"> Duly Hernández | Entrenadora en Autocontrol Mental</p>
            <p className="mt-2 text-gray-700 italic">No necesitas motivación. Necesitas dirección mental y entrenamiento emocional.</p>
          </div>

          <h1 className="font-bold mb-6 leading-tight text-gray-900 text-3xl sm:text-4xl md:text-5xl">
            TU MENTE NO NECESITA <span className="text-pink-500">MOTIVACIÓN</span>.<br />
            NECESITA <span className="text-orange-500">REENTRENAMIENTO</span>.
          </h1>

          <p className="mb-8 leading-relaxed text-gray-700">
            Soy Duly Hernández, entrenadora en autocontrol mental. Entreno tu mente para que dejes de reaccionar, 
            rompas los patrones que te sabotean y tomes decisiones con poder.
          </p>

          <a 
            id="Btn_ind_1" 
            href="#entrenamiento"
            className="btn-primary py-3 px-6 text-base md:text-lg pulse mx-auto block max-w-max"
          >
            <i className="fas fa-brain mr-2"></i>
            QUIERO DESCUBRIR MI NIVEL DE REENTRENAMIENTO
          </a>
        </div>

        <div className="absolute top-16 left-4 text-pink-400 opacity-10 floating hidden sm:block">
          <i className="fas fa-brain text-4xl"></i>
        </div>
        <div className="absolute bottom-16 right-4 text-orange-400 opacity-10 floating-reverse hidden sm:block">
          <i className="fas fa-bolt text-4xl"></i>
        </div>
      </section>

      {/* Diferenciador Section */}
      <section id="diferenciador" className="diferenciador-section">
        <div className="max-w-[48rem] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold mb-6 text-2xl sm:text-3xl text-white">
              NO ES TERAPIA, ES ENTRENAMIENTO
            </h2>
            <p className="mb-8 leading-relaxed opacity-90 text-white">
              No te enseño a sobrevivir al dolor, te entreno para dirigir tu mente con consciencia y poder.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="stagger-item social-card hover:border-white/50 hover:translate-y-[-5px]">
              <div className="text-yellow-200 mb-3">
                <i className="fas fa-bolt text-3xl"></i>
              </div>
              <h3 className="font-bold text-white">Reprograma tu mente</h3>
            </div>
            <div className="stagger-item social-card hover:border-white/50 hover:translate-y-[-5px]">
              <div className="text-yellow-200 mb-3">
                <i className="fas fa-compass text-3xl"></i>
              </div>
              <h3 className="font-bold text-white">Recupera tu dirección</h3>
            </div>
            <div className="stagger-item social-card hover:border-white/50 hover:translate-y-[-5px]">
              <div className="text-yellow-200 mb-3">
                <i className="fas fa-shield-alt text-3xl"></i>
              </div>
              <h3 className="font-bold text-white">Entrena tu autocontrol</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Niveles de Entrenamiento */}
      <section id="entrenamiento" className="entrenamiento-section">
        <div className="max-w-[72rem] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold mb-4 text-pink-500 text-2xl sm:text-3xl">
              ELIGE TU NIVEL DE ENTRENAMIENTO MENTAL
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-center">
              Cada proceso está diseñado para que avances desde tu punto actual hasta tu máximo potencial mental.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Nivel 1 */}
            <div className="stagger-item service-card bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 hover:scale-102">
              <div className="service-content p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-pink-500 mb-2">NIVEL 1</div>
                  <h3 className="service-title font-bold mb-2 text-gray-900 text-lg">SESIÓN DESPERTAR MENTAL</h3>
                  <p className="text-gray-600 service-subtitle text-sm">Duración: 60 minutos | Inversión: $180.000 COP</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-bold text-pink-500 mb-2 service-subtitle text-sm">Ideal para ti si:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li className="list-item text-sm">• Repites patrones mentales o emocionales.</li>
                    <li className="list-item text-sm">• Te sientes desconectad@ de ti y sin claridad.</li>
                    <li className="list-item text-sm">• No sabes qué te frena realmente.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-pink-500 mb-2 service-subtitle text-sm">Qué vivirás:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li className="list-item text-sm">• Diagnóstico profundo para detectar qué emoción gobierna tu mente.</li>
                    <li className="list-item text-sm">• Lectura de patrones y raíz mental del autosabotaje.</li>
                    <li className="list-item text-sm">• Primeras herramientas de autocorrección y enfoque consciente.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-pink-500 mb-2 service-subtitle text-sm">Resultado:</h4>
                  <p className="text-gray-700 text-sm">Sales con claridad y dirección mental para tomar tu primera acción consciente.</p>
                </div>

                <div className="service-button-container mt-auto">
                  <a id="Btn_ind_2" href="https://payco.link/46cc1ae5-041e-4db1-8c4b-a00fa949d747" target="_blank" rel="noopener noreferrer" className="w-full btn-primary py-2.5 service-button hover:scale-105 block text-center">
                    <i className="fas fa-bolt mr-2"></i>
                    QUIERO DESPERTAR MI MENTE
                  </a>
                </div>
              </div>
            </div>

            {/* Nivel 2 */}
            <div className="stagger-item service-card bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:scale-102">
              <div className="service-content p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-orange-500 mb-2">NIVEL 2</div>
                  <h3 className="service-title font-bold mb-2 text-gray-900 text-lg">ENTRENAMIENTO DE AUTOCONTROL MENTAL</h3>
                  <p className="text-gray-600 service-subtitle text-sm">Duración: 2–3 semanas | Inversión: $450.000 COP</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-bold text-orange-500 mb-2 service-subtitle text-sm">Ideal para ti si:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li className="list-item text-sm">• Ya identificaste tus bloqueos.</li>
                    <li className="list-item text-sm">• Sabes qué debes hacer, pero no logras sostenerlo.</li>
                    <li className="list-item text-sm">• Quieres equilibrio emocional y coherencia mental.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-orange-500 mb-2 service-subtitle text-sm">Qué vivirás en las 3 sesiones:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li className="list-item text-sm">1. Entrena tu mente consciente.</li>
                    <li className="list-item text-sm">2. Domina tu respuesta emocional.</li>
                    <li className="list-item text-sm">3. Crea tu sistema de estabilidad mental.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-orange-500 mb-2 service-subtitle text-sm">Resultado:</h4>
                  <p className="text-gray-700 text-sm">Desarrollas estabilidad y dominio emocional para sostener tus decisiones.</p>
                </div>

                <div className="service-button-container mt-auto">
                  <a id="Btn_ind_3" href="https://payco.link/628cef3c-b58f-4445-8e2f-c99214582955" target="_blank" rel="noopener noreferrer" className="w-full btn-secondary py-2.5 service-button text-white hover:scale-105 block text-center">
                    <i className="fas fa-compass mr-2"></i>
                    QUIERO ENTRENAR MI AUTOCONTROL
                  </a>
                </div>
              </div>
            </div>

            {/* Nivel 3 */}
            <div className="stagger-item service-card bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:scale-102">
              <div className="service-content p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-red-500 mb-2">NIVEL 3</div>
                  <h3 className="service-title font-bold mb-2 text-gray-900 text-lg">PROCESO DE REPROGRAMACIÓN MENTAL</h3>
                  <p className="text-gray-600 service-subtitle text-sm">Duración: 5 semanas | Inversión: $700.000 COP</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-bold text-red-500 mb-2 service-subtitle text-sm">Ideal para ti si:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li className="list-item text-sm">• Buscas una transformación completa y sostenida.</li>
                    <li className="list-item text-sm">• Deseas romper con la versión de ti que ya no encaja.</li>
                    <li className="list-item text-sm">• Estás list@ para dirigir tu mente y manifestar coherencia.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-red-500 mb-2 service-subtitle text-sm">Qué vivirás en las 5 sesiones:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li className="list-item text-sm">1. Despierta del piloto automático.</li>
                    <li className="list-item text-sm">2. Identifica quién gobierna tu mente.</li>
                    <li className="list-item text-sm">3. Quiebra del personaje.</li>
                    <li className="list-item text-sm">4. Reentrena nuevos hábitos y frases de poder.</li>
                    <li className="list-item text-sm">5. Activa tu genio interior.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-red-500 mb-2 service-subtitle text-sm">Resultado:</h4>
                  <p className="text-gray-700 text-sm">Reprogramas tu mente para vivir desde propósito, coherencia y poder personal.</p>
                </div>

                <div className="service-button-container mt-auto">
                  <a 
                    id="Btn_ind_4" 
                    href="https://payco.link/b43bc0a2-2097-4742-b248-8033e7d9f0a7" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2.5 rounded-full service-button transition-all duration-300 hover:scale-105 block text-center"
                  >
                    <i className="fas fa-rocket mr-2"></i>
                    QUIERO REPROGRAMAR MI MENTE
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Final message */}
          <div className="text-center final-message p-6 mt-12 bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-gray-800 font-medium mb-4">No importa en qué punto estés, lo importante es empezar.</p>
            <p className="text-gray-700 mb-6">Escríbeme y te ayudo a elegir tu proceso.</p>
            <a 
              href="https://wa.me/573171646811?text=Hola%20Duly,%20quiero%20iniciar%20mi%20proceso%20de%20Entrenamiento%20Mental" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Hablar con Duly en WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Testimonios Carousel */}
      <section id="testimonios" className="testimonios-section">
        <div className="max-w-[48rem] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
              TESTIMONIOS
            </h2>
          </div>

          <div className="carousel-container relative">
            <div 
              className="carousel-track" 
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                display: "flex",
                transition: "transform 0.5s ease-in-out" 
              }}
            >
              {/* Testimonio 1 */}
              <div className="carousel-slide min-width-full">
                <div className="testimonial-card flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <img 
                    src="/wp-content/uploads/2026/04/b3577990-3c03-4ccf-8eda-a3d9b68c6e3d.webp" 
                    alt="Byron C." 
                    className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary shadow-md"
                  />
                  <p className="testimonial-content italic text-gray-600 mb-4 text-base leading-relaxed">
                    “Con el apoyo de Duly pude sanar heridas que no sabía que aún sangraban. Hoy soy un mejor padre y esposo.”
                  </p>
                  <div className="testimonial-result font-semibold text-primary mb-2 text-sm">
                    ⚡ Resultado: equilibrio y conexión emocional.
                  </div>
                  <div className="testimonial-name font-bold text-gray-700 text-lg">
                    — Byron C.
                  </div>
                </div>
              </div>

              {/* Testimonio 2 */}
              <div className="carousel-slide min-width-full">
                <div className="testimonial-card flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <img 
                    src="/wp-content/uploads/2026/04/5c30acc7-2eeb-45dc-8aa9-85230c18d7e2.webp" 
                    alt="Ingrid G." 
                    className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary shadow-md"
                  />
                  <p className="testimonial-content italic text-gray-600 mb-4 text-base leading-relaxed">
                    “Antes vivía con ansiedad. Hoy tengo serenidad y claridad mental.”
                  </p>
                  <div className="testimonial-result font-semibold text-primary mb-2 text-sm">
                    ⚡ Resultado: paz interior y autocontrol emocional.
                  </div>
                  <div className="testimonial-name font-bold text-gray-700 text-lg">
                    — Ingrid G.
                  </div>
                </div>
              </div>

              {/* Testimonio 3 */}
              <div className="carousel-slide min-width-full">
                <div className="testimonial-card flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <img 
                    src="/wp-content/uploads/2026/04/7c5ec73e-3ef2-4420-b035-dbaab0d41ddd.webp" 
                    alt="Ingrid G." 
                    className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary shadow-md"
                  />
                  <p className="testimonial-content italic text-gray-600 mb-4 text-base leading-relaxed">
                    “Llegué sin rumbo y sin motivación. Hoy pienso en mí, en mi felicidad y ya no me frena el miedo.”
                  </p>
                  <div className="testimonial-result font-semibold text-primary mb-2 text-sm">
                    ⚡ Resultado: confianza y bienestar emocional.
                  </div>
                  <div className="testimonial-name font-bold text-gray-700 text-lg">
                    — Ingrid G.
                  </div>
                </div>
              </div>
            </div>

            <button className="carousel-arrow left absolute top-1/2 left-[-20px] transform -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center text-primary z-10 hover:bg-primary hover:text-white transition-all hidden sm:flex" onClick={prevSlide}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="carousel-arrow right absolute top-1/2 right-[-20px] transform -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center text-primary z-10 hover:bg-primary hover:text-white transition-all hidden sm:flex" onClick={nextSlide}>
              <i className="fas fa-chevron-right"></i>
            </button>

            <div className="carousel-nav flex justify-center gap-2 mt-6">
              {[0, 1, 2].map((idx) => (
                <div 
                  key={idx}
                  className={`carousel-dot w-3 h-3 rounded-full bg-gray-300 cursor-pointer transition-all ${currentIndex === idx ? "active bg-pink-500 scale-110" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cierre Poderoso */}
      <section id="cierre" className="cierre-section py-16">
        <div className="max-w-[48rem] mx-auto px-4">
          <h2 className="font-bold mb-8 leading-tight text-gray-900 text-2xl sm:text-3xl">
            No viniste a sobrevivir. Viniste a <span className="text-orange-500">gobernar tu mente</span> y crear tu realidad con poder.
          </h2>
          
          <a 
            href="https://wa.me/573171646811?text=Hola%20Duly,%20quiero%20iniciar%20mi%20proceso%20de%20Entrenamiento%20Mental" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary py-3 px-8 text-base md:text-lg pulse mx-auto block max-w-max"
          >
            <i className="fas fa-rocket mr-2"></i>
            QUIERO EMPEZAR MI ENTRENAMIENTO MENTAL
          </a>
        </div>
      </section>

      {/* Contacto y Redes */}
      <section id="contacto" className="contacto-section">
        <div className="max-w-[48rem] mx-auto px-4 text-center">
          <h3 className="font-bold mb-8 text-xl sm:text-2xl text-white">
            CONTACTO Y REDES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a 
              href="https://wa.me/573171646811" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="stagger-item social-card hover:scale-105 block"
            >
              <i className="fab fa-whatsapp text-2xl mx-auto mb-2 text-green-300"></i>
              <p className="font-semibold text-white">WhatsApp</p>
              <p className="opacity-90 text-sm text-white">+57 317 164 6811</p>
            </a>
            <a 
              href="https://instagram.com/imparablementalidad" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="stagger-item social-card hover:scale-105 block"
            >
              <i className="fab fa-instagram text-2xl mx-auto mb-2 text-pink-200"></i>
              <p className="font-semibold text-white">Instagram</p>
              <p className="opacity-90 text-sm text-white">@imparablementalidad</p>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="stagger-item social-card hover:scale-105 block"
            >
              <i className="fab fa-youtube text-2xl mx-auto mb-2 text-red-300"></i>
              <p className="font-semibold text-white">YouTube</p>
              <p className="opacity-90 text-sm text-white">Duly Hernández – Imparable Mente</p>
            </a>
          </div>
        </div>
      </section>

      {/* Frase Final */}
      <section className="py-12 px-4 bg-white text-center">
        <div className="max-w-[48rem] mx-auto px-4">
          <blockquote className="italic leading-relaxed text-gray-800 text-lg">
            “Tu poder no está en lo que sientes, sino en lo que eliges sostener con tu mente entrenada.”
          </blockquote>
          <cite className="block mt-4 text-lg text-pink-500 font-semibold">
            – Duly Hernández
          </cite>
        </div>
      </section>
    </div>
  );
}
