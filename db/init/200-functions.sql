\connect shrimp_points_db;

create function app_public.search_people(search text) returns setof app_public.person as $$    
    select * from app_public.person    
    where display_name ilike ('%' || search || '%')   
$$ language sql stable;

create function app_public.cancel_invite(
    id_of_person int,
    id_of_group int
)
returns boolean as $$
    begin
        delete from app_public.group_invite gi
            where gi.group_id = id_of_group 
            and gi.to_person_id = id_of_person;
        return true;
    end;
$$ language plpgsql strict security definer;