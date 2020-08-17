Work Sample for Product Aspect, Node.js Variant
---

[What is this for?](https://github.com/EQWorks/work-samples#what-is-this)

### Setup and Run

The following are the recommended options, but you're free to use any means to get started.

#### Local Option: Node.js 6.10+

1. Clone this repository
2. Install Node.js dependencies `$ npm install`
3. Set environment variables given in the problem set we send to you through email and run `$ npm run dev`
4. Open your browser and point to `localhost:5555` and you should see `Welcome to EQ Works 😎`

### Notes on working through the problems

Make sure any additional Node.js level dependencies are properly added in `package.json`. We encourage a healthy mixture of your own implementations, and good choices of existing open-source libraries/tools. We will comment in the problems to indicate which ones cannot be solved purely through an off-the-shelf solution.

## Problems

Complete 1, then pick either 2a or 2b that best represents your interest.

### 1. server-side rate-limiting

You may use either of the variants below as your starting point.

- Node.js variant: [`ws-product-nodejs`](https://github.com/EQWorks/ws-product-nodejs)

Implement rate-limiting on all of the API endpoints. Do not use an off-the-shelf solution such as https://pypi.org/project/Flask-Limiter/ or https://www.npmjs.com/package/express-rate-limit.

Depending on the work sample variant you selected to use, you'll need the following environment variables for connectivity with the PostgreSQL database:

```
# Node variant, as well as standard PG env vars
PGHOST=
PGPORT=
PGDATABASE=
PGUSER=
PGPASSWORD=
```

### 2a. Found at the link below
(https://github.com/wesley-crick/ws-product-ui)