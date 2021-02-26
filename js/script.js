/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          list = document.querySelector('.promo__interactive-list');
    
    adv.forEach(item => {
        item.remove();
    });
    
    genre.textContent = 'драма';
    
    poster.style.backgroundImage = 'url("img/bg.jpg")';    
    
    const formInside = document.querySelector('.adding__input');
    const checkButton = document.querySelector('button');
    const yesButton = document.querySelector('input[type="checkbox"]');    
    
    checkButton.addEventListener('click', (event) => {
        event.preventDefault();        
        if (formInside.value) {      
            if (yesButton.checked) {
                console.log("Это один из любимых фильмов)");
            }
            if (formInside.value.length > 21) {
                formInside.value = (formInside.value.substring(0, 19) + '...');
            }
            movieDB.movies[movieDB.movies.length] = formInside.value;
            movieDB.movies.sort();
            createFilms(movieDB.movies, list);

        }
    }); 

    

    function createFilms (films, parent) {
        parent.innerHTML = "";
        films.sort();
        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1}) ${film}
                <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((item, key) => {
            item.addEventListener('click', () => {
                item.parentElement.remove();
                films.splice(key, 1);
                createFilms(films, parent);
            });
        });

    }

    createFilms(movieDB.movies, list);

});
