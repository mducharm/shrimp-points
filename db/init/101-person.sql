\connect shrimp_points_db;

create table if not exists app_public.person (
    id serial primary key,
    display_name text not null check (char_length(display_name) < 80),
    about text,
    created_at timestamp default now(),
    updated_at timestamp default now() 
);

comment on table app_public.person is 'A user of the forum.';
comment on column app_public.person.id is 'The primary unique identifier for the person.';
comment on column app_public.person.display_name is 'Username that other users see.';
comment on column app_public.person.about is 'A short description about the user, written by the user.';
comment on column app_public.person.created_at is 'The time this person was created.';
comment on column app_public.person.updated_at is 'The time this person was updated.';


create trigger person_created_at before insert on app_public.person for each row execute procedure app_private.set_created_at();
create trigger person_updated_at before update on app_public.person for each row execute procedure app_private.set_updated_at();
