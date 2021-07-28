\connect shrimp_points_db;

create table if not exists app_private.account (
    person_id integer primary key references app_public.person(id) on delete cascade,
    email text not null unique check (email ~* '^.+@.+\..+$'),
    password_hash text not null
);
