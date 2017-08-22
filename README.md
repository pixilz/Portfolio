
## Synopsis

This is my professional portfolio to display some of the work I have participated in over the course of my career. This repository is for my professional website hosted [here](https://pixilz.io).

It makes use of `Gulp` to compile all of the `Sass`.
`gulp scss`

`Pug` is used as the templating engine and it takes advantage of `JSON` files to store the majority of the page data.


The server runs on `Node.JS` and `Express` for routing and run-time compilation.

To start the server run `node bin/www` while in the main directory.

For the production version of it I take advantage of the `pm2` package to continously run my server as a service on a remote instance.

To keep the production server up to date I use git hooks to automatically update the files and restart the `pm2` service. To do this from my local machine I use `git push production master`.

## License

Copyright © 2017 Zoë Clarno All Rights Reserved
