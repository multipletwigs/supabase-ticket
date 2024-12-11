create table tickets_demo (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table tickets_demo enable row level security;

create policy "Users can view all tickets_demo"
on tickets_demo for select
to public
using (true);

create policy "Users can create tickets_demo"
on tickets_demo for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = id));

create policy "Users can update tickets_demo"
on tickets_demo for update
to authenticated
with check ((( SELECT auth.uid() AS uid) = id));

create index tickets_demo_created_at_idx on tickets(created_at);