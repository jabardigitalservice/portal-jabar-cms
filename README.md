# Portal Jabar - Content Management System
This is the main codebase for Portal Jabar - Content Management System

&nbsp;
## Docs

- [Codebase](#codebase)
  - [Technologies](#technologies)
  - [Folder Structure](#folder-structure)
- [First time setup](#first-time-setup)
- [Running locally](#running-locally)
- [Code style guide](#code-style-guide)

&nbsp;
## Codebase
### Technologies
Here is a list of all the core technologies this project use:

- [npm](https://www.npmjs.com/): Package manager
- [Tailwind CSS](https://tailwindcss.com/): CSS framework for styling
- [Jabar Design System](https://www.npmjs.com/package/@jabardigitalservice/jds-design-system): UI components
- [Vue.js](https://vuejs.org/): JavaScript framework for building user interfaces

&nbsp;
### Folder Structure
```bash
├── .git                  # all github actions workflow
│   └── ...
├── .husky                # all husky configuration and scripts
│   └── ...
├── dist                  # build directory
│   └── ...
├── public                # public directory
│   └── ...
├── src
│   ├── assets            # contains static assets such as fonts, logos, images, etc
│   ├── common            # contains reusable constants, components, functions, etc
│   ├── components        # contains app components
│   ├── layouts           # contains page layouts
│   ├── pages             # contains application views and routes
│   ├── plugins           # contains custom Vue.js functionality
│   ├── repositories      # contains all API endpoints, methods, etc
│   ├── router            # contains all app routes, navigation guards, etc
│   └── store             # contains vuex store, modules, etc
└── tests
    ├── helpers           # contains test helpers
    └── unit              # contains component's unit test
```

&nbsp;
## First time setup
The first step to running Portal Jabar CMS locally is downloading the code by cloning the repository:

```bash
git clone https://github.com/jabardigitalservice/portal-jabar-cms.git

#or using SSH
git clone git@github.com:jabardigitalservice/portal-jabar-cms.git
```

open `portal-jabar-cms` directory

```bash
cd portal-jabar-cms
```

create env file

```bash
cp .env.example .env
```

install the dependencies

```bash
npm install
```

&nbsp;
## Running locally
Compiles and hot-reloads for development

```bash
# Make sure all the credentials are filled in the .env file

# you can run the app locally for development
$ npm run serve

# or compiles and minifies for production
$ npm run build     
```

&nbsp;
### Code Style Guide
- **Javascript Style Guide by Airbnb** (https://github.com/airbnb/javascript#airbnb-javascript-style-guide-)