class User < ApplicationRecord
  has_secure_password

  has_many :comments
  
  validates :f_n, presence: true
  validates :l_n, presence: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: /@/, message: "Must be a valid email address"}

  def full_name
    return f_n + " " + l_n
  end

  def friendly_created_at
    created_at.strftime("%e %b %Y %H:%M:%S%p")
  end

  def friendly_updated_at
    updated_at.strftime("%e %b %Y %H:%M:%S%p")
  end
end
