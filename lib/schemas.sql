
insert into storage.buckets (id, name)
values ('ticket-images', 'ticket-images')
on conflict do nothing;

create policy "Authenticated users can upload ticket images"
on storage.objects for insert 
to authenticated
with check (
    bucket_id = 'ticket-images'
    and auth.role() = 'authenticated'
);

create policy "Anyone can view ticket images"
on storage.objects for select
to anon
using (bucket_id = 'ticket-images');

alter table tickets enable row level security;

create policy "Users can insert their own ticket"
on tickets for insert
to authenticated
with check (auth.uid() = user_id);
