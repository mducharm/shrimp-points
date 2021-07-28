\connect shrimp_points_db;

create type app_public.feed_event as enum (
    'task_created',
    'task_updated',
    'task_completed',
    'person_joined'
);

create table if not exists app_public.feed_entry (
   id serial primary key,
   group_id integer references app_public.group,
   event app_public.feed_event not null,
   created_at timestamp default now(),
   updated_at timestamp default now()
);

create trigger feed_entry_created_at before insert on app_public.feed_entry for each row execute procedure app_private.set_created_at();
create trigger feed_entry_updated_at before update on app_public.feed_entry for each row execute procedure app_private.set_updated_at();