# Nwen304-WebApplication

[Slides for project progress](https://myvuwac-my.sharepoint.com/:p:/r/personal/honissluke_myvuw_ac_nz/_layouts/15/Doc.aspx?sourcedoc=%7B8BAB8085-EE5C-4676-974F-01CC1A8EC0F9%7D&file=Presentation.pptx&action=edit&mobileredirect=true&wdNewAndOpenCt=1570056463489&wdPreviousSession=7465ba52-9266-4c08-b4cc-5df99f78254b&wdOrigin=ohpAppStartPages)


## Setting up

The database is located at `mongodb://shoeshop:nwen304shoeshop@ec2-3-94-180-36.compute-1.amazonaws.com:27017/shoeshop`. Set the `DATABASE_URL` to this.

Copy `.env_example` and rename it to `.env`, change the environment variable inside to suit. `EMAIL_EMAIL` is the full name of the email you are using i.e. `username@ecs.vuw.ac.nz`. We reccomend using the ECS mail servers `mail.ecs.vuw.ac.nz`.

Get your Facebook client id and secret from the [Facebook developers page](https://developers.facebook.com) after you register an application.

Session secret should be a randomly generated string.
