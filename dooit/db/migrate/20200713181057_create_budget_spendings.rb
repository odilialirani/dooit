class CreateBudgetSpendings < ActiveRecord::Migration[6.0]
  def change
    create_table :budget_spendings do |t|
      t.string :location
      t.date :date
      t.integer :amount
    end
  end
end
