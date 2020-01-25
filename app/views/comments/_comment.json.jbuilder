json.id comment.id
json.body comment.body
json.user_id comment.user.id
json.user_name comment.user.full_name
json.friendly_created_at comment.friendly_created_at
json.friendly_updated_at comment.friendly_updated_at

if comment.comments[0]
  json.seeded_comments comment.comments do |comment|
    json.partial! comment, partial: 'comment', as: :comment
  end
end