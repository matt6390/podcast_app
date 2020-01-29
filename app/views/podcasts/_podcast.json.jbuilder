json.id podcast.id
json.name podcast.name
json.url podcast.url
if podcast.comments[0]
  json.podcast_comments podcast.comments do |comment|
    json.partial! comment, partial: 'comment', as: :comment
  end
end
json.format podcast.format
json.friendly_created_at podcast.friendly_created_at
json.friendly_updated_at podcast.friendly_updated_at