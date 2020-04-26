class CreateReceipts < ActiveRecord::Migration[6.0]
  def change
    create_table :receipts do |t|
      t.string :location
      t.float :tax_percentage
      t.float :tip
      t.float :total
      t.datetime :date
      t.timestamps null: false
    end
  end
end
