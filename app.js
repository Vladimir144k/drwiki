const form = document.getElementById('calc-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const level = document.getElementById('level').value || 1;
  const neededTickets = level * 10;

  // Используем функцию t() с параметрами для динамического текста
  resultDiv.textContent = t('result_text', { count: neededTickets });
});
