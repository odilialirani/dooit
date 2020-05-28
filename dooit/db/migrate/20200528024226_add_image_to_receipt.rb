class AddImageToReceipt < ActiveRecord::Migration[6.0]
  def change
    add_column :receipts, :s3_bucket, :string
    add_column :receipts, :s3_path, :string
  end
end
