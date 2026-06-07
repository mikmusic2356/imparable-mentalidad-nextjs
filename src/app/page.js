"use client";

import { useState, useEffect } from "react";
import "./onboarding.css";

const questions = [
  { 
    question: "¿Sientes que muchas veces sabes lo que deberías hacer… pero aun así terminas frenándote o postergándolo?", 
    options: [
      { text: "Constantemente", profile: "autosabotaje" },
      { text: "A veces", profile: "miedo" },
      { text: "Muy pocas veces", profile: null }
    ]
  },
  { 
    question: "¿Cómo te has sentido emocionalmente últimamente?", 
    options: [
      { text: "Mentalmente agotado/a", profile: "sobrecarga" },
      { text: "Desconectado/a de mí", profile: "sobrecarga" },
      { text: "Estancado/a", profile: "autosabotaje" },
      { text: "Con miedo de avanzar", profile: "miedo" }
    ]
  },
  { 
    question: "¿Qué sientes que más está afectando hoy tu vida?", 
    options: [
      { text: "El cansancio mental", profile: "sobrecarga" },
      { text: "La postergación", profile: "autosabotaje" },
      { text: "El miedo a actuar", profile: "miedo" },
      { text: "La falta de claridad", profile: "sobrecarga" }
    ]
  },
  { 
    question: "Si siguieras igual durante los próximos meses… ¿qué sería lo que más te preocuparía?", 
    options: [
      { text: "Sentirme cada vez más agotado/a", profile: "sobrecarga" },
      { text: "Seguir postergando mi vida", profile: "autosabotaje" },
      { text: "Nunca atreverme a cambiar", profile: "miedo" }
    ]
  },
  { 
    question: "¿Cuál de estas situaciones sientes que más se repite en tu vida?", 
    options: [
      { text: "Empiezo cosas y no las sostengo", profile: "autosabotaje" },
      { text: "Pienso demasiado antes de actuar", profile: "miedo" },
      { text: "Me siento emocionalmente agotado/a", profile: "sobrecarga" },
      { text: "Siento que me desconecté de mí", profile: "sobrecarga" }
    ]
  },
  { 
    question: "¿Qué tan dispuesto/a estás a confrontar lo que hoy está frenando tu vida?", 
    options: [
      { text: "Estoy listo/a para cambiar", profile: "general" },
      { text: "Sé que necesito hacerlo", profile: "general" },
      { text: "Ya no quiero seguir igual", profile: "general" }
    ]
  }
];

const profilesData = {
  sobrecarga: {
    title: "SOBRECARGA MENTAL",
    cssClass: "profile-sobrecarga",
    desc: "Tu resultado refleja señales claras de sobrecarga mental.<br><br>Llevas demasiado tiempo funcionando desde el agotamiento, el ruido constante y la desconexión emocional de ti mismo/a.<br><br>Esto no significa que seas débil. Significa que tu mente se acostumbró a sobrevivir en automático.<br><br>La claridad se recupera cuando identificas y desactivas los patrones que hoy drenan tu vida."
  },
  autosabotaje: {
    title: "AUTOSABOTAJE INVISIBLE",
    cssClass: "profile-autosabotaje",
    desc: "Tu resultado refleja patrones profundos de autosabotaje invisible.<br><br>Sabes perfectamente lo que deberías hacer, pero algo muy dentro de ti frena tus decisiones y te mantiene en un ciclo de duda.<br><br>No es falta de capacidad. Es que llevas demasiado tiempo luchando mentalmente contigo mismo/a.<br><br>Tu vida cambia el día que dejas de ser tu propio obstáculo."
  },
  miedo: {
    title: "PARÁLISIS POR MIEDO",
    cssClass: "profile-miedo",
    desc: "Tu resultado refleja señales de parálisis por miedo.<br><br>Llevas tiempo queriendo dar un paso importante, pero el miedo a equivocarte o la necesidad de tener todo bajo control terminan congelando tus acciones.<br><br>No significa que no puedas avanzar. Significa que tu mente aprendió a protegerte evitando cualquier cambio.<br><br>La acción nace cuando aprendes a caminar con el miedo, en lugar de esperar a que desaparezca."
  }
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({
    sobrecarga: 0,
    autosabotaje: 0,
    miedo: 0
  });
  
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [fadeClass, setFadeClass] = useState("fadeIn");
  const [stage, setStage] = useState("quiz"); // quiz, loading, result
  const [highestProfile, setHighestProfile] = useState("sobrecarga");

  const progress = (currentStep / questions.length) * 100;

  // Calculate highest profile based on scores
  const getHighestProfileKey = () => {
    let maxProfile = "sobrecarga";
    let maxScore = scores.sobrecarga;
    
    if (scores.autosabotaje > maxScore) {
      maxScore = scores.autosabotaje;
      maxProfile = "autosabotaje";
    }
    
    if (scores.miedo > maxScore) {
      maxScore = scores.miedo;
      maxProfile = "miedo";
    }
    
    return maxProfile;
  };

  const handleNext = (optionIndex) => {
    if (selectedOptionIdx !== null) return;
    
    setSelectedOptionIdx(optionIndex);

    const currentQuestion = questions[currentStep];
    const selectedOption = currentQuestion.options[optionIndex];
    
    if (selectedOption.profile && selectedOption.profile !== "general") {
      setScores(prev => ({
        ...prev,
        [selectedOption.profile]: prev[selectedOption.profile] + 1
      }));
    }

    setTimeout(() => {
      setFadeClass("fadeOut");
      
      setTimeout(() => {
        const nextStep = currentStep + 1;
        if (nextStep < questions.length) {
          setCurrentStep(nextStep);
          setSelectedOptionIdx(null);
          setFadeClass("fadeIn");
        } else {
          setStage("loading");
          setFadeClass("fadeIn");
        }
      }, 800);
    }, 600);
  };

  // Handle Loading transitions
  useEffect(() => {
    if (stage === "loading") {
      const timer = setTimeout(() => {
        setFadeClass("fadeOut");
        
        setTimeout(() => {
          // Calculate the results
          const resultProfile = getHighestProfileKey();
          setHighestProfile(resultProfile);
          setStage("result");
          setFadeClass("fadeIn");
        }, 800);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Determine the cinematic background style dynamically based on the active state
  let backgroundStyle = {};
  if (stage === "result") {
    if (highestProfile === "autosabotaje") {
      backgroundStyle = { background: "radial-gradient(circle at 50% 30%, #290a1d 0%, #0d0d0d 80%)" };
    } else if (highestProfile === "miedo") {
      backgroundStyle = { background: "radial-gradient(circle at 50% 30%, #291a0a 0%, #0d0d0d 80%)" };
    } else {
      backgroundStyle = { background: "radial-gradient(circle at 50% 30%, #0a1f44 0%, #0d0d0d 80%)" };
    }
  }

  const activeProfile = profilesData[highestProfile];

  return (
    <div 
      id="imparable-onboarding-root" 
      className={stage === "result" ? activeProfile.cssClass : ""}
    >
      <div className="cinematic-bg" style={backgroundStyle}></div>
      <div id="onboarding-container" className="onboarding-wrapper">
        <header className="minimal-header">
          <span className="logo-text">IMPARABLE MENTALIDAD</span>
        </header>
        <div id="card" className="onboarding-card">
          {stage === "quiz" && (
            <>
              <div id="progress-area" className="progress-container">
                <div 
                  id="progress-bar" 
                  className="progress-bar" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div id="quiz-content">
                <div className={`question-container ${fadeClass}`}>
                  <h2>{questions[currentStep].question}</h2>
                  <div className="options-list">
                    {questions[currentStep].options.map((opt, idx) => (
                      <button 
                        key={idx}
                        className={`option-btn ${selectedOptionIdx === idx ? "selected" : ""}`}
                        id={`opt-${idx}`}
                        onClick={() => handleNext(idx)}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {stage === "loading" && (
            <div id="quiz-content">
              <div className={`loading-container ${fadeClass}`}>
                <div className="loading-text">Analizando patrones...</div>
              </div>
            </div>
          )}

          {stage === "result" && (
            <div id="quiz-content">
              <div className={`result-container ${fadeClass}`}>
                <div style={{
                  padding: "56.25% 0 0 0",
                  position: "relative",
                  width: "100%",
                  maxWidth: "800px",
                  margin: "0 auto 30px auto",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                }}>
                  <iframe 
                    src="https://player.vimeo.com/video/1107914366?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%"
                    }} 
                    title="Video de diagnóstico"
                  ></iframe>
                </div>
                
                <div className="editorial-line">────────</div>
                
                <h2 className="result-title">{activeProfile.title}</h2>
                
                <p 
                  className="result-desc"
                  dangerouslySetInnerHTML={{ __html: activeProfile.desc }}
                ></p>
                
                <div className="editorial-line" style={{ marginBottom: "50px" }}>────────</div>
                
                <a 
                  href="https://go.hotmart.com/C100717660P?dp=1" 
                  className="cta-final-btn" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  INGRESAR A LA MENTORÍA DEL MIEDO A LA ACCIÓN
                </a>
                <br />
                <a 
                  href="/mentoria" 
                  className="cta-info-btn" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver más información de la mentoría
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
