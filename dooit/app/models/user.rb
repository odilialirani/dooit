class User < ApplicationRecord
  self.table_name = 'users'

  validates :username, presence: true
  validates :password, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true

  has_many :friends
end
