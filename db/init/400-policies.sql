\connect shrimp_points_db;

-- * Enable RLS
alter table app_public.person enable row level security;
alter table app_public.group enable row level security;
alter table app_public.group_invite enable row level security;
alter table app_public.feed_entry enable row level security;
alter table app_public.task enable row level security;
alter table app_public.task_rating enable row level security;
alter table app_public.task_completed enable row level security;


-- * select
create policy select_person on app_public.person for select using (true);
create policy select_person_group on app_public.person_group for select using (true);
create policy select_group on app_public.group for select using (true);
create policy select_group_invite on app_public.group_invite for select using (true);
create policy select_feed_entry on app_public.feed_entry for select using (true);
create policy select_task on app_public.task for select using (true);
create policy select_task_rating on app_public.task_rating for select using (true);
create policy select_task_completed on app_public.task_completed for select using (true);


-- * insert
create policy insert_group on app_public.group for insert to sp_person
    with check(not exists(select 1 from app_public.group where created_by = app_public.current_person_id()));

create policy insert_group_invite on app_public.group_invite for insert to sp_person
    with check(
        exists(select 1 from app_public.group as g
                    where g.created_by = app_public.current_person_id()
                    and group_id = id));

create policy insert_task on app_public.task for insert to sp_person
    with check(created_by = app_public.current_person_id()
        and exists(select 1 from app_public.group where created_by = app_public.current_person_id()));

-- * update
create policy update_person on app_public.person for update to sp_person
    using (id = nullif(current_setting('jwt.claims.person_id', true), '')::integer);


-- * delete
create policy delete_person on app_public.person for delete to sp_person
    using (id = nullif(current_setting('jwt.claims.person_id', true), '')::integer);