class AddUserIdToCategory < ActiveRecord::Migration[6.0]
  def change
    add_column :budget_categories, :user_id, :integer
  end
end
