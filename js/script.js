'use strict';
let habits = [];
const HABIT_KEY = 'HABIT_KEY';

// *Page
const page = {
	menu: document.querySelector('.menu__list'),
};
//* Utils
function loadData() {
	const habitsString = localStorage.getItem(HABIT_KEY);
	const habitArray = JSON.parse(habitsString);
	if (Array.isArray(habitArray)) {
		habits = habitArray;
	}
}

function saveData() {
	localStorage.setItem(HABIT_KEY.JSON.stringify(habits));
}
//* Render
function rerenderMenu(activeHabit) {
	if (!activeHabit) {
		return;
	}
	for (const habit of habits) {
		const existed = document.querySelector(`[menu-habit-id = "${habit.id}"]`);
		if (!existed) {
			const element = document.createElement('button');
			element.setAttribute('menu-habit-id', habit.id);
			element.classList.add('habit-img');
			element.addEventListener('click', () => rerender(habit.id));
			element.innerHTML = `<img src="/img/icon/menu-icon/${habit.icon}.svg" alt="Иконка ${habit.name}" />`;
			if (activeHabit.id === habit.id) {
				element.classList.add('habit-img_active');
			}
			page.menu.appendChild(element);
			continue;
		}
		if (activeHabit.id === habit.id) {
			existed.classList.add('habit-img_active');
		} else {
			existed.classList.remove('habit-img_active');
		}
	}
}

function rerender(activeHabitId) {
	const activeHabit = habits.find(habit => habit.id === activeHabitId);
	rerenderMenu(activeHabit);
}
//* Init
(() => {
	loadData();
	rerender(habits[0].id);
})();
