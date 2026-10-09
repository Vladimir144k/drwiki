// Определение текущего языка с учетом localStorage и системных настроек браузера
function getInitialLanguage() {
  const savedLang = localStorage.getItem('app_lang');
  if (savedLang) {
    return savedLang;
  }
  
  // Автоопределение по системному языку браузера
  const userLang = navigator.language || navigator.userLanguage;
  if (userLang && userLang.toLowerCase().startsWith('ru')) {
    return 'ru';
  }
  
  return 'en'; // Язык по умолчанию для остальных
}

let currentLang = getInitialLanguage();

function applyTranslations(lang) {
  document.documentElement.lang = lang;
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    
    if (translations[lang] && translations[lang][key]) {
      let translationText = translations[lang][key];
      
      // Автоматическая подстановка даты из APP_CONFIG
      if (translationText.includes('{date}')) {
        translationText = translationText.replace('{date}', APP_CONFIG.lastUpdateDate);
      }

      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.hasAttribute('placeholder')) {
          element.placeholder = translationText;
        }
      } else {
        element.textContent = translationText;
      }
    }
  });

  // Обновление значения в кнопке языка
  const langText = document.getElementById('lang-text');
  if (langText) {
    langText.textContent = lang.toUpperCase();
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('app_lang', lang);
  applyTranslations(lang);
}

function toggleLanguage() {
  const newLang = currentLang === 'ru' ? 'en' : 'ru';
  setLanguage(newLang);
}

// Автоматический запуск перевода при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
});
