"use client";

import { useState, useEffect } from "react";
import "./mentoria.css";

export default function Mentoria() {
  // Timer removed - countdown replaced with urgency message

  // 2. Vimeo API Hook for seeking restriction
  useEffect(() => {
    if (typeof window !== "undefined") {
      const initVimeo = () => {
        const iframe = document.querySelector("#vsl-video");
        if (iframe && window.Vimeo) {
          const player = new window.Vimeo.Player(iframe);
          let lastTime = 0;
          let isSeeking = false;

          player.on("timeupdate", function (data) {
            if (!isSeeking) {
              if (Math.abs(data.seconds - lastTime) > 1.5) {
                isSeeking = true;
                player.setCurrentTime(lastTime).then(() => {
                  isSeeking = false;
                });
              } else {
                lastTime = data.seconds;
              }
            }
          });

          player.on("seeked", function () {
            isSeeking = true;
            player.setCurrentTime(lastTime).then(() => {
              isSeeking = false;
            });
          });
        }
      };

      if (!window.Vimeo) {
        const script = document.createElement("script");
        script.src = "https://player.vimeo.com/api/player.js";
        script.onload = initVimeo;
        document.head.appendChild(script);
      } else {
        initVimeo();
      }
    }
  }, []);

  // 3. FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // 4. Privacy Notice Box state
  const [showPrivacy, setShowPrivacy] = useState(true);

  return (
    <div className="mentoria-page-container">
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="container">
          <h1 style={{ textTransform: "none", color: "#0a1f44", fontSize: "3.2rem" }}>
            Aprende a gobernar tu mente y deja de vivir en piloto automático.
          </h1>
          
          <p style={{ 
            fontSize: "1.3rem", 
            lineHeight: "1.6", 
            color: "#0a1f44", 
            maxWidth: "850px", 
            margin: "20px auto 40px auto", 
            fontWeight: "500" 
          }}>
            Cinco días de entrenamiento mental para dejar de reaccionar en automático y empezar a dirigir tu vida con conciencia.
          </p>
          <p style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            color: "#0a1f44",
            maxWidth: "850px",
            margin: "-20px auto 40px auto",
            fontWeight: "500",
            fontStyle: "italic"
          }}>
            La experiencia de entrada al Método Imparable®.
          </p>

          {/* VIMEO VIDEO CONTAINER */}
          <div className="video-container" style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
            borderRadius: "8px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
            background: "#0a1f44",
            maxWidth: "800px",
            margin: "0 auto 30px auto"
          }}>
            <iframe
              src="https://player.vimeo.com/video/1107914366?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              title="VÍDEO IMPARABLE MENTALIDAD"
              id="vsl-video"
            ></iframe>

            {/* BLOCKER CAP OVER THE PROGRESS BAR */}
            <div className="progress-blocker" style={{
              position: "absolute",
              bottom: 0,
              left: "10%",
              width: "65%",
              height: "50px",
              zIndex: 10,
              cursor: "default"
            }}></div>
          </div>

          <div style={{ marginTop: "20px", marginBottom: "30px" }}>
            <a href="#compra" className="cta-yellow-btn">
              Quiero unirme a la mentoría
            </a>
          </div>
        </div>
      </section>

      {/* URGENCY SECTION / SECCIÓN DE IDENTIFICACIÓN */}
      <section className="urgency-section">
        <div className="container">
          <h2 className="alert-title" style={{ color: "#ffffff", textTransform: "none", fontSize: "2.3rem", marginBottom: "30px" }}>
            ¿Te identificas con alguna de estas situaciones?
          </h2>
          
          <div style={{ 
            background: "rgba(255, 255, 255, 0.05)", 
            padding: "30px 40px", 
            borderRadius: "8px", 
            maxWidth: "700px", 
            margin: "0 auto 30px auto", 
            textAlign: "left",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "15px", fontSize: "1.2rem", color: "#fcf9f8" }}>👉 Sobrepiensas constantemente.</li>
              <li style={{ marginBottom: "15px", fontSize: "1.2rem", color: "#fcf9f8" }}>👉 Tomas decisiones desde el miedo.</li>
              <li style={{ marginBottom: "15px", fontSize: "1.2rem", color: "#fcf9f8" }}>👉 Sabes qué hacer pero no logras actuar.</li>
              <li style={{ marginBottom: "15px", fontSize: "1.2rem", color: "#fcf9f8" }}>👉 Vuelves una y otra vez al mismo lugar.</li>
              <li style={{ marginBottom: "15px", fontSize: "1.2rem", color: "#fcf9f8" }}>👉 Tu mente nunca descansa.</li>
              <li style={{ marginBottom: "0px", fontSize: "1.2rem", color: "#fcf9f8" }}>👉 Sientes que has intentado cambiar muchas veces sin lograrlo.</li>
            </ul>
          </div>

          <p style={{ 
            fontWeight: 700, 
            fontSize: "1.35rem", 
            color: "#E91E63", 
            maxWidth: "800px", 
            margin: "20px auto 45px auto",
            lineHeight: "1.4"
          }}>
            Probablemente no te falte fuerza de voluntad. Estás viviendo en piloto automático.
          </p>

          <div className="timer-box">
            <p style={{ fontSize: "1.2rem", color: "#fcf9f8", lineHeight: "1.6", margin: "0" }}>
              Los cupos son limitados porque la mentoría incluye acompañamiento directo durante los cinco días.
            </p>
          </div>

          <div className="social-proof">
            <h2 className="big-numbers animate-pulse-urgency" style={{ textTransform: "none", fontSize: "clamp(1.8rem, 7vw, 3.5rem)", margin: "20px auto", maxWidth: "90%" }}>
              ¡CUPOS LIMITADOS!
            </h2>
            <p className="last-chance">👉 Si estás leyendo esto y el botón aún está activo... es porque todavía estás a tiempo.</p>
          </div>

          <div style={{ marginTop: "30px" }}>
            <a href="https://go.hotmart.com/C100717660P?dp=1" target="_blank" rel="noopener noreferrer" className="cta-yellow-btn">
              QUIERO PASAR DEL MIEDO A LA ACCIÓN
            </a>
          </div>

          <div className="payment-strip" style={{ marginBottom: "20px", background: "transparent", boxShadow: "none" }}>
            <img src="/wp-content/uploads/2026/04/METODOS-DE-PAGO-LP-1.png" alt="Métodos de Pago" style={{ maxWidth: "100%", height: "auto" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src="/wp-content/uploads/2026/04/admin-ajax.webp" style={{ maxWidth: "250px", height: "auto" }} alt="Garantía de Satisfacción Imparable" />
          </div>
        </div>
      </section>

      {/* 5. PRESENTACIÓN DE LA MENTORÍA */}
      <section className="mentorship-header">
        <div className="container">
          <h2 className="section-title-white"><span className="target-icon">🎯</span> ¿Qué es Del Miedo a la Acción?</h2>
        </div>
      </section>

      <section className="urgency-section" style={{ padding: "60px 0", borderBottom: "5px solid #e91e63" }}>
        <div className="container" style={{ maxWidth: "800px", textAlign: "left" }}>
          <p style={{ fontSize: "1.25rem", lineHeight: "1.7", marginBottom: "20px", color: "#ffffff", textAlign: "center" }}>
            Es la experiencia de entrada al Método Imparable®, un sistema de entrenamiento mental diseñado para ayudarte a dejar de vivir en piloto automático y comenzar a gobernar tu mente con mayor conciencia.
          </p>
          <p style={{ fontSize: "1.15rem", lineHeight: "1.7", marginBottom: "40px", color: "#fcf9f8", textAlign: "center" }}>
            Durante cinco días vivirás una experiencia práctica que te permitirá reconocer los patrones que hoy dirigen tus decisiones y comenzar a reemplazarlos por respuestas más conscientes.
          </p>

          <div style={{ 
            background: "rgba(255, 255, 255, 0.05)", 
            padding: "30px 40px", 
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <h3 style={{ color: "#E91E63", fontSize: "1.3rem", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
              🎁 La experiencia incluye:
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "1.15rem", color: "#fcf9f8" }}>💬 Acompañamiento diario por WhatsApp.</li>
              <li style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "1.15rem", color: "#fcf9f8" }}>📝 Ejercicios prácticos.</li>
              <li style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "1.15rem", color: "#fcf9f8" }}>💡 Reflexiones guiadas.</li>
              <li style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "1.15rem", color: "#fcf9f8" }}>👥 Comunidad privada.</li>
              <li style={{ padding: "12px 0", fontSize: "1.15rem", color: "#fcf9f8" }}>✨ Encuentro final en vivo.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. BENEFICIOS */}
      <section className="benefits-immediate">
        <div className="container">
          <h2 className="section-title"><span className="target-icon">🎯</span> Lo que comenzarás a desarrollar durante la mentoría</h2>
          <div className="benefits-grid" style={{ justifyContent: "center", gap: "40px" }}>
            <div className="benefit-item">
              <div className="icon-circle">🔍</div>
              <p style={{ color: "#0a1f44", fontWeight: "700" }}>Reconocer tus patrones automáticos.</p>
            </div>
            <div className="benefit-item">
              <div className="icon-circle">🧩</div>
              <p style={{ color: "#0a1f44", fontWeight: "700" }}>Comprender por qué repites la misma historia.</p>
            </div>
            <div className="benefit-item">
              <div className="icon-circle">🧘</div>
              <p style={{ color: "#0a1f44", fontWeight: "700" }}>Responder con mayor conciencia antes de reaccionar por impulso.</p>
            </div>
            <div className="benefit-item">
              <div className="icon-circle">💡</div>
              <p style={{ color: "#0a1f44", fontWeight: "700" }}>Tomar decisiones con mayor claridad.</p>
            </div>
            <div className="benefit-item">
              <div className="icon-circle">🕊️</div>
              <p style={{ color: "#0a1f44", fontWeight: "700" }}>Empezar a construir una vida con mayor paz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BONOS LANZAMIENTO */}
      <section className="bonos-lanzamiento-exacto">
        <div className="container">
          <div className="top-alert">⚠️ EXTENDEMOS LA OFERTA ⚠️</div>
          <h1 className="main-bonos-title">BONOS DE LANZAMIENTO</h1>

          <div className="yellow-bar">
            🚀 <strong>Activa tu mentalidad imparable hoy:</strong> desbloquea los bonos de lanzamiento antes de que desaparezcan. No es suerte, es decisión.
          </div>

          <div style={{ margin: "20px auto", maxWidth: "680px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "20px 30px", textAlign: "center" }}>
            <p style={{ fontSize: "1.2rem", color: "#fcf9f8", fontWeight: "600", margin: 0 }}>
              ⚠️ Los cupos son limitados porque la mentoría incluye acompañamiento directo durante los cinco días.
            </p>
          </div>

          <h2 className="why-me-title">¿POR QUÉ ELEGIRME?<br />PORQUE AQUÍ SÍ PASA ALGO DENTRO DE TI. 🚀</h2>

          <div className="green-bar">
            🎁 Esto es lo que recibirás al unirte a la mentoría
          </div>

          <div className="bonos-exact-list">
            <div className="bono-row">
              <div className="bono-img-col">
                <img src="/wp-content/uploads/2026/04/transparent-Photoroom.webp" alt="Ebook" />
              </div>
              <div className="bono-text-col">
                <h3><span className="blue-num">1</span> BONO #1: EBOOK EXCLUSIVO: "MENTALIDAD IMPARABLE"</h3>
                <p>Un manual práctico lleno de estrategias para romper bloqueos y entrenar tu mente. Es tu guía de bolsillo para mantenerte enfocad@ y con energía imparable.</p>
              </div>
            </div>

            <div className="bono-row">
              <div className="bono-img-col">
                <img src="/wp-content/uploads/2026/04/1-1.webp" alt="Ejercicios" />
              </div>
              <div className="bono-text-col">
                <h3><span className="blue-num">2</span> BONO #2: EJERCICIOS PRÁCTICOS PARA ENTRENAR NUEVOS PATRONES</h3>
                <p>Ejercicios prácticos para entrenar nuevos patrones de pensamiento y acción.</p>
              </div>
            </div>

            <div className="bono-row">
              <div className="bono-img-col">
                <img src="/wp-content/uploads/2026/04/3.webp" alt="Grupo" />
              </div>
              <div className="bono-text-col">
                <h3><span className="blue-num">3</span> BONO #3: ACCESO A GRUPO PRIVADO DE APOYO</h3>
                <p>Una comunidad exclusiva donde podrás compartir tus avances, resolver dudas y rodearte de personas que también están transformando su vida. No caminarás sol@.</p>
              </div>
            </div>

            <div className="bono-row">
              <div className="bono-img-col">
                <img src="/wp-content/uploads/2026/04/Diseno-sin-titulo-2.webp" alt="Sesion" />
              </div>
              <div className="bono-text-col">
                <h3><span className="blue-num">4</span> BONO #4: GUÍA DE SEGUIMIENTO DE 21 DÍAS</h3>
                <p>Un plan sencillo para ayudarte a mantener el entrenamiento mental una vez finalice la mentoría.</p>
              </div>
            </div>
          </div>

          <div className="cta-area-exact" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
            <a href="https://go.hotmart.com/C100717660P?dp=1" target="_blank" rel="noopener noreferrer" className="cta-yellow-exact">
              ¡QUIERO MI MENTORÍA + BONOS! ✔️
            </a>
            <img src="/wp-content/uploads/2026/04/admin-ajax.webp" style={{ maxWidth: "280px", height: "auto" }} alt="Garantía de Satisfacción" />
          </div>
        </div>
      </section>

      {/* NEUROSCIENCE SECTION */}
      <section className="neurociencia-exacta">
        <div className="container container-large">
          <div className="neuro-grid">
            {/* LEFT: Text column */}
            <div className="neuro-text-col">
              <span className="duly-name">DULY HERNANDEZ</span>
              <h2 style={{ textTransform: "none", fontSize: "2.2rem", color: "#0a1f44", marginBottom: "20px" }}>
                ¿Por qué te cuesta tanto cambiar, aunque realmente quieras hacerlo?
              </h2>

              <h3 style={{ textTransform: "none", fontSize: "1.6rem", color: "#E91E63", marginTop: "15px", marginBottom: "10px", fontWeight: "700" }}>
                La buena noticia es:
              </h3>

              <p style={{ fontSize: "1.3rem", fontWeight: "600", color: "#0a1f44", marginBottom: "20px", lineHeight: "1.4" }}>
                Quien gobierna su mente, gobierna su vida.
              </p>

              <p className="neuro-body">
                Así como aprendiste a reaccionar con miedo o duda, puedes reprogramar tu cerebro. Los patrones mentales aprendidos también pueden modificarse mediante entrenamiento consciente.
              </p>

              <div className="payment-area-small">
                <img src="/wp-content/uploads/2026/04/METODOS-DE-PAGO-LP-1.png" alt="Pagos" style={{ maxWidth: "300px" }} />
              </div>
            </div>

            {/* RIGHT: Image + CTA button */}
            <div className="neuro-img-col">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "25px" }}>
                <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", width: "100%" }}>
                  <img src="/piloto-automatico.jpg" alt="¿Por qué te cuesta tanto cambiar?" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <a href="https://go.hotmart.com/C100717660P?dp=1" target="_blank" rel="noopener noreferrer" className="cta-yellow-exact" style={{ width: "100%", textAlign: "center", display: "block" }}>
                  QUIERO PASAR DEL MIEDO A LA ACCIÓN ✔️
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TENSION PRE-PRECIO */}
      <section className="tension-pre-precio">
        <div className="container">
          <h2 className="tension-headline">Si sigues esperando sentirte segur@, tu vida seguirá igual.</h2>
          <div className="tension-content">
            <p className="t-line-1">No porque no tengas talento.</p>
            <p className="t-line-2">Sino porque tu mente seguirá protegiéndote del cambio.</p>

            <div className="tension-bridge">
              <p>Las personas que transforman su vida no esperan dejar de sentir miedo.</p>
              <p>Aprenden a <span className="highlight-yellow">decidir a pesar de él.</span></p>
            </div>

            <p className="tension-final">Y eso es exactamente lo que vas a desarrollar en esta mentoría.</p>
          </div>
        </div>
      </section>

      {/* OFERTA IRRESISTIBLE */}
      <section className="oferta-irresistible-exacta" id="compra">
        <div className="container">
          <div className="oferta-grid">
            <div className="oferta-img-col">
              <img src="/wp-content/uploads/2026/04/transparent-Photoroom.webp" alt="Ebook 3D" className="ebook-3d" />
            </div>

            <div className="oferta-text-col" style={{ textAlign: "left" }}>
              <h2 className="launch-price-title" style={{ fontSize: "2.3rem", textTransform: "none", color: "#0a1f44", marginBottom: "10px" }}>
                Mentoría Del Miedo a la Acción®
              </h2>

              <p style={{ color: "#888", fontSize: "1.1rem", textDecoration: "line-through", margin: "10px 0 0 0" }}>
                Valor total: $197 USD
              </p>
              <div style={{ fontSize: "3rem", fontWeight: "900", color: "#E91E63", margin: "10px 0" }}>
                $44,83 USD
              </div>
              <p style={{ fontSize: "1.05rem", lineHeight: "1.6", color: "#0a1f44", maxWidth: "420px", margin: "0 0 10px 0" }}>
                Hoy no estás comprando cinco días de mentoría. Estás dando el primer paso para entrenar una mente que deje de gobernarse por el miedo.
              </p>

              <p style={{ fontSize: "1.0rem", lineHeight: "1.6", color: "#555", maxWidth: "420px", margin: "0 0 20px 0", fontStyle: "italic" }}>
                Hoy no estás comprando solamente una mentoría. Estás dando el primer paso dentro del Método Imparable®, un sistema de entrenamiento diseñado para ayudarte a gobernar tu mente y construir una vida dirigida por tus decisiones, no por tus automatismos.
              </p>
              <div className="final-cta-box" style={{ marginTop: "10px" }}>
                <a href="https://go.hotmart.com/C100717660P?dp=1" target="_blank" rel="noopener noreferrer" className="btn-buy-final">
                  ¡QUIERO EMPEZAR MI ENTRENAMIENTO! ✔️
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="testimonios-section">
        <div className="container">
          <h2 className="testimonios-title">TESTIMONIOS REALES DE TRANSFORMACIÓN</h2>
          <div className="testimonios-grid">
            <div className="testimonio-card">
              <div className="testimonio-img-wrap">
                <img src="/wp-content/uploads/2026/04/b3577990-3c03-4ccf-8eda-a3d9b68c6e3d.webp" alt="Cristina" />
              </div>
              <h4>CRISTINA</h4>
              <p className="testimonio-tag">Mentalidad Imparable</p>
              <p className="testimonio-text">"Logré identificar bloqueos que no sabía que tenía. Mi confianza creció enormemente en solo 5 días."</p>
            </div>

            <div className="testimonio-card">
              <div className="testimonio-img-wrap">
                <img src="/wp-content/uploads/2026/04/5c30acc7-2eeb-45dc-8aa9-85230c18d7e2.webp" alt="Sulanyi" />
              </div>
              <h4>SULANYI</h4>
              <p className="testimonio-tag">Acción Inmediata</p>
              <p className="testimonio-text">"Pasé de la parálisis por análisis a tomar decisiones con seguridad. ¡Altamente recomendado!"</p>
            </div>

            <div className="testimonio-card">
              <div className="testimonio-img-wrap">
                <img src="/wp-content/uploads/2026/04/7c5ec73e-3ef2-4420-b035-dbaab0d41ddd.webp" alt="Dignora" />
              </div>
              <h4>DIGNORA</h4>
              <p className="testimonio-tag">Transformación Real</p>
              <p className="testimonio-text">"Duly tiene un método único para reprogramar la mente. Me siento con un enfoque total en mis metas."</p>
            </div>
          </div>
        </div>
      </section>

      {/* BIO AUTHOR */}
      <section className="bio-duly">
        <div className="container container-large flex-row-bio">
          <div className="bio-img-col">
            <img src="/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-03-at-17.24.13.webp" alt="Duly Hernández" />
          </div>
          <div className="bio-text-col">
            <h2 className="bio-title">¿QUIÊN ES DULY HERNÁNDEZ?</h2>
            <div className="bio-underline"></div>
            <p className="bio-description">
              Soy experta en reprogramación mental y neurociencia aplicada. A través de mis programas he guíado a más de 1,000 personas a romper sus bloqueos, dejar de postergar y entrenar su mente para actuar a pesar del miedo. Mi propósito es acompañarte de forma cercana a tomar las riendas de tu vida con mayor conciencia y responsabilidad.
            </p>
            <div style={{ marginTop: "30px", padding: "35px", background: "#0a1f44", borderRadius: "12px", color: "#fcf9f8", textAlign: "left", boxShadow: "0 15px 35px rgba(10, 31, 68, 0.15)" }}>
              <p style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "15px" }}>Hoy tienes dos opciones.</p>
              <p style={{ fontSize: "1.1rem", marginBottom: "15px", fontStyle: "italic", opacity: 0.9 }}>Seguir dejando que tus patrones decidan por ti...</p>
              <p style={{ fontSize: "1.1rem", marginBottom: "20px", opacity: 0.9 }}>o comenzar el entrenamiento que puede cambiar la forma en que diriges tu vida.</p>
              <p style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "5px" }}>Bienvenido al Método Imparable®.</p>
              <p style={{ fontSize: "1.1rem", fontStyle: "italic", marginBottom: "25px", color: "#E91E63", fontWeight: "600" }}>Quien gobierna su mente, gobierna su vida.</p>
              <a href="https://go.hotmart.com/C100717660P?dp=1" target="_blank" rel="noopener noreferrer" className="cta-yellow-exact" style={{ display: "inline-block", width: "auto", padding: "12px 25px", fontSize: "1.1rem" }}>
                🔘 QUIERO EMPEZAR MI ENTRENAMIENTO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-exacta">
        <div className="container container-medium">
          <h2 className="faq-title">PREGUNTAS FRECUENTES – DEL MIEDO A LA ACCIÓN</h2>

          <div className="faq-accordion-box">
            {[
              {
                q: "¿Cuánto tiempo debo dedicarle diariamente?",
                a: "Recomiendo invertir 60 minutos diarios durante los 5 días para aprovechar al máximo la experiencia y participar activamente."
              },
              {
                q: "¿Cómo recibiré el contenido y el acompañamiento?",
                a: "Todo se entrega de forma digital: audios y guía diaria por WhatsApp, junto con acceso a la comunidad privada."
              },
              {
                q: "¿Necesito experiencia previa en desarrollo personal?",
                a: "No. Está diseñada para cualquier persona que quiera romper bloqueos y avanzar, sin importar si es su primera vez haciendo esto."
              },
              {
                q: "¿Qué pasa si no puedo asistir a las sesiones en vivo?",
                a: "Las sesiones y el material quedarán grabados y tendrás acceso para repasarlos durante el tiempo asignado."
              },
              {
                q: "¿Tiene alguna garantía?",
                a: "Sí. Tienes 7 días de garantía oficial desde tu inscripción para solicitar el reembolso del 100% de tu dinero si sientes que la mentoría no es para ti."
              }
            ].map((faq, idx) => (
              <div key={idx} className={`faq-row-item ${activeFaq === idx ? "active" : ""}`}>
                <div className="faq-question-trigger" onClick={() => toggleFaq(idx)}>
                  <div className="blue-num">{idx + 1}</div>
                  <p>{faq.q}</p>
                  <div className="plus-icon">+</div>
                </div>
                <div className="faq-answer-content">
                  <div className="faq-answer-inner">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR WHOM IT IS NOT */}
      <section className="no-es-para-ti-reloaded">
        <div className="no-banner-magenta">
          <h2>🚫 Esta mentoría NO es para ti si...</h2>
        </div>
        <div className="container container-large">
          <div className="no-content-grid">
            <div className="no-img-col">
              <img src="/wp-content/uploads/2026/04/Generated-Image-April-07-2026-6_24PM.png" alt="Advertencia Mente Cerrada" className="no-photo-main" />
            </div>
            <div className="no-info-col">
              <div className="no-item-box">
                <span className="bad-icon">❌</span>
                <p><strong>Buscas una solución mágica sin hacer cambios.</strong><br />Aquí no vendemos motivación pasajera. Entrenamos tu mente para que aprendas a actuar de forma diferente.</p>
              </div>
              <div className="no-item-box">
                <span className="bad-icon">❌</span>
                <p><strong>No estás dispuesto(a) a asumir responsabilidad por tu proceso.</strong><br />Nadie puede gobernar tu mente por ti. El cambio comienza cuando decides hacerte cargo de tu vida.</p>
              </div>
              <div className="no-item-box">
                <span className="bad-icon">❌</span>
                <p><strong>Prefieres seguir esperando el momento perfecto.</strong><br />Si esperas sentirte completamente seguro para actuar, probablemente seguirás en el mismo lugar. Aquí aprenderás a avanzar incluso cuando exista miedo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RISK FREE WARRANTY */}
      <section className="garantia-zona">
        <div className="garantia-banner-yellow">
          <h2>🛡️ GARANTÍA IMPARABLE</h2>
        </div>
        <div className="container container-medium">
          <div className="shield-icon-box">
            <div className="shield-circle">🛡️</div>
          </div>
          <p className="garantia-text">
            Queremos que tomes esta mentoría con total tranquilidad.
          </p>
          <p className="garantia-text">
            Si durante los primeros <strong>7 días desde tu inscripción</strong> y dentro de las primeras <strong>72 horas de haber iniciado la mentoría</strong> sientes que esta experiencia no era lo que esperabas, te devolveremos el <strong>100% de tu inversión</strong>.
          </p>
          <p className="garantia-text">Sin complicaciones. Sin preguntas innecesarias.</p>
          <p className="garantia-text">Nuestro propósito no es que compres una mentoría.</p>
        </div>
      </section>

      {/* FINAL AREA AND CTA */}
      <section className="final-cta-area">
        <div className="container">
          <h2 className="final-headline" style={{ textTransform: "none", marginBottom: "10px" }}>Hoy tienes dos opciones</h2>
          
          <div className="comparison-box-container">
            {/* Opción A */}
            <div className="comparison-card muted-option">
              <span className="card-badge">❌ RUTINA AUTOMÁTICA</span>
              <div style={{ marginTop: "15px" }}>
                <h4 style={{ textTransform: "none", color: "#fff", fontWeight: "bold" }}>Opción A: Seguir igual</h4>
                <p style={{ margin: "10px 0" }}>Seguir dejando que tus patrones decidan por ti en tu día a día...</p>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "15px", fontSize: "0.9rem", color: "#888", fontWeight: "600" }}>
                Permaneces en el mismo lugar de siempre.
              </div>
            </div>

            {/* Opción B */}
            <div className="comparison-card highlight-option">
              <span className="card-badge">🔥 DECISIÓN IMPARABLE</span>
              <div style={{ marginTop: "15px" }}>
                <h4 style={{ textTransform: "none", color: "#E91E63", fontWeight: "bold" }}>Opción B: Entrenar tu mente</h4>
                <p style={{ margin: "10px 0" }}>Comenzar el entrenamiento que puede cambiar de raíz la forma en que decides y diriges tu vida.</p>
              </div>
              <div style={{ borderTop: "1px solid rgba(233,30,99,0.2)", paddingTop: "15px", fontSize: "0.9rem", color: "#E91E63", fontWeight: "700" }}>
                Tomas el control consciente de tu vida.
              </div>
            </div>
          </div>

          <p style={{ fontSize: "1.3rem", fontWeight: "700", color: "#fcf9f8", margin: "30px 0 5px 0" }}>Bienvenido al Método Imparable®.</p>
          <p style={{ fontSize: "1.2rem", color: "#E91E63", fontStyle: "italic", marginBottom: "30px" }}>Quien gobierna su mente, gobierna su vida.</p>

          <div className="final-button-box">
            <a href="https://go.hotmart.com/C100717660P?dp=1" target="_blank" rel="noopener noreferrer" className="btn-yellow-huge">
              🔘 QUIERO EMPEZAR MI ENTRENAMIENTO
            </a>
          </div>

          <p className="final-last-warning">Cada día que postergas, tu mente fortalece el miedo. Hoy puedes cambiarlo.</p>

          {showPrivacy && (
            <div className="privacy-notice-box">
              <div className="privacy-header">
                <span>AL ENTRAR AL CURSO</span>
                <span className="close-x" onClick={() => setShowPrivacy(false)}>×</span>
              </div>
              <p>Al continuar, aceptas nuestra Política de Privacidad y te unes al pacto de transformación que guía cada paso en Imparable Mentalidad.</p>
            </div>
          )}
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "30px", background: "#0a1f44", color: "#fcf9f8" }}>
        <p>&copy; {new Date().getFullYear()} Imparable Mentalidad. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
