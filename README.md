# Nwen304-WebApplication

[Slides for project progress](https://myvuwac-my.sharepoint.com/:p:/r/personal/honissluke_myvuw_ac_nz/_layouts/15/Doc.aspx?sourcedoc=%7B8BAB8085-EE5C-4676-974F-01CC1A8EC0F9%7D&file=Presentation.pptx&action=edit&mobileredirect=true&wdNewAndOpenCt=1570056463489&wdPreviousSession=7465ba52-9266-4c08-b4cc-5df99f78254b&wdOrigin=ohpAppStartPages)


## Setting up

The database is located at `mongodb://shoeshop:nwen304shoeshop@ec2-3-94-180-36.compute-1.amazonaws.com:27017/shoeshop`. Set the `DATABASE_URL` to this.

Copy `.env_example` and rename it to `.env`, change the environment variable inside to suit. `EMAIL_EMAIL` is the full name of the email you are using i.e. `username@ecs.vuw.ac.nz`. We reccomend using the ECS mail servers `mail.ecs.vuw.ac.nz`.

Get your Facebook client id and secret from the [Facebook developers page](https://developers.facebook.com) after you register an application.

Session secret should be a randomly generated string.


## How our system works

### Home page

The home page has a image slider of the 4 most recently updated products. Below it are the 4 newest products. There is a sidebar on the left that make searching for products easier.

The navigation bar has a login button dropdown that allows you to create an account, login with email, or login with Facebook. The search bar searches products based on name or description. There is a button to access your cart when you are logged in.

### About page

The about page has some information about ShoeShop and some images of the shop as well as some legal stuff.

### Products page

The products page lists all the products that meet the search/filter criteria (defined in the url querty parameters). The sidebar is the same filtering that the home page has. Here you can add items to your cart as well.

### Individual product page

Here you can see more details about the product. Stock is shown and will only be shown when the product is available. Same with the add to cart button.

### Forgot password pages

You can reset your password which will send an email to the provided email if the user account exists. You can click on the link to reset your password, where you will be prompted to choose a new password.


## Division of work

### Jeffrey
- front end
- stylesheets
- seed file

### Luke
- server side routing
- authentication
- database models
- hosting
- other server side setup
- project structure

### Mayank
- database models
- front end
- cart
- client side javascript
- stylesheets
- other server side setup


## REST Interace


## Error Handling

We always ensure that all database queries are executed and do not error out. We use promises that mongoose outputs to ensure this and render an error page if an error occurs.

We have some client side validation to ensure that our ajax requests are valid and do not error out. We send a JSON object with the `error` field set if there is an error which we catch client side.

We always log our server side errors through Winston.js into an error log file.


## Database design

We use mongodb for our database.

We have 3 tables. `products`, `orders`, and `users`. The products table stores all the product documents as defined in `models/product.js`, orders and users are defined similarly.

The user password is hashed and salted using `bcrypt`.

### Database access code

We have `src/db.js` which connects to the database and exports the database connection. The connection is used in each of the models folder. The database connection is set up when the server starts. The server will not start unless a database connection is obtained. The documents are retrieved by directly calling the functions from the specified mongoose model.
