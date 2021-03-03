class Calendar {
  constructor(container) {
    this.container = container;
    this.calendarMonthTemplate = document.querySelector(
      "#calendar-month-template"
    ).content;
    this.date = new Date(2021, 0, 1);
    this.date.setDate(1);

    this.MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  init() {
    const monthTemplate = this.calendarMonthTemplate;

    for (let idx = 0; idx < this.MONTHS.length; idx++) {
      const lastDay = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0
      ).getDate();

      const prevLastDay = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        0
      ).getDate();

      const firstDayIndex = this.date.getDay();

      const lastDayIndex = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0
      ).getDay();

      const nextDays = 7 - lastDayIndex - 1;

      const monthElement = monthTemplate
        .querySelector(".calendar__month")
        .cloneNode(true);

      const monthLabel = monthElement.querySelector(".calendar__month-label");
      monthLabel.textContent = this.MONTHS[idx];

      const dayList = monthElement.querySelector(".day-list");

      // заполняем влезающими днями пред. месяца
      for (let x = firstDayIndex; x > 0; x--) {
        const prevDateEl = document.createElement("li");
        prevDateEl.classList.add("day-list__item", "day-list__item_passive");
        prevDateEl.textContent = prevLastDay - x + 1;
        dayList.append(prevDateEl);
      }

      // добавляем дни текущего месяца
      for (let i = 1; i <= lastDay; i++) {
        const thisDateEl = document.createElement("li");
        thisDateEl.classList.add("day-list__item");
        thisDateEl.textContent = i;

        // если сегодня, то вешаем класс выделения
        if (
          i === new Date().getDate() &&
          this.date.getMonth() === new Date().getMonth()
        ) {
          thisDateEl.classList.add("day-list__item_active");
        }

        dayList.append(thisDateEl);
      }

      // докидываем влезающие дни след. месяца
      for (let j = 1; j <= nextDays; j++) {
        const nextDateEl = document.createElement("li");
        nextDateEl.classList.add("day-list__item", "day-list__item_passive");
        nextDateEl.textContent = j;
        dayList.append(nextDateEl);
      }

      this.container.append(monthElement);

      this.date.setMonth(this.date.getMonth() + 1);
    }
  }
}

const calendarContainer = document.querySelector("#calendar-container");
const calendar = new Calendar(calendarContainer);
calendar.init();

// listeners

function openCalendar(evt) {
  const calendarEl = document.querySelector(".calendar__wrapper");
  calendarEl.style.animationName = "slideFromBottom";
  const pageEl = document.querySelector(".page");
  pageEl.classList.toggle("page_overflow");
}

function closeCalendar(evt) {
  const calendarEl = document.querySelector(".calendar__wrapper");
  calendarEl.style.animationName = "slideToBottom";
  const pageEl = document.querySelector(".page");
  pageEl.classList.toggle("page_overflow");
}

const calendarOpenButton = document.querySelector(".button_type_calendar");
calendarOpenButton.addEventListener("click", openCalendar);
const calendarCloseButton = document.querySelector(".button_type_close");
calendarCloseButton.addEventListener("click", closeCalendar);
