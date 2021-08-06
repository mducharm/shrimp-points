\connect shrimp_points_db;

/* Schemas */
create schema app_public;
create schema app_private;

-- after schema creation and before function creation
alter default privileges revoke execute on functions from public;


/* Roles */
create role sp_postgraphile login password 'change_me';

create role sp_anon;
grant sp_anon to sp_postgraphile;

create role sp_person;
grant sp_person to sp_postgraphile;

grant usage on schema app_public to sp_anon, sp_person;

/* Extensions */

-- needed for crypt & gen_salt
create extension if not exists "pgcrypto"; -- comes with postgres 

/* Functions */

-- needed for triggers
create function app_private.set_created_at() returns trigger as $$
    begin 
        new.created_at := current_timestamp;
        return new;
    end;
$$ language plpgsql;

create function app_private.set_updated_at() returns trigger as $$
    begin 
        new.updated_at := current_timestamp;
        return new;
    end;
$$ language plpgsql;