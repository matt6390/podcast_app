class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
  belongs_to :user
  has_many :comments, as: :commentable
  
  validates :body, presence: true
  validates :commentable_id, presence: true
  validates :commentable_type, presence: true
  # validates :user_id, presence: true (now we can have annonymous posts)


  def friendly_created_at
    created_at.strftime("%e %b %Y %H:%M:%S%p")
  end

  def friendly_updated_at
    updated_at.strftime("%e %b %Y %H:%M:%S%p")
  end
end
