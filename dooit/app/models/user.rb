class User < ApplicationRecord
  self.table_name = 'users'
  has_secure_password
   
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true

  has_many :friends
  has_many :receipts
  has_many :categories, class_name: 'Budget::Category', foreign_key: 'user_id'
  has_many :budgets, class_name: 'Budget::Budget', foreign_key: 'user_id'
end
