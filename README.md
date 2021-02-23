# MVP: Recommendations App

## Motivation & Description

This app is designed to provide an easy way for people to store films, TV shows, podcasts or books that are recommended to them. This prevents recommendations getting lost or buried in your phone's Notes app without useful context or information.

The app will connect to APIs to pull in data for each item, meaning the user will only have to input the type of media and the data.

Items will be displayed in a sortable list that will also indicate whether the item is on streaming services (if applicable).

Users will be able to edit, check off or delete items. Eventually, the app will have a 'random recommendation' feature and will also contain functionality to filter items and rank recommendations.

## User Stories

I am *someone who likes discussing new shows/books/films with friends* and I want:

* Somewhere to organise everything people recommend to me so I can easily find it later
* An app that allows me to check off and keep track of what I've watched/read

I am *indecisive* and I want:

* A way of filtering recommendations according to certain criteria so I can narrow down my options
* A random recommendation feature to make the decision for me.

I am *a movie nerd* and I want:

* My app to pull in metadata so I can read more about the recommendation and where to find it
* A rating system so I can keep track of what I liked (and rank my friends on how good their taste is)

## Tech & Resources

* React
* Bootstrap?
* Node/Express
* [TheMovieDB API (TV Shows, Films)](https://developers.themoviedb.org/3)
* [Open Library API or Google Books](https://openlibrary.org/dev/docs/api/books)
* [Listen Notes (Podcasts)](https://www.listennotes.com/api/)

## Features

### Essential (MVP)

* Input form with fields that query APIs as you type
* An option to manually input if the API doesn't return a result
* Display all entries with a basic sorting mechanism
* Indicate if a film/tv show is on Netflix, Prime etc.
* Delete or complete item

### Extensions

* Integrate Podcasts, possibly albums
* Rating system
* Edit records
* Filter displayed items by multiple criteria
* 'Surprise me'/swipe through random suggestions
* Use 'similar items' feature from MovieDB API to make suggestions based on highly-rated items
* Convert to mobile app!

## Pages + Components

#### AddNew (Form)

#### ViewMedia (List or Table)

#### SuggestItem (Featured Item)

## MVP Roadmap

- [ ] Create user flows based on stories
- [ ] Wireframe pages
- [ ] Set up backend, database, routes
- [ ] Set up basic front-end form
- [ ] Link form to db
- [ ] Add API calls via form
- [ ] IF TIME: live while-typing API search

## User Flows

TBC

## API Routes TO FINISH



| URI | HTTP Method | Description | Req Obj | Res Obj |
| -------- | -------- | -------- | -------- | -------- |
| Text     | Text     | Text     | Text     | Text     |



## Wireframes

TBC

## Learning Resources

Suggested searching: https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20

_This is a student project that was created at[CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
