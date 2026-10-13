import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { questions } from '../../../data/questions';
import { generarColorHSLSobrio } from '../../../helpers/coloresSobrios';

const COMMON_LETTERS = 'ABCDEFGHIJLMNOPRSTUV';
const SPECIAL_LETTERS = 'KÑQWXYZ';

const generarPreguntasIniciales = (cantidadInicial) => {
  const preguntasDisponibles = [...questions];
  return Array.from({ length: cantidadInicial }, () => {
    const randomIndex = Math.floor(Math.random() * preguntasDisponibles.length);
    const pregunta = preguntasDisponibles.splice(randomIndex, 1)[0];
    return { pregunta: pregunta.question, color: generarColorHSLSobrio() };
  });
};

const INITIAL_STATE = {
  randomQuestion: { question: '?', color: generarColorHSLSobrio() },
  randomLetter: 'A',
  checkboxChecked: false,
  preguntasYColores: generarPreguntasIniciales(2),
  numPreguntas: 2
};

export const TableroBasta = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const letterIntervalRef = useRef(null);
  const { randomQuestion, randomLetter, checkboxChecked, preguntasYColores, numPreguntas } = state;

  useEffect(() => () => {
    if (letterIntervalRef.current !== null) {
      clearInterval(letterIntervalRef.current);
    }
  }, []);

  const generateNewQuestion = useCallback(() => {
    if (!questions?.length) return;
    const randomIndex = Math.floor(Math.random() * questions.length);
    const newQuestion = questions[randomIndex];
    setState(prev => ({ ...prev, randomQuestion: { question: newQuestion.question, color: generarColorHSLSobrio() } }));
  }, []);

  const generarPreguntasYColores = useCallback((cantidad) => {
    const preguntasDisponibles = [...questions];
    const cantidadFinal = Math.min(cantidad, preguntasDisponibles.length);
    const resultado = Array.from({ length: cantidadFinal }, () => {
      const randomIndex = Math.floor(Math.random() * preguntasDisponibles.length);
      const pregunta = preguntasDisponibles.splice(randomIndex, 1)[0];
      return { pregunta: pregunta.question, color: generarColorHSLSobrio() };
    });
    setState(prev => ({ ...prev, preguntasYColores: resultado }));
  }, []);

  const generateRandomLetter = useCallback((useSpecialLetters) => {
    if (isGeneratingLetter) return;

    const letters = useSpecialLetters ? COMMON_LETTERS + SPECIAL_LETTERS : COMMON_LETTERS;
    let ticks = 0;
    setIsGeneratingLetter(true);
    letterIntervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * letters.length);
      setState(prev => ({ ...prev, randomLetter: letters[randomIndex] }));

      ticks += 1;
      if (ticks === 20) {
        clearInterval(letterIntervalRef.current);
        letterIntervalRef.current = null;
        setIsGeneratingLetter(false);
      }
    }, 100);
  }, [isGeneratingLetter]);

  const handleNumPreguntasChange = useCallback((event) => {
    setState(prev => ({ ...prev, numPreguntas: parseInt(event.target.value, 10) }));
  }, []);

  const handleCheckboxChange = useCallback((event) => {
    setState(prev => ({ ...prev, checkboxChecked: event.target.checked }));
  }, []);

  const questionsList = useMemo(() => (
    preguntasYColores.map((pregunta, index) => (
      <p key={`question-${index}`} className="question-label-list" style={{ backgroundColor: pregunta.color }}>
        {index + 1}. {pregunta.pregunta}
      </p>
    ))
  ), [preguntasYColores]);

  const selectOptions = useMemo(() => (
    Array.from({ length: 11 }, (_, i) => i + 2).map(num => (
      <option key={`option-${num}`} value={num}>{num}</option>
    ))
  ), []);

  return (
    <div className="tablero-basta">
      <p className="centrado">
        Aquí puedes generar una pregunta aleatoria para jugar al viral Basta electrónico.
      </p>

      <p className='negrita'>
        <label className='question-label' style={{ backgroundColor: randomQuestion.color }}>
          {randomQuestion.question}
        </label>
      </p>

      <p>
        <button className="btn-marcador-accion" onClick={generateNewQuestion}>
          Nueva Pregunta
        </button>
      </p>

      <p className="centrado">
        O si lo prefieres te podemos ayudar a generar preguntas y una letra aleatoria para jugar al Basta clásico.
      </p>

      <section className='container-info'>
        <div className='elemento-info-1'>
          <button
            className='btn-marcador-accion'
            onClick={() => generateRandomLetter(checkboxChecked)}
            disabled={isGeneratingLetter}
          >
            Genera una letra
          </button>

          <div className="checkbox-container">
            <input
              className="custom-checkbox"
              type="checkbox"
              id="miCheckbox"
              name="miCheckbox"
              checked={checkboxChecked}
              onChange={handleCheckboxChange}
              disabled={isGeneratingLetter}
            />
            <label className="custom-label" htmlFor="miCheckbox">
              K, Ñ, Q, W, X, Y, Z
            </label>
          </div>

          <label className="random-letter-label">{randomLetter}</label>
        </div>

        <div className='elemento-info-2'>
          <button className='btn-marcador-accion' onClick={() => generarPreguntasYColores(numPreguntas)}>
            Genera preguntas
          </button>

          <div className="select-container">
            <label className="custom-label">No. de preguntas</label>
            <select className="select-reducido" value={numPreguntas} onChange={handleNumPreguntasChange}>
              {selectOptions}
            </select>
          </div>

          <div className="questions-list">{questionsList}</div>
        </div>
      </section>
    </div>
  );
};