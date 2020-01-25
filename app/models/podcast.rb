class Podcast < ApplicationRecord
  has_many :comments, as: :commentable
  
  validates :name, presence: true
  validates :url, presence: true

  def friendly_created_at
    created_at.strftime("%e %b %Y %H:%M:%S%p")
  end

  def friendly_updated_at
    updated_at.strftime("%e %b %Y %H:%M:%S%p")
  end
end
