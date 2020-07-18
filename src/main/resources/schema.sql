create table if not exists "users"
(
    user_id     serial primary key        not null,
    email       varchar(100) unique       not null,
    password    varchar(25)               not null,
    date_joined date default current_date not null,
    username    varchar(25) unique        not null
);

create table if not exists "groups"
(
    group_id        serial primary key             not null,
    group_name      varchar(30)                    not null,
    invite_edit_url uuid default gen_random_uuid() not null,
    invite_view_url uuid default gen_random_uuid() not null,
    date_created    date default current_date      not null,
    creator integer references users(user_id)
);

create table if not exists "memberships"
(
    membership_id serial primary key not null,
    type membership_type not null,
    user_id       int references users (user_id),
    group_id      int references groups (group_id)
);

create table if not exists "bookmarks"
(
    bookmark_id  serial primary key           not null,
    url          text unique                  not null,
    title        varchar(255)                 not null,
    description  text                         not null,
    date_created date default current_date not null,
    group_id     integer references groups (group_id),
    creator      integer references users (user_id)
);

create table if not exists "tags"
(
    "tag_id" serial primary key not null,
    "name"   varchar(20) unique not null
);


create table if not exists "bookmark_tag"
(
    "bookmark_tag_id" serial not null,
    "tag_id"          integer references tags (tag_id) not null,
    "bookmark_id"     integer references bookmarks (bookmark_id) not null
);