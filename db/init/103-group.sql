\connect shrimp_points_db;

create table if not exists app_public.group (
    id serial primary key,
    name text not null check (char_length(name) < 80),
    created_at timestamp default now(),
    updated_at timestamp default now() 
);


create trigger group_created_at before insert on app_public.group for each row execute procedure app_private.set_created_at();
create trigger group_updated_at before update on app_public.group for each row execute procedure app_private.set_updated_at();