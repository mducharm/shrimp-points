\connect shrimp_points_db;

create table if not exists app_public.task_rating (
   id serial primary key,
   rating integer not null check (rating > 0 and rating < 11),
   task_id integer references app_public.task,
   created_at timestamp default now(),
   updated_at timestamp default now()
);

create trigger task_rating_created_at before insert on app_public.task_rating for each row execute procedure app_private.set_created_at();
create trigger task_rating_updated_at before update on app_public.task_rating for each row execute procedure app_private.set_updated_at();