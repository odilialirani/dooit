class Friend < ApplicationRecord
  self.table_name = 'friends'

  validates :first_name, presence: true
  validates :last_name, presence: true

  belongs_to :user
end
