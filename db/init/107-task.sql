\connect shrimp_points_db;

create table if not exists app_public.task (
   id serial primary key,
   name text not null check (char_length(name) < 80),
   created_by integer references app_public.person,
   group_id integer references app_public.group,
   created_at timestamp default now(),
   updated_at timestamp default now()
);


create trigger task_created_at before insert on app_public.task for each row execute procedure app_private.set_created_at();
create trigger task_updated_at before update on app_public.task for each row execute procedure app_private.set_updated_at();