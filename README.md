# Movie Search

Created by Tae Kim.

## Getting Started

1. Create a ".env" file at the root of this project. You will need to define the following Environment Variables:

```
REACT_APP_OMDB_API_KEY=12345
```

2. Run `yarn`

3. Run `yarn start`


## Architectural Decisions

- Started with create-react-app. This is awesome for getting a project setup in 2 seconds.

- Brought in SCSS and CSS Modules (pretty common in create-react-app). I love the module-specific styling. Gets rid of most CSS problems I have.

- Setup Typescript from the get-go. No reason not to!

- Splitting Mobile vs Desktop screen sizes at "768px". This wasn't an informed decision, but a common breakpoint at Airbnb. Just going off past experience for the time-being.


## Retro

### Difficult Tasks

- I wanted to do a lot more styling than I had time for. I initially got sucked into the App layout and spent more time than I should have making the app look nice.

- Design. I really wanted to make this look SUPER nice, but I'm not a designer. I did my best, but one thing I love at Airbnb is working very closely with the most talented designers. They produce such excellent content for me to build. Makes my work look amazing.

### Learnings

- As I went through the task, it became apparent that the data was global. Luckily, I created a reducer that could just be moved to the App-level and state was passed down. I know the task mentioned Redux... but I prefer React's `useReducer` paired with `context` for global state (although I didn't have time to implement here). Even better though, local state (`useState`)!

### Improvements

- Styling infrastructure. I'm only using a light stylesheet and CSS Modules. There is currently no theme to enable re-use of variables and dark-mode / light-mode. It's all hard-coded at the moment. It would be super rad to use CSS variables (custom properties) to enable this (instead of JS). I've been seeing this across many sites (including the new Facebook) and have been trying it out in some contextual theming at Airbnb. The only down-side is that it's not IE11 compatible... but if you have some sane defaults, IE11 users can still get a great experience. Just not a theme-able one.

- Choose better icons. I rushed to select an Icon that made some sense.

- OMDB API responses aren't the greatest IMO. Some examples that I ran into are their error messages and response variables (capitalized variables). We could do things on the client-side to make both better, but these should be handled by perhaps an intermediate server (display service) or update the API itself.

- Definitely needs some state cleanup. I named the variables very specific to this flow. We will want to re-organize and re-think our global state. With any application, having a central schema for global state that everyone shares is super important. This needs to be well-defined and well thought-out.

- Styling in general. This app could use a lot of design haha. I did some rough styling, but man it looks so bare bones!

- Code re-use. Went through this fast so I copy/pasted some things, such as the Page Layouts and Headings on Checkout and Confirmation pages. Could be brought out into a shared "Page Layout" component/components.

- UX. This probably isn't the best UX in the world... but it works. we probably need a "checkout" button as the User is selected movies. We should also show an indicator showing the number of movies they have selected. Small things like that, but for this initial fun-task I think what I have is fine.

- Git history. Just because of the time-limit, I did it all in one commit. This should not happen in a production code-base.