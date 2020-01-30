json.array! @podcasts do |podcast|
  json.id podcast.id
  json.name podcast.name
  json.url podcast.url
  json.format podcast.format
  json.friendly_created_at podcast.friendly_created_at
  json.friendly_updated_at podcast.friendly_updated_at
end