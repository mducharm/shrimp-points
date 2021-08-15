
\connect shrimp_points_db;
-- grant usage: allows the roles to know the schema exists
grant usage on schema app_public to sp_anon, sp_person;

grant select on table app_public.person to sp_anon, sp_person;
grant update, delete on table app_public.person to sp_person;

grant select on table app_public.group to sp_anon, sp_person;
grant insert, update, delete on table app_public.group to sp_person;
grant usage on sequence app_public.group_id_seq to sp_person;

grant select on table app_public.person_group to sp_anon, sp_person;
grant insert, update, delete on table app_public.person_group to sp_person;
--grant usage on sequence app_public.person_group_id_seq to sp_person;

grant select on table app_public.group_invite to sp_anon, sp_person;
grant insert, update, delete on table app_public.group_invite to sp_person;
grant usage on sequence app_public.group_invite_id_seq to sp_person;

grant select on table app_public.task to sp_anon, sp_person;
grant insert, update, delete on table app_public.task to sp_person;
grant usage on sequence app_public.task_id_seq to sp_person;

grant select on table app_public.task_rating to sp_anon, sp_person;
grant insert, update, delete on table app_public.task_rating to sp_person;
grant usage on sequence app_public.task_rating_id_seq to sp_person;

grant select on table app_public.task_completed to sp_anon, sp_person;
grant insert, update, delete on table app_public.task_completed to sp_person;
grant usage on sequence app_public.task_completed_id_seq to sp_person;

grant execute on function app_public.authenticate(text, text) to sp_anon, sp_person;
grant execute on function app_public.current_person() to sp_anon, sp_person;
grant execute on function app_public.current_person_id() to sp_anon, sp_person;

grant execute on function app_public.register_person(text, text, text) to sp_anon;

grant execute on function app_public.search_people(text) to sp_person;
grant execute on function app_public.cancel_invite(int, int) to sp_person;
