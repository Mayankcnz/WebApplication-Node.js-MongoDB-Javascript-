# Nwen304-WebApplication

[Slides for project progress](https://myvuwac-my.sharepoint.com/:p:/r/personal/honissluke_myvuw_ac_nz/_layouts/15/Doc.aspx?sourcedoc=%7B8BAB8085-EE5C-4676-974F-01CC1A8EC0F9%7D&file=Presentation.pptx&action=edit&mobileredirect=true&wdNewAndOpenCt=1570056463489&wdPreviousSession=7465ba52-9266-4c08-b4cc-5df99f78254b&wdOrigin=ohpAppStartPages)

[Slides for final presentation](https://myvuwac-my.sharepoint.com/:p:/r/personal/honissluke_myvuw_ac_nz/_layouts/15/Doc.aspx?sourcedoc=%7BE20A2228-4D77-4CBA-885A-A6A4C88A28D2%7D&file=Presentation.pptx&action=edit&mobileredirect=true&wdNewAndOpenCt=1573005022519&wdPreviousSession=6bb71aef-ac56-484a-be1d-52d6207d1023&wdOrigin=ohpAppStartPages&cid=89edb8fe-198b-4e91-8d7a-a2e40f9ce202)


## Setting up and running

1. Clone the repo and run `npm install` in the directory created
1. Copy `.env_example` and rename to `.env`
1. Edit the environment variable values (see below)
1. Run `node seeds/product-seeds.js` to run the seeds file (new database only)
1. Run `npm start` to start the server (or `npm run dev` for development)

### Environment variables

```
DATABASE_URL= # the mongodb url of the database
SESSION_SECRET= # the session secret, should be a string of random characters or similar
FACEBOOK_CLIENT_ID= # the facbook app client id
FACEBOOK_CLIENT_SECRET= # the facebook app secret
EMAIL_HOST= # the hostname of the email server
EMAIL_USER= # the username for the email server
EMAIL_PASSWORD= # the email password
EMAIL_EMAIL= # the actual email address (username@server.com)
ADMIN_EMAIL= # the email address of the admin user account (must be in database)
```

The database url is `mongodb://shoeshop:nwen304shoeshop@ec2-3-94-180-36.compute-1.amazonaws.com:27017/shoeshop`

The Facbook client id is `398981340768965` and the client secret is `2519fc8de98896280d6e2de5d9f7f825`

The ECS mail server is `mail.ecs.vuw.ac.nz`. Please set the other email options to your own account (`EMAIL_USER` is just your ecs username i.e lastnamefirstname). `EMAIL_EMAIL` is the full email address.


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

We use AJAX requests for handling the cart updating.

`POST /cart/add/:id`

Add an item to the cart based on the id and size of shoe. `size` is a required body parameter

`DELETE /cart/delete/:id`

Delete and item from the cart based on ID

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
