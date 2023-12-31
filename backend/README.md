[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд
Backend часть проекта Mesto.

Ссылка на репозиторий: https://github.com/Malaxov16/express-mesto-gha

## Текущий функционал
1. API регистрации пользователя, 
2. API аутентификации и авторизации пользователя с использование jwt,
3. API обновления данных пользователя,
4. API получения данных о пользотеле(ях),
5. API добавления/удаления карточки, устанвоки/удаления лайка
6. Настройка безопасности CORS

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
`/errors` — папка с конструкторами ошибок  
`/middlewares` — папка с мидлварами проверка токена и проверки передаваемых данных на соответсвтие требованиям  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
