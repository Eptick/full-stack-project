insert into roles values (1, 'ROLE_ADMIN') on conflict do nothing;
insert into roles values (2,'ROLE_USER') on conflict do nothing;