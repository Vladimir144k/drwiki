// 1. Словарь с текстами
const translations = {
  ru: {
    title: "Калькулятор призыва компаньонов",
    subtitle: "Рассчитайте шансы и стоимость ресурсов",
    label_level: "Текущий уровень:",
    placeholder_level: "Введите уровень...",
    btn_calculate: "Рассчитать",
    greeting: "Привет, {name}!", // Пример с переменной
    result_text: "Вам потребуется {count} билетов."
  },
  en: {
    title: "Companion Summon Calculator",
    subtitle: "Calculate your chances and resource costs",
    label_level: "Current Level:",
    placeholder_level: "Enter level...",
    btn_calculate: "Calculate",
    greeting: "Hello, {name}!",
    result_text: "You will need {count} tickets."
  }
};

// 2. Определение стартового языка
function getInitialLanguage() {
  const savedLang = localStorage.getItem('app_lang');
  if (savedLang && translations[savedLang]) {
    return savedLang;
  }
  
  // Проверяем язык браузера (например, "ru-RU" -> "ru")
  const browserLang = navigator.language.split('-')[0];
  return translations[browserLang] ? browserLang : 'ru'; // fallback язык
}

let currentLang = getInitialLanguage();

// 3. Функция перевода конкретного ключа (с поддержкой переменных)
function t(key, params = {}) {
  let text = translations[currentLang]?.[key] || translations['ru']?.[key] || key;
  
  // Замена переменных вида {name} или {count}
  Object.keys(params).forEach(paramKey => {
    text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), params[paramKey]);
  });
  
  return text;
}

// 4. Функция обновления всего HTML на странице
function applyTranslations() {
  // Перевод обычного текста
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Перевод placeholder в полях ввода (input, textarea)
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // Обновляем атрибут lang у html для SEO и доступности
  document.documentElement.lang = currentLang;

  // Обновляем активный класс у кнопок переключения языка
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    const lang = btn.getAttribute('data-lang-btn');
    if (lang === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// 5. Функция смены языка
function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('app_lang', lang);
  applyTranslations();
}

// Запускаем перевод при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
});
