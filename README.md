# Shrimp Points

An app for gamifying chores and household tasks.

## Helpful commands

```bash
# the init scripts won't run if a volume exists; use this to completely clear out the DB
docker volume rm postgraphile-forum-example_db

# run this if you need to ensure the images are rebuilt (e.g. you change the db init scripts)
docker-compose build

# start/stop 
docker-compose up
docker-compose down
```

## Links
- [Running PostGraphile in Docker](https://www.graphile.org/postgraphile/running-postgraphile-in-docker/)
- [Running PostGraphile as a library in Dockerr](https://www.graphile.org/postgraphile/running-postgraphile-as-a-library-in-docker/)
- [PostGraphile Schema Design](https://www.graphile.org/postgraphile/postgresql-schema-design/)