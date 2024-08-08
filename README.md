# Twitter-like Social Network

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)

## Overview

This project is a Twitter-like social network web application that allows users to create posts, follow other users, and like posts. The application is built using Django and JavaScript, and it provides features like pagination, user profiles, post editing, and dynamic updates of likes.

## Features

- **New Post**: Signed-in users can create new posts.
- **All Posts**: View a list of all posts, with the latest posts displayed first.
- **Profile Page**: View user profiles, showing follower counts and user posts.
- **Following**: View posts from users that the current user is following.
- **Pagination**: Posts are paginated, showing 10 posts per page with navigation buttons.
- **Edit Post**: Users can edit their own posts directly on the page.
- **Like/Unlike**: Users can like or unlike posts, with dynamic updates to like counts.

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites

- Python 3.x
- Django 3.x
- Git

### Installation

**Clone the Repository:**
   ```sh
   git clone https://github.com/suman154/Network.git
   ```

Install dependencies:
```sh
pip install -r requirements.txt
```

Make Migrations:
```sh
python manage.py makemigrations network
python manage.py migrate
```

Run the Server:
```sh
python manage.py runserver
```
