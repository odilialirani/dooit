class CreateBudgetCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :budget_categories do |t|
      t.boolean :active
      t.string :title
    end
  end
end
