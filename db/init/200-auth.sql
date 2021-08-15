\connect shrimp_points_db;

create type app_public.jwt_token as (
    role text,
    person_id integer,
    exp bigint
);

/* Functions */


-- * Register
create function app_public.register_person(
    display_name text,
    email text,
    password text
)
returns app_public.person as $$
    declare person app_public.person;
    begin
        insert into app_public.person 
            (display_name)
        values
            (display_name)
        returning * into person;

        insert into app_private.account
            (person_id, email, password_hash)
        values
            (person.id, email, crypt(password, gen_salt('bf')));
        
        return person;
    end;
$$ language plpgsql strict security definer;



-- * Authenticate
create function app_public.authenticate(email text, password text) returns app_public.jwt_token as $$
    declare account app_private.account;
    begin 
        select a.* into account
        from app_private.account as a
        where a.email = $1;

        if account.password_hash = crypt(password, account.password_hash)
        then
            return ('sp_person', account.person_id, extract(epoch from (now() + interval '2 days')))::app_public.jwt_token;
        else
            return null;
        end if;
    end;
$$ language plpgsql strict security definer;

comment on function app_public.authenticate(text, text) is 'Creates a JWT token that will securely identify a person and give them certain permissions. This token expires in 2 days.';


-- * Current Person
create function app_public.current_person() returns app_public.person as $$
    select * 
    from app_public.person
    where id = nullif(current_setting('jwt.claims.person_id', true), '')::integer
$$ language sql stable;

comment on function app_public.current_person() is 'Gets the person who was identified by our JWT.';

-- * Current Person ID
create function app_public.current_person_id() returns integer as $$
    select id from app_public.current_person()
$$ language sql stable;

comment on function app_public.current_person_id() is 'Gets id of person identified in JWT.';


create function app_private.set_created_by() returns trigger as $$
    begin 
        new.created_by := app_public.current_person_id();
        return new;
    end;
$$ language plpgsql;

create function app_private.set_created_by() returns trigger as $$
    begin 
        new.created_by := app_public.current_person_id();
        return new;
    end;
$$ language plpgsql;

create trigger group_created_by before insert on app_public.group for each row execute procedure app_private.set_created_by();
create trigger task_created_by before insert on app_public.task for each row execute procedure app_private.set_created_by();
create trigger group_invite_from before insert on app_public.group_invite for each row execute procedure app_private.set_created_by();