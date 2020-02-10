# M.E.R.N Stack Seed Project with JWT Auth

M.E.R.N: Mongo, Express, React, Node Stack

This is a single page application (SPA) GUI and Node Express API server.

The server and GUI are coded to authenticate users with username and password.

Authentication info is stored in a JSON Web Token.  The server is session free.

The app currently supports:
* New User sign up with a username and password
* Login
* Logout
* Auto log out if refresh token is expired when request to protected URL is made
* Auto creation of new auth token if refresh token is still valid (so if a user is using the app they will not be logged out if they have not made a protected api call within `ACCESS_TOKEN_DURATION`)

React/Redux notes
2015 React.js conference
* Ads - interactive visualasions
* lists
* Ways to be intentional about app design
* React components: props & stats
* Pure components: render only depends on props & state
*-> Why? Rendering & re-rendering
* shouldComponentUpdate(){ return false}
* Check state and see if it changes.. PureRenderMixin = React.addons.PureRenderMixin;
React.createClass({mixins:[PureRenderMixin]})
Data comparability:
 shouldComponentUpdate(nextProps,nextState){
   return(
     !shallowEqual(this.props,nextprops) ||
     ~shallowEqual(this.state,nextState)
   )
 }

 From a single source of truth- comparing objects(sealed)
 referential equality 

 Children create deep update trees- more nodes = slower update path. nullify PureRenderMixin. Children are expenive

var Parent = React.createClass({
  shouldComponentUpdate(nextprops){
    return this.props.children !== nextprop.children;
  },
  render(){
    return <section>{this.props.children}</section>;
  }
});

setInterval(() => React.render(
  <Parent>
  <div>child</div>
  </Parent>,
  document.body
),1);


All high level compoennts are wrapped in a container
Containers vs components
Container(does data fetching) talks to stores, component renders markup

var BudgetWidgetCOntainer = React.createClass({
  mixin:[PureRenderMixin],
  compteState(){
    return
    amount:BudgetStore.getAccountBudget()
  };
},
render() {
  return <BudgetWidget value = {this.state.amount} />;
}
});

<StaticTwoColumnSplit>
  <TargetingContainer />
  <BudgetWidgetContainer />
</StaticTwoColumnSplit>

Basic concepts for optimization
1.Purity
  Use shouldCoponentUpdate and PureRenderMixin
2.Data Comparability
  Use highly comparable data(immutability)
3.Loose Coupling
  Use for both maintainability and performance
4. Children
  ..are expensive
  ..should exercise independence

class CommentList extends React.Component {
  this.state = { comments: [] };

  componentDidMount() {
    fetchSomeComments(comments =>
      this.setState({ comments: comments }));
  }  render() {
    return (
      <ul>
        {this.state.comments.map(c => (
          <li>{c.body}—{c.author}</li>
        ))}
      </ul>
    );
  }
}

Container model:separated our data-fetching and rendering concerns.
```
import React from "react";
import CommentList from "./CommentList";

class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }
  
  componentDidMount() {
    fetch("/my-comments.json")
      .then(res => res.json())
      .then(comments => this.setState({ comments }))
  }
  
  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
```
```
// CommentList.js
import React from "react";

const Commentlist = comments => (
  <ul>
    {comments.map(({ body, author }) =>
      <li>{body}-{author}</li>
    )}
  </ul>
)
```
```

```
import { Component } from "React";

export var Enhance = ComposedComponent => class extends Component {
  constructor() {
    this.state = { data: null };
  }
  componentDidMount() {
    this.setState({ data: 'Hello' });
  }
  render() {
    return <ComposedComponent {...this.props} data={this.state.data} />;
  }
};
```
import { Enhance } from "./Enhance";

class MyComponent {
  render() {
    if (!this.data) return <div>Waiting...</div>;
    return <div>{this.data}</div>;
  }
}

export default Enhance(MyComponent); // Enhanced component

App can be run locally by:

1. renaming file `.env_sample` to `.env`
2. From project root directory, run:
   1. `npm i`
   2. `npm run seed` (to seed the mongo DB - make sure mongo is running)
   3.  `npm start`


or can be used on heroku at:
https://booklist-cnr.herokuapp.com/

Signup with your own account on the sign up page: https://booklist-cnr.herokuapp.com/signup
or login with

username: `demo1`   

password: `12345678`


## Dependency Doc Links

### Client
* SPA Framework
  * https://reactjs.org/
* CSS
  * https://bootswatch.com/
* Component Framework
  * https://react-bootstrap.github.io/
  * https://getbootstrap.com/
* Forms
  * https://jaredpalmer.com/formik/
  * Validation: https://www.npmjs.com/package/yup
* JWT (JSON Web Token) handling
  * Client
    * https://github.com/eezing/jwt-jot
    * https://www.npmjs.com/package/jwt-jot
  * Server
    * jsonwebtoken: https://github.com/auth0/node-jsonwebtoken#readme
  * JWT testing: https://jwt.io/
* AJAX
  * https://www.npmjs.com/package/axios
* Routing
  * https://reacttraining.com/react-router/

### Server
* Auth
  * http://www.passportjs.org/
  * http://www.passportjs.org/docs/configure/
  * http://www.passportjs.org/packages/passport-jwt/
  * https://www.npmjs.com/package/bcrypt
* Data
  * https://www.mongodb.com/
  * https://mongoosejs.com/
* Server
  * https://expressjs.com/