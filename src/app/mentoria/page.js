"use client";

import { useState, useEffect } from "react";
import "./mentoria.css";

export default function Mentoria() {
  // 1. Timer State (24 hours demo: 86400 seconds)
  const [timer, setTimer] = useState(86400);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

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
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <h1>DEJA DE SOBREVIVIR.<br /><span>DOMINA TU MENTE</span> Y PASA A LA ACCIÓN.</h1>

          <div className="pain-points">
            <h2>¿Te sientes así?</h2>
            <ul>
              <li>Sabes lo que quieres pero no avanzas.</li>
              <li>Piensas demasiado antes de actuar.</li>
              <li>Postergas decisiones importantes.</li>
              <li>Esperas sentirte listo… y ese momento no llega.</li>
            </ul>
            <p style={{ fontWeight: 700, fontSize: "1.3rem", marginTop: "20px" }}>
              Entonces no necesitas más motivación. Necesitas entrenamiento mental.
            </p>
          </div>

          <div style={{
            background: "#0a1f44",
            color: "#fcf9f8",
            padding: "40px",
            borderRadius: "8px",
            margin: "40px 0",
            textAlign: "left"
          }}>
            <h3 style={{
              backgroundColor: "var(--primary)",
              color: "#fcf9f8",
              display: "inline-block",
              padding: "10px 20px",
              borderRadius: "8px",
              marginBottom: "25px",
              lineHeight: "1.2",
              fontWeight: 900
            }}>
              Mira el siguiente video porque en los próximos minutos entenderás:
            </h3>
            <ul style={{ listStyle: "none", fontSize: "1.25rem", lineHeight: "1.6" }}>
              <li>• Por qué tu mente te frena.</li>
              <li>• Por qué la disciplina sola no funciona.</li>
              <li>• Y cómo puedes empezar a cambiar esto en solo 5 días.</li>
            </ul>
          </div>

          {/* VIMEO VIDEO CONTAINER */}
          <div className="video-container" style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
            borderRadius: "8px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
            background: "#0a1f44"
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

          <div style={{
            margin: "30px auto 50px",
            maxWidth: "800px",
            textAlign: "left",
            background: "#fefefe",
            padding: "30px",
            borderLeft: "5px solid var(--primary)",
            borderRadius: "8px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
            color: "#222"
          }}>
            <h4 style={{ color: "var(--primary)", fontSize: "1.4rem", marginBottom: "15px" }}>👉 IMPORTANTE</h4>
            <p style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "20px" }}>Este video no es motivación.</p>
            <p style={{ marginBottom: "10px", fontWeight: 600 }}>Es una explicación clara de:</p>
            <ul style={{ listStyle: "none", paddingLeft: "10px", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "20px" }}>
              <li>• Por qué tu mente repite los mismos patrones.</li>
              <li>• Por qué sabes mucho pero actúas poco.</li>
              <li>• Y cómo funciona el entrenamiento mental que utilizamos en esta mentoría.</li>
            </ul>
            <p style={{ fontStyle: "italic", color: "#555", background: "#f9f9f9", padding: "15px", borderRadius: "8px" }}>
              Si sientes que llevas tiempo intentando cambiar sin lograrlo, empieza por entender esto.
            </p>
          </div>
        </div>
      </section>

      {/* URGENCY SECTION */}
      <section className="urgency-section">
        <div className="container">
          <h2 className="alert-title">🚨 ESTA MENTORÍA NO ES PARA TODO EL MUNDO.</h2>
          <p className="alert-sub">👉 Accede a mentorías en vivo con Duly Hernández y un equipo que te impulsa a dejar de postergar y empezar a accionar.</p>

          <div className="timer-box">
            <h3>⏰ ÚLTIMOS DÍAS PARA UNIRTE ⏰</h3>
            <div className="countdown-clock">
              <div className="time-item"><span>{formatTime(hours)}</span><small>Horas</small></div>
              <div className="time-sep">:</div>
              <div className="time-item"><span>{formatTime(minutes)}</span><small>Minutos</small></div>
              <div className="time-sep">:</div>
              <div className="time-item"><span>{formatTime(seconds)}</span><small>Segundos</small></div>
            </div>
            <p className="timer-warning">👉 Cuando este contador llegue a cero «0» se cierran las inscripciones</p>
          </div>

          <div className="social-proof">
            <h2 className="big-numbers">98 PERSONAS DE 100</h2>
            <p>Han comprado el curso</p>
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

      {/* IMMEDIATE BENEFITS */}
      <section className="benefits-immediate">
        <div className="container">
          <h2 className="section-title"><span className="target-icon">🎯</span> BENEFICIOS INMEDIATOS</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="icon-circle">❤️</div>
              <p>Transforma tu relación con tus miedos</p>
            </div>
            <div className="benefit-item">
              <div className="icon-circle">🧠</div>
              <p>Rediseña tus patrones de pensamiento</p>
            </div>
            <div className="benefit-item">
              <div className="icon-circle">✅</div>
              <p>Recupera el control de tu vida</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mentorship-header">
        <div className="container">
          <h2 className="section-title-white"><span className="target-icon">🎯</span> CONTENIDO DE LA MENTORÍA</h2>
        </div>
      </section>

      {/* MODULES DETAIL */}
      <section className="mentorship-modules">
        <div className="module-item mod-magenta">
          <div className="mod-text-col">
            <h3>📘 MÓDULO 1</h3>
            <p>Identifica y rompe los patrones mentales que te frenan.</p>
          </div>
        </div>

        <div className="module-item mod-gold">
          <div className="mod-text-col">
            <h3>⚡ Módulo 2</h3>
            <p>Técnicas para actuar incluso cuando el miedo esté presente.</p>
          </div>
        </div>

        <div className="module-item mod-magenta">
          <div className="mod-text-col">
            <h3>💎 Módulo 3</h3>
            <p>Estrategias de autoconfianza y autocontrol mental.</p>
          </div>
        </div>

        <div className="module-item mod-gold">
          <div className="mod-text-col">
            <h3>🚀 Módulo 4</h3>
            <p>Plan de acción concreto para tu siguiente gran paso.</p>
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

          <div className="countdown-clock-exact">
            <div className="time-box-ex"><span>00</span><small>Days</small></div>
            <div className="time-box-ex"><span>{formatTime(hours)}</span><small>Hours</small></div>
            <div className="time-box-ex"><span>{formatTime(minutes)}</span><small>Minutes</small></div>
            <div className="time-box-ex"><span>{formatTime(seconds)}</span><small>Seconds</small></div>
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
                <h3><span className="blue-num">2</span> BONO #2: EJERCICIOS PRÁCTICOS PARA REPROGRAMAR TU MENTE</h3>
                <p>Técnicas fáciles y comprobadas que te ayudarán a eliminar pensamientos limitantes y a instalar nuevos patrones de poder.</p>
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
                <h3><span className="blue-num">4</span> BONO #4: SESIÓN GRUPAL EN VIVO DE CIERRE</h3>
                <p>*Grupo privado con mentes en crecimiento<br />*Lives semanales exclusivos<br />*Soporte continuo entre sesiones</p>
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
            <div className="neuro-text-col">
              <span className="duly-name">DULY HERNANDEZ</span>
              <h2>🧠 EL PROBLEMA ESTÁ EN TU MENTE.</h2>
              <p className="scientific-source">Estudios científicos basados en <i>(National Science Foundation, 2024)</i>.</p>

              <p className="neuro-body">Estudios de neurociencia han demostrado que <strong>más del 80% de nuestros pensamientos diarios son automáticos y repetitivos</strong>, y la mayoría están condicionados por el miedo, la culpa o la duda <i>(National Science Foundation, 2024)</i>.</p>

              <ul className="neuro-bullets">
                <li>👉 Tu cerebro no está diseñado para hacerte feliz, sino para mantenerte a salvo y en lo conocido.</li>
              </ul>

              <p className="neuro-body">Por eso repites patrones, postergas decisiones y <strong>dudas de ti misma</strong>, incluso cuando sabes lo que quieres.</p>

              <p className="neuro-highlight"><strong>No estás roto. Estás programado para sobrevivir, no para avanzar.</strong><br />Pero eso puede reentrenarse.</p>

              <p className="final-quote">🧠 Tu vida no cambia con motivación, <strong>cambia con acción.</strong> Da el primer paso.</p>

              <div className="payment-area-small">
                <img src="/wp-content/uploads/2026/04/METODOS-DE-PAGO-LP-1.png" alt="Pagos" style={{ maxWidth: "300px" }} />
                <br /><br />
                <a href="https://go.hotmart.com/C100717660P?dp=1" target="_blank" rel="noopener noreferrer" className="cta-yellow-exact">
                  QUIERO PASAR DEL MIEDO A LA ACCIÓN ✔️
                </a>
              </div>
            </div>

            <div className="neuro-img-col">
              <div className="brain-card">
                <img src="/wp-content/uploads/2026/04/OIP-3.webp" alt="Escaneo Cerebral" />
                <p className="brain-caption">Las imágenes muestran las áreas cerebrales que se activan durante el aprendizaje del miedo (miedo condicionado): corteza cingulada anterior dorsal (1), ínsula anterior (2), corteza prefrontal dorsolateral (3), región dorsal del tronco craneoencefálico (4), precúneo dorsal (5), hipotálamo (6), corteza somatosensorial (7), corteza suplementaria motora (8), tálamo (9) y estriado ventral (10).</p>
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
              <p>Las personas que avanzan no tienen menos miedo.</p>
              <p>Tienen <span className="highlight-yellow">entrenamiento mental</span> para actuar a pesar de él.</p>
            </div>

            <p className="tension-final">Y eso es exactamente lo que vas a desarrollar en esta mentoría.</p>
          </div>
        </div>
      </section>

      {/* OFERTA IRRESISTIBLE */}
      <section className="oferta-irresistible-exacta">
        <div className="container">
          <div className="oferta-grid">
            <div className="oferta-img-col">
              <img src="/wp-content/uploads/2026/04/transparent-Photoroom.webp" alt="Ebook 3D" className="ebook-3d" />
            </div>

            <div className="oferta-text-col">
              <p className="real-value-text">💥 PRECIO REAL DE ESTA MENTORÍA: $87,18 USD</p>
              <h2 className="launch-price-title">PRECIO DE LANZAMIENTO: $44,83 USD 🚀</h2>

              <div className="what-you-get-header">
                🎁 Esto es lo que recibirás dentro de la mentoría:
              </div>

              <ul className="value-stack-list">
                <li><span className="check-circ">✅</span> 🔓 Más de 25 horas de transformación mental guiada en video Valor real: $100 USD</li>
                <li><span className="check-circ">✅</span> 🔊 Más de 120 bloqueos emocionales y miedos frecuentes respondidos en video Valor real: $197 USD</li>
                <li><span className="check-circ">✅</span> 📝 Evaluaciones conscientes e interactivas al final de cada módulo</li>
                <li><span className="check-circ">✅</span> 📝 Evaluaciones activadoras al final de cada módulo</li>
              </ul>

              <div className="final-cta-box">
                <a href="https://go.hotmart.com/C100717660P?dp=1" target="_blank" rel="noopener noreferrer" className="btn-buy-final">
                  ¡COMPRAR AHORA!<br />POR $44,83 USD ✔️
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
            <h2 className="bio-title">¿QUIÉN ES DULY HERNÁNDEZ?</h2>
            <div className="bio-underline"></div>
            <p className="bio-description">
              Soy una apasionada del potencial humano y experta en reprogramación mental. He dedicado años a entender cómo funciona nuestro cerebro y por qué el miedo es el principal freno de nuestros sueños.
            </p>
            <div className="bio-achievements">
              <div className="achievement">
                <span className="ach-icon">⭐</span>
                <p>+1,000 vidas transformadas a través de mis mentorías.</p>
              </div>
              <div className="achievement">
                <span className="ach-icon">⭐</span>
                <p>Experta en Neurociencia aplicada al éxito personal.</p>
              </div>
              <div className="achievement">
                <span className="ach-icon">⭐</span>
                <p>Mentora de líderes e imparables decididos a romper sus techos de cristal.</p>
              </div>
            </div>
            <p className="bio-mission">
              <em>"Mi misión es que dejes de ser espectador de tu propia vida y te conviertas en el director imparable de tu destino."</em>
            </p>
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
                q: "¿Necesito experiencia previa para unirme a la mentoría?",
                a: "No. Está diseñada para cualquier persona que quiera romper bloqueos y avanzar, incluso si nunca ha trabajado en su desarrollo personal."
              },
              {
                q: "¿Cuánto tiempo debo dedicarle?",
                a: "Recomiendo invertir 60 minutos diarios durante los 5 días para aprovechar al máximo la experiencia y participar activamente en el taller en vivo."
              },
              {
                q: "¿Recibiré materiales o apoyo adicional?",
                a: "Sí. Tendrás audios enviados por WhatsApp, ejercicios prácticos y acceso a un grupo privado donde podrás resolver dudas y recibir motivación diaria."
              },
              {
                q: "¿Cómo recibiré el contenido?",
                a: "Todo se entrega de forma digital: audios por WhatsApp, guías en PDF y material práctico descargable."
              },
              {
                q: "¿Cuánto dura la mentoría?",
                a: "La mentoría dura 5 días intensivos y tendrás acceso al material durante 3 meses para que lo repases y consolides lo aprendido."
              },
              {
                q: "¿Cinco días es suficiente para pasar del miedo a la acción?",
                a: "Sí, porque trabajaremos de forma enfocada e intensiva. En solo 5 días tendrás herramientas prácticas para tomar decisiones, actuar con seguridad y dejar de quedarte paralizado(a) por el miedo."
              },
              {
                q: "¿Puedo hacer preguntas o recibir apoyo durante el programa?",
                a: "Claro. Estaré disponible para resolver tus dudas y acompañarte en el grupo privado de WhatsApp."
              },
              {
                q: "¿Y si no me funciona?",
                a: "Tienes 7 días de garantía oficial desde tu inscripción para solicitar el reembolso del 100% si sientes que la mentoría no es para ti."
              },
              {
                q: "¿Qué pasa si no puedo iniciar en la fecha indicada?",
                a: "Podrás unirte a la próxima edición sin costo adicional."
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
          <h2>⛔ PARA QUIÉN NO ES ESTA MENTORÍA</h2>
        </div>
        <div className="container container-large">
          <div className="no-content-grid">
            <div className="no-img-col">
              <img src="/wp-content/uploads/2026/04/Generated-Image-April-07-2026-6_24PM.png" alt="Advertencia Mente Cerrada" className="no-photo-main" />
            </div>
            <div className="no-info-col">
              <div className="no-item-box">
                <span className="bad-icon">🚫</span>
                <p><strong>Quienes no quieran comprometerse 100%.</strong><br />La transformación requiere energía y presencia absoluta.</p>
              </div>
              <div className="no-item-box">
                <span className="bad-icon">🚫</span>
                <p><strong>Quienes esperan resultados sin acción.</strong><br />La motivación sola es humo; aquí venimos a trabajar de verdad.</p>
              </div>
              <div className="no-item-box">
                <span className="bad-icon">🚫</span>
                <p><strong>Quienes no estén dispuestos a enfrentar miedos.</strong><br />Solo quienes cruzan la barrera del miedo logran la libertad.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RISK FREE WARRANTY */}
      <section className="garantia-zona">
        <div className="garantia-banner-yellow">
          <h2>GARANTÍA SIN RIESGO</h2>
        </div>
        <div className="container container-medium">
          <div className="shield-icon-box">
            <div className="shield-circle">✔️</div>
          </div>
          <p className="garantia-text">
            Queremos que tomes esta <strong>mentoría con total seguridad</strong>. Si en los <strong>primeros 7 días desde tu inscripción</strong> —y dentro de las primeras 72 horas de haber iniciado el taller— sientes que no es para ti, te <strong>devolvemos el 100% de tu inversión</strong>, sin preguntas. Lo importante es que <strong>comiences solo si realmente sientes que este es tu momento.</strong>
          </p>
        </div>
      </section>

      {/* FINAL AREA AND CTA */}
      <section className="final-cta-area">
        <div className="container">
          <h2 className="final-headline">Ya lo sabes: el miedo no es tu enemigo, es tu programación</h2>
          <p className="final-subheadline">Y LAS PROGRAMACIONES SE PUEDEN REENTRENAR</p>

          <div className="final-button-box">
            <a href="https://go.hotmart.com/C100717660P?dp=1" target="_blank" rel="noopener noreferrer" className="btn-yellow-huge">
              QUIERO PASAR DEL MIEDO A LA ACCIÓN ✔️
            </a>
          </div>

          <p className="final-last-warning">Cada día que postergas, tu mente fortalece el miedo. hoy puedes cambiarlo</p>

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
