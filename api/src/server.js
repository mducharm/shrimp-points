const express = require("express");
const { postgraphile } = require("postgraphile");

const app = express();

app.use(postgraphile(
    process.env.DATABASE_URL || "postgres://user:pass@host:5432/dbname",
    process.env.PUBLIC_SCHEMA || "public",
    {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
        retryOnInitFail: true,
        pgDefaultRole: process.env.DEFAULT_ROLE || "sp_anon",
        jwtPgTypeIdentifier: process.env.JWT_TYPE_IDENTIFIER || "app_public.jwt_token",
        jwtSecret: process.env.JWT_SECRET
    }
));

app.listen(process.env.PORT || 3000);

