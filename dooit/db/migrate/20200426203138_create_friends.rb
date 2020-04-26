class CreateFriends < ActiveRecord::Migration[6.0]
  def change
    create_table :friends do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.boolean :active
      t.string :phone_number, null: false
      t.timestamps
    end
  end
end
