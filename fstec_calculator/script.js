// Данные из методики (взяты с сайта 117fstec.credos.ru)
const groupsData = [
    {
        id: 1,
        name: 'Организация и управление',
        weight: 0.1,
        indicators: [
            { id: '1.1', text: 'На заместителя руководителя органа (организации) возложены функции по обеспечению информационной безопасности', weight: 30, ref: 'п. 5.1 Методики ФСТЭК' },
            { id: '1.2', text: 'Определены функции (обязанности) структурного подразделения (или отдельного работника) по обеспечению информационной безопасности', weight: 40, ref: 'п. 5.2 Методики ФСТЭК' },
            { id: '1.3', text: 'К подрядным организациям, имеющим доступ к ИС с привилегированными правами, в договорах установлены требования о реализации мер по защите от угроз через инфраструктуру подрядчика', weight: 30, ref: 'Таблица 1, п. k13 Методики ФСТЭК' }
        ]
    },
    {
        id: 2,
        name: 'Защита пользователей',
        weight: 0.25,
        indicators: [
            { id: '2.1', text: 'Отсутствуют учетные записи с паролем, сложность которого не соответствует требованиям парольной политики', weight: 30, ref: 'п. 6.1 Методики ФСТЭК' },
            { id: '2.2', text: 'Реализована многофакторная аутентификация привилегированных пользователей', weight: 30, ref: 'п. 6.2 Методики ФСТЭК' },
            { id: '2.3', text: 'Отсутствуют учетные записи разработчиков и сервисные учетные записи с паролями, установленными по умолчанию', weight: 20, ref: 'Таблица 1, п. k23 Методики ФСТЭК' },
            { id: '2.4', text: 'Отсутствуют активные учетные записи работников, с которыми прекращены трудовые или иные отношения', weight: 20, ref: 'п. 6.4 Методики ФСТЭК' }
        ]
    },
    {
        id: 3,
        name: 'Защита информационных систем',
        weight: 0.35,
        indicators: [
            { id: '3.1', text: 'На сетевом периметре установлены межсетевые экраны L3/L4 (доступ к 100% интерфейсов из Интернет контролируется)', weight: 20, ref: 'п. 3.1 Методики ФСТЭК' },
            { id: '3.2', text: 'На устройствах, доступных из Интернет, отсутствуют критические уязвимости со сроком публикации более 30 дней', weight: 25, ref: 'п. 3.2 Методики ФСТЭК' },
            { id: '3.3', text: 'На устройствах и серверах устранены критические уязвимости в течение 90 дней (не менее 90% устройств)', weight: 15, ref: 'п. 3.3 Методики ФСТЭК' },
            { id: '3.4', text: 'Обеспечена проверка вложений в электронных письмах на наличие вредоносного ПО (не менее 80% устройств)', weight: 15, ref: 'п. 3.5 Методики ФСТЭК' },
            { id: '3.5', text: 'Централизованное управление антивирусной защитой (≥80% устройств, обновление баз ≥1 раз в месяц)', weight: 15, ref: 'п. 3.6 Методики ФСТЭК' },
            { id: '3.6', text: 'Реализована очистка входящего трафика от DDoS-атак на уровне L3/L4', weight: 10, ref: 'п. 3.7 Методики ФСТЭК' }
        ]
    },
    {
        id: 4,
        name: 'Мониторинг ИБ и реагирование',
        weight: 0.3,
        indicators: [
            { id: '4.1', text: 'Реализован централизованный сбор событий безопасности и оповещение о неудачных попытках входа для привилегированных учетных записей', weight: 40, ref: 'Таблица 1, п. k41 Методики ФСТЭК' },
            { id: '4.2', text: 'Реализован централизованный сбор и анализ событий безопасности на всех устройствах, взаимодействующих с сетью Интернет', weight: 35, ref: 'Таблица 1, п. k42 Методики ФСТЭК' },
            { id: '4.3', text: 'Утверждён документ, определяющий порядок реагирования на инциденты ИБ', weight: 25, ref: 'п. 8.3 Методики ФСТЭК' }
        ]
    }
];

console.log('Скрипт загружен!');

// Функция для создания HTML-структуры групп и показателей
function renderGroups() {
    const container = document.getElementById('groups-container');
    if (!container) {
        console.error('Контейнер groups-container не найден!');
        return;
    }
    container.innerHTML = '';

    groupsData.forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card';
        groupCard.dataset.groupId = group.id;

        // Шапка группы
        groupCard.innerHTML = `
            <div class="group-header">
                <h2>${group.id}. ${group.name}</h2>
                <span class="group-weight">R=${group.weight}</span>
            </div>
            <div class="group-progress">
                <div class="progress-label">
                    <span>Выполнено: <span class="group-done-${group.id}">0</span> из 100%</span>
                    <span class="group-contribution-${group.id}">Вклад группы: 0.00</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill group-progress-fill-${group.id}" style="width: 0%;"></div>
                </div>
            </div>
            <div class="indicators-list" id="indicators-${group.id}"></div>
        `;
        container.appendChild(groupCard);

        // Добавляем показатели
        const indicatorsContainer = document.getElementById(`indicators-${group.id}`);
        group.indicators.forEach(ind => {
            const indDiv = document.createElement('div');
            indDiv.className = 'indicator-item';
            indDiv.innerHTML = `
                <div class="indicator-check">
                    <input type="checkbox" id="chk_${ind.id}" data-group="${group.id}" data-weight="${ind.weight}">
                </div>
                <div class="indicator-content">
                    <div class="indicator-title">${ind.text}</div>
                    <div class="indicator-meta">
                        <span class="indicator-weight">Вес: ${ind.weight}%</span>
                        <span class="indicator-ref">${ind.ref}</span>
                    </div>
                </div>
            `;
            indicatorsContainer.appendChild(indDiv);
        });
    });

    // После создания элементов вешаем обработчики на чекбоксы
    attachCheckboxListeners();
    // Выполняем первоначальный расчёт
    updateAll();
}

// Функция для добавления обработчиков событий на все чекбоксы
function attachCheckboxListeners() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateAll);
    });
}

// Функция обновления всех расчётов
function updateAll() {
    let totalKZI = 0;

    groupsData.forEach(group => {
        // Находим все чекбоксы этой группы
        const groupCheckboxes = document.querySelectorAll(`input[data-group="${group.id}"]`);
        let sumWeight = 0;

        groupCheckboxes.forEach(cb => {
            if (cb.checked) {
                sumWeight += parseFloat(cb.dataset.weight);
            }
        });

        // Процент выполнения группы (0-100)
        const percentDone = sumWeight;

        // Вклад группы в общий КЗИ
        const contribution = (percentDone / 100) * group.weight;

        // Обновляем отображение для группы
        const doneSpan = document.querySelector(`.group-done-${group.id}`);
        if (doneSpan) doneSpan.textContent = percentDone;

        const fillDiv = document.querySelector(`.group-progress-fill-${group.id}`);
        if (fillDiv) fillDiv.style.width = percentDone + '%';

        const contribSpan = document.querySelector(`.group-contribution-${group.id}`);
        if (contribSpan) contribSpan.textContent = `Вклад группы: ${contribution.toFixed(2)}`;

        totalKZI += contribution;
    });

    // Обновляем итоговый результат
    const totalResultElem = document.getElementById('total-result');
    const totalStatusElem = document.getElementById('total-status');
    const resultFill = document.getElementById('result-fill');

    if (totalResultElem) totalResultElem.textContent = totalKZI.toFixed(2);
    if (resultFill) resultFill.style.width = (totalKZI * 100) + '%';

    // Определяем статус
    if (totalStatusElem) {
        if (totalKZI < 0.3) {
            totalStatusElem.textContent = 'Критический';
            totalStatusElem.style.color = '#ef4444';
        } else if (totalKZI < 0.7) {
            totalStatusElem.textContent = 'Средний';
            totalStatusElem.style.color = '#f59e0b';
        } else {
            totalStatusElem.textContent = 'Высокий';
            totalStatusElem.style.color = '#10b981';
        }
    }

    // Обновляем боковую панель
    updateSidebar();
}

// Функция для обновления боковой панели с кликабельными итогами
function updateSidebar() {
    const sidebar = document.getElementById('sidebar-group-results');
    if (!sidebar) return;
    sidebar.innerHTML = '';

    groupsData.forEach(group => {
        // Пересчитываем текущий вклад группы
        const groupCheckboxes = document.querySelectorAll(`input[data-group="${group.id}"]`);
        let sumWeight = 0;
        groupCheckboxes.forEach(cb => {
            if (cb.checked) sumWeight += parseFloat(cb.dataset.weight);
        });
        const contribution = (sumWeight / 100) * group.weight;

        // Создаём кликабельный элемент
        const item = document.createElement('div');
        item.style.cssText = `
            display: flex;
            justify-content: space-between;
            padding: 12px;
            margin-bottom: 8px;
            background: white;
            border-radius: 8px;
            cursor: pointer;
            border: 1px solid #e2e8f0;
            transition: background 0.2s;
        `;
        item.innerHTML = `
            <span>${group.id}. ${group.name}</span>
            <span style="font-weight: bold; color: #3b82f6;">${contribution.toFixed(2)}</span>
        `;

        // Добавляем обработчик клика
        item.addEventListener('click', () => {
            let checkedCount = 0;
            groupCheckboxes.forEach(cb => {
                if (cb.checked) checkedCount++;
            });
            alert(`Группа: ${group.name}\nВыполнено пунктов: ${checkedCount} из ${group.indicators.length}\nВклад в общий результат: ${contribution.toFixed(2)}`);
        });

        // Эффект при наведении
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f1f5f9';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'white';
        });

        sidebar.appendChild(item);
    });
}

// Запускаем после загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
    renderGroups();
});