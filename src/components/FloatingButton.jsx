import { useEffect, useState } from 'react';
import './FloatingButton.css'; // Archivo CSS para estilos del botón

export const FloatingButton = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Cargar el tema guardado en localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      setIsDarkTheme(true);
    }
  }, []);

  // Alternar tema
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.body.classList.toggle('dark-theme', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <button className="floating-button" onClick={toggleTheme}>
      {isDarkTheme ? '☀️' : '🌙'}
    </button>
  );
};