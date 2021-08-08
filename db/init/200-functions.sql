\connect shrimp_points_db;

create function app_public.search_people(search text) returns setof app_public.person as $$    
    select * from app_public.person    
    where display_name ilike ('%' || search || '%')   
$$ language sql stable;
