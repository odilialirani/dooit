class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :description, null: false
      t.float :amount, null: false
      t.string :category
      t.timestamps null: false
    end
  end
end
