class Receipt < ApplicationRecord
  self.table_name = 'receipts'

  belongs_to :user

  has_many :items

  def process_image
    
  end
end
