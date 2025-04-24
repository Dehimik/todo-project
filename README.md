# Simple TODO App

Minimal TODO list web application built with **Express.js**, **PostgreSQL**, **Bootstrap**, and **EJS**.

## Features

- View all tasks on a single page
- Add new tasks with title and description
- Mark tasks as completed or not completed
- Delete tasks

## Tech Stack

- **Backend:** Express.js (Node.js)
- **Database:** PostgreSQL (via `pg` + `.env`)
- **Frontend:** HTML rendered with EJS templates, styled using Bootstrap

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Dehimik/todo-project.git

cd todo-project
```
2. Install dependencies

```bash
npm install
```
3. Create PostgreSQL database
   Make sure you have PostgreSQL running locally.

Create a database manually using:
``` bash
createdb todoshka
```
Or use your own database name.

4. Create .env file in project root
   This file will store your database credentials. Example:

``` env
DB_USER=exmple_name
DB_PASSWORD=example_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=example_db_name
```
Important: don’t commit your real .env file! Add it to .gitignore.

Author  
Made by [Dehimik](https://github.com/Dehimik)
