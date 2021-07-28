\connect shrimp_points_db;

create table if not exists app_public.person_group (
    person_id integer references app_public.person,
    group_id integer references app_public.group,
    primary key (person_id, group_id)
);
