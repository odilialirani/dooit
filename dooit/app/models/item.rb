class Item < ApplicationRecord
  self.table_name = 'items'

  belongs_to :receipt
  has_one :friend
end
