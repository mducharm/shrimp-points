\connect shrimp_points_db;

create table if not exists app_public.person_group (
    person_id integer references app_public.person,
    group_id integer references app_public.group,
    primary key (person_id, group_id)
);


create function app_private.create_person_group() returns trigger as $$
    begin 
        insert into app_public.person_group (person_id, group_id)
        values (new.created_by, new.id);
        return new;
    end;
$$ language plpgsql;


create trigger group_created_with_person_group after insert on app_public.group for each row execute procedure app_private.create_person_group();