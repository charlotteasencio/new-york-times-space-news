# Space Flight News Articles
* An app that displays articles about space from the New York Times Search Articles API. It also displays further information about those articles and links to them.


## Built With
* React
* TypeScript
* Tailwind
* Jest
* React Testing Library
* [New York Times Article Search](https://developer.nytimes.com/docs/articlesearch-product/1/overview)

## Run Application on Local Machine
1) Clone code from the repository
2) Add a `.env` file at the root of the project with the provided api key as `REACT_APP_NYT_API_KEY=<provided-api-key>`
3) Run `npm i` to install necessary packages
4) Run `npm start` to start local host

## Run Tests
* Run full test suite once: `npm test -- --watchAll=false`
* Run in watch mode: `npm test`
