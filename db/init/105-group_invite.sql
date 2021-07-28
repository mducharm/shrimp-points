\connect shrimp_points_db;

create table if not exists app_public.group_invite (
   id serial primary key,
   group_id integer references app_public.group,
   to_person_id integer references app_public.person,
   from_person_id integer references app_public.person,
   created_at timestamp default now(),
   updated_at timestamp default now()
);

create trigger group_invite_created_at before insert on app_public.group_invite for each row execute procedure app_private.set_created_at();
create trigger group_invite_updated_at before update on app_public.group_invite for each row execute procedure app_private.set_updated_at();