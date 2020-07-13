class CreateBudgets < ActiveRecord::Migration[6.0]
  def change
    create_table :budgets do |t|
      t.integer :amount
      t.date :start_date
      t.date :end_date
      t.boolean :active
    end
  end
end
