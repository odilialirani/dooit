class AddBudgetIdToSpendings < ActiveRecord::Migration[6.0]
  def change
    add_column :budget_spendings, :budget_id, :integer
  end
end
