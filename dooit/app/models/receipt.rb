class Receipt < ApplicationRecord
  self.table_name = 'receipts'

  attr_accessible :s3_bucket, :s3_path

  belongs_to :user

  has_many :items

  def process_image
    tesseract = Split::Tesseract.new(self)
    tesseract.process
  end
end
