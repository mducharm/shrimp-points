\connect shrimp_points_db;

create table if not exists app_public.task_completed (
   id serial primary key,
   points_awarded integer not null,
   task_id integer references app_public.task,
   created_at timestamp default now(),
   updated_at timestamp default now()
);


create trigger task_completed_created_at before insert on app_public.task_completed for each row execute procedure app_private.set_created_at();
create trigger task_completed_updated_at before update on app_public.task_completed for each row execute procedure app_private.set_updated_at();