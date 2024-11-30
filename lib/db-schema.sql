create table tickets (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table tickets enable row level security;

create policy "Users can view all tickets"
on tickets for select
to authenticated
using (true);

create policy "Users can create tickets"
on tickets for insert
to authenticated
with check (true);

create index tickets_created_at_idx on tickets(created_at);
